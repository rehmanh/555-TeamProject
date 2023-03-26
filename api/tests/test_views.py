from audioop import reverse
from .test_setup import TestSetUp
from django.contrib.auth import login as auth_login
import pdb
from ..models import User
class TestViews(TestSetUp):
    def test_invalid_login(self):
        res = self.client.post(self.login_url, {'email_address': 'test@test.com', 'password': 'wrongpassword'})
        self.assertEqual(res.status_code, 400)
        
    def test_valid_login(self):
        res = self.client.post(self.login_url, {'email_address': "habib@habib.com", 'password': "test"})
        self.assertEqual(res.status_code, 200)
        #self.assertRedirects(res, self.home_url)

    def test_logout(self):
        self.client.login(email_address="habib@habib.com", password="test")
        res = self.client.get(self.logout_url)
        self.assertEqual(res.status_code, 401)
        
