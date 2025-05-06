from flask import Flask, request, jsonify
import base64
from PIL import Image
import io
import torch
from torchvision import transforms

app = Flask(__name__)

# Cargar modelo
model = torch.load("modelo_efficientnet_skin_cancer.pth", map_location=torch.device('cpu'))
model.eval()

# Transformaciones
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# Clases
classes = ['akiec', 'bcc', 'bkl', 'df', 'mel', 'nv', 'vasc']

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

