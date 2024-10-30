from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class Category(models.Model):
    LIVING       = "living"
    CAREER       = "career"
    FOOD         = "food"
    RELATIONSHIP = "relationship"

    CATEGORY_TYPES = {
        LIVING: "Living",
        CAREER: "Career",
        FOOD:"Food",
        RELATIONSHIP: "Relationship"
    }

    name = models.CharField(max_length=12, choices=CATEGORY_TYPES, default=LIVING)

    def __str__(self) -> str:
        return self.name
    
class TimeOut(models.Model):
    TIMEOUT_CHOICES = (
        (1, "none"),
        (2, "5 min"),
        (3, "30 min"),
        (4, "1 hr"),
        (5, "1 day")
    )

    TIMEOUT_VALUES = {
        1: 0,
        2: 300,
        3: 1800,
        4: 3600,
        5: 86400
    }
    
    type = models.IntegerField(choices=TIMEOUT_CHOICES, default=1)
    timename = models.CharField(max_length=255)
    timeout = models.IntegerField()

    def save(self, *args, **kwargs):
        self.timename = dict(self.TIMEOUT_CHOICES).get(self.type, "none")
        self.timeout = self.TIMEOUT_VALUES.get(self.type, 0)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.timename


class Option(models.Model):
    context = models.CharField(max_length=255, default='')

class Comment(models.Model):
    writer = models.ForeignKey('user.User', on_delete=models.CASCADE, to_field='sns_id')
    context = models.CharField(max_length=255, default='')
    report = models.SmallIntegerField(
        default=0,
        validators=[
            MaxValueValidator(5),
            MinValueValidator(0)
        ]
    )

class Question(models.Model):
    writer = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='writer', to_field='sns_id')
    language = models.CharField(max_length=10, default='en')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    timeout = models.ForeignKey(TimeOut, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, default='')
    description = models.CharField(max_length=255, default='')
    report = models.SmallIntegerField(
        default=0,
        validators=[
            MaxValueValidator(5),
            MinValueValidator(0)
        ]
    )
    options = models.ManyToManyField(Option)
    comments = models.ManyToManyField(Comment)
    def __str__(self) -> str:
        return self.title