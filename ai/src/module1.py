from tavily import TavilyClient
import src.api_key as api_key

def search_product(short_product):
    client = TavilyClient(api_key=api_key.TAVILY_API)
    response = client.search(f"search with the {short_product}")
    return response

def search_image(keyword):
    client = TavilyClient(api_key=api_key.TAVILY_API)
    #Executing a simple search query with image searching enabled
    tavily_image_search = client.search(f"search with the {keyword}", include_images=True, max_results=10)
    image_script = tavily_image_search['images']
    return image_script

