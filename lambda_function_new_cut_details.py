import json
import pymysql

def lambda_handler(event, context):
    
    # Connect to the database
    connection = pymysql.connect(
        host='database-1.cbxlmzf07zcq.us-east-1.rds.amazonaws.com',
        user='admin',
        password='TripleS321#',
        db='request_db'
    )
    
    # Fetch the data from the database
    with connection.cursor() as cursor:
        sql = "SELECT request_id, first_name, city FROM mytable WHERE request_status = 'INITIATED'"
        cursor.execute(sql)
        result = cursor.fetchall()
    
    # Format the response
    response = []
    for row in result:
        request_id = row[0]
        first_name = row[1]
        city = row[2]
        response.append({
            'request_id': request_id,
            'first_name': first_name,
            'city': city
        })
        
    response_2 = { "sales_reps": response }
    # Return the response
    return {
        'statusCode': 200,
        'body': response_2
    }
