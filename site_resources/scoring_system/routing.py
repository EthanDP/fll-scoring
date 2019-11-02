from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path('match', consumers.ScoreConsumer)
]