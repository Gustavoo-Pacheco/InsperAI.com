from django.contrib import admin
from .models import Artigo, Inscricao

@admin.register(Artigo)
class ArtigoAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'setor', 'edicao', 'destaque', 'publicado_em']
    list_filter = ['setor', 'destaque', 'publicado_em']
    search_fields = ['titulo', 'resumo']
    ordering = ['-publicado_em']

@admin.register(Inscricao)
class InscricaoAdmin(admin.ModelAdmin):
    list_display = ['email', 'setor', 'criado_em']
    list_filter = ['setor', 'criado_em']
    search_fields = ['email']
    readonly_fields = ['email', 'setor', 'criado_em']

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False
