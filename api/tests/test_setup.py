from rest_framework.test import APITestCase
from django.urls import reverse
from ..models import User

class TestSetUp(APITestCase):
    def setUp(self):
        self.login_url = reverse('knox_login')
        #self.home_url = reverse('home')
        self.logout_url = reverse('knox_logout')
        self.user = User.objects.create_user(email_address="habib@habib.com", first_name='habib', last_name='habib', password='test')
        #self.client.login(email_address="habib@habib.com", password="test")
        
        return super().setUp()

    def tearDown(self):
        return super().tearDown()

    
    
    
    
    