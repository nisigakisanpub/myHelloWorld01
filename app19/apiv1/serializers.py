from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Book, Comment


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"


class BookSerializer1(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"

class BookSerializer2(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
#    author = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Book
#        fields = "__all__"
        fields = ("id","title","price","author","comments")



