from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('books', views.BookViewSet)

app_name = 'apiv1'
urlpatterns = [
    path('', include(router.urls)),
    path('endpoint1/', views.Endoint1View.as_view()),
]
