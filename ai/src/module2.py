import google.generativeai as genai
import os
import json
from src.prompt import get_info_prompt
import src.api_key as api_key
from google.generativeai.types import HarmCategory, HarmBlockThreshold
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def create_prompt(short_product, brand_info, content):
    return get_info_prompt(short_product, brand_info, content)

def generate_script(model, prompt):
    while True:
        response = model.generate_content(
            [prompt],
            safety_settings={
                HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
            }
        )
        try:
            result = json.loads(response.text[7:-3])
        except:
            logger.info("Re-generate the output.")
            continue
        return result
