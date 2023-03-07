import json
import boto3
from botocore.exceptions import ClientError

USER_POOL_ID = 'us-east-1_d8fHjvvwS'
CLIENT_ID = 'qnp5kqqa59lhghjecur68090r'

client = boto3.client('cognito-idp')

headers = {'Content-Type':'application/json',
           'Access-Control-Allow-Origin':'*',
           'Access-Control-Allow-Methods':'*',
            'Access-Control-Allow-Headers':'*',
            'Accept':'*/*'
}

def lambda_handler(event, context):
    email = event['email']
    password = event['password']
    
    try:
        response = client.initiate_auth(
            ClientId=CLIENT_ID,
            AuthFlow='USER_PASSWORD_AUTH',
            AuthParameters={
                'USERNAME': email,
                'PASSWORD': password
            }
        )
        if 'AuthenticationResult' in response:
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps(response['AuthenticationResult'])
            }
        elif 'ChallengeName' in response:
            return {
                'statusCode': 401,
                'headers': headers,
                'body': 'Authentication challenge required: {}'.format(response['ChallengeName'])
            }
        else:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': 'Unknown authentication error'
            }
    except ClientError as e:
        return {
            'statusCode': 401,
            'headers': headers,
            'body': e.response['Error']['Message']
        }
