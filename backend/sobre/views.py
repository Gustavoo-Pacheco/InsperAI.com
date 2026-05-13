from datetime import date

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView

from .models import ContentBlock, Depoimento, Milestone, Parceiro, SobreContent, Valor
from .serializers import (
    ContentBlockSerializer,
    DepoimentosSerializer,
    MilestoneSerializer,
    ParceirosSerializer,
    ValorSerializer,
)


class ParceirosViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Parceiro.objects.all()
    serializer_class = ParceirosSerializer


class DepoimentosViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Depoimento.objects.all()
    serializer_class = DepoimentosSerializer


class SobreView(APIView):
    def get(self, request):
        content = SobreContent.objects.first()
        valores = Valor.objects.all()
        milestones = Milestone.objects.all()
        blocks = ContentBlock.objects.filter(ativo=True)

        # Derived stats — count from existing tables
        from membros.models import Membro
        from eventos.models import Evento

        membros_ativos = Membro.objects.filter(ativo=True).count()
        eventos_realizados = Evento.objects.filter(passado=True).count()
        parceiros_count = Parceiro.objects.count()

        if content:
            applicants = content.applicants_count
            projetos = content.projects_delivered
            anos = (date.today().year - content.founding_year) if content.founding_year else None
            quem_somos = {
                "headline": content.headline or "Quem somos",
                "body": content.missao,
            }
            semester = content.semester
        else:
            applicants = 0
            projetos = None
            anos = None
            quem_somos = {"headline": "Quem somos", "body": ""}
            semester = "2026.1"

        return Response({
            "quem_somos": quem_somos,
            "valores": ValorSerializer(valores, many=True).data,
            "milestones": MilestoneSerializer(milestones, many=True, context={"request": request}).data,
            "content_blocks": ContentBlockSerializer(blocks, many=True).data,
            "stats": {
                "semester": semester,
                "membros_ativos": membros_ativos,
                "eventos_realizados": eventos_realizados,
                "parceiros": parceiros_count,
                "inscritos_processo_seletivo": applicants,
                "projetos_entregues": projetos,
                "anos_atuacao": anos,
            },
        }, status=HTTP_200_OK)
