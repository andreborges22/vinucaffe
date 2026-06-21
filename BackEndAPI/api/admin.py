from django.contrib import admin
from . models import Cardapio, Avaliacao, Pedido, Cliente, Comanda

@admin.register(Cardapio)
class CardapioAdmin(admin.ModelAdmin):

    list_display = ['idcardapio', 'nome', 'preco', 'imagem', 'status', 'categoria']
    fields = ['nome', 'preco', 'imagem', 'status', 'categoria']
    list_filter = ['idcardapio', 'nome']
    search_fields = ['idcardapio', 'nome']
    list_per_page = 15

@admin.register(Pedido)
class PedidoAdmin(admin.ModelAdmin):

    list_display = ['idpedido', 'status_pedido', 'preco_total', 'mesa', 'horario_pedido',]
    fields = ['status_pedido']
    list_filter = ['idpedido', 'mesa']
    search_fields = ['idpedido', 'mesa']
    list_per_page = 15

@admin.register(Avaliacao)
class AvaliacaoAdmin(admin.ModelAdmin):

    list_display = ['idavaliacao', 'nota', 'comentarios', 'id_pedido']
    fields = ['idavaliacao', 'nota', 'comentarios', 'id_pedido']
    list_filter = ['idavaliacao', 'nota']
    search_fields = ['idavaliacao']
    list_per_page = 15

    def has_add_permission(self, request):
        return False  

    def has_delete_permission(self, request, obj=None):
        return False

@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):

    list_display = ['idcliente', 'nome', 'email', 'celular', 'empresa']
    fields = ['empresa']
    list_filter = ['idcliente', 'nome', 'email', 'celular', 'empresa']
    search_fields = ['idcliente', 'nome', 'email']
    list_per_page = 15

@admin.register(Comanda)
class ComandaAdmin(admin.ModelAdmin):

    list_display = ['idcomanda', 'cardapio_id', 'pedido_idpedido', 'quantidade', 'observacoes', 'preco_unitario']
    readonly_fields = ['idcomanda', 'cardapio_id', 'pedido_idpedido', 'quantidade', 'observacoes', 'preco_unitario']
    list_filter = ['idcomanda', 'pedido_idpedido']
    search_fields = ['idcomanda', 'pedido_idpedido']
    list_per_page = 15

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False
