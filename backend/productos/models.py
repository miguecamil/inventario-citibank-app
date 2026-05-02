from django.db import models

class Productos(models.Model):
    id_activo = models.IntegerField(primary_key=True)
    tipo_activo = models.CharField(max_length=255)
    categoria_activo = models.CharField(max_length=225)
    marca = models.CharField(max_length=255)
    modelo = models.CharField(max_length=255)
    eovs = models.DateField()

    def __str__(self):
        return self.tipo_activo

    #Instrucción para llamar la tabla ya creada en MySQL.
    
    #class Meta:
    #    managed = False
    #    db_table = 'productos'