from flask import Flask, request, jsonify
from flask_cors import CORS
from zhipuai import ZhipuAI

app = Flask(__name__)

# Initialize ZhipuAI client with your API key
client = ZhipuAI(api_key="469d8b4fbaf84f5ffef73856dffd63e2.p27oLJ1a0HwMwUUJ")
# fa8b8aa4faf4cb45c11dcf4f9b6c183f.v97AQ9Wm1UiFQ3wS

# Configure CORS
CORS(app, resources={r"/generate_model_id": {"origins": "http://localhost:3000"}})

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return response

@app.route('/generate_model_id', methods=['POST'])
def generate_model_id():
    data = request.json
    prompt = data.get('prompt')
    
    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400
    
    try:
        response = client.videos.generations(
            model="cogvideox",
            prompt=prompt
        )
        
        model_id = getattr(response, 'id', None)
        
        if model_id:
            return jsonify({"model_id": model_id}), 200
        else:
            return jsonify({"error": "Failed to generate model ID"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)




