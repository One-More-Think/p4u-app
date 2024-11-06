import json
import requests as reqs
from utils.permission import IsUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, exceptions
from utils.secret import *
from utils.authentication import OAuthAuthentication
from .serializer import UserSerializer
from rest_framework import serializers
from .models import User
from django.core.cache import cache
from utils.secret import SNS_KEY, HOME_URL

class UserSignInView(APIView):
    authentication_classes = [OAuthAuthentication]
    permission_classes = [IsUser]

    def get_authenticators(self):
        if self.request.method == 'GET':
            return super().get_authenticators()
        return []

    def get_permissions(self):
        if self.request.method == 'GET':
            return [permission() for permission in self.permission_classes]
        return []
    
    def get(self, request, sns):
        try:
            user = User.objects.filter(email=request.user['email']).values('sns_id', 'gender', 'email', 'occupation', 'country', 'age')
            return Response(user[0], status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'message':'Not Found Model'}, status=status.HTTP_404_NOT_FOUND)
        except exceptions.AuthenticationFailed as e:
            return Response({'message': str(e)}, status=status.HTTP_401_UNAUTHORIZED)
        except exceptions.PermissionDenied as e:
            return Response({'message': str(e)}, status=status.HTTP_403_FORBIDDEN)
        except Exception:
            return Response({'message':'Internal Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def post(self, request, sns):
        try:
            serverAuthCode = request.data.get('serverAuthCode')
            country = request.data.get('country')

            sns_dict = SNS_KEY[sns]
            body_dict = {
                'grant_type': 'authorization_code',
                'client_id': sns_dict['client_id'],
                'client_secret': sns_dict['client_secret'],
                'redirect_uri': f'{HOME_URL}/api/v1/user/login/{sns}',
                'code': serverAuthCode
            }

            # Get token
            respone_data = reqs.post(sns_dict['token_url'], body_dict)
            response_dict = json.loads(respone_data.text)
            
            # 6 months
            cache.set(response_dict['access_token'], response_dict['refresh_token'], timeout=1000000)
            # get user info
            params = {
                 'personFields': 'locales,genders,emailAddresses'
            }

            headers = {
                'Authorization': f'{response_dict['token_type']} {response_dict['access_token']}'
            }
            me_response_data = reqs.get(sns_dict['me_url'], headers=headers, params=params)
            me_response_dict = json.loads(me_response_data.text)

            user_params = {
                'personFields': 'locales,genders,emailAddresses'
            }

            user_response_data = reqs.get(sns_dict['user_url'] + me_response_dict['resourceName'], headers=headers, params=user_params)
            user_response_dict = json.loads(user_response_data.text)
            user_data = {
                'country':country,
                'language':'',
                'gender':'none',
                'email':'',
                'sns_id':'',
                'sns':sns,
                'access_token':response_dict['access_token']
            }

            if 'locales' in user_response_dict:
                locales = user_response_dict['locales']
                user_data['language'] = locales[0]['value']

            if 'genders' in user_response_dict:
                genders = user_response_dict['genders']
                user_data['gender'] = genders[0]['value']

            if 'emailAddresses' in user_response_dict:
                email = user_response_dict['emailAddresses']
                user_data['email'] = email[0]['value']
                user_data['sns_id'] = email[0]['metadata']['source']['id']

            sns_user = User.objects.filter(email=user_data['email']).values('sns_id', 'gender', 'email', 'occupation', 'country', 'age')
            if not sns_user:
                serializer = UserSerializer(data=user_data)
                if serializer.is_valid():
                    serializer.save()
                else:
                    print('Error: Invalid data')
                    print(serializer.errors)
                    raise serializers.ValidationError(serializer.errors)
            else:
                sns_user[0]['access_token'] = response_dict['access_token']
                return Response(sns_user[0], status=status.HTTP_200_OK)
            return Response(user_data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'message':'Not Found Model'}, status=status.HTTP_404_NOT_FOUND)
        except exceptions.AuthenticationFailed as e:
            return Response({'message': str(e)}, status=status.HTTP_401_UNAUTHORIZED)
        except exceptions.PermissionDenied as e:
            return Response({'message': str(e)}, status=status.HTTP_403_FORBIDDEN)
        except Exception:
            return Response({'message':'Internal Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class UserLogoutView(APIView):
    def get(self, request):
        try:
            token = request.headers['Authorization'].split(' ')[1]
            cache.delete(token)
            return Response({'message': 'successfully logout'}, status=status.HTTP_200_OK)
        except exceptions.AuthenticationFailed as e:
            return Response({'message': str(e)}, status=status.HTTP_401_UNAUTHORIZED)
        except exceptions.PermissionDenied as e:
            return Response({'message': str(e)}, status=status.HTTP_403_FORBIDDEN)
        except Exception:
            return Response({'message':'Internal Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserUpdateView(APIView):
    authentication_classes = [OAuthAuthentication]
    permission_classes = [IsUser]
    def patch(self, request, id):
        try:
            data = request.data
            user = User.objects.get(email=request.user['email'])
            if user.sns_id != id:
                raise User.DoesNotExist
            
            serializer = UserSerializer(user, data=data,partial=True)
            if serializer.is_valid():
                serializer.save()
            
            return Response({'message': f'{user.id} successfully updated'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'message':'Not Found Model'}, status=status.HTTP_404_NOT_FOUND)
        except Exception:
            return Response({'message':'Internal Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserDeleteView(APIView):
    authentication_classes = [OAuthAuthentication]
    permission_classes = [IsUser]
    def delete(self, request):
        try:
            user_id = request.user['id']
            user = User.objects.get(sns_id=user_id)
            user.delete()
            return Response({'message': f'{user_id} successfully deleted'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'message':'Not Found Model'}, status=status.HTTP_404_NOT_FOUND)
        except exceptions.AuthenticationFailed as e:
            return Response({'message': str(e)}, status=status.HTTP_401_UNAUTHORIZED)
        except exceptions.PermissionDenied as e:
            return Response({'message': str(e)}, status=status.HTTP_403_FORBIDDEN)
        except Exception:
            return Response({'message':'Internal Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserDetailView(APIView):
    authentication_classes = [OAuthAuthentication]
    permission_classes = [IsUser]

    def get(self, request, pk):
        try:
            user = User.objects.get(sns_id=pk)
            serializer = UserSerializer(user)
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK) 
        except User.DoesNotExist:
            return Response({'message':'Not Found Model'}, status=status.HTTP_404_NOT_FOUND)
        except exceptions.AuthenticationFailed as e:
            return Response({'message': str(e)}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception:
            return Response({'message':'Internal Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
