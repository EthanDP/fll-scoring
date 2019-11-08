from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('', views.team_rankings),
    path('match', views.match),
    path('scoring', views.scoring),
    # path('scoring', views.score_new, name='score_new'),
]

if settings.DEBUG: # new
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)