from rest_framework import serializers

from .models import Artigo, Edicao, Inscricao


class ArtigoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artigo
        fields = [
            'id',
            'titulo',
            'resumo',
            'link',
            'fonte',
            'importancia',
            'por_que_importa',
            'tema',
            'empresas',
            'explicacao_jargao',
            'destaque',
            'ordem',
        ]


class EdicaoSummarySerializer(serializers.ModelSerializer):
    story_count = serializers.IntegerField(read_only=True)
    url = serializers.CharField(read_only=True)

    class Meta:
        model = Edicao
        fields = [
            'id',
            'week_id',
            'segment',
            'date',
            'title',
            'description',
            'story_count',
            'url',
        ]


class EdicaoDetailSerializer(EdicaoSummarySerializer):
    artigos = ArtigoSerializer(many=True, read_only=True)

    class Meta(EdicaoSummarySerializer.Meta):
        fields = EdicaoSummarySerializer.Meta.fields + ['artigos']


class InscricaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inscricao
        fields = ['id', 'email', 'setor', 'criado_em']
        read_only_fields = ['id', 'criado_em']
        # Skip DRF's auto UniqueTogetherValidator so the InscricaoViewSet.create
        # handler can translate IntegrityError into a typed `already_subscribed`
        # response that the frontend distinguishes from generic validation errors.
        validators = []
