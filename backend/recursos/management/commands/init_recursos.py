from datetime import date

from django.core.management.base import BaseCommand

from recursos.models import Recurso


RECURSOS_SEED = [
    # --- Cursos Recomendados ---
    {
        'titulo': 'Machine Learning Specialization',
        'descricao': (
            'Série de 3 cursos de Andrew Ng que cobre regressão, redes neurais e '
            'aprendizado não supervisionado com implementações em Python. Ideal '
            'para quem está começando na área.'
        ),
        'url': 'https://www.coursera.org/specializations/machine-learning-introduction',
        'secao': 'cursos',
        'nivel': 'iniciante',
        'autor': '',
        'ordem': 0,
    },
    {
        'titulo': 'Practical Deep Learning for Coders',
        'descricao': (
            'Curso prático do fast.ai com abordagem top-down: você treina modelos '
            'reais desde a primeira aula e entende os fundamentos ao longo do caminho.'
        ),
        'url': 'https://course.fast.ai/',
        'secao': 'cursos',
        'nivel': 'intermediario',
        'autor': '',
        'ordem': 1,
    },
    {
        'titulo': 'Natural Language Processing Specialization',
        'descricao': (
            'Quatro cursos cobrindo desde classificação de texto e embeddings até '
            'modelos de atenção e transformers aplicados a tarefas de NLP modernas.'
        ),
        'url': 'https://www.deeplearning.ai/courses/natural-language-processing-specialization/',
        'secao': 'cursos',
        'nivel': 'avancado',
        'autor': '',
        'ordem': 2,
    },
    # --- Material Próprio (Jornal Insper AI) ---
    {
        'titulo': 'LLMs aplicados ao mercado financeiro brasileiro',
        'descricao': (
            'Análise de como modelos de linguagem de grande escala estão sendo '
            'utilizados para análise de documentos regulatórios, relatórios de '
            'earnings e scoring de crédito.'
        ),
        'url': 'https://insperai.com/jornal/llms-financas',
        'secao': 'material',
        'nivel': 'avancado',
        'autor': 'Roberto Alves — Insper AI',
        'ordem': 0,
    },
    {
        'titulo': 'IA e responsabilidade algorítmica no Brasil',
        'descricao': (
            'Discussão sobre os desafios jurídicos da responsabilidade civil em '
            'sistemas autônomos de IA, com foco no contexto brasileiro pós-LGPD '
            'e no Projeto de Lei de IA.'
        ),
        'url': 'https://insperai.com/jornal/ia-direito',
        'secao': 'material',
        'nivel': 'intermediario',
        'autor': 'Prof. Carlos Lima — FGV/Insper AI',
        'ordem': 1,
    },
    {
        'titulo': 'Visão computacional na indústria 4.0',
        'descricao': (
            'Como redes convolucionais e modelos YOLO estão sendo aplicados em '
            'linhas de produção para controle de qualidade, detecção de defeitos '
            'e manutenção preditiva.'
        ),
        'url': 'https://insperai.com/jornal/cv-industria',
        'secao': 'material',
        'nivel': 'intermediario',
        'autor': 'Mariana Lima — Insper AI',
        'ordem': 2,
    },
]


class Command(BaseCommand):
    help = 'Seed Recursos (material próprio e cursos recomendados) com entradas iniciais.'

    def handle(self, *args, **options):
        today = date.today()
        created_count = 0
        updated_count = 0

        for data in RECURSOS_SEED:
            defaults = {**data, 'data': today}
            _, created = Recurso.objects.update_or_create(
                titulo=data['titulo'],
                defaults=defaults,
            )
            if created:
                created_count += 1
                self.stdout.write(self.style.SUCCESS(f'Created: {data["titulo"]}'))
            else:
                updated_count += 1
                self.stdout.write(f'Updated: {data["titulo"]}')

        self.stdout.write(
            self.style.SUCCESS(
                f'Recursos seed complete — {created_count} created, {updated_count} updated.'
            )
        )
