import asyncio
import os
from pathlib import Path

from app.config import settings


def _ensure_credentials():
    creds_path = settings.google_application_credentials
    if not os.path.isabs(creds_path):
        creds_path = str(Path(__file__).resolve().parent.parent.parent / creds_path)
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = creds_path


async def extract_text_from_image(image_bytes: bytes) -> str:
    """Extract text from image using Google Cloud Vision OCR."""
    _ensure_credentials()

    def _run_ocr():
        from google.cloud import vision

        client = vision.ImageAnnotatorClient()
        image = vision.Image(content=image_bytes)
        response = client.text_detection(image=image)

        if response.error.message:
            raise Exception(f"Vision API error: {response.error.message}")

        if response.text_annotations:
            return response.text_annotations[0].description
        return ""

    return await asyncio.to_thread(_run_ocr)
