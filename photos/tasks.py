import logging
from typing import Optional

import blurhash, exifread
from django.utils import timezone as tz
from exifread.utils import get_gps_coords
from huey.contrib.djhuey import db_task, task


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


@db_task()
def extract_exif(photo):
    """Extract EXIF data from a photo and save it to the database.

    Args:
        photo: The photo object to extract EXIF data from
    """
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
        except ValueError as e:  # pragma: no cover
            logger.warning(
                f'Unparsable datetime format "{tags["EXIF DateTimeOriginal"].values}" found in EXIF data for photo {photo.id}:'
            )

    photo.camera_make = _parse_tag("Image Make", tags)
    photo.camera_model = _parse_tag("Image Model", tags)
    photo.lens_make = _parse_tag("EXIF LensMake", tags)
    photo.lens_model = _parse_tag("EXIF LensModel", tags)

    photo.save()


@db_task()
def generate_blurhash(photo):
    """Generate a blurhash for a photo and save it to the database.

    Args:
        photo: The photo object to generate a blurhash for
    """
    photo.blurhash = blurhash.encode(photo.image, x_components=4, y_components=3)
    photo.save()


@task()
def process_photo(photo):
    """Queue up tasks to process a photo.

    Args:
        photo: The photo object to process
    """
    generate_blurhash(photo)
    extract_exif(photo)
