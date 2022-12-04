from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

from .tasks import process_photo


@receiver(post_delete, sender="photos.Photo")
def photo_post_delete(sender, instance, **kwargs):
    instance.image.delete(False)


@receiver(post_save, sender="photos.Photo")
def photo_post_save(sender, instance, created, **kwargs):
    if created:
        if instance.creator:
            instance.creator.has_perm('photos.view_photo', instance)
        process_photo(instance)