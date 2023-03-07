import json
import pymysql
import uuid
from datetime import datetime, timedelta

# RDS configuration
host = 'database-1.cbxlmzf07zcq.us-east-1.rds.amazonaws.com'
user = 'admin'
password = 'TripleS321#'
database_name = 'request_db'

headers = {'Content-Type':'application/json',
           'Access-Control-Allow-Origin':'*',
           'Access-Control-Allow-Methods':'*',
            'Access-Control-Allow-Headers':'*',
            'Accept':'*/*'
}

def lambda_handler(event, context):
    # Extracting the input data from the API Gateway event
    input_data = json.loads(event['body'])
    
    # Generating a unique request ID
    request_id = str(uuid.uuid4())
    print(request_id)

    # Getting the current time in Eastern Standard Time (EST)
    est_tz = timedelta(hours=-5)  # Time difference between UTC and EST
    utc_time = datetime.utcnow()  # Current time in UTC
    est_time = utc_time + est_tz  # Current time in EST
    timestamp = est_time.strftime('%Y-%m-%d %H:%M:%S')

    # Setting the request_status field to 'INITIATED'
    request_status = 'INITIATED'

    # Connecting to the MySQL RDS database
    conn = pymysql.connect(host=host, user=user, passwd=password, db=database_name)
    cur = conn.cursor()
    
    # Updating the database with the input data and request ID
    sql = "INSERT INTO mytable (request_id, created_at_datetime, updated_at_datetime, request_status, first_name, last_name, email_address, phone_number, street_address1, city, state, zip_code) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    cur.execute(sql, (request_id, timestamp, timestamp, request_status, input_data['first_name'], input_data['last_name'], input_data['email_address'], input_data['phone_number'], input_data['street_address1'], input_data['city'], input_data['state'], input_data['zip_code']))
    conn.commit()
    
    # Closing the database connection
    cur.close()
    conn.close()
    
    # Returning a success response with the generated request ID
    response = {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'message': 'Data updated successfully', 'request_id': request_id})
    }
    
    return response
