from django.urls import path

from .views import index

urlpatterns = [
    path('', index),
    path('login', index),
    path('signup', index),
    # path('nav', index)
    path('salesrep', index),
    path('userreq',index),
    path('userprog', index),
    path('oper',index),
    path('userHome', index),
    path('opManager', index),
    path('orderTable', index)

]