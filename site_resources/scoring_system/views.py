from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse

def ranking(request):
    return render(request, 'scoring_system/ranking.html')

def match(request):
    return render(request, 'scoring_system/score_view.html')

def scoring(request):
    return render(request, 'scoring_system/home.html')

def login(request):
    return render(request, 'scoring_system/login.html')

# Create your views here.
