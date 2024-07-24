from django.urls import path, include
from rest_framework import routers

from UsuariosPermisos.views import PermisosToGroup, GroupToUser
from .views import ProductosViewSet, PedidosViewSet

routers = routers.DefaultRouter()
routers.register(r'productos', ProductosViewSet)
routers.register(r'pedidos', PedidosViewSet)

urlpatterns = [
    path('', include(routers.urls)),
    path('permisotogroup/', PermisosToGroup),
    path('grouptouser/', GroupToUser),
    path('pedidos/<int:pk>/productos/', PedidosViewSet.as_view({'get': 'productos'}), name='pedido_productos')
]
