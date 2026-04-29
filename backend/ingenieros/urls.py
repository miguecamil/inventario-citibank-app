from django.urls import path
from rest_framework import routers
from .views import IngenierosViewSet, login_ingeniero

router = routers.DefaultRouter()
router.register(r'ingenieros', IngenierosViewSet)

urlpatterns = router.urls + [
    path('login/', login_ingeniero),
]
