import os

from django.contrib.auth.models import User
from django.test import TestCase

from .factories import PhotoFactory


class PhotoSignalsTestCase(TestCase):
    def test_photo_post_delete(self):
        self.photo = PhotoFactory.create()
        path = self.photo.image.path
        self.photo.delete()
        self.assertFalse(os.path.exists(path))

    def test_photo_post_save(self):
        user = User.objects.create_user(username="test", password="test")
        p = PhotoFactory.create(
            creator=user,
        )
        p.refresh_from_db()
        self.assertIsNotNone(p.blurhash)
        self.assertIsNotNone(p.date_taken)
        self.assertTrue(p.creator.has_perm("photos.view_photo", p))
