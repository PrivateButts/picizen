import strawberry
from strawberry import auto
from strawberry.django import auth
from django.contrib.auth import get_user_model
from typing import Optional


USER = get_user_model()


@strawberry.django.type(USER)
class User:
    id: auto
    username: auto


@strawberry.django.input(get_user_model())
class UserInput:
    username: auto
    password: auto


@strawberry.type
class Query:
    me: Optional[User] = auth.current_user()


@strawberry.type
class Mutation:
    login: Optional[User] = auth.login()
    logout = auth.logout()
    register: User = auth.register(UserInput)
