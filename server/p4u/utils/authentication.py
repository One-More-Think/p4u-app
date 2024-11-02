from rest_framework.authentication import BaseAuthentication
from rest_framework import HTTP_HEADER_ENCODING, exceptions
from utils.secret import SNS_KEY
from django.core.cache import cache
import requests as reqs

def get_authorization_header(request):
    """
    Return request's 'Authorization:' header, as a bytestring.

    Hide some test client ickyness where the header can be unicode.
    """
    auth = request.META.get('HTTP_AUTHORIZATION', b'')
    if isinstance(auth, str):
        # Work around django test client oddness
        auth = auth.encode(HTTP_HEADER_ENCODING)
    return auth

class OAuthAuthentication(BaseAuthentication):
    """
    JWT token based authentication.

    Clients should authenticate by passing the token key in the "Authorization"
    HTTP header, prepended with the string "Bearer ".  For example:

        Authorization: Bearer eya.401f7ac837da42b97f613d789819ff93537bee6a
    """

    keyword = 'Bearer'

    """
    A custom token model may be used, but must have the following properties.

    * key -- The string identifying the token
    * user -- The user to which the token belongs
    """

    def authenticate(self, request):
        auth = get_authorization_header(request).split()
        sns = request.headers['x-sns-name']
        try:
            token = auth[1].decode()

            headers = {
                'Authorization': f'Bearer {token}'
            }
            sns_dict = SNS_KEY[sns]
            verify_data = reqs.get(sns_dict['token_info'], headers=headers).json()
            if 'error' in verify_data:
                refresh_token = cache.get(token)
                if not refresh_token:
                    msg = 'Invalid token. Please log in again.'
                    raise exceptions.AuthenticationFailed(msg)
                
                refresh_payload = {
                    'client_id': sns_dict['client_id'],
                    'client_secret': sns_dict['client_secret'],
                    'refresh_token': refresh_token,
                    'grant_type': 'refresh_token'
                }
                refresh_response = reqs.post(sns_dict['refresh_url'], data=refresh_payload).json()

                if 'access_token' in refresh_response:
                    new_access_token = refresh_response['access_token']
                    cache.delete(token)
                    token = new_access_token
                    cache.set(token, refresh_token, 1000000)

                    headers['Authorization'] = f'Bearer {new_access_token}'
                    verify_data = reqs.get(sns_dict['verify_url'], headers=headers).json()

                else:
                    msg = 'Invalid token. Please log in again.'
                    raise exceptions.AuthenticationFailed(msg)

            return verify_data, token
            

        except UnicodeError:
            msg = 'Invalid token header. Token string should not contain invalid characters.'
            raise exceptions.AuthenticationFailed(msg)
