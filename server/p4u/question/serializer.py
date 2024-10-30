from rest_framework import serializers
from .models import *

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

        def create(self, validated_data):
            question = Question.objects.create(**validated_data)
            return question

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

        def create(self, validated_data):
            comment = Comment.objects.create(**validated_data)
            return comment