1. Create a Pod
kubectl run mypod --image=nginx:latest --port=80


Verify the Pod:
kubectl get pods
kubectl describe pod mypod


2. Create a Deployment
kubectl create deployment mydeployment --image=nginx:latest


Verify the Deployment:
kubectl get deployments
kubectl get pods


Scale to 3 Replicas:
kubectl scale deployment mydeployment --replicas=3


3. Create a Service
kubectl expose deployment mydeployment --type=NodePort --port=80


Verify the Service:
kubectl get services
kubectl describe service mydeployment


4. View All Resources
kubectl get all


5. Delete the Resources
kubectl delete service mydeployment
kubectl delete deployment mydeployment
kubectl delete pod mypod