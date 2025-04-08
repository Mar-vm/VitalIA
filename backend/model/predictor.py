
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import json
import os

# === Cargar clases desde archivo JSON ===
CLASSES_PATH = 'backend/model/clases.json'

with open(CLASSES_PATH, "r") as f:
    class_names = json.load(f)

# === Preparar modelo EfficientNet ===
model = models.efficientnet_b0(weights=None)
model.classifier[1] = nn.Linear(model.classifier[1].in_features, len(class_names))
MODEL_PATH = 'backend/model/efficientnet_b0_rwightman-7f5810bc.pth'
model.load_state_dict(torch.load(MODEL_PATH, map_location=torch.device('cpu')))
model.eval()

# === Transformaciones para la imagen ===
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225]),
])

# === Función para hacer la predicción ===
def run_model(image_path):
    image = Image.open(image_path).convert("RGB")
    input_tensor = transform(image).unsqueeze(0)
    with torch.no_grad():
        outputs = model(input_tensor)
        _, predicted = torch.max(outputs, 1)
    return class_names[predicted.item()]

# === Función para generar recomendación ===
def get_recommendation(predicted_class):
    recomendaciones = {
        "mel": "⚠️ Lesión MALIGNA. Consulta urgente con dermatología.",
        "bcc": "⚠️ Carcinoma Basocelular. Requiere atención médica.",
        "akiec": "⚠️ Queratosis actínica (precancerosa). Ir al dermatólogo.",
        "nv": "✅ Nevus benigno. Monitoreo ocasional.",
        "bkl": "✅ Lesión benigna. No requiere intervención.",
        "df": "✅ Dermatofibroma. Benigno, sin riesgo.",
        "vasc": "✅ Lesión vascular benigna.",
    }
    malignas = ['mel', 'bcc', 'akiec']
    es_maligno = predicted_class in malignas
    return {
        "diagnostico": predicted_class,
        "recomendacion": recomendaciones.get(predicted_class, "Consulta médica general."),
        "es_maligno": es_maligno
    }
