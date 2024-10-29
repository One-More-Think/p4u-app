import json
import requests as reqs
from utils.permission import IsUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, exceptions

from utils.secret import *
from utils.authentication import OAuthAuthentication

from .serializer import UserSerializer
from .models import User
from django.core.cache import cache

class UserSignInView(APIView):
    def get(self, request, sns):
        try:
            data_dict = request.GET
            sns_dict = SNS_KEY[sns]
            body_dict = {
                'grant_type': 'authorization_code',
                'client_id': sns_dict['client_id'],
                'client_secret': sns_dict['secret_id'],
                'redirect_uri': f'{HOME_URL}/api/v1/user/login/{sns}',
                'code': data_dict['code']
            }

            # Get token
            respone_data = reqs.post(sns_dict['token_url'], body_dict)
            response_dict = json.loads(respone_data.text)
            user_info_dict = {
                'id_token': response_dict['id_token']
            }

            # get user info
            user_response_data = reqs.post(sns_dict['token_info'], user_info_dict)
            user_response_dict = json.loads(user_response_data.text)            

            sns_user = User.objects.filter(email=user_response_dict['email']).values('id')

            if not sns_user:
                # create user
                profile_response_data = reqs.post(f'{HOME_URL}/api/v1/user/signup/{sns}/', profile_dict)    
                sns_user = User.objects.filter(email=user_response_dict['email']).values('id')

                if profile_response_data.status_code != status.HTTP_201_CREATED:
                    return Response(profile_response_data.json(), status=profile_response_data.status_code)

            user_response_dict['id'] = sns_user[0].get('id')

            # jwt_handler = JwtHandler(SIGNING_KEY, env('JWT_ALGORITHM'), env('ACCESS_TOKEN_EXP_MIN'), env('REFRESH_TOKEN_EXP_DAY'))

            # publish access, refresh token
            # access_token = jwt_handler.encode_access_token(profile_dict)
            # refresh_token = jwt_handler.encode_refresh_token(profile_dict)

            # store token in redis
            # timeout = int(env('REFRESH_TOKEN_EXP_DAY')) * 60 * 60 * 24
            # cache.set(access_token, refresh_token, timeout, version=None)
            
            # return Response({'access_token':access_token}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'message':'Not Found Model'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'message':'Internal Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserDeleteView(APIView):
    authentication_classes = [OAuthAuthentication]
    permission_classes = [IsUser]
    def delete(self, request):
        try:
            user_id = request.user['id']
            user = User.objects.get(id=user_id)
            user.delete()
            return Response({'message': f'{user_id} successfully deleted'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'message':'Not Found Model'}, status=status.HTTP_404_NOT_FOUND)
        except Exception:
            return Response({'message':'Internal Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserDetailView(APIView):
    authentication_classes = [OAuthAuthentication]
    permission_classes = [IsUser]

    def get(self, request, pk):
        try:
            user = User.objects.get(user_id=pk)
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK) 
        except User.DoesNotExist:
            return Response({'message':'Not Found Model'}, status=status.HTTP_404_NOT_FOUND)
        except exceptions.AuthenticationFailed as e:
            return Response({'message': str(e)}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception:
            return Response({'message':'Internal Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class Oauth2View(APIView):
    def get(self, request, sns):
        try:
            sns_dict = SNS_KEY[sns]
            if 'client_id' not in sns_dict:
                return Response({'message':'Invalid Request'}, status=status.HTTP_400_BAD_REQUEST)
            request_url = f"{sns_dict['auth_url']}?client_id={sns_dict['client_id']}&redirect_uri={HOME_URL}/api/v1/user/login/{sns}&response_type=code&scope=email%20profile%20openid&access_type=offline"
            return Response({'data': request_url}, status=status.HTTP_200_OK)
        except Exception:
            return Response({'message':'Internal Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)