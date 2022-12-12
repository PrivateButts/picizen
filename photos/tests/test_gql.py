from django.contrib.auth.models import User
from django.test import TestCase
from gql import gql

from picizen.helpers import GraphQLTestCase

from photos.gql import get_photo_date_groups, get_photos_by_date_group
from photos.models import Photo

from .factories import PhotoFactory


class PhotoQueryTestCase(TestCase):
    def setUp(self):
        self.photos = [PhotoFactory.create(title=f"Test Photo {x}") for x in range(6)]
        # Set the date_taken for the first 3 photos
        for p in self.photos[:3]:
            p.date_taken = "2020-01-01"
            p.save()

        # Set the date_taken to a different date for the next 2 photos
        for p in self.photos[3:5]:
            p.date_taken = "2020-02-01"
            p.save()

        # Set the date_taken to None for the last photo
        self.photos[5].date_taken = None
        self.photos[5].save()

    def test_get_photo_date_groups(self):
        groups = get_photo_date_groups()
        # There should be 3 groups: 2020-01, 2020-02, and Unknown
        self.assertEqual(len(groups), 3)
        self.assertEqual(
            next(filter(lambda pdg: pdg.year_month == "Unknown", groups)).total_photos,
            1,
        )
        self.assertEqual(
            next(filter(lambda pdg: pdg.year_month == "2020-01", groups)).total_photos,
            3,
        )
        self.assertEqual(
            next(filter(lambda pdg: pdg.year_month == "2020-02", groups)).total_photos,
            2,
        )

    def test_get_photos_by_date_group(self):
        self.assertEqual(len(get_photos_by_date_group("2020-01")), 3)
        self.assertEqual(len(get_photos_by_date_group("Unknown")), 1)


class PhotoMutationTestCase(GraphQLTestCase):
    def setUp(self):
        super().setUp()
        self.user = User.objects.create_user(username="test", password="test")
        self.photo = PhotoFactory.create()

    def test_upload_photo(self):
        self.login(username="test", password="test")
        with open("photos/fixtures/EXIF_Test.jpg", mode="rb") as f:
            data = self.execute(
                """
                    mutation ($image: Upload!, $title: String!) {
                        uploadPhoto(image: $image, title: $title) {
                            id
                            title
                        }
                    }
                """,
                variables={"image": None, "title": "New Title"},
                map={"0": ["variables.image"]},
                files={"0": f},
            )
        self.assertDictEqual(
            data,
            {
                "data": {
                    "uploadPhoto": {
                        "id": str(Photo.objects.last().id),
                        "title": "New Title",
                    }
                }
            },
        )

    def test_update_photo(self):
        self.login(username="test", password="test")
        data = self.execute(
            """
                mutation ($id: ID!, $title: String!) {
                    updatePhoto(id: $id, title: $title) {
                        id
                        title
                    }
                }
            """,
            variables={"id": self.photo.id, "title": "New Updated Title"},
        )
        self.assertDictEqual(
            data,
            {
                "data": {
                    "updatePhoto": {
                        "id": str(self.photo.id),
                        "title": "New Updated Title",
                    }
                }
            },
        )
