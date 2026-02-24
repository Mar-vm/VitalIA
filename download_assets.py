import os
from huggingface_hub import hf_hub_download

REPO_ID = os.environ["HF_REPO_ID"]          # ej: "tuusuario/skinai-model"
MODEL_FILENAME = os.environ.get("HF_MODEL_FILE", "skin_cancer_model.onnx")
META_FILENAME  = os.environ.get("HF_META_FILE",  "model_metadata.json")

os.makedirs("assets", exist_ok=True)

model_path = hf_hub_download(
    repo_id=REPO_ID,
    filename=MODEL_FILENAME,
    local_dir="assets",
    local_dir_use_symlinks=False,
)

meta_path = hf_hub_download(
    repo_id=REPO_ID,
    filename=META_FILENAME,
    local_dir="assets",
    local_dir_use_symlinks=False,
)

print("Downloaded:", model_path)
print("Downloaded:", meta_path)
