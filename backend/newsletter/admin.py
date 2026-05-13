from django.contrib import admin

from .models import Artigo, Edicao, Inscricao


class ArtigoInline(admin.StackedInline):
    model = Artigo
    extra = 0
    fields = [
        'titulo',
        'fonte',
        'link',
        'importancia',
        'tema',
        'empresas',
        'destaque',
        'ordem',
        'resumo',
        'por_que_importa',
        'explicacao_jargao',
    ]


@admin.register(Edicao)
class EdicaoAdmin(admin.ModelAdmin):
    list_display = ['week_id', 'segment', 'date', 'title']
    list_filter = ['segment', 'date']
    ordering = ['-date', 'segment']
    inlines = [ArtigoInline]
    search_fields = ['week_id', 'title', 'description']


@admin.register(Artigo)
class ArtigoAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'edicao', 'importancia', 'destaque']
    list_filter = ['edicao__segment', 'destaque']
    search_fields = ['titulo', 'resumo', 'fonte', 'tema']
    autocomplete_fields = ['edicao']


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
