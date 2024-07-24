from django.db import models
from djongo import models as djongo_models


# Create your models here.

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    precio = models.IntegerField(default=0)  # Utilizamos int ya que los precios no requieren decimal.
    cantidad = models.IntegerField(default=1)

    class Meta:
        verbose_name = "Producto"
        verbose_name_plural = "Productos"
        ordering = ['id']

    def __str__(self):
        return self.nombre


class Pedido(models.Model):
    descripcion = models.CharField(max_length=100, default=None)
    fecha_inicio_pedido = models.DateTimeField(null=True)
    fecha_fin_pedido = models.DateTimeField(null=True)
    lista_productos = models.JSONField(default=list)
    total_pagar = models.IntegerField(default=0)  # Utilizamos int ya que los precios no requieren decimal.

    estado_pedido = models.IntegerField(default=0)  # Estado 0 indica preperando, 1 pedido listo, 2 entregado.
    nombre_cliente = models.CharField(max_length=100, default=None)

    class Meta:
        verbose_name = "Pedido"
        verbose_name_plural = "Pedidos"
        ordering = ['id']
