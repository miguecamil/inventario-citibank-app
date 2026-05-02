from django.db import models

class Usuarios(models.Model):
    id_user = models.CharField(primary_key=True, max_length=50)
    full_name = models.CharField(max_length=255)
    vehiculo_legal = models.CharField(max_length=100)
    goc = models.CharField(max_length=100)
    empl_status = models.CharField(max_length=50)
    tipo_usuario = models.CharField(max_length=100)
    id_edificio = models.CharField(max_length=50)
    area = models.CharField(max_length=100)
    piso = models.CharField(max_length=50)
    puesto = models.CharField(max_length=100)
    id_manager = models.CharField(max_length=50)
    full_name_manager = models.CharField(max_length=255)
    fecha_registro = models.DateField()

    def __str__(self):
        return self.full_name

#Instrucción para llamar la tabla ya creada en MySQL.
#    class Meta:
#        managed = False
#        db_table = 'usuarios'