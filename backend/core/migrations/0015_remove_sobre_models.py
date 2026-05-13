from django.db import migrations


class Migration(migrations.Migration):
    """
    Remove the SobreContent / Valor / Milestone / ContentBlock models from the
    `core` app's state. The underlying tables are not dropped — they have been
    re-adopted by the new `sobre` app via `sobre.0001_initial`, and are later
    renamed in `sobre.0002_rename_tables`.
    """

    dependencies = [
        ("core", "0014_alter_contentblock_posicao"),
        ("sobre", "0001_initial"),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            database_operations=[],
            state_operations=[
                migrations.DeleteModel(name="ContentBlock"),
                migrations.DeleteModel(name="Milestone"),
                migrations.DeleteModel(name="Valor"),
                migrations.DeleteModel(name="SobreContent"),
            ],
        ),
    ]
