from django.contrib import admin
from .models import Recurso

@admin.register(Recurso)
class RecursoAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'secao', 'nivel', 'autor', 'ordem']
    list_editable = ['ordem']
    list_filter = ['secao', 'nivel', 'data']
    search_fields = ['titulo', 'descricao', 'autor']
    ordering = ['ordem']
