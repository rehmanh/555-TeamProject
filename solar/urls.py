from django.urls import path

from .views import index

urlpatterns = [
    path('', index),
    path('login', index),
    path('signup', index),
    # path('nav', index)
    path('salesrep', index),
    path('userReq', index)
]