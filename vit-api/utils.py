import torch
from torchvision import transforms
from PIL import Image

def cargar_modelo(ruta_modelo):
    modelo = torch.load(ruta_modelo, map_location=torch.device('cpu'))
    return modelo

def procesar_imagen(imagen: Image.Image):
    transformacion = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
    ])
    tensor = transformacion(imagen).unsqueeze(0)
    return tensor
