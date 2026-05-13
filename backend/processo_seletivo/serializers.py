from rest_framework import serializers
from .models import ProcessoSeletivo, EtapaProcessoSeletivo, CriterioProcessoSeletivo

class EtapaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EtapaProcessoSeletivo
        fields = ['id', 'titulo', 'descricao', 'ordem', 'ativa']

class CriterioSerializer(serializers.ModelSerializer):
    class Meta:
        model = CriterioProcessoSeletivo
        fields = ['id', 'titulo', 'descricao', 'icon', 'ordem', 'ativa']

class ProcessoSeletivoSerializer(serializers.ModelSerializer):
    etapas = EtapaSerializer(many=True, read_only=True)
    criterios = CriterioSerializer(many=True, read_only=True)

    class Meta:
        model = ProcessoSeletivo
        fields = ['status', 'proxima_edicao', 'url_inscricao', 'texto_cta', 'etapas', 'criterios']
