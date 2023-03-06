# from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin
# from django.utils.translation import gettext_lazy as _

# from .models import User

# # Register your models here.
# class CustomUserAdmin(UserAdmin):
#     fieldsets = (
#         (None, {'fields': ('email_address', 'password')}),
#         (_('Personal info'), {'fields': ('first_name', 'last_name', 'role')}),
#         (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
#                                        'groups', 'user_permissions')}),
#         (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
#     )
#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': ('email_address', 'password1', 'password2'),
#         }),
#     )
#     list_display = ('email_address', 'first_name', 'last_name', 'is_staff')
#     search_fields = ('email_address', 'first_name', 'last_name')
#     ordering = ('email_address',)

# admin.site.register(User, CustomUserAdmin)

