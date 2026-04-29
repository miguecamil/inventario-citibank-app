from django.db import models

# Create your models here.
class Ingenieros(models.Model):
    id_ingeniero = models.CharField(primary_key=True, max_length=50)
    nombre = models.CharField(max_length=225)
    nivel = models.CharField(max_length=255)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre

    class Meta:
        managed = False
        db_table = 'ingenieros'
        
        
        