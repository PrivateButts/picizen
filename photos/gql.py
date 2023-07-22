# schema.py
from typing import List, Optional

import strawberry
import strawberry.django
from accounts.gql import ShareableTypeMixin, User as UserType

from picizen.helpers import IsAuthenticated
from strawberry import auto, ID
from strawberry.file_uploads import Upload

from . import models


@strawberry.django.type(models.Photo)
class Photo(ShareableTypeMixin):
    id: ID
    title: auto
    image: auto
    blurhash: auto
    creator: UserType
    created_at: auto
    updated_at: auto
    aspect_ratio: float
    image_url: str

    date_taken: auto
    gps_lat: auto
    gps_lon: auto
    camera_make: auto
    camera_model: auto
    lens_make: auto
    lens_model: auto


@strawberry.type
class PhotoDateGroup:
    year_month: str
    total_photos: int
    photos: List[Photo]


def get_photo_date_groups() -> List[PhotoDateGroup]:
    groups = []
    photos = models.Photo.objects.all()

    # get unknown count
    unknowns = photos.filter(date_taken__isnull=True)
    groups.append(
        PhotoDateGroup(year_month="Unknown", total_photos=unknowns.count(), photos=unknowns)
    )

    # get known count
    for dtRange in photos.datetimes("date_taken", kind="month", order="DESC"):
        p = photos.filter(date_taken__year=dtRange.year, date_taken__month=dtRange.month)
        groups.append(
            PhotoDateGroup(year_month=dtRange.strftime("%Y-%m"), total_photos=p.count(), photos=p)
        )
    return groups


@strawberry.django.type(models.Album)
class Album(ShareableTypeMixin):
    id: ID
    title: auto
    description: auto
    creator: UserType
    created_at: auto
    updated_at: auto
    photos: List[Photo]
    photo_count: int

    @strawberry.django.field
    def cover_photo(self) -> Optional[Photo]:
        return self.cover_photo


@strawberry.django.type(models.Tag)
class Tag:
    id: ID
    name: auto
    type: auto
    photos: List[Photo]
    created_at: auto
    updated_at: auto


@strawberry.type
class Query:
    photo: Photo = strawberry.django.field()
    photos: List[Photo] = strawberry.django.field(pagination=True)

    photoDateGroups: List[PhotoDateGroup] = strawberry.django.field(resolver=get_photo_date_groups)

    album: Album = strawberry.django.field()
    albums: List[Album] = strawberry.django.field(pagination=True)


@strawberry.type
class Mutation:
    @strawberry.mutation(permission_classes=[IsAuthenticated])
    def upload_photo(self, info, title: str, image: Upload) -> Photo:
        photo = models.Photo.objects.create(
            title=title, image=image, creator=info.context.request.user
        )
        return photo

    @strawberry.mutation(permission_classes=[IsAuthenticated])
    def update_photo(self, info, id: ID, title: str) -> Photo:
        photo = models.Photo.objects.get(id=id)
        photo.title = title
        photo.save()
        return photo
