from django.contrib import admin

from .models import FAQ, SiteSettings


admin.site.site_header = "InsperAI Admin"


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ['email', 'contact_recipient_email']
    fields = ['email', 'contact_recipient_email', 'instagram_url', 'linkedin_url', 'github_url', 'endereco']

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ['pergunta', 'ordem']
    list_editable = ['ordem']
    ordering = ['ordem']
