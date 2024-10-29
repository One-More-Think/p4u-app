from rest_framework.authentication import BaseAuthentication
from rest_framework import HTTP_HEADER_ENCODING, exceptions
from utils.secret import SNS_KEY
from django.core.cache import cache

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

        if not auth or auth[0].lower() != self.keyword.lower().encode():
            return None

        if len(auth) == 1:
            msg = 'Invalid token header. No credentials provided.'
            raise exceptions.AuthenticationFailed(msg)
        elif len(auth) <= 0:
            msg = 'Invalid token header. No credentials provided.'
            raise exceptions.AuthenticationFailed(msg)
        elif len(auth) > 2:
            msg = 'Invalid token header. Token string should not contain spaces.'
            raise exceptions.AuthenticationFailed(msg)

        try:
            token = auth[1].decode()
            # send the authentication for the social verify
            
            # payload = jwt_handler.decode_token(token)
            payload = {}
            if not payload:
                refresh_token = cache.get(token)
                payload = {}
                
                if payload:
                    # send new request to get access token with refresh token
                    new_access_token = {}

                    # timeout = int(env('REFRESH_TOKEN_EXP_DAY')) * 60 * 60 * 24
                    # cache.set(new_access_token, refresh_token, timeout, version=None)
                else:
                    msg ='Invalid token Login again'
                    raise exceptions.AuthenticationFailed(msg)

        except UnicodeError:
            msg = 'Invalid token header. Token string should not contain invalid characters.'
            raise exceptions.AuthenticationFailed(msg)

        return (payload, token)

        # return Response({'message':'Invalid User'}, status=status.HTTP_401_UNAUTHORIZED)
        #     return Response({'data': payload}, status=status.HTTP_200_OK)
        # except User.DoesNotExist:
        #     return Response({'message':'Not Found Model'}, status=status.HTTP_404_NOT_FOUND)
        # except Exception:
        #     return Response({'message':'Internal Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)