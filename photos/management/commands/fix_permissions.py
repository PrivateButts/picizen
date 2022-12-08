from django.core.management.base import BaseCommand, CommandError
from photos.models import Photo
from guardian.shortcuts import assign_perm


class Command(BaseCommand):
    help = "Queues all photos for reprocessing"

    def handle(self, *args, **options):
        for photo in Photo.objects.filter(creator__isnull=False):
            assign_perm("photos.view_photo", photo.creator, photo)
        self.stdout.write(
            self.style.SUCCESS(
                f"Reassigned permissions for {Photo.objects.count()} photos"
            )
        )
