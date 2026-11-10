SET 6 – Practical 4: Secret Management Using YAML Files
Aim: Securely manage application passwords using Kubernetes Secrets and use them inside a Flask application.

We will use two YAML files: secret.yaml and deployment.yaml.
Step 1: Create project files
secret-management/
│
├── secret.yaml
└── deployment.yaml


Step 2: Create secret.yaml
Store the database password securely.

apiVersion: v1
kind: Secret

metadata:
  name: app-secret

type: Opaque

stringData:
  DB_PASSWORD: mysecurepassword



Step 3: Create deployment.yaml
Use the Secret inside the Flask application.

apiVersion: apps/v1
kind: Deployment

metadata:
  name: flask-deployment

spec:
  replicas: 1

  selector:
    matchLabels:
      app: flask

  template:
    metadata:
      labels:
        app: flask

    spec:
      containers:
        - name: flask
          image: flask-app:latest
          imagePullPolicy: IfNotPresent

          ports:
            - containerPort: 5000

          env:
            - name: DB_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: app-secret
                  key: DB_PASSWORD



Step 4: Create Kubernetes Secret
kubectl apply -f secret.yaml


Step 5: Deploy Flask application
kubectl apply -f deployment.yaml


Step 6: Check Secret
kubectl get secrets


Step 7: Check Deployment
kubectl get deployments


Step 8: Check Pods
kubectl get pods


Step 9: Verify environment variable
kubectl exec deployment/flask-deployment -- printenv DB_PASSWORD


Expected output:
mysecurepassword


Step 10: Delete resources
kubectl delete -f deployment.yaml


kubectl delete -f secret.yaml


Expected Result
The Flask application successfully receives the database password from Kubernetes Secret without hardcoding it in the application source code.