from django.contrib import admin
from django.utils.html import format_html
from .models import Evento

@admin.register(Evento)
class EventoAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'data', 'imagem_preview', 'destaque', 'passado']
    list_filter = ['destaque', 'passado', 'data']
    search_fields = ['titulo', 'descricao']
    ordering = ['-data']

    def imagem_preview(self, obj):
        if obj.imagem:
            return format_html(f'<img src="{obj.imagem.url}" style="max-height: 50px; border-radius: 4px;" />')
        return "—"
    imagem_preview.short_description = "Imagem"
