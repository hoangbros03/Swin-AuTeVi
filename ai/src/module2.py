import google.generativeai as genai
import os
import json
from src.prompt import get_info_prompt
import src.api_key as api_key
from google.generativeai.types import HarmCategory, HarmBlockThreshold

def create_prompt(short_product, brand_info, content):
    return get_info_prompt(short_product, brand_info, content)

def generate_script(model, prompt):

    response = model.generate_content(
        [prompt],
        safety_settings={
            HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
        }
    )
    return json.loads(response.text[7:-3])
