from rest_framework import routers
from .api import IrisViewSet, IrisTrain
from django.urls import path, include

router = routers.DefaultRouter()
router.register('api/iris', IrisViewSet, 'iris')

urlpatterns = [
    path('api/train',  IrisTrain.as_view())
]

urlpatterns += router.urls