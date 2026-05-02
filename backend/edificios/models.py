from django.db import models


class Edificios(models.Model):
    rems = models.IntegerField(primary_key=True)
    edificio = models.CharField(max_length=50)
    ciudad = models.CharField(max_length=50)
    direccion = models.CharField(max_length=50)

    def __str__(self):
        return self.edificio
    
    
#Instrucción para llamar la tabla ya creada en MySQL.
#    class Meta:
#        managed = False
#        db_table = 'edificios'
