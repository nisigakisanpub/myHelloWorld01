import uuid
from django.db import models
from django.contrib.auth.models import User

class Book(models.Model):
#    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=128, verbose_name='タイトル', null=False, blank=False)
    price = models.IntegerField(verbose_name='価格', null=False, blank=False)
    author = models.OneToOneField(User, null=False, blank=False, on_delete=models.CASCADE)


    class Meta:
        db_table = 'book'

    def __str__(self):
        return self.title


class Comment(models.Model):
#    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    content = models.TextField(null=False, blank=False)
    stars = models.IntegerField(null=False, blank=False)
    book = models.ForeignKey('Book', null=True, blank=True, on_delete=models.CASCADE ,related_name="comments")

    class Meta:
        db_table = 'comment'

    def __str__(self):
        return self.content

