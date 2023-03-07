import json
import boto3
from botocore.exceptions import ClientError

USER_POOL_ID = 'us-east-1_d8fHjvvwS'

client = boto3.client('cognito-idp')

def initiate_forgot_password(username):
    try:
        response = client.forgot_password(
            ClientId='qnp5kqqa59lhghjecur68090r',
            Username=username
        )
        return {
            'statusCode': 200,
            'body': 'Verification code sent successfully'
        }
    except ClientError as e:
        return {
            'statusCode': 400,
            'body': e.response['Error']['Message']
        }

def confirm_forgot_password(username, verification_code, new_password):
    try:
        response = client.confirm_forgot_password(
            ClientId='qnp5kqqa59lhghjecur68090r',
            Username=username,
            ConfirmationCode=verification_code,
            Password=new_password
        )
        return {
            'statusCode': 200,
            'body': 'Password changed successfully'
        }
    except ClientError as e:
        return {
            'statusCode': 400,
            'body': e.response['Error']['Message']
        }

def change_password(access_token, old_password, new_password):
    try:
        response = client.change_password(
            AccessToken=access_token,
            PreviousPassword=old_password,
            ProposedPassword=new_password
        )
        return {
            'statusCode': 200,
            'body': 'Password changed successfully'
        }
    except ClientError as e:
        return {
            'statusCode': 400,
            'body': e.response['Error']['Message']
        }

def lambda_handler(event, context):
    action = event['action']
    username = event['username']
    old_password = event['old_password']
    new_password = event['new_password']
    verification_code = event['verification_code']
    
    if action == 'initiate_forgot_password':
        return initiate_forgot_password(username)
    elif action == 'confirm_forgot_password':
        return confirm_forgot_password(username, verification_code, new_password)
    elif action == 'change_password':
        access_token = event['access_token']
        return change_password(access_token, old_password, new_password)
    else:
        return {
            'statusCode': 400,
            'body': 'Invalid action'
        }
