from unittest import mock

from django.test import TestCase

from .gql import resolve_task_queue


class TaskQueueTestCase(TestCase):
    def test_resolve_task_queue(self):
        # I don't think we can really test this beyond mocking the Huey instance
        with mock.patch("picizen.gql.REDIS_INSTANCE.hlen", return_value=0):
            self.assertEqual(resolve_task_queue(), 0)

        with mock.patch("picizen.gql.REDIS_INSTANCE.hlen", return_value=3):
            self.assertEqual(resolve_task_queue(), 3)
