import channels.layers
import redis

import strawberry

from accounts.gql import Mutation as AccountMutation, Query as AccountQuery
from django.conf import settings
from django.core.cache import cache
from photos.gql import Mutation as PhotoMutation, Query as PhotoQuery


channel_layer = channels.layers.get_channel_layer()
REDIS_INSTANCE = redis.Redis().from_url(settings.REDIS_URL)


def resolve_task_queue():
    return REDIS_INSTANCE.hlen("task_queue")


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

                print("received queue update")
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


@strawberry.type
class Subscription(TaskQueueSubscription):
    pass


schema = strawberry.Schema(query=Query, mutation=Mutation, subscription=Subscription)
