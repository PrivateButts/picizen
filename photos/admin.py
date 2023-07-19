from django.contrib import admin
from django.contrib.contenttypes.models import ContentType
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.utils.http import urlencode
from guardian.admin import GuardedModelAdmin

from .models import Album, Photo, Tag
from .tasks import process_photo


@admin.action(description="Assign permissions")
def assign_permission(self, request, queryset):
    selected = queryset.values_list("pk", flat=True)
    ct = ContentType.objects.get_for_model(queryset.model)
    params = urlencode({"ct": ct.pk, "ids": ",".join(str(pk) for pk in selected)})
    return HttpResponseRedirect(f"{reverse('assign_perm')}?{params}")


@admin.register(Photo)
class PhotoAdmin(GuardedModelAdmin):
    model = Photo
    list_display = ("title", "creator", "created_at", "updated_at", "date_taken")
    actions = ["reprocess", assign_permission]

    @admin.action(description="Reprocess photos")
    def reprocess(self, request, queryset):
        for photo in queryset:
            process_photo.delay(photo.pk)
        self.message_user(request, f"{queryset.count()} photos have been reprocessed.")


@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    model = Album


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    model = Tag
