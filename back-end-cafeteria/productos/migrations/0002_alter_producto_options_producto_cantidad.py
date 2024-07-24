# Generated by Django 4.1.7 on 2023-04-21 19:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='producto',
            options={'ordering': ['nombre'], 'verbose_name': 'Producto', 'verbose_name_plural': 'Productos'},
        ),
        migrations.AddField(
            model_name='producto',
            name='cantidad',
            field=models.IntegerField(default=1),
        ),
    ]
