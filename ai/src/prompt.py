def get_info_prompt(short_product, brand_info, response_content, language="Vietnamese"):
    prompt = f"""
    imagine you are a director and you need to make a small marketing video about a product from this user prompt:
    \"\"\"
    {short_product}
    \"\"\"

    You also know about the brand:
    \"\"\"
    {brand_info}
    \"\"\"

    This is some information about the product found on the Internet:
    \"\"\"
    {[i for i in response_content]}
    \"\"\"

    Give me a result with the following schema:
    \"\"\"
    {{
    "keyword": ["some keywords from idea"]
    "scenes": [
    {{"heading": "heading will show in the video",
    "context": "from 2-4 sentences only. it's also the text in the video"
    }},
    ]
    }}
    Please give me a valid json object and use {language}.
    \"\"\""""

    return prompt

def get_paraphase_prompt(before_response):
    prompt = f"""Please rephase every sentences in this json, and output exactly like that below response as json:
    \"\"\"
    {before_response}
    \"\"\""""

    return prompt

def get_compress_prompt(before_response):
    prompt = f"""Please reduce the length of every sentences in this json, and output exactly like that below response as json:
    \"\"\"
    {before_response}
    \"\"\""""

    return prompt