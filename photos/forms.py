from django import forms
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.shortcuts import get_list_or_404, get_object_or_404


class AssignPermForm(forms.Form):
    # TODO: This could use more work
    users = forms.ModelMultipleChoiceField(
        queryset=User.objects.all(),
        widget=forms.CheckboxSelectMultiple,
    )
    permission = forms.ModelChoiceField(required=True, queryset=None)
    content_type = forms.CharField(widget=forms.HiddenInput(), required=False)
    items = forms.CharField(widget=forms.HiddenInput(), required=False)

    def execute(self):
        if not self.is_valid():
            raise ValueError("Form is not valid")

        users = self.cleaned_data["users"]
        ct = get_object_or_404(ContentType, pk=self.cleaned_data["content_type"])
        items = get_list_or_404(ct.model_class(), pk__in=self.cleaned_data["items"].split(","))
        for user in users:
            pass
            # assign_perm(self.cleaned_data["permission"], user, items)

        return True
