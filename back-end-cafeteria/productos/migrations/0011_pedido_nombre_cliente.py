# Generated by Django 4.1.7 on 2023-04-23 17:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0010_alter_pedido_options_alter_producto_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='pedido',
            name='nombre_cliente',
            field=models.CharField(default=None, max_length=100),
        ),
    ]