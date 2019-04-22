from rest_framework import routers
from .api import IrisViewSet

router = routers.DefaultRouter()
router.register('api/iris', IrisViewSet, 'iris')

urlpatterns = router.urls