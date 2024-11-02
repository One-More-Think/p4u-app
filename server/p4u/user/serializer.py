from rest_framework import serializers
from django.contrib.auth.models import Group
from .models import User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'sns_id', 'sns', 'country','language', 'gender', 'age', 
                  'occupation', 'writtenQuestion', 'commented_questions', 
                  'is_banned', 'create_at', 'update_at']
        extra_kwargs = {
            'email': {'required': True},
            'gender': {'required': True},
            'country': {'required': True},
            'writtenQuestion': {'required': False},
            'commented_questions': {'required': False}
        }
    
    def create(self, validated_data):
        group = Group.objects.get(name='User')
        user = User.objects.create(**validated_data)
        user.groups.add(group)
        return user
