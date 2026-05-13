from django.db import migrations


PLACEHOLDERS = [
    ("Insper", "https://www.insper.edu.br/", 1),
    ("Itaú", "https://www.itau.com.br/", 2),
    ("Microsoft", "https://www.microsoft.com/", 3),
    ("Google", "https://www.google.com/", 4),
]


def seed(apps, schema_editor):
    Parceiro = apps.get_model("core", "Parceiro")
    for nome, url, ordem in PLACEHOLDERS:
        Parceiro.objects.get_or_create(
            nome=nome,
            defaults={"url": url, "ordem": ordem},
        )


def unseed(apps, schema_editor):
    Parceiro = apps.get_model("core", "Parceiro")
    Parceiro.objects.filter(nome__in=[n for n, _, _ in PLACEHOLDERS]).delete()


class Migration(migrations.Migration):
    dependencies = [("core", "0009_parceiro_logo_optional")]
    operations = [migrations.RunPython(seed, unseed)]
