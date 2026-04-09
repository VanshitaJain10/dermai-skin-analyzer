from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import h5py
import io
import os

# Class names must match the alphabetically-sorted folder names used during training.
# Derived from sorted(os.listdir(data_dir)) in the Kaggle notebook.
CLASS_NAMES = [
    "Atopic Dermatitis",
    "Basal Cell Carcinoma (BCC)",
    "Benign Keratosis-like Lesions (BKL)",
    "Eczema",
    "Melanocytic Nevi",
    "Melanoma",
    "Psoriasis & Lichen Planus",
    "Seborrheic Keratoses & Benign Tumors",
    "Tinea (Ringworm)",
    "Warts, Molluscum & Viral Infections",
]

MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "skin_disease_model.h5")

app = FastAPI(title="DermAI Inference API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)


def _load_layer_weights(layer, h5group):
    """
    Recursively load weights from an h5py group into a Keras layer.
    Walks nested Functional/Sequential sub-models by layer name.
    """
    if hasattr(layer, "layers"):
        for sublayer in layer.layers:
            if sublayer.name in h5group:
                _load_layer_weights(sublayer, h5group[sublayer.name])
    else:
        layer_weights = layer.weights
        if not layer_weights:
            return
        values = []
        for w in layer_weights:
            if w.name in h5group:
                values.append(np.array(h5group[w.name]))
            else:
                return  # skip layer if any weight is missing
        layer.set_weights(values)


def build_and_load_model(h5_path: str, num_classes: int = 10) -> tf.keras.Model:
    """
    The saved H5 embeds Keras-3 custom layers (TrueDivide, Subtract) for
    preprocessing that cannot be deserialized by load_model(). Instead we:
      1. Rebuild the architecture without those layers (we preprocess in Python).
      2. Load weights from the H5 manually using h5py, matching by layer name.

    Original architecture stored in the H5:
      Input → Sequential(augmentation) → TrueDivide(/127.5) → Subtract(-1)
      → Xception → GAP → BatchNorm → Dense(256) → Dropout → Dense(10, softmax)

    Rebuilt inference architecture (preprocessing done in analyze()):
      Input(224,224,3) → Xception → GAP → BatchNorm → Dense(256) → Dropout → Dense(10)
    """
    from tensorflow.keras.applications import Xception
    from tensorflow.keras import Input, Model
    from tensorflow.keras.layers import BatchNormalization, Dense, Dropout, GlobalAveragePooling2D

    base = Xception(include_top=False, weights=None, input_shape=(224, 224, 3))
    inputs = Input(shape=(224, 224, 3))
    x = base(inputs, training=False)
    x = GlobalAveragePooling2D(name="global_average_pooling2d")(x)
    x = BatchNormalization(name="batch_normalization_4")(x)
    x = Dense(256, name="dense")(x)
    x = Dropout(0.5, name="dropout")(x)
    outputs = Dense(num_classes, activation="softmax", name="dense_1")(x)
    model = Model(inputs, outputs)

    with h5py.File(h5_path, "r") as f:
        mw = f["model_weights"]
        _load_layer_weights(base, mw["xception"])
        for layer_name in ["batch_normalization_4", "dense", "dense_1"]:
            _load_layer_weights(model.get_layer(layer_name), mw[layer_name][layer_name])

    return model


print(f"Loading model from {MODEL_PATH} ...")
model = build_and_load_model(MODEL_PATH)
print("Model loaded successfully.")


@app.get("/health")
def health():
    return {"status": "ok", "classes": len(CLASS_NAMES)}


@app.post("/analyze")
async def analyze(file: UploadFile):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image.")

    raw = await file.read()
    try:
        img = Image.open(io.BytesIO(raw)).convert("RGB").resize((224, 224))
    except Exception:
        raise HTTPException(status_code=400, detail="Could not decode image.")

    arr = np.array(img, dtype=np.float32)
    # Replicate the TrueDivide(/127.5) + Subtract(-1) layers that were in the original model.
    arr = tf.keras.applications.xception.preprocess_input(arr)

    probs = model.predict(arr[np.newaxis, ...], verbose=0)[0]
    idx = int(np.argmax(probs))
    prob_list = probs.tolist()

    top3 = sorted(
        [{"class": CLASS_NAMES[i], "probability": p} for i, p in enumerate(prob_list)],
        key=lambda x: -x["probability"],
    )[:3]

    return {
        "predicted_class": CLASS_NAMES[idx],
        "confidence": float(probs[idx]),
        "top3": top3,
    }
