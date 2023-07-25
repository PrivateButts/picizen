from typing import Optional

import strawberry
import strawberry.django
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group as GroupModel
from strawberry import auto
from strawberry.django import auth

from accounts.models import MagicToken, AccessRule
from picizen.helpers import BaseModelTypeMixin


USER = get_user_model()


@strawberry.django.type(USER)
class User:
    id: auto
    username: auto


@strawberry.django.input(get_user_model())
class UserInput:
    username: auto
    password: auto


@strawberry.django.type(GroupModel)
class Group:
    id: auto
    name: auto


@strawberry.django.type(MagicToken)
class Token(BaseModelTypeMixin):
    id: auto
    token: auto


@strawberry.type
class PublicRule:
    """Dummy class to represent public access since GQL doesn't like mixing scalars and objects"""

    public: bool = True


@strawberry.django.type(AccessRule)
class Access(BaseModelTypeMixin):
    id: auto
    level: auto
    active: auto

    @strawberry.django.field
    def target(self) -> User | Group | Token | PublicRule | None:
        if self.target == "public":
            return PublicRule()
        return self.target


@strawberry.type
class AccessLevelDict:
    persons: list[Access]
    groups: list[Access]
    tokens: list[Access]
    public: list[Access]


@strawberry.type
class ShareableTypeMixin:
    access_rules: list[Access]

    @strawberry.django.field
    def is_public(self) -> bool:
        return self.is_public

    @strawberry.django.field
    def access_dict(self) -> AccessLevelDict:
        d = self.access_dict
        return AccessLevelDict(**d)


def get_share_autocomplete(input: str) -> list[User]:
    return USER.objects.filter(username__icontains=input)


@strawberry.type
class Query:
    me: Optional[User] = auth.current_user()

    shareAutocomplete: list[User] = strawberry.django.field(resolver=get_share_autocomplete)


@strawberry.type
class Mutation:
    login: Optional[User] = auth.login()
    logout = auth.logout()
    register: User = auth.register(UserInput)
