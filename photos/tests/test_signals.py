from django.test import TestCase
from io import BytesIO
from PIL import Image
from django.core.files.uploadedfile import SimpleUploadedFile

from photos.models import Photo


class PhotoSignalsTestCase(TestCase):
    def test_photo_post_delete(self):
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

    def test_photo_post_save(self):
        pass