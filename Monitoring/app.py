from flask import Flask
from prometheus_client import Counter, generate_latest

app = Flask(__name__)

requests = Counter('app_requests_total', 'Total requests')

@app.route('/')
def home():
    requests.inc()
    return "Welcome to Monitoring!"

@app.route('/metrics')
def metrics():
    return generate_latest()

app.run(host='0.0.0.0', port=5000)