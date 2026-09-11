from fastapi import FastAPI, UploadFile, File
from .modelo import cargar_modelo
from .utils import preprocesar_imagen
import torch

app = FastAPI()

clases = ['akiec', 'bcc', 'bkl', 'df', 'mel', 'nv', 'vasc']
modelo = cargar_modelo("assets/modelo_efficientnet_skin_cancer.pth")

@app.post("/predecir/")
async def predecir(file: UploadFile = File(...)):
    imagen_tensor = preprocesar_imagen(file.file)
    with torch.no_grad():
        salida = modelo(imagen_tensor)
        prediccion = torch.argmax(salida, dim=1).item()
    return {"clase_predicha": clases[prediccion]}
