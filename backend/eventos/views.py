from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from .models import Evento
from .serializers import EventoSerializer

class EventoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['destaque', 'passado']
