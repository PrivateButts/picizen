from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

from .tasks import process_photo


@receiver(post_delete, sender="photos.Photo")
def photo_post_delete(sender, instance, **kwargs) -> None:
    """Delete the image file when the photo object is deleted."""
    instance.image.delete(False)


@receiver(post_save, sender="photos.Photo")
def photo_post_save(sender, instance, created, **kwargs) -> None:
    """Assign the view permission to the creator of the photo."""
    if created:
        if instance.creator:
            pass
            # assign_perm("photos.view_photo", instance.creator, instance)
        process_photo.delay(instance.pk)
