from django.db import models

class Recurso(models.Model):
    SECAO_CHOICES = [
        ('material', 'Material Próprio'),
        ('cursos', 'Cursos Recomendados'),
    ]

    NIVEL_CHOICES = [
        ('iniciante', 'Iniciante'),
        ('intermediario', 'Intermediário'),
        ('avancado', 'Avançado'),
    ]

    titulo = models.CharField(max_length=255)
    descricao = models.TextField()
    url = models.URLField()
    secao = models.CharField(max_length=20, choices=SECAO_CHOICES)
    nivel = models.CharField(max_length=20, choices=NIVEL_CHOICES, blank=True)
    autor = models.CharField(max_length=255, blank=True)
    data = models.DateField(blank=True, null=True)
    ordem = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['ordem']

    def __str__(self):
        return self.titulo
