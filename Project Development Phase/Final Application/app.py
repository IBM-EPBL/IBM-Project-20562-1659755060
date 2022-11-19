from flask import Flask, request, Response, send_from_directory
import requests
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

NEWS_API_KEY = 'https://us-south.ml.cloud.ibm.com/ml/v4/deployments/b8dff1f1-05ce-4820-9be7-b9db8d2ba1d9/predictions?version=2022-11-19'



@app.route('/health-check', methods=['GET'])
def health_check_for_user():
    return Response("Running")


@app.route('/get-key', methods=['GET'])
def get_key():
    API_KEY = "vB02Z4ylw9hc5-F6OX0_0FdqqaXlwIVoFw_Tp-hjoQS8"
    token_response = requests.post('https://iam.cloud.ibm.com/identity/token', data={"apikey":
                                                                                     API_KEY, "grant_type": 'urn:ibm:params:oauth:grant-type:apikey'})
    mltoken = token_response.json()["access_token"]
    return Response(mltoken)


@app.route('/', methods=['GET'])
def get_users():
    return "hello"

@app.route('/get-performance', methods=['POST'])
def get_performance_for_user():
    print(request.args)
    query = request.get_json()
    print(query)
    inp = query.get('inp')
    payload_scoring = {"input_data": [{"field": [["cylinders", "displacement", "horsepower", "weight", "acceleration", "model year", "origin"]], "values": [
        inp]}]}
    API_KEY = "vB02Z4ylw9hc5-F6OX0_0FdqqaXlwIVoFw_Tp-hjoQS8"
    token_response = requests.post('https://iam.cloud.ibm.com/identity/token', data={"apikey":
                                                                                     API_KEY, "grant_type": 'urn:ibm:params:oauth:grant-type:apikey'})
    mltoken = token_response.json()["access_token"]

    header = {'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + mltoken}
    url = NEWS_API_KEY
    api_response = requests.post(url=url, json=payload_scoring, headers=header)
    return Response(api_response)

if __name__ == '__main__':
    app.run(debug=True)
