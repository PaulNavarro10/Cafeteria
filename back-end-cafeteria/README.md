#   Api de administracion de pedidos de cafeteria realizado como proyecto en el bootcamp FPUNA

### En Windows Ejecutar
- python -m venv env
- env\Scripts\activate.bat
## Instalar requerimientos
- pip install -r requirements.txt
## Crear la base de datos
- Agregar los datos de la base de datos en el archivo `cafeteriaApp/settings.py`
- python manage.py migrate
- python manage.py makemigrations
## Iniciar el servidor
- python manage.py runserver
- Abrir el navegador en la direccion `http://127.0.0.1:8000`