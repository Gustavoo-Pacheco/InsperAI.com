from django.core.exceptions import ValidationError
from django.db import models


class Parceiro(models.Model):
    nome = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='parceiros/', blank=True)
    url = models.URLField(blank=True)
    descricao = models.TextField(blank=True, help_text="Texto exibido ao passar o mouse no card")
    ordem = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['ordem']

    def __str__(self):
        return self.nome


class Depoimento(models.Model):
    autor = models.CharField(max_length=255)
    cargo = models.CharField(max_length=255)
    texto = models.TextField()
    foto = models.ImageField(upload_to='depoimentos/', blank=True)
    ordem = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['ordem']

    def __str__(self):
        return self.autor


class SobreContent(models.Model):
    hero_eyebrow = models.CharField(max_length=120, default="SOBRE NÓS")
    hero_quote = models.TextField(help_text="Frase-manifesto exibida no topo da página /sobre")
    hero_attribution = models.CharField(max_length=255, blank=True)
    headline = models.CharField(
        max_length=200,
        blank=True,
        help_text="Título da seção Quem Somos (ex: 'A comunidade de IA do Insper')",
    )
    missao = models.TextField(
        help_text="Parágrafo da seção Quem Somos (combina quem somos + missão)"
    )
    semester = models.CharField(
        max_length=16,
        default="2026.1",
        help_text="Semestre exibido no título da seção Stats (ex: '2026.1')",
    )
    applicants_count = models.PositiveIntegerField(
        default=0, help_text="Total de inscritos no último processo seletivo"
    )
    projects_delivered = models.PositiveIntegerField(
        blank=True, null=True, help_text="Projetos entregues (opcional)"
    )
    founding_year = models.PositiveIntegerField(
        blank=True, null=True, help_text="Ano de fundação da organização"
    )

    class Meta:
        verbose_name = "Sobre — Conteúdo"
        verbose_name_plural = "Sobre — Conteúdo"

    def save(self, *args, **kwargs):
        if not self.pk and SobreContent.objects.exists():
            raise ValidationError("Only one SobreContent instance is allowed")
        super().save(*args, **kwargs)

    def __str__(self):
        return "Sobre — Conteúdo"


class Valor(models.Model):
    titulo = models.CharField(max_length=120)
    descricao = models.TextField()
    ordem = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['ordem']
        verbose_name = "Valor"
        verbose_name_plural = "Valores"

    def __str__(self):
        return self.titulo


class Milestone(models.Model):
    ano = models.PositiveIntegerField()
    titulo = models.CharField(max_length=200)
    descricao = models.TextField()
    foto = models.ImageField(upload_to='milestones/', blank=True)
    ordem = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['ano', 'ordem']
        verbose_name = "Marco histórico"
        verbose_name_plural = "Marcos históricos"

    def __str__(self):
        return f"{self.ano} — {self.titulo}"


class ContentBlock(models.Model):
    POSICAO_CHOICES = [
        ("apos_quem_somos", "Após Quem Somos"),
        ("apos_stats", "Após Stats"),
        ("apos_parceiros", "Após Parceiros"),
        ("apos_depoimentos", "Após Depoimentos"),
        ("apos_eventos", "Após Eventos"),
        ("apos_valores", "Após Valores"),
        ("apos_historia", "Após História"),
        # Legacy positions kept for backward compat; not rendered on /sobre anymore.
        ("apos_missao", "Após Missão (legado)"),
    ]

    slug = models.SlugField(unique=True, max_length=120)
    titulo = models.CharField(max_length=200)
    texto = models.TextField()
    ordem = models.PositiveIntegerField(default=0)
    ativo = models.BooleanField(default=True)
    posicao = models.CharField(max_length=32, choices=POSICAO_CHOICES, default="apos_quem_somos")

    class Meta:
        ordering = ['posicao', 'ordem']
        verbose_name = "Bloco de conteúdo (Sobre)"
        verbose_name_plural = "Blocos de conteúdo (Sobre)"

    def __str__(self):
        return self.titulo
