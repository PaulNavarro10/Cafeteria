from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status


def custom_exception_handler(exc, context, estado='Error'):
    try:
        response = exception_handler(exc, context)
        if response is not None:
            try:
                data = {
                    'status': estado,
                    'message': str(exc.detail['detail'])
                }
            except:
                data = {
                    'status': estado,
                    'message': str(exc)
                }
            response.data = data
            response.status_code = status.HTTP_403_FORBIDDEN
        return Response(response.data, response.status_code)
    except:
        return Response({'status': 'Error', 'message': str(exc)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ApiResponse:
    def __init__(self, status='success', message='OK', data=None):
        self.status = status
        self.message = message
        self.data = data

    def to_dict(self):
        if self.data is None:
            return {
                'status': self.status,
                'message': self.message,
            }
        else:
            return {
                'status': self.status,
                'message': self.message,
                'data': self.data,
            }
