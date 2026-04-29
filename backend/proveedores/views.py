from rest_framework import filters, viewsets
from .models import Proveedores
from .serializers import ProveedoresSerializer


class ProveedoresViewSet(viewsets.ModelViewSet):
    queryset = Proveedores.objects.all()
    serializer_class = ProveedoresSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['id_proveedor', 'nombre', 'direccion', 'contacto']
