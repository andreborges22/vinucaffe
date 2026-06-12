# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Avaliacao(models.Model):
    idavaliacao = models.AutoField(db_column='idAvaliacao', primary_key=True)  # Field name made lowercase.
    nota = models.PositiveIntegerField(db_column='Nota')  # Field name made lowercase.
    comentarios = models.TextField(db_column='Comentarios', blank=True, null=True)  # Field name made lowercase.
    id_pedido = models.OneToOneField('Pedido', models.DO_NOTHING, db_column='id_pedido', blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'avaliacao'


class Cardapio(models.Model):
    idcardapio = models.AutoField(db_column='id', primary_key=True) 
    nome = models.CharField(db_column='Nome', max_length=50)  # Field name made lowercase.
    preco = models.DecimalField(db_column='Preco', max_digits=5, decimal_places=2)  # Field name made lowercase.
    descricao = models.TextField(db_column='Descricao')  # Field name made lowercase.
    status = models.SmallIntegerField(db_column='Status')  # Field name made lowercase.
    categoria = models.CharField(db_column='Categoria', max_length=45)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'cardapio'


class Cliente(models.Model):
    idcliente = models.AutoField(db_column='idCliente', primary_key=True)  # Field name made lowercase.
    nome = models.CharField(db_column='Nome', max_length=45)  # Field name made lowercase.
    celular = models.CharField(db_column='Celular', max_length=15)  # Field name made lowercase.
    email = models.CharField(db_column='Email', max_length=45, blank=True, null=True)  # Field name made lowercase.
    empresa = models.CharField(db_column='Empresa', max_length=45, blank=True, null=True)  # Field name made lowercase.
    senha = models.CharField(db_column='Senha', max_length=200, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'cliente'


class Comanda(models.Model):
    idcomanda = models.AutoField(db_column='idComanda', primary_key=True)  # Field name made lowercase.
    cardapio = models.ForeignKey(Cardapio, models.DO_NOTHING, db_column='Cardapio_id')  # Field name made lowercase.
    pedido_idpedido = models.ForeignKey('Pedido', models.DO_NOTHING, db_column='Pedido_idPedido')  # Field name made lowercase.
    quantidade = models.IntegerField(db_column='Quantidade')  # Field name made lowercase.
    observacoes = models.CharField(db_column='Observacoes', max_length=50, blank=True, null=True)  # Field name made lowercase.
    preco_unitario = models.DecimalField(max_digits=5, decimal_places=2)

    class Meta:
        managed = True
        db_table = 'comanda'


class Pedido(models.Model):
    idpedido = models.AutoField(db_column='idPedido', primary_key=True)  # Field name made lowercase.
    status_pedido = models.CharField(db_column='Status_pedido', max_length=45)  # Field name made lowercase.
    preco_total = models.DecimalField(db_column='Preco_total', max_digits=10, decimal_places=2)  # Field name made lowercase.
    mesa = models.IntegerField(db_column='Mesa')  # Field name made lowercase.
    horario_pedido = models.DateTimeField()
    id_cliente = models.ForeignKey(Cliente, models.DO_NOTHING, db_column='id_cliente', blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'pedido'
