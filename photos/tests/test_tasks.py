import unittest.mock as mock
from decimal import Decimal

from django.core.files.uploadedfile import SimpleUploadedFile
from django.db.models.signals import post_save
from django.dispatch import Signal
from django.test import TestCase
from django.utils import timezone as tz

from photos.models import Photo

from photos.signals import photo_post_save
from photos.tasks import _parse_tag, extract_exif, generate_blurhash


class TaskHelpersTestCase(TestCase):
    def test__parse_tag__present(self):
        m = mock.Mock()
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
        m = mock.Mock()
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
    def setUp(self):
        Signal.disconnect(post_save, receiver=photo_post_save, sender=Photo)

    def tearDown(self) -> None:
        Signal.connect(post_save, receiver=photo_post_save, sender=Photo)
        return super().tearDown()

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

        extract_exif(p.id)
        p.refresh_from_db()

        self.assertEqual(p.gps_lat, Decimal("43.467157"))
        self.assertEqual(p.gps_lon, Decimal("11.885395"))
        self.assertEqual(p.date_taken, tz.make_aware(tz.datetime(2008, 10, 22, 16, 29, 49)))
        self.assertEqual(p.camera_make, "NIKON")
        self.assertEqual(p.camera_model, "COOLPIX P6000")
        self.assertEqual(p.lens_make, "TEST LENS MAKE")
        self.assertEqual(p.lens_model, "TEST LENS MODEL")

    @mock.patch("photos.signals.photo_post_save")
    def test_generate_blurhash(self, mock_signal):
        with open("photos/fixtures/EXIF_Test.jpg", "rb") as f:
            p = Photo.objects.create(
                title="Test Photo",
                image=SimpleUploadedFile(
                    "test.jpg",
                    content=f.read(),
                    content_type="image/jpeg",
                ),
            )
        generate_blurhash(p.id)
        p.refresh_from_db()
        self.assertEqual(p.blurhash, "LOF5$~?cpJt7_N-=x^t7S%jbt6oz")
