# Generated by Django 4.1.7 on 2023-04-23 16:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0008_remove_pedido_costo_total'),
    ]

    operations = [
        migrations.AddField(
            model_name='pedido',
            name='total_pagar',
            field=models.IntegerField(default=0),
        ),
    ]