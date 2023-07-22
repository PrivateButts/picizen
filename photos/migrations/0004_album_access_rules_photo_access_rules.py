# Generated by Django 4.2.3 on 2023-07-22 03:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
        ('photos', '0003_photo_camera_make_photo_camera_model_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='album',
            name='access_rules',
            field=models.ManyToManyField(blank=True, to='accounts.accessrule'),
        ),
        migrations.AddField(
            model_name='photo',
            name='access_rules',
            field=models.ManyToManyField(blank=True, to='accounts.accessrule'),
        ),
    ]
