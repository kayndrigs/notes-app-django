# Generated by Django 5.1.4 on 2024-12-21 00:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_note_noteimage'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='note',
            name='noteImage',
        ),
    ]
