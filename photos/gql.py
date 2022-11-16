# schema.py
import strawberry
from typing import List
from strawberry import auto
from strawberry.file_uploads import Upload

from . import models
from accounts.gql import User as UserType


@strawberry.django.type(models.Photo)
class Photo:
    id: auto
    title: auto
    image: auto
    blurhash: auto
    creator: UserType
    created_at: auto
    updated_at: auto

@strawberry.django.type(models.Album)
class Album:
    id: auto
    title: auto
    description: auto
    creator: UserType
    created_at: auto
    updated_at: auto

@strawberry.django.type(models.Tag)
class Tag:
    id: auto
    name: auto
    type: auto
    photos: List[Photo]
    created_at: auto
    updated_at: auto


@strawberry.type
class Query:
    photos: List[Photo] = strawberry.django.field()


@strawberry.type
class Mutation:
    @strawberry.mutation
    def upload_photo(self, info, title: str, image: Upload) -> Photo:
        photo = models.Photo.objects.create(
            title=title,
            image=image
        )
        return photo
