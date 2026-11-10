3. Monitoring and Visualization using Prometheus and Grafana
Aim: Monitor a Python application using Prometheus and visualize metrics using Grafana.










Prometheus

Collects and stores application metrics.











Grafana

Displays metrics using dashboards and graphs.


Step 1: Create project structure
monitoring/
│
├── app.py
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
└── prometheus.yml


Step 2: Create app.py


from flask import Flask, Response
from prometheus_client import Counter, generate_latest

app = Flask(__name__)

requests_count = Counter(
    'requests_total',
    'Total number of requests'
)

@app.route('/')
def home():
    requests_count.inc()
    return "Python App Running!"

@app.route('/metrics')
def metrics():
    return Response(
        generate_latest(),
        mimetype='text/plain'
    )

app.run(host='0.0.0.0', port=5000)



Step 3: Create requirements.txt
flask
prometheus-client


Step 4: Create Dockerfile

FROM python:3.12

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY app.py .

EXPOSE 5000

CMD ["python", "app.py"]



Step 5: Create prometheus.yml

global:
  scrape_interval: 5s

scrape_configs:
  - job_name: 'python-app'
    static_configs:
      - targets: ['python-app:5000']



Step 6: Create docker-compose.yml

services:

  python-app:
    build: .
    ports:
      - "5000:5000"

  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    depends_on:
      - python-app

  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
    depends_on:
      - prometheus



Step 7: Run all containers
docker compose up -d --build


Step 8: Open applications
Python Application

Port 5000

http://localhost:5000

Prometheus

Port 9090

http://localhost:9090

Grafana

Port 3000

http://localhost:3000

Step 9: Configure Grafana
1. Open http://localhost:3000.
2. Username: admin
3. Password: admin (change it when prompted).
4. Go to Connections → Data Sources.
5. Select Prometheus.
6. Enter URL:
http://prometheus:9090


7. Click Save & Test.
8. Open Explore and select Prometheus.
9. Enter this query:
requests_total


10. Click Run query.

Visit your Python application several times to generate metrics.

Step 10: Stop containers
docker compose down


Expected result
- Prometheus collects application request metrics.
- Grafana displays the metrics in graphs.
- You can monitor application activity.