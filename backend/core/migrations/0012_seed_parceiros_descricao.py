from django.db import migrations


DESCRICOES = {
    "Insper": "Instituição de ensino que abriga e fomenta a comunidade Insper AI desde sua fundação.",
    "Itaú": "Parceiro corporativo em iniciativas de pesquisa aplicada e mentorias em IA.",
    "Microsoft": "Apoio em infraestrutura de nuvem e ferramentas de desenvolvimento para projetos da comunidade.",
    "Google": "Parceiro em programas educacionais e acesso a recursos de aprendizado em IA.",
}


def seed(apps, schema_editor):
    Parceiro = apps.get_model("core", "Parceiro")
    for nome, descricao in DESCRICOES.items():
        Parceiro.objects.filter(nome=nome, descricao="").update(descricao=descricao)


def unseed(apps, schema_editor):
    Parceiro = apps.get_model("core", "Parceiro")
    for nome, descricao in DESCRICOES.items():
        Parceiro.objects.filter(nome=nome, descricao=descricao).update(descricao="")


class Migration(migrations.Migration):
    dependencies = [("core", "0011_parceiro_descricao")]
    operations = [migrations.RunPython(seed, unseed)]
