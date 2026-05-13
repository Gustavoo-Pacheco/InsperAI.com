from rest_framework import serializers

from .models import ContentBlock, Depoimento, Milestone, Parceiro, Valor


class ParceirosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parceiro
        fields = ['id', 'nome', 'logo', 'url', 'descricao', 'ordem']


class DepoimentosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Depoimento
        fields = ['id', 'autor', 'cargo', 'texto', 'foto']


class ValorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Valor
        fields = ['id', 'titulo', 'descricao', 'ordem']


class MilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Milestone
        fields = ['id', 'ano', 'titulo', 'descricao', 'foto', 'ordem']


class ContentBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentBlock
        fields = ['id', 'slug', 'titulo', 'texto', 'ordem', 'posicao']
