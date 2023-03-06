from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.base_user import BaseUserManager

# Create your models here.

class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email_address, first_name, last_name, password, **extra_fields):
        if not email_address:
            raise ValueError('Users require an email address field')
        email_address = self.normalize_email(email_address)
        user = self.model(email_address=email_address, first_name=first_name, last_name=last_name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email_address, first_name, last_name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email_address, first_name, last_name, password, **extra_fields)

    def create_superuser(self, email_address, first_name, last_name, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 1)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email_address, first_name, last_name, password, **extra_fields)


"""
Custom User class for Solar Users
"""
class User(AbstractUser):
    username = None
    email_address = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(null=False, max_length=255)
    last_name = models.CharField(null=False, max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USER_ROLES = (
        (1, 'Admin'),
        (2, 'SalesRep'),
        (3, 'OpsManager'),
        (4, 'Contractor'),
        (5, 'Customer')
    )

    role = models.PositiveSmallIntegerField(choices=USER_ROLES, null=False, default=5)

    USERNAME_FIELD = 'email_address'
    REQUIRED_FIELDS = ["first_name", "last_name"]
    objects = UserManager()
    

