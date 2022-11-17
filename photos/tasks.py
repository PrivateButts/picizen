import blurhash
from huey.contrib.djhuey import task


@task
def generate_blurhash(photo):
    photo.blurhash = blurhash.encode(photo.image, x_components=4, y_components=3)


@task
def process_new_photo(photo):
    pass