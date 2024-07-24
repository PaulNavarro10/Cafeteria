from django.http import JsonResponse

from cafeteriaApp.views import ApiResponse


def group_required(*group_names):
    """
    Decorador que verifica si el usuario pertenece a un grupo específico.
    Si el usuario no pertenece a ninguno de los grupos especificados,
    devuelve un JsonResponse con una estructura de error en JSON.
    """

    def in_group(user):
        if user.is_authenticated:
            if bool(user.groups.filter(name__in=group_names)):
                return True
        return False

    def wrapper(view_func):
        def wrapped_view(request, *args, **kwargs):
            if in_group(request.user):
                return view_func(request, *args, **kwargs)
            else:
                error_message= ApiResponse('Error', 'No tiene permiso para acceder a esta página.').to_dict()
                return JsonResponse(error_message, status=403)
        return wrapped_view

    return wrapper

