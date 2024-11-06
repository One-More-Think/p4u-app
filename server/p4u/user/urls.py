from django.urls import  path
from . import views
urlpatterns = [
    path('login/<str:sns>', views.UserSignInView.as_view()),
    path('logout', views.UserLogoutView.as_view()),
    path('new/<str:id>', views.UserUpdateView.as_view()),
    path('detail/<int:pk>', views.UserDetailView.as_view()),
    path('delete/', views.UserDeleteView.as_view()),
]
