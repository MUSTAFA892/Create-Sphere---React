from flask import Flask, request, jsonify
from flask_cors import CORS
from zhipuai import ZhipuAI

app = Flask(__name__)

# Initialize ZhipuAI client with your API key
client = ZhipuAI(api_key="469d8b4fbaf84f5ffef73856dffd63e2.p27oLJ1a0HwMwUUJ")
# fa8b8aa4faf4cb45c11dcf4f9b6c183f.v97AQ9Wm1UiFQ3wS

# Configure CORS
CORS(app, resources={r"/get_video_url": {"origins": "http://localhost:3000"}})

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return response

@app.route('/get_video_url', methods=['POST'])
def get_video_url():
    data = request.json
    model_id = data.get('model_id')
    
    if not model_id:
        return jsonify({"error": "Model ID is required"}), 400
    
    try:
        response = client.videos.retrieve_videos_result(id=model_id)
        
        print("API Response: ", response)
        
        if response.task_status == "SUCCESS" and response.video_result:
            video_url = response.video_result[0].url
            return jsonify({"output_url": video_url}), 200
        else:
            return jsonify({"error": "Video is still being processed or no result found", "task_status": response.task_status}), 202
        
    except Exception as e:
        print("Exception occurred:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(port=5001, debug=True)
