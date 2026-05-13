from django.db import migrations


class Migration(migrations.Migration):
    """
    Rename the underlying tables from `core_*` to `sobre_*`, matching the new
    app label. Each `AlterModelTable(table=None)` resets the model to its
    default db_table (`<app_label>_<model>`), causing Django to issue
    `ALTER TABLE core_<model> RENAME TO sobre_<model>` on the database.
    """

    dependencies = [
        ("sobre", "0001_initial"),
        ("core", "0015_remove_sobre_models"),
    ]

    operations = [
        migrations.AlterModelTable(name="SobreContent", table=None),
        migrations.AlterModelTable(name="Valor", table=None),
        migrations.AlterModelTable(name="Milestone", table=None),
        migrations.AlterModelTable(name="ContentBlock", table=None),
    ]
