from rest_framework.test import APITestCase
from django.urls import reverse
from ..models import User

class TestSetUp(APITestCase):
    def setUp(self):
        self.login_url = reverse('knox_login')
        self.user = User.objects.create_user(email_address="harry@harry.com", first_name='harry', last_name='shih', password='test')
        self.password = 'test'
        
        return super().setUp()

    def tearDown(self):
        return super().tearDown()

    
    
    
    
    