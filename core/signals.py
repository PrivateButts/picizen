import time

import channels.layers
import redis

from asgiref.sync import async_to_sync
from celery.signals import task_postrun, task_prerun
from django.conf import settings

from picizen.gql import resolve_task_queue, updateTaskQueue


channel_layer = channels.layers.get_channel_layer()
REDIS_INSTANCE = redis.Redis().from_url(settings.REDIS_URL)


def cleanup_queue():
    # Remove all tasks that have been in the queue for more than 15 minutes
    update_task_queue = False
    for task_id, timestamp in REDIS_INSTANCE.hgetall("task_queue").items():
        if time.time() - float(timestamp) > 60 * 15:
            REDIS_INSTANCE.hdel("task_queue", task_id)
            update_task_queue = True

    if update_task_queue:
        async_to_sync(updateTaskQueue)(resolve_task_queue())


@task_prerun.connect()
def task_added(*arg, **kwargs) -> None:
    REDIS_INSTANCE.hset("task_queue", kwargs["task_id"], time.time())
    async_to_sync(updateTaskQueue)(resolve_task_queue())


@task_postrun.connect()
def task_finished(*arg, **kwargs) -> None:
    REDIS_INSTANCE.hdel("task_queue", kwargs["task_id"])
    async_to_sync(updateTaskQueue)(resolve_task_queue())
    cleanup_queue()
