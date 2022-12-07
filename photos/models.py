from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from picizen.helpers import BaseModel

USER = get_user_model()


class Photo(BaseModel):
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='photos')
    blurhash = models.CharField(max_length=255, blank=True, null=True)

    creator = models.ForeignKey(USER, on_delete=models.SET_NULL, null=True, blank=True)

    # photo metadata
    date_taken = models.DateTimeField(blank=True, null=True)
    gps_lat = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    gps_lon = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    camera_make = models.CharField(max_length=255, blank=True, null=True)
    camera_model = models.CharField(max_length=255, blank=True, null=True)
    lens_make = models.CharField(max_length=255, blank=True, null=True)
    lens_model = models.CharField(max_length=255, blank=True, null=True)

    @property
    def aspect_ratio(self):
        return self.image.width / self.image.height
    
    @property
    def image_url(self):
        return reverse('serve_photo', kwargs={'photo_id': self.pk})

    def __str__(self):
        return self.title


class Album(BaseModel):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    photos = models.ManyToManyField(Photo)

    creator = models.ForeignKey(USER, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Tag(BaseModel):
    class TagTypes(models.IntegerChoices):
        GENERIC = 0, _('Generic')
        PERSON = 1, _('Person')

    name = models.CharField(max_length=50)
    type = models.IntegerField(choices=TagTypes.choices, default=TagTypes.GENERIC)
    photos = models.ManyToManyField(Photo)

    def __str__(self):
        return self.name
