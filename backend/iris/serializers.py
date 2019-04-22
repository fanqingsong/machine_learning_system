from rest_framework import serializers
from iris.models import Iris

# Iris Serializer
class IrisSerializer(serializers.ModelSerializer):
  class Meta:
    model = Iris 
    fields = '__all__'