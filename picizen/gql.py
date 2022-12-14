from typing import List

import channels.layers

import strawberry

from accounts.gql import Mutation as AccountMutation, Query as AccountQuery
from huey.contrib.djhuey import HUEY
from photos.gql import Mutation as PhotoMutation, Query as PhotoQuery

channel_layer = channels.layers.get_channel_layer()


def resolve_task_queue():
    return len(HUEY.pending())


async def updateTaskQueue(remaining: int):
    await channel_layer.group_send("taskQueue_updates", {"remaining": remaining})


@strawberry.type
class TaskQueueSubscription:
    @strawberry.subscription
    async def taskQueue_updated(self) -> int:
        # Enroll user for updates
        channel = await channel_layer.new_channel()
        await channel_layer.group_add("taskQueue_updates", channel)
        # Loop until disconnect
        try:
            while True:
                # Wait for update
                msg = await channel_layer.receive(channel)
                # Send update to client
                yield msg["remaining"]
        finally:
            # Unenroll user from updates and disconnect
            await channel_layer.group_discard("taskQueue_updates", channel)


@strawberry.type
class Query(AccountQuery, PhotoQuery):
    task_queue: int = strawberry.field(resolver=resolve_task_queue)
    pass


@strawberry.type
class Mutation(AccountMutation, PhotoMutation):
    pass


schema = strawberry.Schema(query=Query, mutation=Mutation)
