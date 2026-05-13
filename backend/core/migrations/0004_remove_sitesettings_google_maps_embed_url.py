from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0003_sitesettings_github_url"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="sitesettings",
            name="google_maps_embed_url",
        ),
    ]
