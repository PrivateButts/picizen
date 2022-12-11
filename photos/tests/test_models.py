from io import BytesIO

from django.contrib.auth.models import User

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase

from photos.models import Album, Photo, Tag
from PIL import Image


class PhotoModelTestCase(TestCase):
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


class AlbumModelTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="test", password="test")
        self.album = Album.objects.create(title="Test Album", creator=self.user)

    def test__str__(self):
        self.assertEqual(str(self.album), "Test Album")


class TagModelTestCase(TestCase):
    def setUp(self):
        self.tag = Tag.objects.create(name="Test Tag")

    def test__str__(self):
        self.assertEqual(str(self.tag), "Test Tag")
