from .test_setup import TestSetUp
from ..models import User


class TestViews(TestSetUp):
    def test_invalid_login(self):
        res = self.client.post(self.login_url, {'email_address': 'test@test.com', 'password': 'wrongpassword'})
        self.assertEqual(res.status_code, 400)
        
    def test_valid_login(self):
        res = self.client.post(self.login_url, {'email_address': 'harry@harry.com', 'password': 'test'})
        self.assertEqual(res.status_code, 200)

    def test_logout(self):
        res = self.client.post(self.login_url, {'email_address': 'harry@harry.com', 'password': 'test'})
        self.assertEqual(res.status_code, 200)
        self.client.logout()
        res = self.client.get('/login')
        self.assertEqual(res.status_code, 200)
        
