import blurhash
from huey.contrib.djhuey import db_task, task


@db_task()
def generate_blurhash(photo):
    photo.blurhash = blurhash.encode(photo.image, x_components=4, y_components=3)
    photo.save()


@task()
def process_new_photo(photo):
    generate_blurhash(photo)
