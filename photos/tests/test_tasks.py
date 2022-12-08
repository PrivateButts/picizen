from io import BytesIO
from PIL import Image
from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile

from photos.models import Photo


class PhotoTasksTestCase(TestCase):
    def setUp(self):
        testImg = Image.new("RGB", (1000, 500))
        testImgIO = BytesIO()
        testImg.save(testImgIO, "JPEG")
        testImgIO.seek(0)

        self.photo = Photo.objects.create(
            title="Test Photo",
            image=SimpleUploadedFile(
                name="test.jpg", content=testImgIO.read(), content_type="image/jpeg"
            ),
        )

    def test__str__(self):
        self.assertEqual(str(self.photo), "Test Photo")

    def test_aspect_ratio(self):
        self.assertEqual(self.photo.aspect_ratio, 2.0)

    def test_image_url(self):
        self.assertEqual(self.photo.image_url, "/photo/serve/1/")
