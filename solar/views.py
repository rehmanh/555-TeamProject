from django.shortcuts import render, redirect
from django.http import HttpResponse


# Create your views here.


def index(request, *arg, **kwargs):
    return render(request, "frontend/index.html")

def signup(request):
    # if request.method == "POST":

        # username = request.POST["username"]
        # fname = request.POST["fname"]
        # lname = request.POST["lname"]
        # email = request.POST["email"]
        # password = request.POST["password"]
        # confpassword = request.POST["confpassword"]

        # clients = User.objects.create.user(username, email, password)
        # clients.first_name = fname
        # clients.last_name = lname

        # clients.save()
        
        # messages.success(request, "Your account has been succesfully created")


    return render(request, "frontend/signup.html")

    

