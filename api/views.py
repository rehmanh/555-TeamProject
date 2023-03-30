from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from knox.views import LoginView as KnoxLoginView
from knox.auth import TokenAuthentication

from django.contrib.auth import authenticate, login, logout
from .serializers import UserSerializer, LoginSerializer
from .models import User

# Create your views here.

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permissions_classes = [IsAuthenticated]
    

class UserLoginView(KnoxLoginView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)
    def post(self, request, format=None):
        serializer = self.serializer_class(data=self.request.data) # , context={'request': request}
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        resp = super(UserLoginView, self).post(request, format=None)
        resp.data['roleId'] = user.role
        resp.data['userId'] = user.id
        return Response({"data": resp.data})
        
