from rest_framework import serializers
from .models import Artigo, Inscricao

class ArtigoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artigo
        fields = ['id', 'titulo', 'resumo', 'setor', 'edicao', 'destaque', 'publicado_em']

class InscricaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inscricao
        fields = ['email', 'setor']
