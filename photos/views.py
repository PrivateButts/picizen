from django.http import HttpResponseForbidden
from django.shortcuts import get_object_or_404, redirect
from django_sendfile import sendfile
from django.views.generic import FormView
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.mixins import UserPassesTestMixin
from guardian.shortcuts import get_perms_for_model

from .models import Photo
from .forms import AssignPermForm


class AssignPermView(UserPassesTestMixin, FormView):
    template_name = 'photos/assign_perm.html'
    form_class = AssignPermForm

    def test_func(self):
        return self.request.user.is_superuser

    def get_initial(self):
        initial = super().get_initial()
        initial['content_type'] = self.request.GET.get('ct')
        initial['items'] = self.request.GET.get('ids')
        return initial

    def get_form(self):
        form = super().get_form()
        form.fields['permission'].queryset = get_perms_for_model(Photo)
        return form

    def form_valid(self, form):
        form.execute()
        return redirect('admin:photos_photo_changelist')


def serve_photo(request, photo_id):
    photo = get_object_or_404(Photo, id=photo_id)
    if request.user.has_perm('photos.view_photo', photo):
        return sendfile(request, photo.image.path)
    else:
        return HttpResponseForbidden()
