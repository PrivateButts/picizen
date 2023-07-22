from django.contrib.auth.mixins import UserPassesTestMixin
from django.http import HttpRequest, HttpResponse, HttpResponseForbidden
from django.shortcuts import get_object_or_404, redirect
from django.views.generic import FormView
from django_sendfile import sendfile

from photos.forms import AssignPermForm
from photos.models import Photo


class AssignPermView(UserPassesTestMixin, FormView):
    """FormView for assigning permissions to objects."""

    template_name = "photos/assign_perm.html"
    form_class = AssignPermForm

    def test_func(self):
        """Only superusers can use this view."""
        return self.request.user.is_superuser

    def get_initial(self):
        """Fetch the initial data from the query string."""
        initial = super().get_initial()
        initial["content_type"] = self.request.GET.get("ct")
        initial["items"] = self.request.GET.get("ids")
        return initial

    def get_form(self):
        """Set the permission choices to the permissions for the model."""
        form = super().get_form()
        form.fields["permission"].queryset = get_perms_for_model(Photo)
        return form

    def form_valid(self, form):
        """Assign the permissions to the objects."""
        form.execute()
        return redirect("admin:photos_photo_changelist")


def serve_photo(request: HttpRequest, photo_id: int) -> HttpResponse:
    """Serve a photo via nginx if the user has the correct permission.

    Args:
        request (HttpRequest): The request object.
        photo_id (int): The id of the photo object to serve.
    """

    photo = get_object_or_404(Photo, id=photo_id)

    if request.user.has_perm("photos.view_photo", photo):
        return sendfile(request, photo.image.path)
    else:
        return HttpResponseForbidden()
