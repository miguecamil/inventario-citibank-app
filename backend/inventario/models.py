from django.db import models

class Inventario(models.Model):
    fecha_recepcion = models.DateField()
    id_activo = models.IntegerField()
    serie = models.CharField(primary_key=True, max_length=100)
    vehiculo_legal = models.CharField(max_length=100)
    orden_compra = models.IntegerField()
    categoria_reporte = models.CharField(max_length=100)
    id_proveedor = models.IntegerField()
    estado = models.CharField(max_length=50)
    rems = models.IntegerField()
    hostname = models.CharField(max_length=50)
    ticket_asignacion = models.CharField(max_length=100, blank=True, null=True)
    ticket_bodega = models.CharField(max_length=100, blank=True, null=True)
    entregado_a_usuario = models.CharField(max_length=50)
    fecha_asignacion = models.DateField(blank=True, null=True)
    id_user = models.CharField(max_length=50)
    id_ingeniero = models.CharField(max_length=50)
    fecha_devolucion = models.DateField(blank=True, null=True)
    ticket_devolucion = models.CharField(max_length=50, blank=True, null=True)
    estado_devolucion = models.CharField(max_length=50, blank=True, null=True)
    id_ingeniero_devolucion = models.CharField(max_length=50, blank=True, null=True)
    
    def __str__(self):
        return self.serie

#Instrucción para llamar la tabla ya creada en MySQL.
#    class Meta:
#        managed = False
#        db_table = 'inventario_total'
