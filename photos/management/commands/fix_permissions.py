from django.core.management.base import BaseCommand
from guardian.shortcuts import assign_perm

from photos.models import Photo


class Command(BaseCommand):
    help = "Restores creator permissions for all photos"

    def handle(self, *args, **options):
        for photo in Photo.objects.filter(creator__isnull=False):
            assign_perm("photos.view_photo", photo.creator, photo)
        self.stdout.write(
            self.style.SUCCESS(f"Reassigned permissions for {Photo.objects.count()} photos")
        )
