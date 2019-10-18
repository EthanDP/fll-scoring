from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.team_rankings),
    path('match', views.match),
    path('scoring', views.scoring),
]