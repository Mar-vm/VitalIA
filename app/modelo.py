import torch
from torchvision import models
import torch.nn as nn

NUM_CLASES = 7  # Ajusta según tu modelo

def cargar_modelo(ruta_peso: str):
    modelo = models.efficientnet_b0(pretrained=False)
    modelo.classifier[1] = nn.Linear(modelo.classifier[1].in_features, NUM_CLASES)
    modelo.load_state_dict(torch.load(ruta_peso, map_location=torch.device('cpu')))
    modelo.eval()
    return modelo
