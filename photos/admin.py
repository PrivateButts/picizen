from django.contrib import admin

from .models import Photo, Album, Tag
from .tasks import process_photo


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    model = Photo
    list_display = ('title', 'creator', 'created_at', 'updated_at', 'date_taken')
    actions = ['reprocess']

    @admin.action(description='Reprocess photos')
    def reprocess(self, request, queryset):
        for photo in queryset:
            process_photo(photo)
        self.message_user(request, f"{queryset.count()} photos have been reprocessed.")


@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    model = Album


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    model = Tag
