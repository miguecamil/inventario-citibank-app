from django.db import models


class Usuarios(models.Model):
    id_user = models.CharField(primary_key=True, max_length=50)
    full_name = models.CharField(max_length=255)
    vehiculo_legal = models.CharField(max_length=50)
    goc = models.IntegerField()
    empl_status = models.CharField(max_length=25)
    tipo_usuario = models.CharField(max_length=100)
    id_edificio = models.IntegerField()
    area = models.CharField(max_length=255)
    piso = models.CharField(max_length=50)
    puesto = models.CharField(max_length=25)
    id_manager = models.CharField(max_length=255)
    full_name_manager = models.CharField(max_length=255)

    def __str__(self):
        return self.full_name

    class Meta:
        managed = False
        db_table = 'usuarios'
