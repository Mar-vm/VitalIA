from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from torchvision import models, transforms
from PIL import Image
import torch
import io

app = FastAPI()

# ✅ Configuración CORS para pruebas (Expo Web, Postman, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ⚠️ SOLO para testing. Cambia en producción.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Cargar modelo MobileNet personalizado
model = models.mobilenet_v2(pretrained=False)
model.classifier[1] = torch.nn.Linear(1280, 7)
model.load_state_dict(torch.load("modelo_mobilenet_skin_cancer.pth", map_location=torch.device("cpu")))
model.eval()

# ✅ Clases dermatológicas detectables
classes = ['akiec', 'bcc', 'bkl', 'df', 'mel', 'nv', 'vasc']

# ✅ Transformaciones de entrada
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

@app.get("/")
def root():
    return {"message": "API de VitalIA (FastAPI) funcionando!"}

@app.post("/predecir/")
async def predecir(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        img_tensor = transform(image).unsqueeze(0)

        with torch.no_grad():
            output = model(img_tensor)
            probs = torch.nn.functional.softmax(output[0], dim=0)
            confidence, pred_idx = torch.max(probs, 0)

        return {
            "clase_predicha": classes[pred_idx.item()],
            "confianza": round(confidence.item(), 4)
        }

    except Exception as e:
        return {
            "error": "No se pudo procesar la imagen",
            "detalle": str(e)
        }
