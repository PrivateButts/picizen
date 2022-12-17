from unittest.mock import patch

from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import Signal

from django.test import TestCase

from photos.management.commands import fix_permissions, reprocess_photos

from photos.models import Photo
from photos.signals import photo_post_save

from .factories import PhotoFactory


class FixPermissionsTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="test", password="test")
        Signal.disconnect(post_save, receiver=photo_post_save, sender=Photo)
        self.photos = PhotoFactory.create_batch(3, creator=self.user)

    def tearDown(self) -> None:
        Signal.connect(post_save, receiver=photo_post_save, sender=Photo)
        return super().tearDown()

    def test_fix_permissions(self):
        self.assertTrue(
            all(
                [
                    not self.user.has_perm("photos.view_photo", photo)
                    for photo in self.photos
                ]
            )
        )
        fix_permissions.Command().handle()
        self.assertTrue(
            all(
                [
                    self.user.has_perm("photos.view_photo", photo)
                    for photo in self.photos
                ]
            )
        )


def setBlurhash(pid):
    photo = Photo.objects.get(pk=pid)
    photo.blurhash = "test"
    photo.save()


class ReprocessPhotosTestCase(TestCase):
    def setUp(self):
        Signal.disconnect(post_save, receiver=photo_post_save, sender=Photo)
        self.photos = PhotoFactory.create_batch(3)

    def tearDown(self) -> None:
        Signal.connect(post_save, receiver=photo_post_save, sender=Photo)
        return super().tearDown()

    @patch(
        "photos.management.commands.reprocess_photos.process_photo.delay",
        new=setBlurhash,
    )
    def test_reprocess_photos(self, *args, **kwargs):
        self.assertTrue(all([not photo.blurhash for photo in self.photos]))
        reprocess_photos.Command().handle()
        [photo.refresh_from_db() for photo in self.photos]
        self.assertTrue(all([photo.blurhash for photo in self.photos]))
