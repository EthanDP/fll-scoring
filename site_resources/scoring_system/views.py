from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse
from .models import ScoringCategory, Team, Match
from django.contrib.auth.decorators import login_required

def team_rankings(request): # Scoreboard/rankings of teams
    context = {
        'teams': sorted(Team.objects.all(), key=lambda x: x.highest(), reverse=True)
    }
    return render(request, 'scoring_system/rankings.html', context)

def match(request): # Live view of match score for public
    return render(request, 'scoring_system/score_view.html')

@login_required
def scoring(request): # Match scoring page for event users
    context = {
        'scoring_categories': ScoringCategory.objects.all(),
        'teams': Team.objects.all(),
        'matches': Match.objects.all(),
    }
    return render(request, 'scoring_system/scoring.html', context)

def submit_score(request):
    if request.method == 'POST':
        team_number = request.POST.get('name-submit')
        match = request.POST.get('match-submit')
        score = request.POST.get('score-submit')
        selected_team = Team.objects.get(number=team_number)
        print("BRUH ", match)
        if match == "1":
            selected_team.match1 = score
        elif match == "2":
            selected_team.match2 = score
        elif match == "3":
            selected_team.match3 = score
        else:
            print("Invalid match value.")
        selected_team.save()

    return render(request, 'scoring_system/submitted.html')