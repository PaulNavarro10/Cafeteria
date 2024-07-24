from django.test import TestCase
from productos.models import Producto, Pedido
from unittest.mock import patch


class ProductoModelTest(TestCase):
    def setUp(self):
        self.producto = Producto.objects.create(nombre='Cafe', precio=20, cantidad=10)

    def test_producto_nombre(self):
        self.assertEqual(str(self.producto), 'Cafe')

    def test_producto_precio(self):
        self.assertEqual(self.producto.precio, 20)

    def test_producto_cantidad(self):
        self.assertEqual(self.producto.cantidad, 10)


class PedidoModelTest(TestCase):
    def setUp(self):
        self.pedido = Pedido.objects.create(descripcion='Pedido de prueba', total_pagar=50,
                                             estado_pedido=0, nombre_cliente='Juan')

    @patch('productos.models.Pedido.save', lambda self, **kwargs: None)
    def test_pedido_descripcion(self):
        self.pedido.descripcion = 'Nuevo pedido de prueba'
        self.pedido.save()
        self.assertEqual(self.pedido.descripcion, 'Nuevo pedido de prueba')

    @patch('productos.models.Pedido.save', lambda self, **kwargs: None)
    def test_pedido_total_pagar(self):
        self.pedido.total_pagar = 100
        self.pedido.save()
        self.assertEqual(self.pedido.total_pagar, 100)

    @patch('productos.models.Pedido.save', lambda self, **kwargs: None)
    def test_pedido_estado_pedido(self):
        self.pedido.estado_pedido = 1
        self.pedido.save()
        self.assertEqual(self.pedido.estado_pedido, 1)

    @patch('productos.models.Pedido.save', lambda self, **kwargs: None)
    def test_pedido_nombre_cliente(self):
        self.pedido.nombre_cliente = 'Pedro'
        self.pedido.save()
        self.assertEqual(self.pedido.nombre_cliente, 'Pedro')
