import logging
from typing import Optional
import blurhash, exifread
from huey.contrib.djhuey import db_task, task
from django.utils import timezone as tz


logger = logging.getLogger(__name__)


# stolen from https://gist.github.com/snakeye/fdc372dbf11370fe29eb 
def _convert_to_degress(value):
    """
    Helper function to convert the GPS coordinates stored in the EXIF to degress in float format
    :param value:
    :type value: exifread.utils.Ratio
    :rtype: float
    """
    d = float(value.values[0].num) / float(value.values[0].den)
    m = float(value.values[1].num) / float(value.values[1].den)
    s = float(value.values[2].num) / float(value.values[2].den)

    return d + (m / 60.0) + (s / 3600.0)


def _parse_tag(tag: str, tags: dict) -> Optional[str]:
    """Convenience function to parse a tag from the exif data safely"""
    if tag in tags:
        return tags[tag].values
    return None


@db_task()
def extract_exif(photo):
    tags = exifread.process_file(photo.image)

    if 'GPS GPSLatitude' in tags and 'GPS GPSLongitude' in tags:
        lat = _convert_to_degress(tags['GPS GPSLatitude'])
        lon = _convert_to_degress(tags['GPS GPSLongitude'])

        if tags['GPS GPSLatitudeRef'].values != 'N':
            lat = 0 - lat

        if tags['GPS GPSLongitudeRef'].values != 'E':
            lon = 0 - lon

        photo.gps_lat = lat
        photo.gps_lon = lon
    
    if 'EXIF DateTimeOriginal' in tags and tags['EXIF DateTimeOriginal'].values.strip():
        try:
            photo.date_taken = tz.make_aware(tz.datetime.strptime(tags['EXIF DateTimeOriginal'].values, '%Y:%m:%d %H:%M:%S'))
        except ValueError as e:
            logger.warning(f'Unparsable datetime format "{tags["EXIF DateTimeOriginal"].values}" found in EXIF data for photo {photo.id}:')
    
    photo.camera_make = _parse_tag('Image Make')
    photo.camera_model = _parse_tag('Image Model')
    photo.lens_make = _parse_tag('EXIF LensMake')
    photo.lens_model = _parse_tag('EXIF LensModel')

    photo.save()


@db_task()
def generate_blurhash(photo):
    photo.blurhash = blurhash.encode(photo.image, x_components=4, y_components=3)
    photo.save()


@task()
def process_photo(photo):
    generate_blurhash(photo)
    extract_exif(photo)
