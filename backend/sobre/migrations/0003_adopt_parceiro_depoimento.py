from django.db import migrations, models


class Migration(migrations.Migration):
    """
    Adopt Parceiro and Depoimento — previously declared in `core` — into the
    `sobre` app via state-only operations. Tables remain `core_parceiro` and
    `core_depoimento` until `sobre.0004_rename_parceiro_depoimento_tables`
    renames them.
    """

    dependencies = [
        ("sobre", "0002_rename_tables"),
        ("core", "0015_remove_sobre_models"),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            database_operations=[],
            state_operations=[
                migrations.CreateModel(
                    name="Parceiro",
                    fields=[
                        (
                            "id",
                            models.BigAutoField(
                                auto_created=True,
                                primary_key=True,
                                serialize=False,
                                verbose_name="ID",
                            ),
                        ),
                        ("nome", models.CharField(max_length=255)),
                        ("logo", models.ImageField(blank=True, upload_to="parceiros/")),
                        ("url", models.URLField(blank=True)),
                        (
                            "descricao",
                            models.TextField(
                                blank=True,
                                help_text="Texto exibido ao passar o mouse no card",
                            ),
                        ),
                        ("ordem", models.PositiveIntegerField(default=0)),
                    ],
                    options={
                        "ordering": ["ordem"],
                        "db_table": "core_parceiro",
                    },
                ),
                migrations.CreateModel(
                    name="Depoimento",
                    fields=[
                        (
                            "id",
                            models.BigAutoField(
                                auto_created=True,
                                primary_key=True,
                                serialize=False,
                                verbose_name="ID",
                            ),
                        ),
                        ("autor", models.CharField(max_length=255)),
                        ("cargo", models.CharField(max_length=255)),
                        ("texto", models.TextField()),
                        ("foto", models.ImageField(blank=True, upload_to="depoimentos/")),
                        ("ordem", models.PositiveIntegerField(default=0)),
                    ],
                    options={
                        "ordering": ["ordem"],
                        "db_table": "core_depoimento",
                    },
                ),
            ],
        ),
    ]
