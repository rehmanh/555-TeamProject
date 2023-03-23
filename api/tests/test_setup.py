from rest_framework.test import APITestCase
from django.urls import reverse

class TestSetUp(APITestCase):
    def setUp(self):
        self.login_url = reverse('login')
        self.user_data ={
            'email_address': "test@test.com",
            'password':"Test"
        }
        return super().setUp()

    def tearDown(self):
        return super().tearDown()

    
    
    
    
    