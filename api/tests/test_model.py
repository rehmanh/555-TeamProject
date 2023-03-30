from .test_setup import TestSetUp
from ..models import User

class TestModel(TestSetUp):
    def test_valid_user_is_customer_role_by_default(self):
        user = User.objects.get(email_address='harry@harry.com')        
        self.assertEqual(user.role, 5)
        
