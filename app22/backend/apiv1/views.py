from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.views.decorators.csrf import csrf_exempt

from .models import Book, Comment, PDFdocument
from .serializers import (
    BookSerializer1, BookSerializer2, CommentSerializer, PDFdocumentSerializer
)

class Endoint1View(APIView):
    #    permission_classes = (IsAuthenticated,)
    permission_classes = ()

    def post(self, request, format=None):
        # serializer = CommentSerializer(data=request.data)

        # if serializer.is_valid():
        #     obj_success = serializer.validated_data
        #     print(str(obj_success))
        # else:
        #     obj_fail = serializer.errors
        #     print(str(obj_fail))

        # comment = serializer.save()

        list_json_obj=[]
        for obj in PDFdocument.objects.all():
            serializer = PDFdocumentSerializer(obj)
            json_obj = serializer.data
            list_json_obj.append(json_obj)

        return Response(list_json_obj, status=200)


########## ########## ########## ########## ########## ##########

#
# CommentをWrite(作る)
#
class Endoint11View(APIView):
    #    permission_classes = (IsAuthenticated,)
    permission_classes = ()

    def post(self, request, format=None):
        current_user = request.user
        print("current_user:{}".format(str(current_user)))
        print(str(request.data))

        serializer = CommentSerializer(data=request.data)

        if serializer.is_valid():
            obj_success = serializer.validated_data
            print(str(obj_success))
        else:
            obj_fail = serializer.errors
            print(str(obj_fail))

        comment = serializer.save()

        serializer = CommentSerializer(comment)
        json_obj = serializer.data
        print(str(json_obj))

        return Response(json_obj, status=200)


#
# BookをWrite(作る)
#
class Endoint12View(APIView):
    #    permission_classes = (IsAuthenticated,)
    permission_classes = ()

    def post(self, request, format=None):
        current_user = request.user
        print("current_user:{}".format(str(current_user)))
        print(str(request.data))

        serializer = BookSerializer1(data=request.data)

        if serializer.is_valid():
            obj_success = serializer.validated_data
            print(str(obj_success))
        else:
            obj_fail = serializer.errors
            print(str(obj_fail))

        book = serializer.save()

        list_comment_id = request.data.pop('comments')
        for comment_id in list_comment_id:
            comment = Comment.objects.get(id=comment_id)  # getに失敗したらどうなる？
            book.comments.add(comment)

        serializer = BookSerializer1(book)
        json_obj = serializer.data
        print(str(json_obj))

        return Response(json_obj, status=200)


#
# CommentをRead()
#
class Endoint13View(APIView):
    #    permission_classes = (IsAuthenticated,)
    permission_classes = ()

    def post(self, request, pk):
        current_user = request.user
        print("current_user:{}".format(str(current_user)))
        print(str(pk))

        comment = Comment.objects.get(id=pk)

        serializer = CommentSerializer(comment)
        json_obj = serializer.data
        print(str(json_obj))

        return Response(json_obj, status=200)

#
# BookをRead()
#


class Endoint14View(APIView):
    #    permission_classes = (IsAuthenticated,)
    permission_classes = ()

    def post(self, request, pk):
        print(str(request.data))
        current_user = request.user
        print("current_user:{}".format(str(current_user)))
        print(str(pk))

        book = Book.objects.get(id=pk)

        serializer = BookSerializer2(book)
        json_obj = serializer.data
        print(str(json_obj))

        return Response(json_obj, status=200)


#
# ModelViewSet コード例
#
class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer1
#    permission_classes = [IsAuthenticatedOrReadOnly]
