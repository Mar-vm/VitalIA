"""
inference.py — Módulo de inferencia para detección de enfermedades de piel
Autor: generado para proyecto SkinAI
Uso: from inference import SkinPredictor
"""
import numpy as np
import onnxruntime as ort
import cv2
import json


class SkinPredictor:
    def __init__(self, model_path: str, metadata_path: str):
        """
        Args:
            model_path:    ruta al archivo skin_cancer_model.onnx
            metadata_path: ruta al model_metadata.json
        """
        self.session = ort.InferenceSession(
            model_path,
            providers=['CUDAExecutionProvider', 'CPUExecutionProvider']
        )
        with open(metadata_path, encoding='utf-8') as f:
            self.meta = json.load(f)

        self.classes  = self.meta['classes']
        self.names    = self.meta['class_names']
        self.risk     = self.meta['risk_levels']
        self.img_size = self.meta['input_size']
        self.mean     = np.array(self.meta['preprocessing']['normalize_mean'])
        self.std      = np.array(self.meta['preprocessing']['normalize_std'])

    def preprocess(self, image_bytes: bytes) -> np.ndarray:
        """Preprocesa imagen desde bytes (lo que llega del API)"""
        nparr = np.frombuffer(image_bytes, np.uint8)
        img   = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if img is None:
            raise ValueError("No se pudo decodificar la imagen. Verifica el formato.")
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img = cv2.resize(img, (self.img_size, self.img_size))
        img = img.astype(np.float32) / 255.0
        img = (img - self.mean) / self.std
        img = np.transpose(img, (2, 0, 1))   # HWC → CHW
        img = np.expand_dims(img, 0)          # añadir batch dim
        return img.astype(np.float32)

    def predict(self, image_bytes: bytes) -> dict:
        """
        Recibe bytes de imagen, retorna dict listo para JSON.

        Retorna:
        {
            "prediction": "mel",
            "disease_name": "Melanoma",
            "confidence": 87.34,
            "risk_level": "ALTO - Maligno",
            "top3": [...],
            "disclaimer": "..."
        }
        """
        input_tensor = self.preprocess(image_bytes)
        logits = self.session.run(None, {'image': input_tensor})[0][0]
        probs  = self._softmax(logits)

        top_idx = int(np.argmax(probs))
        top_cls = self.classes[top_idx]
        top3_idx = np.argsort(probs)[::-1][:3]

        return {
            'prediction':   top_cls,
            'disease_name': self.names[top_cls],
            'confidence':   float(round(probs[top_idx] * 100, 2)),
            'risk_level':   self.risk[top_cls],
            'top3': [
                {
                    'class':       self.classes[i],
                    'disease':     self.names[self.classes[i]],
                    'probability': float(round(probs[i] * 100, 2))
                }
                for i in top3_idx
            ],
            'disclaimer': self.meta['disclaimer']
        }

    @staticmethod
    def _softmax(x: np.ndarray) -> np.ndarray:
        e_x = np.exp(x - np.max(x))
        return e_x / e_x.sum()
