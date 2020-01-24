from django.contrib import admin
from .models import ScoringCategory, ScoringCriteria, Team, Match

admin.site.register(ScoringCategory)
admin.site.register(ScoringCriteria)
admin.site.register(Team)
admin.site.register(Match)


