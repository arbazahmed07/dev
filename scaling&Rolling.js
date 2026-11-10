2. Kubernetes Scaling and Rolling Updates
Aim: Scale a deployment from 2 replicas to 5 replicas and perform rolling updates.

Step 1: Create deployment.yaml

apiVersion: apps/v1
kind: Deployment

metadata:
  name: nginx-deployment

spec:
  replicas: 2

  selector:
    matchLabels:
      app: nginx

  template:
    metadata:
      labels:
        app: nginx

    spec:
      containers:
      - name: nginx
        image: nginx:alpine
        ports:
        - containerPort: 80



Step 2: Create deployment
kubectl apply -f deployment.yaml


Step 3: Check replicas
kubectl get pods


Initially, 2 pods will be created.

Step 4: Scale from 2 to 5
kubectl scale deployment nginx-deployment --replicas=5


Check:
kubectl get pods
kubectl get deployments


Now 5 pods will be running.

Step 5: Perform Rolling Update
kubectl set image deployment/nginx-deployment nginx=nginx:latest


Step 6: Check update status
kubectl rollout status deployment/nginx-deployment


Step 7: Check rollout history
kubectl rollout history deployment/nginx-deployment


Step 8: Rollback if required
kubectl rollout undo deployment/nginx-deployment


Step 9: Delete deployment
kubectl delete deployment nginx-deployment


Expected result
- Initially: 2 pods.
- After scaling: 5 pods.
- Rolling update: New container image deployed gradually.
- Rollback: Previous version restored.