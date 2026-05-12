import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR
from django.core.mail import send_mail
from django.conf import settings
from core.models import SiteSettings

logger = logging.getLogger(__name__)

class ContatoView(APIView):
    def post(self, request):
        nome = request.data.get('nome')
        email = request.data.get('email')
        assunto = request.data.get('assunto')
        mensagem = request.data.get('mensagem')

        if not all([nome, email, assunto, mensagem]):
            return Response({'detail': 'Todos os campos são obrigatórios'}, status=HTTP_400_BAD_REQUEST)

        try:
            settings_obj = SiteSettings.objects.first()
            recipient = settings_obj.contact_recipient_email if settings_obj else 'admin@localhost'

            email_body = f"""
Novo contato recebido no site InsperAI.com:

Nome: {nome}
Email: {email}
Assunto: {assunto}

Mensagem:
{mensagem}
            """

            send_mail(
                subject=f'Novo contato: {assunto}',
                message=email_body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[recipient],
            )

            return Response({'detail': 'Mensagem enviada com sucesso'}, status=HTTP_200_OK)
        except Exception as e:
            logger.exception("Failed to send contact email: %s", e)
            return Response({'detail': 'Erro ao enviar mensagem'}, status=HTTP_500_INTERNAL_SERVER_ERROR)
