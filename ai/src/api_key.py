import os

JSON2VIDEO_API = ''
TAVILY_API = ""
GEMINI_API = ''
IMGBB_API=""
# DB_LINK="mongodb://localhost:27017/"
# DB_LINK="mongodb://host.docker.internal:27017"
DB_LINK = os.getenv("DB_LINK")
EMBED_MODEL_ID = "amazon.titan-embed-text-v2:0"