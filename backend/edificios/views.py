from rest_framework import filters, viewsets
from .models import Edificios
from .serializers import EdificiosSerializer


class EdificiosViewSet(viewsets.ModelViewSet):
    queryset = Edificios.objects.all()
    serializer_class = EdificiosSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['rems', 'edificio', 'ciudad', 'direccion']
