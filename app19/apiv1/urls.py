from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('books', views.BookViewSet)

app_name = 'apiv1'
urlpatterns = [
    path('', include(router.urls)),
    path('endpoint1/', views.Endoint1View.as_view()),
    path('endpoint2/', views.Endoint2View.as_view()),
    path('endpoint3/<pk>', views.Endoint3View.as_view()),
    path('endpoint4/<pk>', views.Endoint4View.as_view()),
]
