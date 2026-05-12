from django.contrib import admin
from django.utils.html import format_html
from .models import SiteSettings, FAQ, Parceiro, Depoimento

admin.site.site_header = "InsperAI Admin"

@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ['email', 'contact_recipient_email']
    fields = ['email', 'contact_recipient_email', 'instagram_url', 'linkedin_url', 'endereco', 'google_maps_embed_url']

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ['pergunta', 'ordem']
    list_editable = ['ordem']
    ordering = ['ordem']

@admin.register(Parceiro)
class ParceirosAdmin(admin.ModelAdmin):
    list_display = ['nome', 'logo_preview', 'ordem']
    list_editable = ['ordem']
    ordering = ['ordem']

    def logo_preview(self, obj):
        if obj.logo:
            return format_html(f'<img src="{obj.logo.url}" style="max-height: 50px;" />')
        return "—"
    logo_preview.short_description = "Logo"

@admin.register(Depoimento)
class DepoimentoAdmin(admin.ModelAdmin):
    list_display = ['autor', 'cargo']
    list_filter = ['cargo']
    search_fields = ['autor', 'cargo']
