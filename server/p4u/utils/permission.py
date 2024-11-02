from rest_framework import permissions
from user.models import User
class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.groups.filter(name='Admin').exists()
    
class IsUser(permissions.BasePermission):
    def has_permission(self, request, view):
        try:
            user =  User.objects.get(email=request.user['email'])
            return request.user['email_verified'] and user.groups.filter(name='User').exists()
        except User.DoesNotExist:
            return False