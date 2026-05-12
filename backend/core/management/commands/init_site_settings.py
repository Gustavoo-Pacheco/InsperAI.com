from django.core.management.base import BaseCommand
from core.models import SiteSettings

class Command(BaseCommand):
    help = 'Initialize the singleton SiteSettings instance if it does not exist'

    def handle(self, *args, **options):
        if SiteSettings.objects.exists():
            self.stdout.write(self.style.SUCCESS('SiteSettings already exists'))
            return

        settings = SiteSettings.objects.create(
            email='contato@insperai.com.br',
            contact_recipient_email='admin@insperai.com.br',
            instagram_url='https://instagram.com/insperai',
            linkedin_url='https://linkedin.com/company/insperai',
            endereco='São Paulo, SP'
        )
        self.stdout.write(self.style.SUCCESS(f'Successfully created SiteSettings'))
