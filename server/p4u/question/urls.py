from django.urls import  path
from . import views
urlpatterns = [
    path('', views.QuestionList.as_view()),
    path('create', views.QuestionCreate.as_view()),
    path('<int:pk>/', views.QuestionDetail.as_view()),
    path('<int:pk>/', views.QuestionUpdate.as_view()),
    path('<int:pk>/comment', views.CommentCreate.as_view()),
    path('<int:pk>/comment/<int:comment_pk>', views.CommentUpdate.as_view()), 
    path('<int:pk>/comment/<int:comment_pk>', views.CommentDelete.as_view()), 
]
