from flask import Flask, request, jsonify
import google.generativeai as genai
from langdetect import detect
from flask_cors import CORS  # To allow requests from Node.js

app = Flask(__name__)
CORS(app)  # Enable CORS

# Configure Gemini API
API_KEY = "AIzaSyA_Eq7-pg7pgl0jxEPl_asc4NT6WaXrcpk"  # Replace with your Gemini API key
genai.configure(api_key=API_KEY)

# Initialize Gemini model
model = genai.GenerativeModel('gemini-pro')

# Function to detect language
def detect_language(text):
    try:
        return detect(text)
    except:
        return "en"  # Default to English if detection fails

# Function to generate response
def generate_response(prompt, language):
    prompt_with_language = f"Respond in {language}: {prompt}"
    response = model.generate_content(prompt_with_language)
    return response.text

# Flask API Route for Chatbot
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_input = data.get("message", "")

    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    language = detect_language(user_input)
    response = generate_response(user_input, language)

    return jsonify({"language": language, "response": response})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
