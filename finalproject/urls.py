"""finalproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path, reverse_lazy
from django.views.generic.base import RedirectView
from rest_framework import routers
from api.views import UserView, UserLoginView, ConstructionManagerList, SiteSurveyorList, SalesRepList
from knox import views as knox_views

router = routers.DefaultRouter()
router.register(r'users', UserView, 'user')
router.register(r'construction-managers', ConstructionManagerList, 'construction-manager')
router.register(r'site-surveyors', SiteSurveyorList, 'site-surveyor')
router.register(r'salesreps', SalesRepList, 'salesreps')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include("solar.urls")),
    path('api/', include(router.urls)),
    path('api-login/', UserLoginView.as_view(), name='knox_login'),
    path('logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('users/constructionManagers/', ConstructionManagerList.as_view({'get': 'get_construction_managers'}), name='construction-managers'),
    path('users/siteSurveyors/', SiteSurveyorList.as_view({'get': 'get_site_surveyors'}), name='site-surveyors'),
    path('users/salesreps/', SalesRepList.as_view({'get': 'get_salesreps'}), name='salesreps'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
