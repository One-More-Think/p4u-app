import json
import requests as reqs
from utils.permission import IsUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, exceptions

from utils.secret import *
from utils.authentication import OAuthAuthentication

from .serializer import QuestionSerializer,CommentSerializer
from .models import Question, Comment

class QuestionList(APIView):
    authentication_classes = [OAuthAuthentication]
    permission_classes = [IsUser]

    def get(self, request):
        try:
            quesiton = Question.objects.get()
            serializer = QuestionSerializer(quesiton)
            return Response(serializer.data, status=status.HTTP_200_OK) 
        except Question.DoesNotExist:
            return Response({'message':'Not Found Model'}, status=status.HTTP_404_NOT_FOUND)
        except exceptions.AuthenticationFailed as e:
            return Response({'message': str(e)}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception:
            return Response({'message':'Internal Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class QuestionCreate(APIView):
    authentication_classes = [OAuthAuthentication]
    permission_classes = [IsUser]

    def post(self, request):
        try:
            serializer = QuestionSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Question.DoesNotExist:
            return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
        
class QuestionDetail(APIView):
    authentication_classes = [OAuthAuthentication]
    permission_classes = [IsUser]

    def get(self, request, pk):
        try:
            question = Question.objects.get(id=pk)
            serializer = QuestionSerializer(question)
            return Response(serializer.data, status=status.HTTP_200_OK) 
        except Question.DoesNotExist:
            return Response({'message':'Not Found Model'}, status=status.HTTP_404_NOT_FOUND)
        except exceptions.AuthenticationFailed as e:
            return Response({'message': str(e)}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception:
            return Response({'message':'Internal Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class QuestionUpdate(APIView):
    authentication_classes = [OAuthAuthentication]
    permission_classes = [IsUser]

    def patch(self, request, pk):
        try:
            question = Question.objects.get(id=pk)
            serializer = QuestionSerializer(question, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Question.DoesNotExist:
            return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

class CommentCreate(APIView):
    authentication_classes = [OAuthAuthentication]
    permission_classes = [IsUser]

    def patch(self, request, pk):
        try:
            question = Question.objects.get(id=pk)
            question_serializer = QuestionSerializer(question, data=request.data, partial=True)
            if question_serializer.is_valid():
                question_serializer.save()
            
            if 'comment_data' in request.data:
                comment_data = {
                    'context': request.data['context'],
                }

                comment_serializer = CommentSerializer(data=comment_data)
                if comment_serializer.is_valid():
                    new_comment = comment_serializer.save()
                    question.comments.add(new_comment)
                else:
                    return Response("Fail to add comment", status=status.HTTP_400_BAD_REQUEST)
            
            return Response({"message":"Comment added"}, status=status.HTTP_200_OK)
        
        except Question.DoesNotExist:
            return Response({"error": "Question not found"}, status=status.HTTP_404_NOT_FOUND)
        except Comment.DoesNotExist:
            return Response({"error": "Question not found"}, status=status.HTTP_404_NOT_FOUND)
        
class CommentUpdate(APIView):
    authentication_classes = [OAuthAuthentication]
    permission_classes = [IsUser]
    def patch(self, request, pk):
        try:
            comment = Comment.objects.get(id=pk)
            serializer = CommentSerializer(comment, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Comment.DoesNotExist:
            return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

class CommentDelete(APIView):
    authentication_classes = [OAuthAuthentication]
    permission_classes = [IsUser]
    def delete(self, request, pk):
        try:
            comment = Comment.objects.get(id=pk)
            comment.delete()
            return Response({'detail':f'{pk} successfully deleted'}, status=status.HTTP_200_OK)
        except Comment.DoesNotExist:
            return Response({'detail':'Internal Error'}, status=status.HTTP_404_NOT_FOUND)