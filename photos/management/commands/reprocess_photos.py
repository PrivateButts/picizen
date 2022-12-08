from django.core.management.base import BaseCommand, CommandError
from photos.models import Photo
from photos.tasks import process_photo


class Command(BaseCommand):
    help = "Queues all photos for reprocessing"

    def handle(self, *args, **options):
        for photo in Photo.objects.all():
            process_photo(photo)
        self.stdout.write(
            self.style.SUCCESS(
                "Successfully queued %s photos for reprocessing" % Photo.objects.count()
            )
        )
