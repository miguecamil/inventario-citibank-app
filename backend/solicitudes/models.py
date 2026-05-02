from django.db import models

class Solicitudes(models.Model):
    id_registro = models.IntegerField(primary_key=True)
    fecha_registro = models.DateField()
    tipo_solicitud = models.CharField(max_length=100)
    orden_de_compra = models.IntegerField()
    descripcion_solicitud = models.CharField(max_length=255)
    id_solicitante = models.CharField(max_length=50)
    id_user = models.CharField(max_length=50)
    id_ingeniero = models.CharField(max_length=50)
    id_activo = models.IntegerField()
    ticket_entrega = models.CharField(max_length=100)
    ticket_bodega = models.CharField(max_length=100)
    estado = models.CharField(max_length=50)
    serie = models.CharField(max_length=100)
    observacion = models.CharField(max_length=255)


    def __str__(self):
        return self.descripcion_solicitud

#Instrucción para llamar la tabla ya creada en MySQL.
#    class Meta:
#        managed = False
#        db_table = 'registro_solicitudes'