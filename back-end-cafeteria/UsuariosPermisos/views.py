from django.contrib.auth.models import User, Group, Permission
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password

from UsuariosPermisos.decorators import group_required
from UsuariosPermisos.serializer import UsuarioSerializer, GroupSerializer, PermisoSerializer
from cafeteriaApp.views import ApiResponse


# Create your views here.
@method_decorator(group_required('Admin','Cocina','Recepcion'), name='list')
@method_decorator(group_required('Admin'), name='create')
@method_decorator(group_required('Admin','Cocina','Recepcion'), name='retrieve')
@method_decorator(group_required('Admin'), name='update')
@method_decorator(group_required('Admin'), name='destroy')
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UsuarioSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        reponse_data = ApiResponse(message='Los usuarios han sido obtenidos exitosamente', data=serializer.data)
        return Response(reponse_data.to_dict(), status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        print(request.data)
        password = request.data.get('password')
        hashed_password = make_password(password)
        request.data['password'] = hashed_password
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            reponse_data = ApiResponse(message='El usuario ha sido creado exitosamente', data=serializer.data)
            return Response(reponse_data.to_dict(), status=status.HTTP_201_CREATED)
        else:
            reponse_data = ApiResponse(message='El usuario no ha sido creado', data=None, status='Error')
            return Response(reponse_data.to_dict(), status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        reponse_data = ApiResponse(message='El usuario ha sido obtenido exitosamente', data=serializer.data)
        return Response(reponse_data.to_dict(), status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        password = request.data.get('password')
        if password:
            hashed_password = make_password(password)
            request.data['password'] = hashed_password
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            self.perform_update(serializer)
            reponse_data = ApiResponse(message='El usuario ha sido actualizado exitosamente', data=serializer.data)
            return Response(reponse_data.to_dict(), status=status.HTTP_200_OK)
        else:
            reponse_data = ApiResponse(message='El usuario no ha sido actualizado', data=None, status='Error')
            return Response(reponse_data.to_dict(), status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        reponse_data = ApiResponse(message='El usuario ha sido eliminado exitosamente', data=None)
        return Response(reponse_data.to_dict(), status=status.HTTP_204_NO_CONTENT)


@method_decorator(group_required('Admin'), name='list')
@method_decorator(group_required('Admin'), name='create')
@method_decorator(group_required('Admin'), name='retrieve')
@method_decorator(group_required('Admin'), name='update')
@method_decorator(group_required('Admin'), name='destroy')
class GrupoViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        response_data = ApiResponse(message='Los grupos han sido obtenidos exitosamente', data=serializer.data)
        return Response(response_data.to_dict(), status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            reposnse_data = ApiResponse(message='El grupo ha sido creado exitosamente', data=serializer.data)
            return Response(reposnse_data.to_dict(), status=status.HTTP_201_CREATED)
        else:
            response_data = ApiResponse(message='El grupo no ha sido creado', data=None, status='Error')
            return Response(response_data.to_dict(), status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        response_data = ApiResponse(message='El grupo ha sido obtenido exitosamente', data=serializer.data)
        return Response(response_data.to_dict(), status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            self.perform_update(serializer)
            response_data = ApiResponse(message='El grupo ha sido actualizado exitosamente', data=serializer.data)
            return Response(response_data.to_dict(), status=status.HTTP_200_OK)
        else:
            response_data = ApiResponse(message='El grupo no ha sido actualizado', data=None, status='Error')
            return Response(response_data.to_dict(), status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        response_data = ApiResponse(message='El grupo ha sido eliminado exitosamente', data=None)
        return Response(response_data.to_dict(), status=status.HTTP_204_NO_CONTENT)


@method_decorator(group_required('Admin'), name='list')
@method_decorator(group_required('Admin'), name='create')
@method_decorator(group_required('Admin'), name='retrieve')
@method_decorator(group_required('Admin'), name='update')
@method_decorator(group_required('Admin'), name='destroy')
class PermisosViewSet(viewsets.ModelViewSet):
    queryset = Permission.objects.all()
    serializer_class = PermisoSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        response_data = ApiResponse(message='Permisos listados', data=serializer.data)
        return Response(response_data.to_dict(), status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        response_data = ApiResponse(message='Permiso creado correctamente', data=serializer.data)
        return Response(response_data.to_dict(), status=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        response_data = ApiResponse(message='Permiso obtenido correctamente', data=serializer.data)
        return Response(response_data.to_dict(), status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        response_data = ApiResponse(message='Permiso actualizado correctamente', data=serializer.data)
        return Response(response_data.to_dict(), status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        response_data = ApiResponse(message='Permiso eliminado correctamente')
        return Response(response_data.to_dict(), status=status.HTTP_204_NO_CONTENT)


@csrf_exempt
@group_required('Admin')
@api_view(['POST'])
def PermisosToGroup(request):
    if request.method == 'POST':
        try:
            group = Group.objects.get(id=request.data['group_id'])
            group.permissions.clear()
            for permiso in request.data['permisos_id']:
                group.permissions.add(Permission.objects.get(id=permiso))
            group.save()
            response = ApiResponse(message='Permisos asignados correctamente')
            return JsonResponse(response.to_dict(), status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            response = ApiResponse(status='Error', message=str(e))
            return JsonResponse(response.to_dict(), status=status.HTTP_406_NOT_ACCEPTABLE)


@csrf_exempt
# @group_required('Admin')
@api_view(['POST', 'PUT', 'DELETE'])
def GroupToUser(request):
    if request.method == 'POST' or request.method == 'PUT':
        try:
            user = User.objects.get(id=request.data['user_id'])
            user.groups.clear()
            user.groups.add(Group.objects.get(id=request.data['group_id']))
            user.save()
            response = ApiResponse(message='Grupo asignado correctamente')
            return JsonResponse(response.to_dict(), status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            response = ApiResponse(status='Error', message=str(e))
            return JsonResponse(response.to_dict(), status=status.HTTP_406_NOT_ACCEPTABLE)
    elif request.method == 'DELETE':
        try:
            user = User.objects.get(id=request.data['user_id'])
            user.groups.clear()
            user.save()
            response = ApiResponse(message='Grupo eliminado correctamente')
            return JsonResponse(response.to_dict(), status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            print(e)
            response = ApiResponse(status='Error', message=str(e))
            return JsonResponse(response.to_dict(), status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(['GET'])
def get_user_groups(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        groups = user.groups.all()
        groups = GroupSerializer(groups, many=True).data
        response = ApiResponse(message='Grupo del usuario obtenidos correctamente', data=groups)
        return JsonResponse(response.to_dict(), status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        response = ApiResponse(status='Error', message=str(e))
        return JsonResponse(response.to_dict(), status=status.HTTP_406_NOT_ACCEPTABLE)
