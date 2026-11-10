//app.py
from flask import Flask
import os

app = Flask(__name__)

APP_MODE = os.getenv("APP_MODE", "development")
APP_MESSAGE = os.getenv("APP_MESSAGE", "Default Message")

@app.route('/')
def home():
    return f"Welcome to Python Backend Application! Mode: {APP_MODE}"

@app.route('/hello')
def hello():
    return APP_MESSAGE

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)


//pip install flask (install python first) or pip install -r requirements.txt


//requirements.txt
Flask

//Dockerfile

FROM python:3.12

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY app.py .

EXPOSE 5000

CMD ["python", "app.py"]


//configmap.yaml

apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_MODE: "production"
  APP_MESSAGE: "Hello from ConfigMap"





//deployment.yaml

apiVersion: apps/v1
kind: Deployment
metadata:
  name: flask-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: flask-app
  template:
    metadata:
      labels:
        app: flask-app
    spec:
      containers:
      - name: flask-app
        image: flask-app:1.0
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 5000
        envFrom:
        - configMapRef:
            name: app-config



//github

# Check Git version
git --version

# Configure username
git config --global user.name "msd"

# Configure email
git config --global user.email "msd@gmail.com"

# Create repository
git init

# Create a file
echo "Hello GitHub" > index.txt

# Add file
git add .

# Commit changes
git commit -m "Initial commit"

# Check status
git status

# Create main branch
git branch -M main

# Add remote repository
git remote add origin https://github.com/username/demo.git

# Push to GitHub
git push -u origin main

# View commit history
git log

# Clone repository
git clone https://github.com/username/demo.git