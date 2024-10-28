from django.contrib import admin
from .models import * 

admin.site.register(Question)
admin.site.register(Category)
admin.site.register(TimeOut)
admin.site.register(Option)
admin.site.register(Comment)
