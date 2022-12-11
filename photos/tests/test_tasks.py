from decimal import Decimal
from io import BytesIO
from PIL import Image
from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
import exifread
from exifread.utils import Ratio
from unittest.mock import Mock
from django.utils import timezone as tz

from photos.models import Photo
from photos.tasks import (
    _parse_tag,
    extract_exif,
    generate_blurhash,
    process_photo,
)


class TaskHelpersTestCase(TestCase):
    def test__parse_tag__present(self):
        m = Mock()
        m.values = "Test Value"

        tags = {
            "Test Tag": m,
        }

        self.assertEqual(
            _parse_tag(
                "Test Tag",
                tags,
            ),
            "Test Value",
        )

    def test__parse_tag__missing(self):
        m = Mock()
        m.values = "Test Value"

        tags = {
            "Test Tag": m,
        }

        self.assertIsNone(
            _parse_tag(
                "Test Fake Tag",
                tags,
            )
        )


class PhotoTasksTestCase(TestCase):
    def test_extract_exif(self):
        with open("photos/fixtures/EXIF_Test.jpg", "rb") as f:
            p = Photo.objects.create(
                title="Test Photo",
                image=SimpleUploadedFile(
                    "test.jpg",
                    content=f.read(),
                    content_type="image/jpeg",
                ),
            )

        extract_exif(p)
        p.refresh_from_db()

        self.assertEqual(p.gps_lat, Decimal("43.467157"))
        self.assertEqual(p.gps_lon, Decimal("11.885395"))
        self.assertEqual(
            p.date_taken, tz.make_aware(tz.datetime(2008, 10, 22, 16, 29, 49))
        )
        self.assertEqual(p.camera_make, "NIKON")
        self.assertEqual(p.camera_model, "COOLPIX P6000")
        self.assertEqual(p.lens_make, "TEST LENS MAKE")
        self.assertEqual(p.lens_model, "TEST LENS MODEL")
