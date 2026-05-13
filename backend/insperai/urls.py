from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from core.views import SiteSettingsView, FAQViewSet
from sobre.views import DepoimentosViewSet, ParceirosViewSet, SobreView
from membros.views import MembroViewSet
from eventos.views import EventoViewSet
from recursos.views import RecursoViewSet
from newsletter.views import EdicaoDetailByWeekSegmentView, EdicaoViewSet, InscricaoViewSet
from processo_seletivo.views import ProcessoSeletivoView, EtapaViewSet

router = DefaultRouter()
router.register(r'core/faq', FAQViewSet, basename='faq')
router.register(r'parceiros', ParceirosViewSet, basename='parceiro')
router.register(r'depoimentos', DepoimentosViewSet, basename='depoimento')
router.register(r'membros', MembroViewSet, basename='membro')
router.register(r'eventos', EventoViewSet, basename='evento')
router.register(r'recursos', RecursoViewSet, basename='recurso')
router.register(r'newsletter/edicoes', EdicaoViewSet, basename='edicao')
router.register(r'newsletter/inscricoes', InscricaoViewSet, basename='inscricao')
router.register(r'processo-seletivo/etapas', EtapaViewSet, basename='etapa')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path(
        'api/newsletter/edicoes/<str:week_id>/<str:segment>/',
        EdicaoDetailByWeekSegmentView.as_view(),
        name='edicao-by-week-segment',
    ),
    path('api/core/settings/', SiteSettingsView.as_view()),
    path('api/sobre/', SobreView.as_view()),
    path('api/processo-seletivo/', ProcessoSeletivoView.as_view()),
    path('api/contato/enviar/', include('contato.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
