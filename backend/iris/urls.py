from rest_framework import routers
from .api import IrisViewSet, IrisTrain, IrisPredict
from django.urls import path, include

router = routers.DefaultRouter()
router.register('api/iris', IrisViewSet, 'iris')

urlpatterns = [
    path('api/train',  IrisTrain.as_view()),
    path('api/predict',  IrisPredict.as_view()),
]

urlpatterns += router.urls