from django.db import models

class Artigo(models.Model):
    SETOR_CHOICES = [
        ('engenharia', 'Engenharia'),
        ('direito', 'Direito'),
        ('financas', 'Finanças'),
    ]

    titulo = models.CharField(max_length=255)
    resumo = models.TextField()
    setor = models.CharField(max_length=20, choices=SETOR_CHOICES)
    edicao = models.CharField(max_length=50, help_text="e.g. Ed. 3")
    destaque = models.BooleanField(default=False, help_text="Featured article in this sector")
    publicado_em = models.DateField()

    class Meta:
        ordering = ['-publicado_em']

    def __str__(self):
        return self.titulo


class Inscricao(models.Model):
    SETOR_CHOICES = [
        ('engenharia', 'Engenharia'),
        ('direito', 'Direito'),
        ('financas', 'Finanças'),
    ]

    email = models.EmailField()
    setor = models.CharField(max_length=20, choices=SETOR_CHOICES)
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-criado_em']

    def __str__(self):
        return f"{self.email} - {self.setor}"
