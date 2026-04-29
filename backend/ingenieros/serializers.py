from rest_framework import serializers
from .models import Ingenieros

class IngenierosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingenieros
        fields = '__all__'