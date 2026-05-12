from rest_framework import serializers
from .models import SiteSettings, FAQ, Parceiro, Depoimento

class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = ['email', 'contact_recipient_email', 'instagram_url', 'linkedin_url', 'endereco', 'google_maps_embed_url']

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['id', 'pergunta', 'resposta', 'ordem']

class ParceirosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parceiro
        fields = ['id', 'nome', 'logo', 'url', 'ordem']

class DepoimentosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Depoimento
        fields = ['id', 'autor', 'cargo', 'texto', 'foto']
