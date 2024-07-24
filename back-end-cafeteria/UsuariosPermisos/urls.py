from django.urls import path, include
from rest_framework import routers

from UsuariosPermisos.views import UsuarioViewSet, GrupoViewSet, PermisosViewSet, get_user_groups

routers = routers.DefaultRouter()
routers.register(r'usuarios', UsuarioViewSet)
routers.register(r'grupos', GrupoViewSet)
routers.register(r'permisos', PermisosViewSet)

urlpatterns = [
    path('usuarios/grupos/<int:user_id>/', get_user_groups),
    path('', include(routers.urls)),]
