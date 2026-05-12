from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from .models import Membro
from .serializers import MembroSerializer

class MembroViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Membro.objects.all()
    serializer_class = MembroSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['ativo', 'nivel']
    ordering_fields = ['ordem', 'nome']
    ordering = ['ordem']
