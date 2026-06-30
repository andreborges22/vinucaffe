from .models import *
from .serializers import *
from rest_framework import viewsets

from django.contrib.auth.hashers import check_password
from django.conf import settings
from django.core import signing
from django.http import JsonResponse
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Cliente
from .serializers import ClienteAuthSerializer, ClienteRegisterSerializer

def estudantes(request):
    if request.method == 'GET':
        estudante = {
            'id':1,
            'nome': 'Yuri'
            }
        return JsonResponse(estudante)


def build_auth_response(cliente):
    user_data = ClienteAuthSerializer(cliente).data
    token = signing.dumps({'cliente_id': cliente.idcliente}, salt='cliente-auth')
    return {
        'user': {
            **user_data,
            'token': token,
        }
    }


@api_view(['POST'])
def register_cliente(request):
    serializer = ClienteRegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    cliente = serializer.save()
    return Response(build_auth_response(cliente), status=status.HTTP_201_CREATED)


@api_view(['POST'])
def login_cliente(request):
    email = str(request.data.get('email', '')).strip().lower()
    senha = str(request.data.get('password') or request.data.get('senha') or '')

    if not email or not senha:
        return Response(
            {'detail': 'Informe e-mail e senha.'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    cliente = Cliente.objects.filter(email__iexact=email).first()
    if not cliente or not cliente.senha or not check_password(senha, cliente.senha):
        return Response(
            {'detail': 'E-mail ou senha incorretos.'},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    return Response(build_auth_response(cliente))


@api_view(['POST'])
def google_login_cliente(request):
    credential = str(request.data.get('credential', '')).strip()
    client_id = getattr(settings, 'GOOGLE_OAUTH_CLIENT_ID', '')

    if not client_id:
        return Response(
            {'detail': 'Login com Google não configurado no backend.'},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )

    if not credential:
        return Response(
            {'detail': 'Token do Google não informado.'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        payload = id_token.verify_oauth2_token(
            credential,
            google_requests.Request(),
            client_id,
        )
    except ValueError:
        return Response(
            {'detail': 'Não foi possível validar sua conta Google.'},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    if not payload.get('email_verified'):
        return Response(
            {'detail': 'O e-mail da conta Google não está verificado.'},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    email = str(payload.get('email', '')).strip().lower()
    name = str(payload.get('name') or email.split('@')[0]).strip()

    if not email:
        return Response(
            {'detail': 'A conta Google não retornou um e-mail.'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    cliente = Cliente.objects.filter(email__iexact=email).first()
    created = False

    if not cliente:
        cliente = Cliente.objects.create(
            nome=name[:45],
            celular='',
            email=email,
            empresa='',
            senha='',
        )
        created = True

    if not created and name and cliente.nome != name:
        cliente.nome = name[:45]
        cliente.save(update_fields=['nome'])

    return Response(build_auth_response(cliente))
