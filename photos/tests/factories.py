import factory


class PhotoFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = "photos.Photo"

    title = "Test Photo"
    image = factory.django.ImageField(from_path="photos/fixtures/EXIF_Test.jpg")
