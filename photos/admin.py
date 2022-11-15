from django.contrib import admin

from .models import Photo, Album, Tag


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    model = Photo


@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    model = Album


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    model = Tag
