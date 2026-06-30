from django.contrib.auth.hashers import make_password
from django.core.validators import validate_email as django_validate_email
from django.core.exceptions import ValidationError as DjangoValidationError
import dns.resolver
from rest_framework import serializers
from .models import Cardapio, Cliente, Comanda, Pedido, Avaliacao
from django.utils import timezone

# CLIENTES

class ComandaCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comanda
        fields = ['cardapio', 'quantidade', 'observacoes']

class CardapioClienteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cardapio
        read_only_fields = ['nome', 'preco', 'descricao', 'categoria', 'imagem']

class PedidoClienteSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Pedido
        fields = ['idpedido', 'status_pedido', 'preco_total', 'mesa']
        read_only_fields = ['preco_total', 'status_pedido']

class AvaliacaoClienteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Avaliacao
        fields = ['nota', 'comentarios']

class ClienteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cliente
        fields = ['idcliente', 'nome', 'celular', 'email', 'empresa']


class ClienteRegisterSerializer(serializers.ModelSerializer):
    senha = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = Cliente
        fields = ['idcliente', 'nome', 'celular', 'email', 'empresa', 'senha']
        read_only_fields = ['idcliente']

    def validate_email(self, value):
        email = value.strip().lower()
        try:
            django_validate_email(email)
        except DjangoValidationError:
            raise serializers.ValidationError('Informe um e-mail válido.')

        domain = email.rsplit('@', 1)[-1]
        try:
            dns.resolver.resolve(domain, 'MX')
        except (dns.resolver.NoAnswer, dns.resolver.NXDOMAIN, dns.resolver.NoNameservers, dns.exception.Timeout):
            try:
                dns.resolver.resolve(domain, 'A')
            except (dns.resolver.NoAnswer, dns.resolver.NXDOMAIN, dns.resolver.NoNameservers, dns.exception.Timeout):
                raise serializers.ValidationError('O domínio deste e-mail não parece existir.')

        if Cliente.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError('Este e-mail já está cadastrado.')
        return email

    def validate_nome(self, value):
        nome = value.strip()
        if not nome:
            raise serializers.ValidationError('Informe seu nome.')
        return nome

    def validate_celular(self, value):
        celular = value.strip()
        if not celular:
            raise serializers.ValidationError('Informe seu celular.')
        return celular

    def create(self, validated_data):
        validated_data['senha'] = make_password(validated_data['senha'])
        return super().create(validated_data)


class ClienteAuthSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='idcliente')
    name = serializers.CharField(source='nome')
    role = serializers.SerializerMethodField()

    class Meta:
        model = Cliente
        fields = ['id', 'name', 'email', 'role']

    def get_role(self, obj):
        return 'client'


# ADMIN (WOLIA E A OUTRA)

"""

class CardapioAdminSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cardapio
        fields = '__all__'


class PedidoAdminSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Pedido
        fields = '__all__'

class AvaliacaoAdminSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Avaliacao
        fields = '__all__'

class ComandaAdminSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Comanda
        fields = '__all__'

class ClienteAdminSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Cliente
        fields = ['celular', 'empresa', 'nome', 'email']

"""

# FUNCIONARIO DA COZINHA


class ComandaCozinhaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comanda
        fields = ['idcomanda', 'cardapio_id', 'pedido_idpedido', 'observacoes', 'quantidade']

class PedidoCozinhaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pedido
        fields = ['status_pedido']



