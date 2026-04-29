from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .models import Ingenieros
import jwt
from django.conf import settings


class JWTIngenieroAuthentication(BaseAuthentication):

    def authenticate(self, request):

        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return None

        try:

            token = auth_header.split(" ")[1]

            payload = jwt.decode(
                token,
                settings.SECRET_KEY,
                algorithms=["HS256"]
            )

            usuario = payload["usuario"]

            ingeniero = Ingenieros.objects.get(id_ingeniero=usuario)

            return (ingeniero, None)

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token expirado")

        except jwt.DecodeError:
            raise AuthenticationFailed("Token inválido")

        except Ingenieros.DoesNotExist:
            raise AuthenticationFailed("Usuario no encontrado")