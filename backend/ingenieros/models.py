


from django.db import models
from django.contrib.auth.models import User # Importa el modelo de usuario de Django Render

# Create your models here.
class Ingenieros(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE) #Se agrega para conectarlo al users de djando Render
    id_ingeniero = models.CharField(primary_key=True, max_length=50)
    nombre = models.CharField(max_length=225)
    nivel = models.CharField(max_length=255)
    #password = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre

#Instrucción para llamar la tabla ya creada en MySQL.
#    class Meta:
#        managed = False
#        db_table = 'ingenieros'
        
        
        