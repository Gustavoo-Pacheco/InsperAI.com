from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from .models import Artigo, Inscricao
from .serializers import ArtigoSerializer, InscricaoSerializer

class ArtigoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Artigo.objects.all()
    serializer_class = ArtigoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['setor', 'destaque']

class InscricaoViewSet(viewsets.ModelViewSet):
    queryset = Inscricao.objects.all()
    serializer_class = InscricaoSerializer
