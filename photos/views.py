from django.http import HttpResponseForbidden
from django.shortcuts import get_object_or_404
from django_sendfile import sendfile

from .models import Photo


def serve_photo(request, photo_id):
    photo = get_object_or_404(Photo, id=photo_id)
    if request.user.has_perm('photos.view_photo', photo):
        return sendfile(request, photo.image.path)
    else:
        return HttpResponseForbidden()
