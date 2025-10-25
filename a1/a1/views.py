from django.http import HttpResponse
from django.shortcuts import render

def home(request):
    # return HttpResponse("Hello World, This is the Home page!!")
    return render(request, 'website/home.html')



