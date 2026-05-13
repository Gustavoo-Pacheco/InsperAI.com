from rest_framework import serializers

from .models import FAQ, SiteSettings


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = ['email', 'contact_recipient_email', 'instagram_url', 'linkedin_url', 'github_url', 'endereco']


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['id', 'pergunta', 'resposta', 'ordem']
