from .test_setup import TestSetUp
import pdb
from ..models import User
class TestViews(TestSetUp):
    def test_user_cannot_login_with_no_data(self):
        res = self.client.post(self.login_url)
        # self.assertEqual(res.status_code, 200)
        
    def test_user_can_login(self):
        res = self.client.post(self.login_url, self.user_data, format = "json")
        # pdb.set_trace()
        # email = res.data['email_address']
        # user = User.object.get(email= email)
        # user.is_verified = True
        # user.save()
        # self.assertEqual(res.status_code, 200)
        
