from rest_framework import serializers
from .models import Membro

class MembroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membro
        fields = ['id', 'nome', 'cargo', 'nivel', 'semestre', 'foto', 'linkedin_url', 'github_url', 'ativo', 'alumni', 'ordem']
