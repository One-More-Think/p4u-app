import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    id            = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email         = models.EmailField(max_length=255, unique=True, null=False)
    sns           = models.CharField(max_length=10, null=True)
    country       = models.CharField(max_length=100, default='ca')
    gender        = models.CharField(max_length=5, default='none')
    age           = models.SmallIntegerField(default=0),
    occupation    = models.CharField(max_length=255, default='none')
    writtenQuestion = models.ManyToManyField('question.Question', related_name='written_question')
    commented_questions = models.ManyToManyField('question.Question', related_name='commented_question')
    create_at     = models.DateTimeField(auto_now_add=True)
    update_at     = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.email