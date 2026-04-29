from rest_framework import serializers
from .models import Inventario

class InventarioSerializer(serializers.ModelSerializer):

    class Meta:
        model = Inventario
        fields = '__all__'
        extra_kwargs = {
            'fecha_asignacion': {'required': False},
            'fecha_devolucion': {'required': False},
            'ticket_asignacion': {'required': False},
            'ticket_bodega': {'required': False},
            'ticket_devolucion': {'required': False},
            'estado_devolucion': {'required': False},
            'id_ingeniero_devolucion': {'required': False},
        }
