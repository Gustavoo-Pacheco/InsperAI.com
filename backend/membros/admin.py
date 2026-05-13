from django.contrib import admin
from django.utils.html import format_html
from .models import Membro

@admin.register(Membro)
class MembroAdmin(admin.ModelAdmin):
    list_display = ['nome', 'cargo', 'nivel', 'foto_preview', 'ativo', 'alumni', 'ordem']
    list_editable = ['ativo', 'alumni', 'ordem']
    list_filter = ['nivel', 'ativo', 'alumni', 'semestre']
    search_fields = ['nome', 'cargo']
    ordering = ['ordem']

    def foto_preview(self, obj):
        if obj.foto:
            return format_html(f'<img src="{obj.foto.url}" style="max-height: 50px; border-radius: 4px;" />')
        return "—"
    foto_preview.short_description = "Foto"
