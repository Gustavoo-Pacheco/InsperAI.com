"""Seed Membro rows from LinkedIn screenshots. Run with: python manage.py shell < seed_membros.py"""
from membros.models import Membro

PLACEHOLDER = "membros/placeholder.png"
SEMESTRE = "2026.1"

FOTOS = {
    "Fernando Mason": "membros/fernando_mason.png",
    "Maria Carolina": "membros/maria_carolina.png",
    "Thomas Kassab": "membros/thomas_kassab.png",
    "Rafael Rayes": "membros/rafael_rayes.png",
    "Vitor Salomão": "membros/vitor_salomao.png",
}

MEMBROS = [
    # (nome, cargo, nivel, linkedin_slug, github_user)
    ("Fernando Mason", "Presidente e Co-Fundador da Insper AI", "presidencia", "fernando-mason", "fernandomason"),
    ("Maria Carolina", "Cofundadora e Diretora da Insper AI", "diretoria", "maria-carolina", "mariacarolina"),
    ("Thomas Kassab", "Diretor na Insper AI", "diretoria", "thomas-kassab", "thomaskassab"),
    ("Ana Laura Villela", "Insper / Administração", "equipe", "ana-laura-villela", "analauravillela"),
    ("Bianca dos Reis", "Estudante de Engenharia Mecatrônica no Insper", "equipe", "bianca-dos-reis", "biancadosreis"),
    ("Emanuel Apolinário", "Software Engineer", "equipe", "emanuel-apolinario", "emanuelapolinario"),
    ("Guilherme N.", "Gestor de Automações para Empresas", "equipe", "guilherme-n", "guilhermen"),
    ("Gustavo Pacheco", "Estudante", "equipe", "gustavo-pacheco", "gustavopacheco"),
    ("Catharina Albuquerque", "Business Student at Insper", "equipe", "catharina-albuquerque", "catharinaalbuquerque"),
    ("Vitor Salomão", "Computer Engineering | Insper", "diretoria", "vitor-salomao", "vitorsalomao"),
    ("Helio Henrique Navarro", "Insper Computer Science", "equipe", "helio-navarro", "helionavarro"),
    ("Lucas Serra Marini", "Engenharia da Computação | Python | Data Science", "equipe", "lucas-serra-marini", "lucasserramarini"),
    ("Maria Clara Hirata", "Student of Mechatronics Engineering at Insper", "equipe", "maria-clara-hirata", "mariaclarahirata"),
    ("Rafael Rayes", "Engineer", "presidencia", "rafael-rayes", "rafaelrayes"),
    ("João Pedro Luz", "Aluno na Insper", "equipe", "joao-pedro-luz", "joaopedroluz"),
    ("Guilherme Souza", "Aluno de Engenharia Mecatrônica no Insper", "equipe", "guilherme-souza", "guilhermesouza"),
    ("André Fanganiello", "Student at Insper Instituto de Ensino e Pesquisa", "equipe", "andre-fanganiello", "andrefanganiello"),
    ("Alex Chequer", "Computer Science @ Insper", "equipe", "alex-chequer", "alexchequer"),
    ("Gabriel Aguiar", "Ciência da Computação @ Insper | IA & Ciências", "equipe", "gabriel-aguiar", "gabrielaguiar"),
    ("André Sucar Padula", "Aluno de Engenharia Mecatrônica no Insper", "equipe", "andre-sucar-padula", "andresucarpadula"),
    ("Anderson Julião", "Estudante de Engenharia de Computação no Insper", "equipe", "anderson-juliao", "andersonjuliao"),
    ("Leonardo Leal", "Aluno na Insper", "equipe", "leonardo-leal", "leonardoleal"),
]

created = 0
updated = 0
for ordem, (nome, cargo, nivel, linkedin_slug, github_user) in enumerate(MEMBROS):
    linkedin_url = f"https://www.linkedin.com/in/{linkedin_slug}/"
    github_url = f"https://github.com/{github_user}"
    obj, was_created = Membro.objects.update_or_create(
        nome=nome,
        defaults={
            "cargo": cargo,
            "nivel": nivel,
            "semestre": SEMESTRE,
            "foto": FOTOS.get(nome, PLACEHOLDER),
            "linkedin_url": linkedin_url,
            "github_url": github_url,
            "ativo": True,
            "alumni": False,
            "ordem": ordem,
        },
    )
    if was_created:
        created += 1
    else:
        updated += 1

print(f"Created: {created}, Updated: {updated}, Total: {Membro.objects.count()}")
