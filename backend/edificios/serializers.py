from rest_framework import serializers
from .models import Edificios


class EdificiosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Edificios
        fields = '__all__'
