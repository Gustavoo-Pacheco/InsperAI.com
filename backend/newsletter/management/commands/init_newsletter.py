from datetime import date

from django.core.management.base import BaseCommand

from newsletter.models import Artigo, Edicao


EDICOES_SEED = [
    # Semana 18 (06/05/2026)
    {
        'week_id': '2026-W18',
        'segment': 'engenharia',
        'date': date(2026, 5, 6),
        'title': 'Engenharia & IA',
        'description': 'Avanços técnicos, novos modelos e ferramentas para engenheiros de software e ML.',
        'artigos': [
            {
                'titulo': 'GPT-4.5 chega com janela de contexto de 2M tokens',
                'resumo': (
                    'A OpenAI anunciou a versão GPT-4.5 com expansão massiva de contexto e melhorias '
                    'em raciocínio matemático, pavimentando o uso em bases de código inteiras.'
                ),
                'link': 'https://openai.com/blog/gpt-4-5',
                'fonte': 'OpenAI Blog',
                'importancia': 9,
                'por_que_importa': (
                    'Contexto de 2M tokens permite analisar repositórios completos sem chunking — '
                    'muda o desenho de copilots e ferramentas de revisão automática.'
                ),
                'tema': 'Modelos de fronteira',
                'empresas': ['OpenAI'],
                'explicacao_jargao': 'janela de contexto — quanto texto o modelo consegue ler de uma vez.',
                'destaque': True,
                'ordem': 1,
            },
            {
                'titulo': 'Anthropic libera Claude 4.7 com tool use paralelo',
                'resumo': (
                    'O novo Claude pode executar várias chamadas de ferramenta em paralelo, '
                    'reduzindo latência em pipelines agentivos.'
                ),
                'link': 'https://www.anthropic.com/news/claude-4-7',
                'fonte': 'Anthropic',
                'importancia': 8,
                'por_que_importa': (
                    'Agentes ficam mais rápidos e baratos quando podem paralelizar — afeta '
                    'arquitetura de sistemas baseados em LLM.'
                ),
                'tema': 'Modelos de fronteira',
                'empresas': ['Anthropic'],
                'destaque': False,
                'ordem': 2,
            },
            {
                'titulo': 'Mojo 1.0 atinge GA com 35.000x speedup vs Python',
                'resumo': (
                    'A linguagem da Modular saiu de beta com suporte completo a CPython, '
                    'compilação ahead-of-time e suporte nativo a GPUs.'
                ),
                'link': 'https://www.modular.com/mojo',
                'fonte': 'Modular',
                'importancia': 7,
                'tema': 'Linguagens',
                'empresas': ['Modular'],
                'ordem': 3,
            },
        ],
    },
    {
        'week_id': '2026-W18',
        'segment': 'direito',
        'date': date(2026, 5, 6),
        'title': 'Direito & Regulação',
        'description': 'Legal tech, regulação de IA e impacto jurídico para profissionais de direito.',
        'artigos': [
            {
                'titulo': 'Freshfields adota Claude da Anthropic em toda a organização',
                'resumo': (
                    'O escritório global Freshfields fechou contrato corporativo com a Anthropic '
                    'para uso de IA generativa por todos os seus advogados, em uma das maiores '
                    'adoções já feitas no setor jurídico.'
                ),
                'link': 'https://lightjur.com/freshfields-anthropic',
                'fonte': 'LightJur',
                'importancia': 9,
                'por_que_importa': (
                    'Sinaliza a normalização do uso corporativo de IA em escritórios premium e '
                    'pressiona concorrentes a definirem políticas internas.'
                ),
                'tema': 'Adoção corporativa de IA',
                'empresas': ['Anthropic', 'Freshfields'],
                'explicacao_jargao': (
                    'agentes de IA — sistemas capazes de executar tarefas em várias etapas.'
                ),
                'destaque': True,
                'ordem': 1,
            },
            {
                'titulo': 'STJ define balizas para responsabilidade civil de IA',
                'resumo': (
                    'Tribunal Superior decidiu que empresas que operam sistemas autônomos '
                    'respondem objetivamente por danos a consumidores.'
                ),
                'link': 'https://www.conjur.com.br/stj-responsabilidade-ia',
                'fonte': 'Conjur',
                'importancia': 8,
                'por_que_importa': (
                    'Cria precedente nacional importante para defesa em ações contra '
                    'fornecedores de IA no Brasil.'
                ),
                'tema': 'Jurisprudência',
                'empresas': [],
                'ordem': 2,
            },
            {
                'titulo': 'AI Act europeu entra em fase 2 de obrigações',
                'resumo': (
                    'Empresas com sistemas classificados como de alto risco precisam comprovar '
                    'auditorias independentes a partir de agosto de 2026.'
                ),
                'link': 'https://www.jota.info/ai-act-fase-2',
                'fonte': 'Jota',
                'importancia': 7,
                'tema': 'Regulação internacional',
                'ordem': 3,
            },
        ],
    },
    {
        'week_id': '2026-W18',
        'segment': 'financas',
        'date': date(2026, 5, 6),
        'title': 'Finanças & Capital',
        'description': 'IA aplicada a mercado, gestão de risco e fintechs.',
        'artigos': [
            {
                'titulo': 'BlackRock anuncia fundo quant 100% gerido por IA',
                'resumo': (
                    'O novo veículo da BlackRock terá US$ 5 bilhões sob gestão e usará agentes '
                    'autônomos para decisões de alocação em renda variável global.'
                ),
                'link': 'https://www.bloomberg.com/blackrock-ai-fund',
                'fonte': 'Bloomberg',
                'importancia': 9,
                'por_que_importa': (
                    'É a primeira vez que uma gestora top-tier remove humanos do processo de '
                    'decisão final — referência para a indústria.'
                ),
                'tema': 'Asset management',
                'empresas': ['BlackRock'],
                'destaque': True,
                'ordem': 1,
            },
            {
                'titulo': 'Itaú Asset triplica equipe de ML em São Paulo',
                'resumo': (
                    'O braço de gestão do Itaú abriu 60 vagas para cientistas de dados focados '
                    'em previsão de fluxos e detecção de anomalias.'
                ),
                'link': 'https://valor.globo.com/itau-ml-equipe',
                'fonte': 'Valor Econômico',
                'importancia': 7,
                'tema': 'Mercado local',
                'empresas': ['Itaú Asset'],
                'ordem': 2,
            },
        ],
    },
    # Semana 17 (29/04/2026) — só para ter histórico no arquivo
    {
        'week_id': '2026-W17',
        'segment': 'engenharia',
        'date': date(2026, 4, 29),
        'title': 'Engenharia & IA',
        'description': 'Avanços técnicos, novos modelos e ferramentas para engenheiros de software e ML.',
        'artigos': [
            {
                'titulo': 'Cursor lança modo "background agent" para PRs',
                'resumo': (
                    'O editor agora pode abrir e revisar pull requests de forma assíncrona, '
                    'sem intervenção do dev durante a execução.'
                ),
                'link': 'https://cursor.sh/blog/background-agent',
                'fonte': 'Cursor Blog',
                'importancia': 8,
                'tema': 'Dev tools',
                'empresas': ['Cursor'],
                'destaque': True,
                'ordem': 1,
            },
        ],
    },
]


class Command(BaseCommand):
    help = 'Seed Edições da newsletter (week/segment) com Artigos de exemplo.'

    def handle(self, *args, **options):
        for ed_data in EDICOES_SEED:
            artigos_data = ed_data.pop('artigos')
            edicao, created = Edicao.objects.update_or_create(
                week_id=ed_data['week_id'],
                segment=ed_data['segment'],
                defaults=ed_data,
            )
            verb = 'Created' if created else 'Updated'
            self.stdout.write(self.style.SUCCESS(f'{verb}: {edicao}'))

            # Substitui artigos por idempotência
            edicao.artigos.all().delete()
            for art in artigos_data:
                Artigo.objects.create(edicao=edicao, **art)
            self.stdout.write(f'  → {len(artigos_data)} artigos')

        self.stdout.write(self.style.SUCCESS('Newsletter seed complete.'))
