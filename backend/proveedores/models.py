from django.db import models


class Proveedores(models.Model):
    id_proveedor = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=50)
    direccion = models.CharField(max_length=50)
    contacto = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre
#Instrucción para llamar la tabla ya creada en MySQL.
#    class Meta:
#        managed = False
#        db_table = 'proveedores'
