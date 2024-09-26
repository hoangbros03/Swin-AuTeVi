def get_info_prompt(short_product, brand_info, response_content):
    prompt = f"""
    imagine you are a director and you need to make a small marketing video about this product:
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
    Please give me a valid json object and use Vietnamese.
    \"\"\""""

    return prompt