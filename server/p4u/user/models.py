from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    sns_id             = models.CharField(max_length=255,  unique=True, null=True)
    email              = models.EmailField(max_length=255, unique=True, null=False)
    sns                = models.CharField(max_length=10, null=True)
    country            = models.CharField(max_length=100, default='')
    language           = models.CharField(max_length=100, default='')
    gender             = models.CharField(max_length=5, default='none')
    age                = models.SmallIntegerField(default=0)
    occupation         = models.CharField(max_length=255, default='none')
    aboutme            = models.CharField(max_length=255, default='')
    written_question   = models.ManyToManyField('question.Question', related_name='written_question')
    commented_question = models.ManyToManyField('question.Question', related_name='commented_question')
    is_banned          = models.BooleanField(default=False)
    create_at          = models.DateTimeField(auto_now_add=True)
    update_at          = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.email