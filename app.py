from flask import Flask, request, jsonify
import base64
from PIL import Image
import io
import torch
from torchvision import transforms, models
import os  # <-- Importante para obtener el puerto asignado por Render

app = Flask(__name__)

# Reconstruir arquitectura del modelo (EfficientNet B0)
model = models.efficientnet_b0(pretrained=False)

# Ajustar la última capa (para 7 clases)
model.classifier[1] = torch.nn.Linear(in_features=1280, out_features=7)

# Cargar los pesos (state_dict)
state_dict = torch.load("modelo_efficientnet_skin_cancer.pth", map_location=torch.device('cpu'))
model.load_state_dict(state_dict)
model.eval()

# Transformaciones para la imagen
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# Clases del modelo
classes = ['akiec', 'bcc', 'bkl', 'df', 'mel', 'nv', 'vasc']

@app.route('/')
def home():
    return 'API de VitalIA funcionando!'

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        img_data = data.get('image')
        
        if not img_data:
            return jsonify({'error': 'No image provided'}), 400

        image = Image.open(io.BytesIO(base64.b64decode(img_data)))

        # Preprocesar imagen
        img_tensor = transform(image).unsqueeze(0)

        with torch.no_grad():
            outputs = model(img_tensor)
            probs = torch.nn.functional.softmax(outputs[0], dim=0)
            confidence, predicted_idx = torch.max(probs, 0)

        diagnosis = classes[predicted_idx.item()]

        return jsonify({
            'diagnosis': diagnosis,
            'confidence': round(confidence.item(), 4)
        })
    
    except Exception as e:
        print(f'Error en /predict: {e}')
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

# ⬇️ Agrega este bloque para que Flask funcione en Render
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
