from PIL import Image
from torchvision import transforms

def preprocesar_imagen(imagen_bytes):
    transformacion = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406],
                             [0.229, 0.224, 0.225])
    ])
    imagen = Image.open(imagen_bytes).convert("RGB")
    return transformacion(imagen).unsqueeze(0)
