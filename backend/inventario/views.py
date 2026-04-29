from rest_framework import filters, viewsets
from .models import Inventario
from .serializers import InventarioSerializer


# Query en inventario para aplicar en salidas y entradas, se pueden filtrar por estado, serie, ticket_asignacion, ticket_bodega y ticket_devolucion


class InventarioViewSet(viewsets.ModelViewSet): 
    queryset = Inventario.objects.all() 
    serializer_class = InventarioSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['serie', 'ticket_asignacion', 'ticket_bodega', 'ticket_devolucion'] # Permite buscar por estos campos

    def get_queryset(self):
        queryset = super().get_queryset()
        estado = self.request.query_params.get('estado')

        if estado:
            queryset = queryset.filter(estado=estado)

        return queryset
