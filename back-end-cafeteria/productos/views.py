from django.http import JsonResponse
from django.utils.decorators import method_decorator
from rest_framework import viewsets

from UsuariosPermisos.decorators import group_required
from cafeteriaApp.views import ApiResponse
from .models import Producto, Pedido
from .serializers import ProductoSerializer, PedidoSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action


@method_decorator(group_required('Recepcion','Admin'), name='list')
@method_decorator(group_required('Admin'), name='create')
@method_decorator(group_required('Admin'), name='retrieve')
@method_decorator(group_required('Admin'), name='update')
@method_decorator(group_required('Admin'), name='destroy')
class ProductosViewSet(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()

    def list(self, request, *args, **kwargs):
        try:
            productos = Producto.objects.all()
            serializer = ProductoSerializer(productos, many=True)
            response_data = ApiResponse(data=serializer.data, message='Productos obtenidos exitosamente')
            return Response(response_data.to_dict(), status=status.HTTP_200_OK)
        except Exception as e:
            response_data = ApiResponse(status='Error', message=str(e))
            return JsonResponse(response_data.to_dict(), status=status.HTTP_406_NOT_ACCEPTABLE)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        response_data = ApiResponse(message='Producto creado exitosamente', data=serializer.data)
        return Response(response_data.to_dict(), status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        response_data = ApiResponse(message='Producto actualizado exitosamente', data=serializer.data)
        return Response(response_data.to_dict(), status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        response_data = ApiResponse(message='Producto eliminado exitosamente')
        return Response(response_data.to_dict(), status=status.HTTP_200_OK)


@method_decorator(group_required('Recepcion', 'Cocina','Admin'), name='list')
@method_decorator(group_required('Recepcion','Admin'), name='create')
@method_decorator(group_required('Recepcion', 'Cocina','Admin'), name='retrieve')
@method_decorator(group_required('Recepcion', 'Cocina','Admin'), name='update')
@method_decorator(group_required('Admin'), name='destroy')
class PedidosViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

    def list(self, request, *args, **kwargs):
        try:
            pedidos = Pedido.objects.all()
            serializer = PedidoSerializer(pedidos, many=True)
            response_data = ApiResponse(data=serializer.data, message='Pedidos obtenidos exitosamente')
            return Response(response_data.to_dict(), status=status.HTTP_200_OK)
        except Exception as e:
            response_data = ApiResponse(status='Error', message=str(e))
            return JsonResponse(response_data.to_dict(), status=status.HTTP_406_NOT_ACCEPTABLE)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        response_data = ApiResponse(message='Pedido creado exitosamente', data=serializer.data)
        return Response(response_data.to_dict(), status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        response_data = ApiResponse(message='Pedido actualizado exitosamente', data=serializer.data)
        return Response(response_data.to_dict(), status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        response_data = ApiResponse(message='Pedido eliminado exitosamente')
        return Response(response_data.to_dict(), status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'])
    def productos(self, request, pk=None):
        id_pedido = self.kwargs['pk']

        try:
            pedido = Pedido.objects.get(pk=id_pedido)
            lista_productos = []

            for producto_id in pedido.lista_productos:
                lista_productos.append(Producto.objects.get(pk=producto_id['id']))
            response_data = ApiResponse(data=ProductoSerializer(lista_productos, many=True).data,
                                        message='Pedidos obtenidos exitosamente')
            return Response(response_data.to_dict(), status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            response = ApiResponse(status='Error', message=str(e))
            return JsonResponse(response.to_dict(), status=status.HTTP_406_NOT_ACCEPTABLE)
