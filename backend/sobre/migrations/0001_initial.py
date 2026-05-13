from django.db import migrations, models


class Migration(migrations.Migration):
    """
    Adopt the SobreContent / Valor / Milestone / ContentBlock models — previously
    declared in the `core` app — into the new `sobre` app via state-only ops.

    No DB schema changes here: the underlying tables remain `core_<model>` until
    `sobre.0002_rename_tables` renames them. This pairs with
    `core.0015_remove_sobre_models`, which removes the same models from `core`'s
    state without dropping any tables.
    """

    initial = True

    dependencies = [
        ("core", "0014_alter_contentblock_posicao"),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            database_operations=[],
            state_operations=[
                migrations.CreateModel(
                    name="SobreContent",
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
                        ("hero_eyebrow", models.CharField(default="SOBRE NÓS", max_length=120)),
                        (
                            "hero_quote",
                            models.TextField(
                                help_text="Frase-manifesto exibida no topo da página /sobre"
                            ),
                        ),
                        ("hero_attribution", models.CharField(blank=True, max_length=255)),
                        (
                            "headline",
                            models.CharField(
                                blank=True,
                                help_text=(
                                    "Título da seção Quem Somos "
                                    "(ex: 'A comunidade de IA do Insper')"
                                ),
                                max_length=200,
                            ),
                        ),
                        (
                            "missao",
                            models.TextField(
                                help_text=(
                                    "Parágrafo da seção Quem Somos "
                                    "(combina quem somos + missão)"
                                )
                            ),
                        ),
                        (
                            "semester",
                            models.CharField(
                                default="2026.1",
                                help_text="Semestre exibido no título da seção Stats (ex: '2026.1')",
                                max_length=16,
                            ),
                        ),
                        (
                            "applicants_count",
                            models.PositiveIntegerField(
                                default=0,
                                help_text="Total de inscritos no último processo seletivo",
                            ),
                        ),
                        (
                            "projects_delivered",
                            models.PositiveIntegerField(
                                blank=True,
                                help_text="Projetos entregues (opcional)",
                                null=True,
                            ),
                        ),
                        (
                            "founding_year",
                            models.PositiveIntegerField(
                                blank=True,
                                help_text="Ano de fundação da organização",
                                null=True,
                            ),
                        ),
                    ],
                    options={
                        "verbose_name": "Sobre — Conteúdo",
                        "verbose_name_plural": "Sobre — Conteúdo",
                        "db_table": "core_sobrecontent",
                    },
                ),
                migrations.CreateModel(
                    name="Valor",
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
                        ("titulo", models.CharField(max_length=120)),
                        ("descricao", models.TextField()),
                        ("ordem", models.PositiveIntegerField(default=0)),
                    ],
                    options={
                        "verbose_name": "Valor",
                        "verbose_name_plural": "Valores",
                        "ordering": ["ordem"],
                        "db_table": "core_valor",
                    },
                ),
                migrations.CreateModel(
                    name="Milestone",
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
                        ("ano", models.PositiveIntegerField()),
                        ("titulo", models.CharField(max_length=200)),
                        ("descricao", models.TextField()),
                        ("foto", models.ImageField(blank=True, upload_to="milestones/")),
                        ("ordem", models.PositiveIntegerField(default=0)),
                    ],
                    options={
                        "verbose_name": "Marco histórico",
                        "verbose_name_plural": "Marcos históricos",
                        "ordering": ["ano", "ordem"],
                        "db_table": "core_milestone",
                    },
                ),
                migrations.CreateModel(
                    name="ContentBlock",
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
                        ("slug", models.SlugField(max_length=120, unique=True)),
                        ("titulo", models.CharField(max_length=200)),
                        ("texto", models.TextField()),
                        ("ordem", models.PositiveIntegerField(default=0)),
                        ("ativo", models.BooleanField(default=True)),
                        (
                            "posicao",
                            models.CharField(
                                choices=[
                                    ("apos_quem_somos", "Após Quem Somos"),
                                    ("apos_stats", "Após Stats"),
                                    ("apos_parceiros", "Após Parceiros"),
                                    ("apos_depoimentos", "Após Depoimentos"),
                                    ("apos_eventos", "Após Eventos"),
                                    ("apos_valores", "Após Valores"),
                                    ("apos_historia", "Após História"),
                                    ("apos_missao", "Após Missão (legado)"),
                                ],
                                default="apos_quem_somos",
                                max_length=32,
                            ),
                        ),
                    ],
                    options={
                        "verbose_name": "Bloco de conteúdo (Sobre)",
                        "verbose_name_plural": "Blocos de conteúdo (Sobre)",
                        "ordering": ["posicao", "ordem"],
                        "db_table": "core_contentblock",
                    },
                ),
            ],
        ),
    ]
