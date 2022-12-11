from typing import List

import strawberry

from accounts.gql import Mutation as AccountMutation, Query as AccountQuery
from huey.contrib.djhuey import HUEY
from photos.gql import Mutation as PhotoMutation, Query as PhotoQuery


def resolve_task_queue():
    return len(HUEY.pending())


@strawberry.type
class Query(AccountQuery, PhotoQuery):
    task_queue: int = strawberry.field(resolver=resolve_task_queue)
    pass


@strawberry.type
class Mutation(AccountMutation, PhotoMutation):
    pass


schema = strawberry.Schema(query=Query, mutation=Mutation)
