from django.db import migrations


class Migration(migrations.Migration):
    """
    Rename `core_parceiro` → `sobre_parceiro` and `core_depoimento` →
    `sobre_depoimento` so the table names match the new app label.
    """

    dependencies = [
        ("sobre", "0003_adopt_parceiro_depoimento"),
        ("core", "0016_remove_parceiro_depoimento"),
    ]

    operations = [
        migrations.AlterModelTable(name="Parceiro", table=None),
        migrations.AlterModelTable(name="Depoimento", table=None),
    ]
