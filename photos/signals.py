from django.db.models.signals import post_delete
from django.dispatch import receiver


@receiver(post_delete, sender="photos.Photo")
def photo_post_delete(sender, instance, **kwargs):
    print("Image deleted")
    instance.image.delete(False)
