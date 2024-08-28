from flask import Flask, request, jsonify
import requests
import json
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Define your API key here
GOOEY_API_KEY = "sk-m5p4JWziMZzhOLyIl4yuIKNzIIh3kdiLPfezwqqtYofvIonI"
# sk-3hEfNVkuSqbI5qSDRFJY5l8Qo4Mwxy7zhtkEnyIQ5iFo9gRV

@app.route('/upload', methods=['POST'])
def upload_files():
    if 'image' not in request.files or 'audio' not in request.files:
        return jsonify({"error": "Image or audio file missing"}), 400

    image_file = request.files['image']
    audio_file = request.files['audio']

    payload = {}

    try:
        logging.debug("Sending request to Gooey API")
        response = requests.post(
            "https://api.gooey.ai/v2/Lipsync/form/?run_id=fecsii61rs6e&uid=fm165fOmucZlpa5YHupPBdcvDR02",
            headers={
                "Authorization": f"Bearer {GOOEY_API_KEY}",
            },
            files={
                "input_face": (image_file.filename, image_file, image_file.content_type),
                "input_audio": (audio_file.filename, audio_file, audio_file.content_type),
            },
            data={"json": json.dumps(payload)},
        )
        
        # Log the response status and content
        logging.debug(f"Response Status: {response.status_code}")
        logging.debug(f"Response Content: {response.content}")
        
        response.raise_for_status()  # Raise an error for HTTP errors
        result = response.json()
        return jsonify(result), response.status_code
    
    except requests.exceptions.RequestException as e:
        logging.error(f"Request Exception: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5002,debug=True)
