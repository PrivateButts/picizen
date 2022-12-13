from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse

from photos.tests.factories import PhotoFactory


class ServePhotoTestCase(TestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username="test1", password="test")
        self.user2 = User.objects.create_user(username="test2", password="test")
        self.photo = PhotoFactory.create(creator=self.user2)

    def test_serve_photo(self):
        response = self.client.get(reverse("serve_photo", args=[self.photo.id]))
        self.assertEqual(
            response.status_code,
            403,
            msg="By default, photos should not be served to anonymous users",
        )
        self.client.force_login(self.user1)
        response = self.client.get(reverse("serve_photo", args=[self.photo.id]))
        self.assertEqual(
            response.status_code,
            403,
            msg="Photos should not be served to unauthorized users",
        )
        self.client.force_login(self.user2)
        response = self.client.get(reverse("serve_photo", args=[self.photo.id]))
        self.assertEqual(
            response.status_code,
            200,
            msg="Photos should be served to authorized users",
        )
