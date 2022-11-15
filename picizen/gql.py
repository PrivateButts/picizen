import strawberry
from typing import List
from photos.gql import Query as PhotoQuery

@strawberry.type
class Query(PhotoQuery):
    pass

schema = strawberry.Schema(query=Query)
