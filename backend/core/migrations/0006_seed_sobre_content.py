from django.db import migrations


PLACEHOLDER_VALORES = [
    {
        "titulo": "Curiosidade Intelectual",
        "descricao": "Buscamos profundidade técnica em IA e disposição constante para aprender. Quem entra na InsperAI gosta de fazer perguntas difíceis e ir atrás das respostas.",
        "ordem": 1,
    },
    {
        "titulo": "Proatividade",
        "descricao": "Tomamos a frente em projetos, parcerias e iniciativas. Não esperamos pelo ideal — começamos com o que temos e iteramos.",
        "ordem": 2,
    },
    {
        "titulo": "Colaboração",
        "descricao": "Crescemos juntos. Compartilhamos conhecimento entre áreas, niveis e gerações de membros para multiplicar o impacto da organização.",
        "ordem": 3,
    },
]


PLACEHOLDER_MILESTONES = [
    {"ano": 2022, "titulo": "Fundação da InsperAI", "descricao": "Um pequeno grupo de alunos do Insper se reuniu para criar uma comunidade dedicada a inteligência artificial aplicada.", "ordem": 0},
    {"ano": 2023, "titulo": "Primeiros eventos abertos", "descricao": "Realizamos os primeiros workshops e palestras abertos à comunidade Insper, consolidando a presença da organização no campus.", "ordem": 0},
    {"ano": 2024, "titulo": "Expansão para múltiplas áreas", "descricao": "A organização passou a atuar em frentes interdisciplinares — engenharia, direito e finanças — refletindo a aplicação real de IA.", "ordem": 0},
]


def seed(apps, schema_editor):
    SobreContent = apps.get_model("core", "SobreContent")
    Valor = apps.get_model("core", "Valor")
    Milestone = apps.get_model("core", "Milestone")

    if not SobreContent.objects.exists():
        SobreContent.objects.create(
            pk=1,
            hero_eyebrow="SOBRE NÓS",
            hero_quote=(
                "Somos a comunidade de inteligência artificial do Insper — "
                "pesquisamos, construímos e ensinamos IA aplicada para preparar a próxima geração."
            ),
            hero_attribution="InsperAI",
            missao=(
                "Formar profissionais capazes de aplicar inteligência artificial "
                "de forma técnica, crítica e responsável em diferentes setores da economia."
            ),
            applicants_count=0,
            projects_delivered=None,
            founding_year=2022,
        )

    for v in PLACEHOLDER_VALORES:
        Valor.objects.get_or_create(titulo=v["titulo"], defaults=v)

    for m in PLACEHOLDER_MILESTONES:
        Milestone.objects.get_or_create(ano=m["ano"], titulo=m["titulo"], defaults=m)


def unseed(apps, schema_editor):
    apps.get_model("core", "SobreContent").objects.all().delete()
    apps.get_model("core", "Valor").objects.all().delete()
    apps.get_model("core", "Milestone").objects.all().delete()


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0005_contentblock_milestone_sobrecontent_valor"),
    ]
    operations = [migrations.RunPython(seed, unseed)]
