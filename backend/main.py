from flask import Flask, request, jsonify
import os
from werkzeug.utils import secure_filename
from model.predictor import run_model, get_recommendation

app = Flask(__name__)
UPLOAD_FOLDER = 'backend/static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file'}), 400

    file = request.files['image']
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    prediction = run_model(filepath)
    recommendation = get_recommendation(prediction)
    
    guardar_diagnostico_en_firebase({
        "usuario": "mariana",
        "archivo": filename,
        "diagnostico": prediction,
        "recomendacion": recommendation["recomendacion"],
        "es_maligno": recommendation["es_maligno"]
    })

    return jsonify({
        "prediccion": prediction,
        "recomendacion": recommendation
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
