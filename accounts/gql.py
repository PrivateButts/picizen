import strawberry
from strawberry import auto
from django.contrib.auth import get_user_model


USER = get_user_model()

@strawberry.django.type(USER)
class User:
    id: auto