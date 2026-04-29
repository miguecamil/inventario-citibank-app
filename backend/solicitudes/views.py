from rest_framework import viewsets
from .models import Solicitudes
from .serializers import SolicitudesSerializer

class SolicitudesViewSet(viewsets.ModelViewSet):
    queryset = Solicitudes.objects.all()
    serializer_class = SolicitudesSerializer