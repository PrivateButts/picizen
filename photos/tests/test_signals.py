import os
from unittest.mock import patch

from django.contrib.auth.models import User
from django.test import TestCase

from .factories import PhotoFactory


class PhotoSignalsTestCase(TestCase):
    def test_photo_post_delete(self):
        self.photo = PhotoFactory.create()
        path = self.photo.image.path
        self.photo.delete()
        self.assertFalse(os.path.exists(path))

    @patch("photos.tasks.process_photo.delay")
    def test_photo_post_save(self, mock_process_photo):
        user = User.objects.create_user(username="test", password="test")
        p = PhotoFactory.create(
            creator=user,
        )
        self.assertTrue(
            p.creator.has_perm("photos.view_photo", p), msg="Permissions not set"
        )
        mock_process_photo.assert_called()
