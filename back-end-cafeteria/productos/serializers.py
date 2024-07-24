from rest_framework import serializers
from .models import Producto, Pedido

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id','nombre','precio','cantidad']
        
        
class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = ['id','descripcion','lista_productos','total_pagar', 'estado_pedido','nombre_cliente','fecha_fin_pedido','fecha_inicio_pedido']