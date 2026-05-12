from django.core.management.base import BaseCommand
from processo_seletivo.models import ProcessoSeletivo

class Command(BaseCommand):
    help = 'Initialize the singleton ProcessoSeletivo instance if it does not exist'

    def handle(self, *args, **options):
        if ProcessoSeletivo.objects.exists():
            self.stdout.write(self.style.SUCCESS('ProcessoSeletivo already exists'))
            return

        processo = ProcessoSeletivo.objects.create(
            proxima_edicao='2026.2',
            status='em_breve',
            texto_cta='Faça parte de uma equipe que constrói o futuro da Inteligência Artificial no Brasil.'
        )
        self.stdout.write(self.style.SUCCESS(f'Successfully created ProcessoSeletivo: {processo}'))
