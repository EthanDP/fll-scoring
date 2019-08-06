from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.login),
    path('score', views.scoring_system),
    path('manage', views.manage_event)
]