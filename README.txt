*************************************************************************************BACK-END ***********************************************************************************************
Clonar el repositorio

git clone https://github.com/PaulNavarro10/Cafeteria.git
cd proyecto-cafeteria


Crear un entorno virtual de python e activar

En Windows Ejecutar

python -m venv env
env\Scripts\activate.bat


Instalar requerimientos

pip install -r requirements.txt


Crear la base de datos

Agregar los datos de la base de datos en el archivo cafeteriaApp/settings.py

python manage.py migrate
python manage.py makemigrations

CREAR SUPERUSUARIO

python manage.py createsuperuser

Iniciar el servidor

python manage.py runserver
Abrir el navegador en la direccion http://127.0.0.1:8000

*************************************************************************************FRONT-END ***********************************************************************************************
Front-End de administracion de pedidos de cafeteria realizado como proyecto en el bootcamp FPUNA

Clonar el repositorio

git clone https://gitlab.com/bootcamp328/front-end-cafeteria.git

cd front-end-cafeteria


Instalar requerimientos

npm install node


Iniciar el servidor

npm run dev
Abrir el navegador en la direccion http://localhost:5173/