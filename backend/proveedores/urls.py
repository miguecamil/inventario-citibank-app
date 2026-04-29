from rest_framework.routers import DefaultRouter
from .views import ProveedoresViewSet

router = DefaultRouter()
router.register(r'proveedores', ProveedoresViewSet)

urlpatterns = router.urls
