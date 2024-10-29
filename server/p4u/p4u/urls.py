from django.contrib import admin
from django.urls import path, include
import debug_toolbar

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/user/', include('user.urls')),
    path('api/v1/question/', include('question.urls')),
    path('__debug__/', include(debug_toolbar.urls)),
]
