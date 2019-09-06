from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse
from .models import ScoringCategory
from django.contrib.auth.decorators import login_required

def team_rankings(request): # Scoreboard/rankings of teams
    return render(request, 'scoring_system/rankings.html')

def match(request): # Live view of match score for public
    return render(request, 'scoring_system/score_view.html')

@login_required
def scoring(request): # Match scoring page for event users
    context = {
        'scoring_categories': ScoringCategory.objects.all(),
    }
    return render(request, 'scoring_system/scoring.html', context)