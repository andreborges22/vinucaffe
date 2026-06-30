from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import google_login_cliente, login_cliente, register_cliente


router = DefaultRouter()

urlpatterns = [
    path('auth/register/', register_cliente, name='auth-register'),
    path('auth/login/', login_cliente, name='auth-login'),
    path('auth/google/', google_login_cliente, name='auth-google'),
]
