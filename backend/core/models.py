from django.db import models
from django.core.exceptions import ValidationError

class SiteSettings(models.Model):
    email = models.EmailField(max_length=254, help_text="Public display email")
    contact_recipient_email = models.EmailField(help_text="Where contact form submissions are sent")
    instagram_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    endereco = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "Site Settings"

    def save(self, *args, **kwargs):
        if not self.pk and SiteSettings.objects.exists():
            raise ValidationError("Only one SiteSettings instance is allowed")
        super().save(*args, **kwargs)

    def __str__(self):
        return "Site Settings"


class FAQ(models.Model):
    pergunta = models.CharField(max_length=500)
    resposta = models.TextField()
    ordem = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['ordem']

    def __str__(self):
        return self.pergunta


class Parceiro(models.Model):
    nome = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='parceiros/')
    url = models.URLField(blank=True)
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
