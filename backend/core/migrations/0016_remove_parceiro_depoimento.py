from django.db import migrations


class Migration(migrations.Migration):
    """
    Remove Parceiro and Depoimento from the `core` app's state. The underlying
    tables are not dropped — they have been re-adopted by the `sobre` app via
    `sobre.0003_adopt_parceiro_depoimento`, and are later renamed in
    `sobre.0004_rename_parceiro_depoimento_tables`.
    """

    dependencies = [
        ("core", "0015_remove_sobre_models"),
        ("sobre", "0003_adopt_parceiro_depoimento"),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            database_operations=[],
            state_operations=[
                migrations.DeleteModel(name="Depoimento"),
                migrations.DeleteModel(name="Parceiro"),
            ],
        ),
    ]
