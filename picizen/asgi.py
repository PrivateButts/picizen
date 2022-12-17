"""
ASGI config for picizen project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "picizen.settings")

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application
from django.urls import re_path
from strawberry.asgi import GraphQL
from strawberry.channels import GraphQLHTTPConsumer, GraphQLWSConsumer
from strawberry.subscriptions import GRAPHQL_TRANSPORT_WS_PROTOCOL, GRAPHQL_WS_PROTOCOL

from .gql import schema

# django_asgi_app = get_asgi_application()


# websocket_urlpatterns = [
#     re_path(r"^graphql/", GraphQLWSConsumer.as_asgi(schema=schema)),
# ]

# gql_http_consumer = AuthMiddlewareStack(GraphQLHTTPConsumer.as_asgi(schema=schema))
# gql_ws_consumer = GraphQLWSConsumer.as_asgi(schema=schema)
# application = ProtocolTypeRouter(
#     {
#         "http": URLRouter(
#             [
#                 re_path("^graphql/", gql_http_consumer),
#                 re_path(
#                     "^", django_asgi_app
#                 ),  # This might be another endpoint in your app
#             ]
#         ),
#         "websocket": AllowedHostsOriginValidator(
#             AuthMiddlewareStack(URLRouter(websocket_urlpatterns))
#         ),
#     }
# )


django_asgi_app = get_asgi_application()
gql_app = GraphQL(
    schema,
    subscription_protocols=[
        GRAPHQL_TRANSPORT_WS_PROTOCOL,
        GRAPHQL_WS_PROTOCOL,
    ],
)
application = ProtocolTypeRouter(
    {
        "http": django_asgi_app,
        "websocket": gql_app,
    }
)
