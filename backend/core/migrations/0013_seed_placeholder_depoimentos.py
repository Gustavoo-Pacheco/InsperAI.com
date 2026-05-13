from django.db import migrations


PLACEHOLDERS = [
    (
        "Ana Beatriz Costa",
        "Ex-presidente · Engenharia da Computação",
        "Entrei na InsperAI no primeiro semestre e foi onde aprendi, na prática, "
        "o que significa construir IA com propósito. Sai com amigos, mentores e "
        "uma base técnica que carrego até hoje.",
        1,
    ),
    (
        "Lucas Fernandes",
        "Membro ativo · Ciência da Computação",
        "Os projetos da InsperAI me deram contato real com problemas de empresas "
        "antes mesmo do meu primeiro estágio. É a comunidade que mais me desafia "
        "no Insper.",
        2,
    ),
    (
        "Marina Toledo",
        "Alumni · Engenharia Mecatrônica",
        "Mais do que uma organização estudantil, a InsperAI é um espaço para "
        "experimentar, errar rápido e crescer junto. Levo essa cultura para tudo "
        "que faço hoje.",
        3,
    ),
]


def seed(apps, schema_editor):
    Depoimento = apps.get_model("core", "Depoimento")
    for autor, cargo, texto, ordem in PLACEHOLDERS:
        Depoimento.objects.get_or_create(
            autor=autor,
            defaults={"cargo": cargo, "texto": texto, "ordem": ordem},
        )


def unseed(apps, schema_editor):
    Depoimento = apps.get_model("core", "Depoimento")
    Depoimento.objects.filter(autor__in=[a for a, _, _, _ in PLACEHOLDERS]).delete()


class Migration(migrations.Migration):
    dependencies = [("core", "0012_seed_parceiros_descricao")]
    operations = [migrations.RunPython(seed, unseed)]
