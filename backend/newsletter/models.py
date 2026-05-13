from django.db import models

SETOR_CHOICES = [
    ('engenharia', 'Engenharia'),
    ('direito', 'Direito'),
    ('financas', 'Finanças'),
]

MES_NOMES = {
    1: 'Janeiro',
    2: 'Fevereiro',
    3: 'Março',
    4: 'Abril',
    5: 'Maio',
    6: 'Junho',
    7: 'Julho',
    8: 'Agosto',
    9: 'Setembro',
    10: 'Outubro',
    11: 'Novembro',
    12: 'Dezembro',
}


class Edicao(models.Model):
    week_id = models.CharField(max_length=8, help_text="ISO week id, e.g. 2026-W18")
    segment = models.CharField(max_length=20, choices=SETOR_CHOICES)
    date = models.DateField()
    title = models.CharField(max_length=120)
    description = models.TextField()

    class Meta:
        ordering = ['-date', 'segment']
        constraints = [
            models.UniqueConstraint(
                fields=['week_id', 'segment'],
                name='unique_edicao_week_segment',
            ),
        ]

    @property
    def story_count(self) -> int:
        return self.artigos.count()

    @property
    def url(self) -> str:
        return f"/newsletter/{self.week_id}/{self.segment}"

    def __str__(self) -> str:
        return f"{self.week_id} · {self.get_segment_display()} — {self.title}"


class Artigo(models.Model):
    edicao = models.ForeignKey(
        Edicao,
        on_delete=models.CASCADE,
        related_name='artigos',
    )
    titulo = models.CharField(max_length=255)
    resumo = models.TextField()
    link = models.URLField(max_length=500)
    fonte = models.CharField(max_length=120)
    importancia = models.PositiveSmallIntegerField(help_text="1-10")
    por_que_importa = models.TextField(blank=True)
    tema = models.CharField(max_length=120, blank=True)
    empresas = models.JSONField(default=list, blank=True)
    explicacao_jargao = models.TextField(blank=True)
    destaque = models.BooleanField(default=False, help_text="Featured article in this edition")
    ordem = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['-destaque', '-importancia', 'ordem']

    def __str__(self) -> str:
        return self.titulo


class Inscricao(models.Model):
    email = models.EmailField()
    setor = models.CharField(max_length=20, choices=SETOR_CHOICES)
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-criado_em']
        constraints = [
            models.UniqueConstraint(
                fields=['email', 'setor'],
                name='unique_inscricao_email_setor',
            ),
        ]

    def __str__(self) -> str:
        return f"{self.email} - {self.setor}"
