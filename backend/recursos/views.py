from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from .models import Recurso
from .serializers import RecursoSerializer

class RecursoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Recurso.objects.all()
    serializer_class = RecursoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['secao', 'nivel']
