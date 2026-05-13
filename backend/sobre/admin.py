from django.contrib import admin
from django.utils.html import format_html

from .models import ContentBlock, Depoimento, Milestone, Parceiro, SobreContent, Valor


@admin.register(Parceiro)
class ParceirosAdmin(admin.ModelAdmin):
    list_display = ['nome', 'logo_preview', 'ordem']
    list_editable = ['ordem']
    ordering = ['ordem']

    def logo_preview(self, obj):
        if obj.logo:
            return format_html('<img src="{}" style="max-height: 50px;" />', obj.logo.url)
        return "—"
    logo_preview.short_description = "Logo"


@admin.register(Depoimento)
class DepoimentoAdmin(admin.ModelAdmin):
    list_display = ['autor', 'cargo', 'ordem']
    list_editable = ['ordem']
    list_filter = ['cargo']
    search_fields = ['autor', 'cargo']
    ordering = ['ordem']


@admin.register(SobreContent)
class SobreContentAdmin(admin.ModelAdmin):
    fieldsets = (
        ("Quem Somos", {"fields": ("headline", "missao")}),
        ("Stats", {"fields": ("semester", "applicants_count", "projects_delivered", "founding_year")}),
        ("Legado (não exibido em /sobre)", {
            "classes": ("collapse",),
            "fields": ("hero_eyebrow", "hero_quote", "hero_attribution"),
        }),
    )

    def has_add_permission(self, request):
        return not SobreContent.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(Valor)
class ValorAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'ordem']
    list_editable = ['ordem']
    ordering = ['ordem']


@admin.register(Milestone)
class MilestoneAdmin(admin.ModelAdmin):
    list_display = ['ano', 'titulo', 'foto_preview', 'ordem']
    list_editable = ['ordem']
    ordering = ['ano', 'ordem']
    fields = ['ano', 'titulo', 'descricao', 'foto', 'ordem']

    def foto_preview(self, obj):
        if obj.foto:
            return format_html('<img src="{}" style="max-height: 40px; border-radius: 4px;" />', obj.foto.url)
        return "—"
    foto_preview.short_description = "Foto"


@admin.register(ContentBlock)
class ContentBlockAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'posicao', 'ordem', 'ativo']
    list_editable = ['posicao', 'ordem', 'ativo']
    list_filter = ['posicao', 'ativo']
    search_fields = ['titulo', 'slug']
    prepopulated_fields = {"slug": ("titulo",)}
