import logging
from typing import Optional

import blurhash
import exifread
from celery import shared_task
from django.utils import timezone as tz
from exifread.utils import get_gps_coords

from .models import Photo

logger = logging.getLogger(__name__)


def _parse_tag(tag: str, tags: dict) -> Optional[str]:
    """This function will return None if the tag is not present in the exif data

    Args:
        tag: The tag to parse
        tags: The exif data extracted from the image
    """
    if tag in tags:
        return tags[tag].values
    return None


@shared_task()
def extract_exif(pid: int):
    """Extract EXIF data from a photo and save it to the database.

    Args:
        pid: The id of the photo object to extract EXIF data from
    """
    photo = Photo.objects.get(pk=pid)

    tags = exifread.process_file(photo.image)

    if "GPS GPSLatitude" in tags and "GPS GPSLongitude" in tags:
        coords = get_gps_coords(tags)

        photo.gps_lat = coords[0]
        photo.gps_lon = coords[1]

    if "EXIF DateTimeOriginal" in tags and tags["EXIF DateTimeOriginal"].values.strip():
        try:
            photo.date_taken = tz.make_aware(
                tz.datetime.strptime(
                    tags["EXIF DateTimeOriginal"].values, "%Y:%m:%d %H:%M:%S"
                )
            )
        except ValueError:  # pragma: no cover
            logger.warning(
                f'Unparsable datetime format "{tags["EXIF DateTimeOriginal"].values}" found in EXIF data for photo {photo.id}:'  # noqa: E501
            )

    photo.camera_make = _parse_tag("Image Make", tags)
    photo.camera_model = _parse_tag("Image Model", tags)
    photo.lens_make = _parse_tag("EXIF LensMake", tags)
    photo.lens_model = _parse_tag("EXIF LensModel", tags)

    photo.save()


@shared_task()
def generate_blurhash(pid: int):
    """Generate a blurhash for a photo and save it to the database.

    Args:
        pid: The id of the photo object to generate a blurhash for
    """
    photo = Photo.objects.get(pk=pid)
    photo.blurhash = blurhash.encode(photo.image, x_components=4, y_components=3)
    photo.save()


@shared_task()
def process_photo(pid: int):
    """Queue up tasks to process a photo.

    Args:
        pid: The id of the photo object to process
    """
    generate_blurhash.delay(pid)
    extract_exif.delay(pid)
