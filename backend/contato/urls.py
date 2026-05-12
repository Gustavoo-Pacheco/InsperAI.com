from django.urls import path
from .views import ContatoView

urlpatterns = [
    path('', ContatoView.as_view(), name='contact-form'),
]
