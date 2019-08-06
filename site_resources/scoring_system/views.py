from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse

def scoring_system(request):
    return render(request, 'scoring_system/home.html')

def login(request):
    return render(request, 'scoring_system/login.html')

def manage_event(request):
    return renger(request, 'scoring_system/manage.html')

# Create your views here.
