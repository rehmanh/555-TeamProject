import json
import mysql.connector
from mysql.connector import Error

headers = {'Content-Type':'application/json',
           'Access-Control-Allow-Origin':'*',
           'Access-Control-Allow-Methods':'*',
            'Access-Control-Allow-Headers':'*',
            'Accept':'*/*'
}

def lambda_handler(event, context):
    # Get the request_id from the API Gateway request
    #print(event)
   # body = event['body']
    #request_id = body['request_id']
   # print(body)
   # json_data = json.loads(body)
    #print(json_data)
   # request_id = body.json_data
   # print(request_id)
    #request_id = "cb275fc8-9896-4791-9661-1360c382e32e"
    # Connect to the MySQL database
    request_body = json.loads(event['body'])
    request_id = request_body['request_id']
    try:
        connection = mysql.connector.connect(
            host='database-1.cbxlmzf07zcq.us-east-1.rds.amazonaws.com',
            database='request_db',
            user='admin',
            password='TripleS321#'
        )
        
        # Execute a SELECT query to get the request_status for the given request_id
        cursor = connection.cursor()
        query = "SELECT request_status, sales_rep_id FROM mytable WHERE request_id = %s"
        cursor.execute(query, (request_id,))
        result = cursor.fetchone()
        
        # Build the response
        response = {
            'request_id': request_id,
            'request_status': result[0],
            'sales_rep_ID': result[1]
        }
        
        # Return the response as a JSON object
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps(response)
        }
        
    except Error as e:
        print("Error while connecting to MySQL", e)
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'message': 'Internal Server Error'})
        }
        
    finally:
        # Close the database connection
        if connection.is_connected():
            cursor.close()
            connection.close()
