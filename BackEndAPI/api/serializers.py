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
        fields = ['nome', 'preco', 'descricao', 'categoria', 'imagem']

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
        fields = ['nome', 'celular', 'email', 'empresa']


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



