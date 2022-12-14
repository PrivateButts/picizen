from django.core.management.base import BaseCommand

from photos.models import Photo
from photos.tasks import process_photo


class Command(BaseCommand):
    help = "Queues all photos for reprocessing"

    def handle(self, *args, **options):
        for photo in Photo.objects.all():
            process_photo.delay(photo.pk)
        self.stdout.write(
            self.style.SUCCESS(
                "Successfully queued %s photos for reprocessing" % Photo.objects.count()
            )
        )
