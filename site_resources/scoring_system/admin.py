from django.contrib import admin
from .models import EventUser, ScoringCategory, ScoringCriteria, Team

admin.site.register(EventUser)
admin.site.register(ScoringCategory)
admin.site.register(ScoringCriteria)
admin.site.register(Team)


