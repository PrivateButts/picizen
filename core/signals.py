import sys

import channels.layers

from asgiref.sync import async_to_sync
from django.db.models.signals import post_save
from django.dispatch import receiver
from celery.signals import task_postrun
from celery import current_app

from picizen.gql import resolve_task_queue, updateTaskQueue

from .models import Setting


channel_layer = channels.layers.get_channel_layer()


@task_postrun.connect()
def task_update(*args, **kwargs):
    async_to_sync(updateTaskQueue)(resolve_task_queue())
