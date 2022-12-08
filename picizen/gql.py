import strawberry
from typing import List
from huey.contrib.djhuey import HUEY

from accounts.gql import Query as AccountQuery
from accounts.gql import Mutation as AccountMutation
from photos.gql import Query as PhotoQuery
from photos.gql import Mutation as PhotoMutation


@strawberry.type
class Query(AccountQuery, PhotoQuery):
    task_queue: int = strawberry.field(resolver=lambda: len(HUEY.pending()))
    pass


@strawberry.type
class Mutation(AccountMutation, PhotoMutation):
    pass


schema = strawberry.Schema(query=Query, mutation=Mutation)
