from rest_framework import serializers
from .models import ProcessoSeletivo, EtapaProcessoSeletivo

class EtapaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EtapaProcessoSeletivo
        fields = ['id', 'titulo', 'descricao', 'ordem', 'ativa']

class ProcessoSeletivoSerializer(serializers.ModelSerializer):
    etapas = EtapaSerializer(many=True, read_only=True)

    class Meta:
        model = ProcessoSeletivo
        fields = ['status', 'proxima_edicao', 'url_inscricao', 'texto_cta', 'etapas']
