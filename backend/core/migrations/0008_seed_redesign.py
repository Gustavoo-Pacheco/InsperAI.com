from django.db import migrations


SHORT_VALORES = {
    "Curiosidade Intelectual": "Aprender IA com profundidade técnica e perguntas difíceis.",
    "Proatividade": "Tomamos a frente — começamos com o que temos e iteramos.",
    "Colaboração": "Crescemos juntos, entre áreas e gerações.",
}

QUEM_SOMOS_HEADLINE = "A comunidade de IA do Insper"
QUEM_SOMOS_BODY = (
    "Somos a organização estudantil de inteligência artificial do Insper. "
    "Pesquisamos, construímos e ensinamos IA aplicada para preparar a próxima "
    "geração — formando profissionais capazes de aplicar IA de forma técnica, "
    "crítica e responsável em diferentes setores da economia."
)


def seed(apps, schema_editor):
    SobreContent = apps.get_model("core", "SobreContent")
    Valor = apps.get_model("core", "Valor")

    sc = SobreContent.objects.first()
    if sc is not None:
        changed = False
        if not sc.headline:
            sc.headline = QUEM_SOMOS_HEADLINE
            changed = True
        if not sc.semester:
            sc.semester = "2026.1"
            changed = True
        # Replace previous mission/hero-quote prose with the merged Quem Somos body
        # only if the current text matches the previous seeded copy (don't trample admin edits)
        if sc.missao.startswith("Formar profissionais capazes de aplicar"):
            sc.missao = QUEM_SOMOS_BODY
            changed = True
        if changed:
            sc.save()

    # Shorten valores only if the seeded full-paragraph copy is still in place
    for v in Valor.objects.all():
        short = SHORT_VALORES.get(v.titulo)
        if short and len(v.descricao) > 80:
            v.descricao = short
            v.save()


def unseed(apps, schema_editor):
    # Non-destructive: leave content as-is on reverse.
    pass


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0007_milestone_foto_sobrecontent_headline_and_more"),
    ]
    operations = [migrations.RunPython(seed, unseed)]
