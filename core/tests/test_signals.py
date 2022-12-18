import time
from unittest.mock import call, patch

from core.signals import cleanup_queue, task_added, task_finished
from django.test import TestCase


class CleanupQueueTestCase(TestCase):
    def test_nothing(self):
        with patch("core.signals.REDIS_INSTANCE") as mock_redis:
            mock_redis.hgetall.return_value = {}
            cleanup_queue()
            mock_redis.hdel.assert_not_called()

    def test_cleanup(self):
        with patch("core.signals.REDIS_INSTANCE") as mock_redis:
            mock_redis.hgetall.return_value = {
                "task1": 0,
                "task2": 0,
            }
            cleanup_queue()
            calls = [
                call("task_queue", "task1"),
                call("task_queue", "task2"),
            ]
            mock_redis.hdel.assert_has_calls(calls)

    def test_cleanup_with_time(self):
        with patch("core.signals.REDIS_INSTANCE") as mock_redis:
            mock_redis.hgetall.return_value = {
                "task1": time.time(),
                "task2": 0,
            }
            cleanup_queue()
            calls = [
                call("task_queue", "task2"),
            ]
            mock_redis.hdel.assert_has_calls(calls)


class TaskAddedTestCase(TestCase):
    def test_task_added(self):
        with patch("core.signals.REDIS_INSTANCE") as mock_redis:
            with patch("core.signals.updateTaskQueue") as mock_update:
                with patch("core.signals.resolve_task_queue") as mock_resolve:
                    with patch("core.signals.time") as mock_time:
                        mock_time.time.return_value = 1
                        mock_resolve.return_value = 1
                        task_added(task_id="task_id")
                        mock_redis.hset.assert_called_once_with(
                            "task_queue", "task_id", 1
                        )
                        mock_update.assert_called_once_with(1)


class TaskFinishedTestCase(TestCase):
    def test_task_finished(self):
        with patch("core.signals.REDIS_INSTANCE") as mock_redis:
            with patch("core.signals.updateTaskQueue") as mock_update:
                with patch("core.signals.resolve_task_queue") as mock_resolve:
                    with patch("core.signals.cleanup_queue") as mock_cleanup:
                        mock_resolve.return_value = 1
                        task_finished(task_id="task_id")
                        mock_redis.hdel.assert_called_once_with("task_queue", "task_id")
                        mock_update.assert_called_once_with(1)
                        mock_cleanup.assert_called_once_with()
