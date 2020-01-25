from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse
from .models import ScoringCategory, Team, Match
from django.contrib.auth.decorators import login_required

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

def judging(request):
    return render(request, 'scoring_system/judging.html')

def submit_score(request):
    if request.method == 'POST':
        team_number = request.POST.get('name-submit')
        match = request.POST.get('match-submit')
        score = request.POST.get('score-submit')
        selected_team = Team.objects.get(number=team_number)
        print(match)
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

def generate_results(request):
    if request.method == 'POST':
        file_name = time.strftime("%H%M%S", time.localtime()) + "-results.csv"
        with open(file_name, 'w+') as f:
            results_writer = csv.writer(f, delimiter=",")
            results_writer.writerow(["Team Name", "Team Number", "Match 1", "Match 2", "Match 3", "Top Score"])
            for team in Team.objects.all():
                results_writer.writerow([team.name, team.number, team.match1, team.match2, team.match3, team.highest()])
        # Generate match results spreadsheet

    return render(request, 'scoring_system/judging.html')