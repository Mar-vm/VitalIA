from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import torch
import io
from utils import procesar_imagen, cargar_modelo

app = FastAPI()

# CORS (para que tu app Expo pueda conectarse)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Carga del modelo
modelo = cargar_modelo("modelo_efficientnet.pth")
modelo.eval()

@app.post("/predecir/")
async def predecir(file: UploadFile = File(...)):
    contenido = await file.read()
    imagen = Image.open(io.BytesIO(contenido)).convert("RGB")
    
    tensor = procesar_imagen(imagen)
    with torch.no_grad():
        salida = modelo(tensor)
        pred_clase = torch.argmax(salida, dim=1).item()
        confianza = torch.softmax(salida, dim=1).max().item()

    return {"clase": pred_clase, "confianza": round(confianza, 4)}
