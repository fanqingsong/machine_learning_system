from .models import Iris
from rest_framework import viewsets, permissions
from .serializers import IrisSerializer

# Iris Viewset


class IrisViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = IrisSerializer
    queryset = Iris.objects.all()
