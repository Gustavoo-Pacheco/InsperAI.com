from rest_framework import serializers
from .models import Evento

class EventoSerializer(serializers.ModelSerializer):
    is_passado = serializers.BooleanField(read_only=True)

    class Meta:
        model = Evento
        fields = ['id', 'titulo', 'subtitulo', 'palestrante', 'descricao', 'data', 'imagem', 'link', 'destaque', 'passado', 'is_passado']
