import asyncio
import uuid

import boto3
import httpx

from app.config import settings


def _get_s3_client():
    return boto3.client(
        "s3",
        aws_access_key_id=settings.aws_access_key_id,
        aws_secret_access_key=settings.aws_secret_access_key,
        region_name=settings.aws_region,
    )


CONTENT_TYPE_TO_EXT = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/webp": "webp",
    "image/tiff": "tiff",
}


async def download_and_store_image(
    media_url: str, restaurant_id: int
) -> tuple[str, bytes]:
    """Download image from Twilio and upload to S3. Returns (s3_url, image_bytes)."""
    # Download from Twilio (requires auth)
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            media_url,
            auth=(settings.twilio_account_sid, settings.twilio_auth_token),
            follow_redirects=True,
        )
        resp.raise_for_status()
        image_bytes = resp.content
        content_type = resp.headers.get("content-type", "image/jpeg")

    ext = CONTENT_TYPE_TO_EXT.get(content_type.split(";")[0].strip(), "jpg")
    key = f"invoices/{restaurant_id}/{uuid.uuid4()}.{ext}"

    # Upload to S3 (sync boto3, wrapped in thread)
    def _upload():
        s3 = _get_s3_client()
        s3.put_object(
            Bucket=settings.s3_bucket_name,
            Key=key,
            Body=image_bytes,
            ContentType=content_type,
        )

    await asyncio.to_thread(_upload)

    s3_url = f"https://{settings.s3_bucket_name}.s3.{settings.aws_region}.amazonaws.com/{key}"
    return s3_url, image_bytes
