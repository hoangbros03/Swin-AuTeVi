from pymongo import MongoClient
from gridfs import GridFS
from PIL import Image
import io

# Connect to MongoDB
client = MongoClient('mongodb://admin:password@localhost:27017')
# mongodb://user_name:user_password@SERVER_IP/prod-db
db = client['autevi']

# Create a GridFS instance
fs = GridFS(db)

# Path to your local image
local_image_path = '/workspaces/AuTeVi/ai/src/assets/test_image.jpg'

# Open the image and convert to bytes
with Image.open(local_image_path) as img:
    # Convert image to RGB if it's not
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Create a byte stream
    byte_stream = io.BytesIO()
    img.save(byte_stream, format='JPEG')
    img_bytes = byte_stream.getvalue()

# Upload the image to GridFS
file_id = fs.put(img_bytes, filename='image.jpg', content_type='image/jpeg')

print(f"Image uploaded successfully. File ID: {file_id}")

# Close the MongoDB connection
client.close()