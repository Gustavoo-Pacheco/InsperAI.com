from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.views import APIView

from .models import SETOR_CHOICES, Edicao, Inscricao
from .serializers import (
    EdicaoDetailSerializer,
    EdicaoSummarySerializer,
    InscricaoSerializer,
)


class EdicaoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Edicao.objects.all()
    serializer_class = EdicaoSummarySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['segment']

    @action(detail=False, methods=['get'], url_path='latest-by-segment')
    def latest_by_segment(self, request):
        segments = [code for code, _ in SETOR_CHOICES]
        edicoes = []
        for segment in segments:
            edicao = (
                Edicao.objects.filter(segment=segment).order_by('-date').first()
            )
            if edicao is not None:
                edicoes.append(edicao)
        serializer = EdicaoSummarySerializer(edicoes, many=True)
        return Response(serializer.data)


class EdicaoDetailByWeekSegmentView(APIView):
    """GET /api/newsletter/edicoes/<week_id>/<segment>/"""

    def get(self, request, week_id: str, segment: str):
        edicao = get_object_or_404(
            Edicao.objects.prefetch_related('artigos'),
            week_id=week_id,
            segment=segment,
        )
        serializer = EdicaoDetailSerializer(edicao)
        return Response(serializer.data)


class InscricaoViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Inscricao.objects.all()
    serializer_class = InscricaoSerializer
    throttle_classes = [AnonRateThrottle]

    def get_permissions(self):
        if self.action == 'list':
            return [IsAdminUser()]
        return []

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            self.perform_create(serializer)
        except IntegrityError:
            return Response(
                {
                    'detail': 'already_subscribed',
                    'setor': serializer.validated_data.get('setor'),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(serializer.data, status=status.HTTP_201_CREATED)
