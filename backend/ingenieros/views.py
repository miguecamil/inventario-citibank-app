from django.views.decorators.csrf import csrf_exempt # Para desactivar CSRF en la vista de login (solo para pruebas, no recomendado en producción sin otras medidas de seguridad)
from django.utils.decorators import method_decorator

from django.contrib.auth import authenticate  #  Autenticación correcta

from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Ingenieros
from .serializers import IngenierosSerializer

import jwt
import datetime
from django.conf import settings

# ===============================
# CRUD DE INGENIEROS (PROTEGIDO)
# ===============================
from .authentication import JWTIngenieroAuthentication

class IngenierosViewSet(viewsets.ModelViewSet):
    queryset = Ingenieros.objects.all()
    serializer_class = IngenierosSerializer


# ===============================
# LOGIN DE INGENIEROS (CORREGIDO)
# ===============================


@csrf_exempt # Desactivar CSRF para esta vista (solo para pruebas, no recomendado en producción sin otras medidas de seguridad)
@api_view(['POST'])
def login_ingeniero(request):

    usuario = request.data.get('username')
    password = request.data.get('password')

    # Validación básica
    if not usuario or not password:
        return Response({
            "status": "error",
            "message": "Debe enviar usuario y contraseña"
        }, status=status.HTTP_400_BAD_REQUEST)

    # Autenticación con Django
    user = authenticate(username=usuario, password=password)

    if user is None:
        return Response({
            "status": "error",
            "message": "Credenciales inválidas"
        }, status=status.HTTP_401_UNAUTHORIZED)

    #  Buscar el ingeniero asociado
    try:
        ingeniero = Ingenieros.objects.get(user=user)

    except Ingenieros.DoesNotExist:
        return Response({
            "status": "error",
            "message": "Ingeniero no asociado"
        }, status=status.HTTP_404_NOT_FOUND)

    # 🔑 Generar token JWT (tu lógica original)
    payload = {
        "usuario": ingeniero.id_ingeniero,
        "nivel": ingeniero.nivel,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
    }

    token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

    # ✅ Respuesta final
    return Response({
        "status": "success",
        "token": token,
        "usuario": ingeniero.id_ingeniero,
        "nombre": ingeniero.nombre,
        "nivel": ingeniero.nivel
    })