"""
main.py — API REST para detección de enfermedades de piel
Stack: FastAPI + ONNX Runtime + Supabase
"""
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from inference import SkinPredictor
import os

# ─── Configuración ────────────────────────────────────────────────────────────
MODEL_PATH = os.getenv("MODEL_PATH", "skin_cancer_model.onnx")
METADATA_PATH = os.getenv("METADATA_PATH", "model_metadata.json")

predictor: SkinPredictor = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Carga el modelo una sola vez al arrancar el servidor
    global predictor
    print("Cargando modelo...")
    predictor = SkinPredictor(MODEL_PATH, METADATA_PATH)
    print("✅ Modelo listo")
    yield
    print("Servidor apagado")


app = FastAPI(
    title="SkinAI API",
    description="API para detección de enfermedades de piel con IA",
    version="1.0.0",
    lifespan=lifespan,
)

# ─── CORS ─────────────────────────────────────────────────────────────────────
# Objetivo: que Expo Web / navegadores SIEMPRE puedan hacer preflight (OPTIONS)
# sin que tengas que adivinar el puerto/origen.
#
# Modo:
# - Si defines ALLOWED_ORIGINS_REGEX -> se usa regex (recomendado para DEV).
# - Si defines ALLOWED_ORIGINS -> lista separada por comas.
# - Si no defines nada -> fallback a localhost comunes.
#
# En producción, fija ALLOWED_ORIGINS con tus dominios reales.
origins_regex = os.getenv("ALLOWED_ORIGINS_REGEX", "").strip()
_allowed_origins_env = os.getenv("ALLOWED_ORIGINS", "")
origins = [o.strip() for o in _allowed_origins_env.split(",") if o.strip()]

if not origins and not origins_regex:
    origins = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:8081",
        "http://localhost:19006",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:8081",
        "http://127.0.0.1:19006",
    ]

cors_kwargs = dict(
    allow_credentials=True,
    allow_methods=["*"],  # incluye OPTIONS (preflight)
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=86400,
)

if origins_regex:
    # Ejemplo DEV:
    # ALLOWED_ORIGINS_REGEX="https?://.*"
    app.add_middleware(
        CORSMiddleware,
        allow_origin_regex=origins_regex,
        **cors_kwargs,
    )
else:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,  # No uses "*" si allow_credentials=True
        **cors_kwargs,
    )

# ─── Endpoints ────────────────────────────────────────────────────────────────


@app.get("/")
def root():
    return {"status": "ok", "message": "SkinAI API corriendo"}


@app.get("/health")
def health():
    return {"status": "ok", "model_loaded": predictor is not None}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Recibe una imagen y retorna el diagnóstico.

    - Formatos aceptados: jpg, jpeg, png, webp
    - Tamaño máximo recomendado: 10MB
    """
    allowed = {"image/jpeg", "image/jpg", "image/png", "image/webp"}
    if file.content_type not in allowed:
        raise HTTPException(
            status_code=400,
            detail=f"Formato no soportado: {file.content_type}. Usa jpg, png o webp.",
        )

    image_bytes = await file.read()
    if len(image_bytes) == 0:
        raise HTTPException(status_code=400, detail="Imagen vacía")

    try:
        result = predictor.predict(image_bytes)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en el modelo: {str(e)}")

    return result


@app.get("/classes")
def get_classes():
    """Retorna las clases que puede detectar el modelo"""
    if predictor is None:
        raise HTTPException(status_code=503, detail="Modelo no cargado")
    return {
        "classes": predictor.classes,
        "class_names": predictor.names,
        "risk_levels": predictor.risk,
    }
