# DermAI — Skin Disease Analyzer

A local demo that uses a fine-tuned **Xception** model to classify skin lesion images across 10 dermatological categories. The React frontend runs on `localhost:3000` and calls a FastAPI backend on `localhost:8000` for real-time inference.

## Supported Conditions

| # | Condition |
|---|-----------|
| 1 | Atopic Dermatitis |
| 2 | Basal Cell Carcinoma (BCC) |
| 3 | Benign Keratosis-like Lesions (BKL) |
| 4 | Eczema |
| 5 | Melanocytic Nevi |
| 6 | Melanoma |
| 7 | Psoriasis & Lichen Planus |
| 8 | Seborrheic Keratoses & Benign Tumors |
| 9 | Tinea (Ringworm) |
| 10 | Warts, Molluscum & Viral Infections |

---

## Prerequisites

| Tool | Version |
|------|---------|
| Python | 3.9+ |
| Node.js | 18+ |
| pnpm | 8+ |

> **Note:** `pnpm` can be installed via `npm install -g pnpm`.

---

## Project Structure

```
dermai-skin-analyzer/
├── backend/
│   ├── main.py              # FastAPI inference server
│   ├── requirements.txt     # Python dependencies (pinned)
│   └── venv/                # Python virtual environment (created below)
├── src/
│   ├── components/
│   │   ├── UploadSection.tsx   # Image upload + analysis UI
│   │   └── ...
│   └── pages/
│       └── Index.tsx
├── skin_disease_model.h5    # Trained Xception model weights
├── package.json
└── README.md
```

---

## Setup

### 1. Clone and install frontend dependencies

```bash
pnpm install
```

### 2. Set up the Python backend

```bash
cd backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate        # macOS / Linux
# venv\Scripts\activate         # Windows

# Install dependencies from PyPI
pip install -r requirements.txt --index-url https://pypi.org/simple/
```

> **Corporate network / internal PyPI issue?**
> If your environment defaults to an internal registry that blocks public packages,
> always pass `--index-url https://pypi.org/simple/` to force PyPI.

---

## Running the App

Open **two terminals** from the project root.

### Terminal 1 — Python inference API

```bash
cd backend
source venv/bin/activate        # macOS / Linux
# venv\Scripts\activate         # Windows

uvicorn main:app --port 8000
```

You should see:

```
Loading model from .../skin_disease_model.h5 ...
Model loaded successfully.
INFO:     Uvicorn running on http://127.0.0.1:8000
```

Verify with: `curl http://localhost:8000/health`
Expected: `{"status":"ok","classes":10}`

### Terminal 2 — React frontend

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## How It Works

```
Browser (localhost:3000)
  │  Upload image → click "Analyze with AI"
  │
  ▼
POST http://localhost:8000/analyze
  multipart/form-data  { file: <image> }
  │
  ▼
FastAPI (main.py)
  1. Decode image with Pillow → resize to 224×224
  2. Apply Xception preprocess_input (scales to [-1, 1])
  3. Run model.predict()
  ▼
Xception (fine-tuned, 10-class softmax)
  ▼
JSON response
  {
    "predicted_class": "Eczema",
    "confidence": 0.58,
    "top3": [...]
  }
  │
  ▼
React UI renders predicted class, confidence bar, top-3 breakdown
```

### Why not `tf.keras.models.load_model()`?

The `.h5` file was saved with Keras 3.10 and contains a `TrueDivide` preprocessing layer embedded inside the Xception graph. Keras 3.10 cannot deserialize this layer from the saved config (a round-trip bug). The backend works around this by:
- Rebuilding the model architecture from code (matching what was trained)
- Loading weights from the H5 file manually via `h5py`, matching by layer name
- Applying the equivalent preprocessing (`preprocess_input`) in Python before inference

---

## API Reference

### `GET /health`

```json
{ "status": "ok", "classes": 10 }
```

### `POST /analyze`

**Request:** `multipart/form-data` with field `file` (JPEG / PNG / WEBP image)

**Response:**

```json
{
  "predicted_class": "Eczema",
  "confidence": 0.58,
  "top3": [
    { "class": "Eczema", "probability": 0.58 },
    { "class": "Warts, Molluscum & Viral Infections", "probability": 0.11 },
    { "class": "Basal Cell Carcinoma (BCC)", "probability": 0.10 }
  ]
}
```

---

## Disclaimer

DermAI is intended for **educational and demo purposes only**. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified dermatologist or healthcare provider for medical concerns.
