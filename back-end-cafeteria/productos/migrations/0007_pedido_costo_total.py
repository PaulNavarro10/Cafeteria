# Generated by Django 4.1.7 on 2023-04-23 13:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0006_pedido_descripcion'),
    ]

    operations = [
        migrations.AddField(
            model_name='pedido',
            name='costo_total',
            field=models.IntegerField(default=0),
        ),
    ]