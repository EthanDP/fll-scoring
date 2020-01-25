from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse
from .models import ScoringCategory, Team, Match
from django.contrib.auth.decorators import login_required
from django.utils.encoding import smart_str
from django.core.files.storage import default_storage
from wsgiref.util import FileWrapper

import csv
import os
import time

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

@login_required
def judging(request):
    return render(request, 'scoring_system/judging.html')

def submit_score(request):
    if request.method == 'POST':
        team_number = request.POST.get('name-submit')
        round = request.POST.get('match-submit')
        score = request.POST.get('score-submit')
        m_number = request.POST.get('match-number-submit')
        selected_team = Team.objects.get(number=team_number)
        print(match)
        if round == "1":
            selected_team.match1 = score
        elif round == "2":
            selected_team.match2 = score
        elif round == "3":
            selected_team.match3 = score
        else:
            print("Invalid match value.")
        selected_team.save()
        selected_match = Match.objects.get(match_number=int(m_number))
        selected_match.total_submitted += 1
        selected_match.save()
        if (selected_match.total_submitted >= 2):
            selected_match.delete()

    return render(request, 'scoring_system/submitted.html')

def generate_results(request):
    file_title = 'results.csv'
    file_name = None
    if request.method == 'POST':
        file_title = time.strftime("%H%M%S", time.localtime()) + "-results.csv"
        with open(file_title, 'w+') as f:
            results_writer = csv.writer(f, delimiter=",")
            results_writer.writerow(["Team Name", "Team Number", "Match 1", "Match 2", "Match 3", "Top Score"])
            for team in Team.objects.all():
                results_writer.writerow([team.name, team.number, team.match1, team.match2, team.match3, team.highest()])
            file_name = default_storage.save(file_title, f)
        # Generate match results spreadsheet
    
    wrapper = FileWrapper(open(file_name))
    response = HttpResponse(wrapper, content_type='application/force-download') # mimetype is replaced by content_type for django 1.7
    response['Content-Disposition'] = 'attachment; filename=' + os.path.basename(default_storage.url(file_name))
    print(os.path.basename(default_storage.url(file_name)))
    # It's usually a good idea to set the 'Content-Length' header too.
    # You can also set any other required headers: Cache-Control, etc.
    return response
