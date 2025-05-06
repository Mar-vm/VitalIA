from flask import Flask, request, jsonify
import base64
from PIL import Image
import io

app = Flask(__name__)

@app.route('/')
def home():
    return 'API de VitalIA funcionando!'

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    img_data = data.get('image')
    
    if not img_data:
        return jsonify({'error': 'No image provided'}), 400

    image = Image.open(io.BytesIO(base64.b64decode(img_data)))

    # Aquí va tu modelo real
    prediction = "melanoma"
    confidence = 0.94

    return jsonify({'diagnosis': prediction, 'confidence': confidence})
