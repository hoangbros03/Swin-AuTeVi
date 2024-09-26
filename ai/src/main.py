from typing import Union
import os
import ast

from fastapi import FastAPI
from pydantic import BaseModel
from pymongo import MongoClient
from gridfs import GridFS
import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold

from src.module1 import search_image, search_product
from src.module2 import create_prompt, generate_script
from src.module3 import create_scenes_data, create_movie, generate_video_from_json
from src.utils import *
import src.api_key as api_key

app = FastAPI()
create_folder("temp")
client = MongoClient(api_key.DB_LINK)  
db = client['autevi']
fs = GridFS(db)


genai.configure(api_key=api_key.GEMINI_API)
model = genai.GenerativeModel(model_name='gemini-1.5-flash')

class Input_User_Request(BaseModel):
    id: str
    prompt: str 
    files: list
    videoId: str
    slide: bool
    document: bool
    language: str
    timeCreated: str
    
class Download_From_Local(BaseModel):
    path: str

@app.post("/generate_video")
def generate_video(input_user: Input_User_Request):
    # Empty folder if needed
    empty_folder("temp")
    print("Temp folder is fresh and ready to process")

    # Receive user files (download): 1pdf, n jpg
    print(input_user)
    rag_info = []
    image_online_paths = []
    for idx, file_info in enumerate(input_user.files):
        print(f"Considering file {idx+1} of user")
        try:
            result = get_file_from_db(fs, file_info['id'], f"./temp/{file_info['id']}")
        except:
            print("An error happened when get from db. Skip this file.")
            continue
        if file_info['type'].split("/")[-1] == "pdf":
            os.rename(f"./temp/{file_info['id']}", f"./temp/{file_info['id']}.pdf")
            # TODO: Handle import to DB to further RAG
        elif file_info['type'].split("/")[0] == "image":
            new_name = f"./temp/{file_info['id']}.{file_info['type'].split("/")[-1]}"
            os.rename(f"./temp/{file_info['id']}", new_name)
            try:
                image_upload_status = upload_image(api_key.IMGBB_API, new_name)
            except:
                print("An error happened upload image to imgbb. Skip this file.")
                continue
            image_online_paths.append(image_upload_status['data']['url'])
    
    print("Now we defined some default info")

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
        [f'From user input, strictly give me an array containing one or some products inside so I can further searching. For example, you can give an output as : ["product one", "product two"]. The input is: {short_product}'],
        safety_settings={
            HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
        }
    )
    try:
        print(keywords.text)
        keywords = ast.literal_eval(keywords.text[7:-5])
        product_info = search_product(short_product)
        content = [product_info['results'][i]['content'] for i in range(5)]
    except:
        print("An error happened when get content array as result of searching. Set content array empty")
        content = []
    print("Content: ", content)
    # if True:
    #     return {
    #         "videoId": "ratok",
    #         "video": "ratok",
    #         "slide": None,
    #         "document": None
    #     }

    gemini_prompt = create_prompt(short_product, brand_info, content)

    script = generate_script(model, gemini_prompt)

    images = search_image(script['keyword'][0])
    images = image_online_paths + images

    movie = create_movie(create_scenes_data(script, images))

    video = generate_video_from_json(movie)
    # TODO: Process slide and document

    if video:
        return {
            "videoId": input_user.videoId,
            "video": video,
            "slide": None,
            "document": None
        }
    else:
        return {
            "videoId": None,
            "video": None,
            "slide": None,
            "document": None
        }


# product="""Bia Hơi Hà Nội - Thùng 24 lon 500ml - Phiên bản Tết
# Thông tin sản phẩm
# • Dung tích: 500ml/lon
# • Nồng độ cồn: 4.1 ± 0.4%
# • Thành phần: nước, mạch nha, gạo, đường, hoa Houblon
# • HSD: 5 tháng kể từ ngày sản xuất
# HABECO - Thương hiệu đồ uống hàng đầu Việt Nam
# Những dòng sản phẩm nổi tiếng làm nên thương hiệu Habeco có thể kể đến như Bia hơi Hà Nội, Bia lon Hà Nội, Bia Trúc Bạch, Hanoi Beer Premium… Với bí quyết công nghệ - truyền thống gần 130 năm, hệ thống thiết bị hiện đại, đội ngũ cán bộ công nhân viên lành nghề, các sản phẩm của HABECO đã trở thành niềm tự hào của thương hiệu Việt và được phân phối rộng rãi tới các thị trường nước ngoài như Đài Loan, Hàn Quốc, Anh, Đức, Mỹ,...
# Bia Hơi Hà Nội: Một nét văn hoá Hà Nội
# Bia Hơi Hà Nội ra đời và phát triển cùng những năm tháng thăng trầm của Thủ Đô Ngàn Năm Văn Hiến. Đổi thay qua từng ngày, những sản phẩm mới của Bia Hơi Hà Nội đã được ra mắt và phổ cập trên thị trường để nét văn hoá này ngày càng đẹp hơn, càng gần gũi với tất cả các thế hệ.
# Lưu ý và bảo quản
# • Sản phẩm dành cho người trên 18 tuổi
# • Không dành cho phụ nữ đang mang thai
# • Thưởng thức có trách nhiệm, đã uống đồ uống có cồn thì không lái xe
# • Ngon hơn khi uống lạnh (10-15̊C)
# • Bảo quản nơi khô ráo, sạch sẽ, thoáng mát, tránh ánh nắng mặt trời (<25̊C). Nếu mở lon phải dùng ngay hoặc bảo quản lạnh nếu muốn dùng lâu"""

@app.get(f"/download")
async def download_file(dfl: str):
    filename = dfl.path
    if filename[-4:] == "pptx":
        return FileResponse(path=filename, filename=filename, media_type='application/zip')