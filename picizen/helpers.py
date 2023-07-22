import json
import typing

import requests

from django.db import models
from django.test import LiveServerTestCase, override_settings

from strawberry.permission import BasePermission
from strawberry.types import Info
import strawberry
import strawberry.django


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


@strawberry.django.type(BaseModel)
class BaseModelTypeMixin:
    created_at: strawberry.auto
    updated_at: strawberry.auto


class IsAuthenticated(BasePermission):
    message = "User is not authenticated"

    def has_permission(self, source: typing.Any, info: Info, **kwargs) -> bool:
        return info.context.request.user.is_authenticated


@override_settings(DEBUG=True)
class GraphQLTestCase(LiveServerTestCase):
    ENDPOINT = "/graphql/"

    @property
    def _url(self) -> str:
        return self.live_server_url + self.ENDPOINT

    def setUp(self) -> None:
        self.client = requests.Session()

    def execute(
        self,
        query: str,
        variables: typing.Optional[dict] = None,
        map: typing.Optional[dict] = None,
        files: typing.Optional[list] = None,
    ) -> dict:
        """Execute a GraphQL query."""
        data = {"query": query, "variables": variables}
        if map:
            data = {"operations": json.dumps(data)}
            data["map"] = json.dumps(map)
            result = self.client.post(
                self._url,
                data=data,
                files=files,
            )
        else:
            result = self.client.post(self._url, json=data)

        result.raise_for_status()
        return result.json()

    def login(self, username: str, password: str) -> None:
        """Login to the GraphQL endpoint. Stores the token in the session."""
        result = self.execute(
            """
                mutation Login($username: String!, $password: String!) {
                    login(username: $username, password: $password) {
                        id
                        username
                    }
                }
            """,
            variables={"username": username, "password": password},
        )
        if result["data"]["login"] is None:
            raise Exception("Login failed")
