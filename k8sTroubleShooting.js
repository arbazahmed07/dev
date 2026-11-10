Aim: Create a Kubernetes Deployment with an incorrect image, identify the error, fix it, and verify the application.
Step 1: Create Deployment
Create a file named broken-deployment.yaml.

File: broken-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deploy
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
        image: nginx:wrongtag
        ports:
        - containerPort: 80


Apply deployment:
kubectl apply -f broken-deployment.yaml


Step 2: Identify the Problem
Check pods:
kubectl get pods


Example output:
NAME                           READY   STATUS
nginx-deploy-7d8f9c6b5-x2abc   0/1     ErrImagePull
nginx-deploy-7d8f9c6b5-y3def   0/1     ImagePullBackOff


Use the actual pod name from your output.

Check pod details:
kubectl describe pod nginx-deploy-7d8f9c6b5-x2abc


Look at the Events section.

Error:
Failed to pull image "nginx:wrongtag"
manifest for nginx:wrongtag not found
Error: ErrImagePull
Back-off pulling image


Check logs:
kubectl logs nginx-deploy-7d8f9c6b5-x2abc


No useful logs appear because the container has not started.

Problem: Incorrect Docker image tag.
Step 3: Fix the Error
Update the image:
kubectl set image deployment/nginx-deploy nginx=nginx:latest


Step 4: Verify Recovery
Check deployment:
kubectl rollout status deployment/nginx-deploy


Check pods:
kubectl get pods


Example output:
NAME                           READY   STATUS
nginx-deploy-7d8f9c6b5-x2abc   1/1     Running
nginx-deploy-7d8f9c6b5-y3def   1/1     Running


Check pod details:
kubectl describe pod nginx-deploy-7d8f9c6b5-x2abc


Step 5: Second Error (Wrong Command)
Add an incorrect command in YAML:
command: ["wrongcommand"]


Apply:
kubectl apply -f broken-deployment.yaml


Check pods:
kubectl get pods


Check logs using the actual new pod name:
kubectl logs nginx-deploy-7d8f9c6b5-newpod


Check details:
kubectl describe pod nginx-deploy-7d8f9c6b5-newpod


Error: CrashLoopBackOff or RunContainerError.
Fix the Error
Remove:
command: ["wrongcommand"]


Apply again:
kubectl apply -f broken-deployment.yaml


Verify:
kubectl get pods