from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email_address', 'first_name', 'last_name', 'password']

"""
Serializer to Register User
"""
class RegisterSerializer(serializers.ModelSerializer):
    email_address = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
  
    class Meta:
        model = User
        fields = ('email_address', 'password', 'password2',
            'first_name', 'last_name')
        extra_kwargs = {
        'first_name': {'required': True},
        'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        return attrs
  
    def create(self, validated_data):
        user = User.objects.create(
        email_address=validated_data['email_address'],
        first_name=validated_data['first_name'],
        last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

"""
Serializer to login user
"""
class LoginSerializer(serializers.Serializer):
    email_address = serializers.EmailField(
        required=True,
        write_only=True
    )
    password = serializers.CharField(
        write_only=True, 
        required=True, 
        style={'input_type': 'password'}
    )
    
    class Meta:
        model = User
        fields = ['email_address', 'password']
    
    def validate(self, data):
        email_address = data.get('email_address')
        password = data.get('password')

        if email_address and password:
            user = authenticate(request = self.context.get('request'), email_address=email_address, password=password)

            if not user:
                msg = _("Unable to log in user with provided credentials.")
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = _('Must include "email address" and "password".')
            raise serializers.ValidationError(msg, code='authorization')
    
        data['user'] = user
        return data