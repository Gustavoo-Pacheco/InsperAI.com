from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from .models import SiteSettings, FAQ, Parceiro, Depoimento
from .serializers import SiteSettingsSerializer, FAQSerializer, ParceirosSerializer, DepoimentosSerializer


class SiteSettingsView(APIView):
    def get(self, request):
        settings = SiteSettings.objects.first()
        if not settings:
            return Response({}, status=HTTP_200_OK)
        serializer = SiteSettingsSerializer(settings)
        return Response(serializer.data)


class FAQViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer


class ParceirosViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Parceiro.objects.all()
    serializer_class = ParceirosSerializer


class DepoimentosViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Depoimento.objects.all()
    serializer_class = DepoimentosSerializer
