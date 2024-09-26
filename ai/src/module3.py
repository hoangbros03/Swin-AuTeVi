import requests
import time

import src.api_key as api_key

def gen_scene(scene_id, text, voice=None, subtitle=None, image_url=None, default_duration=3, fade_out=0.5):
    """
    Generates a single scene in JSON format with text, optional voice, and optional background image.
    
    :param scene_id: The ID of the scene.
    :param text: The text to display in the scene.
    :param voice: The voice text to read aloud (optional).
    :param image_url: The URL of the background image (optional).
    :param default_duration: The default duration of the scene (default is 3 seconds if no voice).
    :param fade_out: The fade-out duration for the image (default is 0.5 seconds).
    :return: Dictionary representing the scene in JSON format.
    """
    elements = []

    # Add background image if available (no scale property)
    if image_url:
        elements.append({
            "id": f"background_image_{scene_id}",
            "type": "image",
            "src": image_url,
            "comment": "Background Image",
            "position": "center-center",  # Center the image
            "fade-out": fade_out,
            "transition": {
                "style": "wipeup",
                "duration": 1.5
            },
        })

    # Add text element
    elements.append({
        "id": f"text_{scene_id}",
        "type": "text",
        "style": "008",
        "text": text,
        "vertical-align": "top",
        "height": 280,
    })
    
    # Add sub element if provided
    if subtitle:
        elements.append({
            "id": f"sub_{scene_id}",
            "type": "text",
            "style": "004",
            "text": subtitle,
            "settings": {
                "vertical-position": "bottom",
                "horizontal-position": "bottom",
            }
        }
        )

    # Add voice element if provided
    if voice:
        elements.append({
            "id": f"voice_{scene_id}",
            "type": "voice",
            "voice": "vi-VN-HoaiMyNeural",  
            "text": voice,
            "start": 1,
        })
        

    # Create and return the scene
    return {
        "id": f"scene_{scene_id}",
        "comment": f"Scene {scene_id} - {text}",
        "elements": elements
    }


def create_video_json(video_id, comment, width, height, quality, resolution, scenes_data, audio_url=None):
    """
    Creates a full video JSON structure, including scenes and optional background audio.
    
    :param video_id: Unique ID of the video.
    :param comment: General comment for the video.
    :param width: Width of the video.
    :param height: Height of the video.
    :param quality: Quality of the video (e.g., 'high').
    :param resolution: Resolution type (e.g., 'squared').
    :param scenes_data: List of dictionaries with scene data (text, voice, image_url).
    :param audio_url: Optional URL of the background audio.
    :return: Dictionary representing the whole video JSON structure.
    """
    scenes = []

    # Create each scene based on the provided data
    for idx, scene in enumerate(scenes_data, start=1):
        scene_id = f"scene_{idx}"
        text = scene.get("text")
        voice = scene.get("voice", None)
        subtitle = scene.get("subtitle", None)
        image_url = scene.get("image_url", None)
        
        scenes.append(gen_scene(scene_id, text, voice, subtitle, image_url))

    # Optional audio element
    elements = []
    if audio_url:
        elements.append({
            "id": "audio_bg",
            "type": "audio",
            "src": audio_url,
            "fade-out": 1,
            "duration": -2,
            "volume": 0.2
        })

    # Return the full video JSON structure
    return {
        "id": video_id,
        "comment": comment,
        "width": width,
        "height": height,
        "quality": quality,
        "resolution": resolution,
        "scenes": scenes,
        "elements": elements if elements else []
    }


def create_scenes_data(text_script, image_script):
    """
    Generates the scene data by combining text and images.

    :param text_script: Dictionary containing the scene headings and context (text).
    :param image_script: List of image URLs corresponding to the scenes.
    :return: List of dictionaries, each representing a scene with text, voice, and image.
    """
    scenes_data = []
    
    scenes = text_script.get("scenes", [])
    for i, scene in enumerate(scenes):
        # Get the corresponding image, or None if images are fewer than scenes
        image_url = image_script[i] if i < len(image_script) else None
        
        # Create a scene entry
        scene_data = {
            "text": scene.get("heading", ""),
            "voice": scene.get("context", ""),
            "subtitle": scene.get("context", ""),
            "image_url": image_url
        }
        
        scenes_data.append(scene_data)

    return scenes_data

def create_movie(scenes_data,video_id="", comment=""):
    movie = create_video_json(
        video_id=video_id, 
        comment=comment, 
        width=1080, 
        height=1080, 
        quality="high", 
        resolution="squared",
        audio_url="https://assets.json2video.com/assets/audios/advertime.mp3",
        scenes_data=scenes_data    
    )
    return movie

def generate_video_from_json(movie):
    # API key
    json2video_api_key = api_key.JSON2VIDEO_API

    # API endpoint for movie rendering
    API_ENDPOINT = 'https://api.json2video.com/v2/movies'

    # Submit the request to the API with the API key in the headers
    headers = {
        'x-api-key': json2video_api_key
    }

    response = requests.post(API_ENDPOINT, json=movie, headers=headers)

    # Wait for rendering to finish
    if response.status_code == 200:
        result = response.json()
        render_id = result['project']
        print("Movie rendering started with ID:", render_id)

    #     Polling to check rendering status
        get_url = f"{API_ENDPOINT}?project={render_id}"
        while True:
            get_response = requests.get(get_url, headers=headers)
            get_data = get_response.json()
            
            if get_data['movie']['status'] == 'done':
                print("Movie rendering finished!")
                print('Link video: ', get_data['movie']['url'])
                return get_data['movie']['url']
                
            elif get_data['movie']['status'] == 'error':
                print("Error rendering movie:", get_data['movie']['message'])
                # return get_data['movie']['message']
                return None
                
            time.sleep(5)
    else:
        print("Failed to start rendering:", response.text)
        # return response.text
        return None