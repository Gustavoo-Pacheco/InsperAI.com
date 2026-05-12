from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAdminUser
from rest_framework.throttling import AnonRateThrottle
from django_filters.rest_framework import DjangoFilterBackend
from .models import Artigo, Inscricao
from .serializers import ArtigoSerializer, InscricaoSerializer

class ArtigoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Artigo.objects.all()
    serializer_class = ArtigoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['setor', 'destaque']

class InscricaoViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Inscricao.objects.all()
    serializer_class = InscricaoSerializer
    throttle_classes = [AnonRateThrottle]

    def get_permissions(self):
        if self.action == 'list':
            return [IsAdminUser()]
        return []
