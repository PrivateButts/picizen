import strawberry
from typing import List
from photos.gql import Query as PhotoQuery
from photos.gql import Mutation as PhotoMutation


@strawberry.type
class Query(PhotoQuery):
    pass


@strawberry.type
class Mutation(PhotoMutation):
    pass

schema = strawberry.Schema(query=Query, mutation=Mutation)
