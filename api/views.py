from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from .serializers import UserSerializer, LoginSerializer
from .models import User

# Create your views here.

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permissions_classes = [IsAuthenticated]

class UserLoginView(APIView):
    def post(self, request, format=None):
        serializer = LoginSerializer(data=self.request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request,user)
        token = Token.objects.get_or_create(user=user)
        return Response({
            'id': user.id,
            'roleId': user.role,
            'token': token[0].key
        })
