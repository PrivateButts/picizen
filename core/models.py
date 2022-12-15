from django.db import models


class Setting(models.Model):
    key = models.CharField(max_length=100, unique=True)
    value = models.TextField()

    def __str__(self) -> str:
        return f"Key: {self.key}"
