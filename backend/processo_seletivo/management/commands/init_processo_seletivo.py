from django.core.management.base import BaseCommand
from processo_seletivo.models import (
    ProcessoSeletivo,
    EtapaProcessoSeletivo,
    CriterioProcessoSeletivo,
)


ETAPAS_SEED = [
    ("Inscrição", "Preencha o formulário online com seus dados, motivações e projetos anteriores."),
    ("Case Individual", "Case sobre inteligência artificial apresentado aos membros da entidade."),
    ("Entrevista", "Conversa com membros sobre seus interesses em IA."),
    ("Decisão", "Resultado comunicado por email em até 7 dias úteis."),
]

CRITERIOS_SEED = [
    ("Curiosidade Intelectual", "Interesse genuíno em IA e vontade de aprender continuamente.", "Lightbulb"),
    ("Habilidade Técnica", "Experiência ou disposição para aprender Python, ML ou áreas adjacentes.", "Code2"),
    ("Trabalho em Equipe", "Capacidade de colaborar em projetos desafiadores com outros membros.", "Users"),
    ("Proatividade", "Iniciativa para propor e executar projetos sem precisar de supervisão constante.", "Sparkles"),
    ("Excelência Acadêmica", "Comprometimento com entregas de qualidade, não apenas com prazos.", "Target"),
    ("Alinhamento com a Missão", "Acreditar que IA deve ser usada de forma responsável e com impacto positivo.", "BookOpen"),
]


class Command(BaseCommand):
    help = 'Initialize the singleton ProcessoSeletivo instance, plus default etapas and critérios.'

    def handle(self, *args, **options):
        processo = ProcessoSeletivo.objects.first()
        if processo is None:
            processo = ProcessoSeletivo.objects.create(
                proxima_edicao='2026.2',
                status='em_breve',
                texto_cta='Faça parte de uma equipe que constrói o futuro da Inteligência Artificial no Brasil.',
            )
            self.stdout.write(self.style.SUCCESS(f'Created ProcessoSeletivo: {processo}'))
        else:
            self.stdout.write(self.style.SUCCESS('ProcessoSeletivo already exists'))

        if not processo.etapas.exists():
            for ordem, (titulo, descricao) in enumerate(ETAPAS_SEED):
                EtapaProcessoSeletivo.objects.create(
                    processo_seletivo=processo,
                    titulo=titulo,
                    descricao=descricao,
                    ordem=ordem,
                    ativa=True,
                )
            self.stdout.write(self.style.SUCCESS(f'Seeded {len(ETAPAS_SEED)} etapas'))
        else:
            self.stdout.write(self.style.SUCCESS('Etapas already seeded'))

        if not processo.criterios.exists():
            for ordem, (titulo, descricao, icon) in enumerate(CRITERIOS_SEED):
                CriterioProcessoSeletivo.objects.create(
                    processo_seletivo=processo,
                    titulo=titulo,
                    descricao=descricao,
                    icon=icon,
                    ordem=ordem,
                    ativa=True,
                )
            self.stdout.write(self.style.SUCCESS(f'Seeded {len(CRITERIOS_SEED)} critérios'))
        else:
            self.stdout.write(self.style.SUCCESS('Critérios already seeded'))
