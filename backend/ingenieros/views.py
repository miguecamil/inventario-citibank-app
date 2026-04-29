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
# LOGIN DE INGENIEROS
# ===============================
@api_view(['POST'])
def login_ingeniero(request):

    usuario = request.data.get('username')
    password = request.data.get('password')

    if not usuario or not password:

        return Response({
            "status": "error",
            "message": "Debe enviar usuario y contraseña"
        }, status=status.HTTP_400_BAD_REQUEST)

    try:

        ingeniero = Ingenieros.objects.get(id_ingeniero=usuario)

        if ingeniero.password == password:

            payload = {
                "usuario": ingeniero.id_ingeniero,
                "nivel": ingeniero.nivel,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
            }

            token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

            return Response({

                "status": "success",
                "token": token,
                "usuario": ingeniero.id_ingeniero,
                "nombre": ingeniero.nombre,
                "nivel": ingeniero.nivel

            })

        else:

            return Response({
                "status": "error",
                "message": "Contraseña incorrecta"
            }, status=status.HTTP_401_UNAUTHORIZED)

    except Ingenieros.DoesNotExist:

        return Response({
            "status": "error",
            "message": "Usuario no existe"
        }, status=status.HTTP_404_NOT_FOUND)