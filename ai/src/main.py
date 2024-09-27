from typing import Union
import os
import ast
import logging
import random
import json

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
from gridfs import GridFS
import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold

from src.module1 import search_image, search_product
from src.module2 import create_prompt, generate_script
from src.module3 import create_scenes_data, create_movie, generate_video_from_json
from src.prompt import get_paraphase_prompt
from src.utils import *
import src.api_key as api_key
from src.document import create_document
from src.slide import create_slide
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()
create_folder("temp")
client = MongoClient(api_key.DB_LINK)  
db = client['autevi']
fs = GridFS(db)

try:
    client.admin.command('ping')
    print('MongoDB connection successful!')
except Exception as e:
    print(f'MongoDB connection failed: {e}')

genai.configure(api_key=api_key.GEMINI_API)
model = genai.GenerativeModel(model_name='gemini-1.5-flash')

logger.info("Rat la ok")
class Input_User_Request(BaseModel):
    id: str
    prompt: str 
    files: list
    slide: bool
    document: bool
    campaign: bool
    language: str
    timeCreated: str
    
class Download_From_Local(BaseModel):
    path: str

@app.post("/generate_video")
def generate_video(input_user: Input_User_Request):
    # Empty folder if needed
    empty_folder("temp")
    logger.info("Temp folder is fresh and ready to process")

    # Receive user files (download): 1pdf, n jpg
    logger.info(input_user)
    rag_info = []
    image_online_paths = []
    for idx, file_info in enumerate(input_user.files):
        logger.info(f"Considering file {idx+1} of user")
        try:
            result = get_file_from_db(fs, file_info['id'], f"./temp/{file_info['id']}")
        except:
            logger.info("An error happened when get from db. Skip this file.")
            continue
        if file_info['type'].split("/")[-1] == "pdf":
            os.rename(f"./temp/{file_info['id']}", f"./temp/{file_info['id']}.pdf")
            # TODO: Handle import to DB to further RAG
        elif file_info['type'].split("/")[0] == "image":
            new_name = f"./temp/{file_info['id']}.{file_info['type'].split('/')[-1]}"
            os.rename(f"./temp/{file_info['id']}", new_name)
            try:
                image_upload_status = upload_image(api_key.IMGBB_API, new_name)
            except:
                logger.info("An error happened upload image to imgbb. Skip this file.")
                continue
            image_online_paths.append(image_upload_status['data']['url'])
    
    logger.info("Now we defined some default info")

    brand_info="""
    Brand mission and value: N/a
    Audience: Everyone
    Goal: Display the product to everyone
    Distribution channels: Facebook
    Time: Normal day
    """

    short_product = input_user.prompt

    # Get searching product
    # Extracting keyword first
    keywords = model.generate_content(
        [f'From user input, strictly give me an array containing one or some products inside so I can further searching. Generate a list with one or more items, without any additional text or explanation, listing only the items. The input is: {short_product}'],
        safety_settings={
            HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
        }
    )
    try:
        logger.info(keywords.text)
        keywords = ast.literal_eval(keywords.text)
        product_info = search_product(short_product)
        content = [str(product_info['results'][i]['content']) for i in range(5)]
    except:
        logger.info("An error happened when get content array as result of searching. Set content array empty")
        content = []
    logger.info("Content: ", content)

    if input_user.campaign:
        iteration = 2
        # Create a campaign description
        campaign_description = model.generate_content(
            [f'Make some text, around 5 sentences, as a campaign description from the input intended by user. It should include our intention of video, how long we should run with the generated videos from campaign, and some other guidance. The input is: {short_product}'],
            safety_settings={
                HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
            }
        ).text
    else:
        campaign_description = None
        iteration = 1
    
    slide_content = None

    result_json =  {
            "campaign": input_user.campaign,
            "campaignDescription": campaign_description,
            "videos": [],
            "slide": None,
            "document": None
        }
    for i in range(iteration):

        gemini_prompt = create_prompt(short_product, brand_info, content)

        script = generate_script(model, gemini_prompt)

        if i > 0:
            script = generate_script(model, get_paraphase_prompt(script))

        logger.info(script)

        images = search_image(script['keyword'][0])
        random.shuffle(images)

        images = image_online_paths + images

        # movie = create_movie(create_scenes_data(script, images))
        # slide_content = movie
        slide_content=create_scenes_data(script, images)
        movie = create_movie(slide_content)
        video = generate_video_from_json(movie)
        if video:
            result_json['videos'].append({"video": video,
                                        "jsonVideo": json.dumps(movie)})
        
    if input_user.slide and slide_content:
        try:
            slide_path = create_slide(slide_content)
            result_json['slide'] = slide_path
        except:
            logger.info("An error happened when process slide")

    if input_user.document:
        try:
            document_path = create_document(model, input_user.prompt, content)
            result_json['document'] = document_path
        except:
            logger.info("An error happened when process document")
        
    logger.info(result_json)
    return result_json

    

@app.get(f"/download")
async def download_file(dfl: str):
    filename = dfl.path
    # if filename[-4:] == "pptx":
    #     return FileResponse(path=filename, filename=filename, media_type='application/vnd.openxmlformats-officedocument.presentationml.presentation')
    # elif filename[-4:] == "docx":
    #     return FileResponse(path=filename, filename=filename, media_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    # else:
    #     # Raise a 400 error if the file type is not supported
    #     raise HTTPException(status_code=400, detail="Unsupported file type. Only .pptx and .docx are allowed.")
    return FileResponse(filename)