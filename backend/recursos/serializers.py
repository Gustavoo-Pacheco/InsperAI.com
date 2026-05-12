from rest_framework import serializers
from .models import Recurso

class RecursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recurso
        fields = ['id', 'titulo', 'descricao', 'url', 'secao', 'nivel', 'autor', 'data', 'ordem']
