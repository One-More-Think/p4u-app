from django.urls import  path
from . import views
urlpatterns = [
    path('', views.UserSignInView.as_view()),
    path('login/<str:sns>/', views.UserSignInView.as_view()),
    path('oauth2/<str:sns>', views.Oauth2View.as_view()),
    path('<int:pk>/', views.UserDetailView.as_view()),
    path('delete/', views.UserDeleteView.as_view()),
]
