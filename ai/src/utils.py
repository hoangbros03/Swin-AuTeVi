import os
import shutil

import requests
from PIL import Image
from bson.objectid import ObjectId

def empty_folder(folder_path: str):
    """
    Empty all contents of a folder without deleting the folder itself.
    
    :param folder_path: The path of the folder to be emptied.
    """
    try:
        for filename in os.listdir(folder_path):
            file_path = os.path.join(folder_path, filename)
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)  # Remove the file or link
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)  # Remove the directory and its contents
        print(f"Folder '{folder_path}' has been emptied.")
    except Exception as e:
        print(f"An error occurred while emptying the folder: {e}")

def create_folder(path: str):
    """
    Create a folder if it doesn't exist.

    :param path: The path of the folder to be created.
    """
    try:
        os.makedirs(path, exist_ok=True)
        print(f"Folder '{path}' created successfully or already exists.")
    except Exception as e:
        print(f"An error occurred while creating the folder: {e}")

def upload_image(api_key: str, image_path: str):
    """
    Upload an image to imgbb.

    :param api_key: Your imgbb API key.
    :param image_path: The path to the image to be uploaded.
    :return: JSON response from the imgbb API.
    """
    url = "https://api.imgbb.com/1/upload"
    
    # Open the image in binary mode
    with open(image_path, "rb") as image_file:
        payload = {
            'key': api_key,
            'image': image_file.read()
        }

    # Send the POST request
    response = requests.post(url, files={'image': payload['image']}, data={'key': payload['key']})

    # Check if the request was successful
    if response.status_code == 200:
        print("Image uploaded successfully.")
        return response.json()  # Return the response as a JSON object
    else:
        print(f"Failed to upload image. Status code: {response.status_code}")
        raise ValueError

def get_file_from_db(fs, file_id, output_path):
    # Step 3: Specify the file ID
    try:
        file_id = ObjectId(file_id)  # Convert string ID to ObjectId
    except Exception as e:
        print(f"Invalid ObjectId: {e}")
        raise ValueError

    # Step 4: Retrieve the file
    file_data = fs.find_one({'_id': file_id})

    if file_data:
        # Step 5: Write the file to disk
        with open(output_path, 'wb') as output_file:  # Specify the output file name
            output_file.write(file_data.read())
        print(f"File with ID '{file_id}' retrieved and saved as '{output_path}'.")
        return output_path
    else:
        print(f"File with ID '{file_id}' not found in GridFS.")
        return ValueError

    

# if __name__ == "__main__":
#     x = upload_image("", "./assets/test_image.jpg")
#     print(x)