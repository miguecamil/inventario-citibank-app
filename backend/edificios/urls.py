from rest_framework.routers import DefaultRouter
from .views import EdificiosViewSet

router = DefaultRouter()
router.register(r'edificios', EdificiosViewSet)

urlpatterns = router.urls
