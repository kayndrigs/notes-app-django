# Generated by Django 5.1.4 on 2024-12-20 17:12

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('noteImage', models.ImageField(upload_to='')),
                ('noteContent', models.IntegerField()),
            ],
        ),
    ]
