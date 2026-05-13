from django.db import models

class Membro(models.Model):
    NIVEL_CHOICES = [
        ('presidencia', 'Presidência'),
        ('diretoria', 'Diretoria'),
        ('coordenacao', 'Coordenação'),
        ('equipe', 'Equipe'),
        ('trainee', 'Trainee'),
    ]

    nome = models.CharField(max_length=255)
    cargo = models.CharField(max_length=255)
    nivel = models.CharField(max_length=20, choices=NIVEL_CHOICES)
    semestre = models.CharField(max_length=10, help_text="e.g. 2024.1")
    foto = models.ImageField(upload_to='membros/')
    linkedin_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    ativo = models.BooleanField(default=True)
    alumni = models.BooleanField(default=False)
    ordem = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['ordem']

    def __str__(self):
        return self.nome
