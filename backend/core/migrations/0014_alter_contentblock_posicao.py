from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0013_seed_placeholder_depoimentos"),
    ]

    operations = [
        migrations.AlterField(
            model_name="contentblock",
            name="posicao",
            field=models.CharField(
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
    ]
