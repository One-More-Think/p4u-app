from rest_framework import serializers
# from django.contrib.auth.models import Group
from .models import *

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['']
        extra_kwargs = {
            'email': {'required': True},
        }

        def create(self, validated_data):
            question = Question.objects.create(**validated_data)
            return question

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['writer','context']

        def create(self, validated_data):
            comment = Comment.objects.create(**validated_data)
            return comment