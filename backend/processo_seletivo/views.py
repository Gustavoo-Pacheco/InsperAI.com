from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from .models import ProcessoSeletivo, EtapaProcessoSeletivo
from .serializers import ProcessoSeletivoSerializer, EtapaSerializer

class ProcessoSeletivoView(APIView):
    def get(self, request):
        processo = ProcessoSeletivo.objects.first()
        if not processo:
            return Response({}, status=HTTP_200_OK)
        serializer = ProcessoSeletivoSerializer(processo)
        return Response(serializer.data)

class EtapaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = EtapaProcessoSeletivo.objects.all()
    serializer_class = EtapaSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['ativa']
