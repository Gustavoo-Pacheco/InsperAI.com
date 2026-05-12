from django.contrib import admin
from .models import ProcessoSeletivo, EtapaProcessoSeletivo

class EtapaInline(admin.TabularInline):
    model = EtapaProcessoSeletivo
    fields = ['titulo', 'descricao', 'ordem', 'ativa']
    extra = 1

@admin.register(ProcessoSeletivo)
class ProcessoSeletivoAdmin(admin.ModelAdmin):
    list_display = ['proxima_edicao', 'status']
    inlines = [EtapaInline]

    def has_add_permission(self, request):
        return not ProcessoSeletivo.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False
