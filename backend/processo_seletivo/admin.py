from django.contrib import admin
from django.shortcuts import redirect
from django.urls import path
from .models import ProcessoSeletivo, EtapaProcessoSeletivo

class EtapaInline(admin.TabularInline):
    model = EtapaProcessoSeletivo
    fields = ['titulo', 'descricao', 'ordem', 'ativa']
    extra = 1
    ordering = ['ordem']

@admin.register(ProcessoSeletivo)
class ProcessoSeletivoAdmin(admin.ModelAdmin):
    list_display = ['proxima_edicao', 'status']
    fields = ['proxima_edicao', 'status', 'url_inscricao', 'texto_cta']
    inlines = [EtapaInline]

    def has_add_permission(self, request):
        return not ProcessoSeletivo.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    def changelist_view(self, request, extra_context=None):
        processo = ProcessoSeletivo.objects.first()
        if processo:
            return redirect('admin:processo_seletivo_processoseletivo_change', processo.pk)
        return super().changelist_view(request, extra_context)

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)


    def get_readonly_fields(self, request, obj=None):
        if obj and ProcessoSeletivo.objects.count() == 1:
            return self.readonly_fields
        return self.readonly_fields
