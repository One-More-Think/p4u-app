from rest_framework import serializers
from django.contrib.auth.models import Group
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['']
        extra_kwargs = {
            'email': {'required': True},
            'username': {'required': True},
        }
    
    def create(self, validated_data):
        group = Group.objects.get(name='User')
        user = User.objects.create(**validated_data)
        user.groups.add(group)
        return user
