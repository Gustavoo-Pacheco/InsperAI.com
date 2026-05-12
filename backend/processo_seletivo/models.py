from django.db import models
from django.core.exceptions import ValidationError

class ProcessoSeletivo(models.Model):
    STATUS_CHOICES = [
        ('aberto', 'Aberto'),
        ('fechado', 'Fechado'),
        ('em_breve', 'Em Breve'),
    ]

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='em_breve')
    proxima_edicao = models.CharField(max_length=50, help_text="e.g. 2026.2")
    url_inscricao = models.URLField(blank=True)
    texto_cta = models.CharField(max_length=255, default="Faça parte de uma equipe que constrói o futuro da Inteligência Artificial no Brasil.")

    class Meta:
        verbose_name_plural = "Processo Seletivo"

    def save(self, *args, **kwargs):
        if not self.pk and ProcessoSeletivo.objects.exists():
            raise ValidationError("Only one ProcessoSeletivo instance is allowed")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Processo Seletivo {self.proxima_edicao}"


class EtapaProcessoSeletivo(models.Model):
    processo_seletivo = models.ForeignKey(ProcessoSeletivo, on_delete=models.CASCADE, related_name='etapas')
    titulo = models.CharField(max_length=255)
    descricao = models.TextField()
    ordem = models.PositiveIntegerField(default=0)
    ativa = models.BooleanField(default=True)

    class Meta:
        ordering = ['ordem']

    def __str__(self):
        return self.titulo
