from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.team_rankings),
    path('matchscore', views.match),
    path('scoring', views.scoring),
    path('login', views.login)
]