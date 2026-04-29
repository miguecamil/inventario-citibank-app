from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SolicitudesViewSet

router = DefaultRouter()
router.register(r'solicitudes', SolicitudesViewSet)

urlpatterns = router.urls