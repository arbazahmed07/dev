Q15. Create a Kubernetes service Pod and test it using Postman.
The question specifies the studentmarkservice image and the following YAML files:
1. namespace.yml
2. deployment.yml
3. service.yml
Answer:
Step 1: Pull the Docker image
docker pull hub.docker.com/r/ssatyab/studentmarkservice


If the pull fails, use the standard Docker Hub image name:
docker pull ssatyab/studentmarkservice:latest


Step 2: Apply the namespace
kubectl apply -f namespace.yml


Step 3: Apply the deployment
kubectl apply -f deployment.yml


Step 4: Apply the service
kubectl apply -f service.yml


Step 5: Check the resources
kubectl get namespaces
kubectl get pods -A
kubectl get deployments -A
kubectl get services -A


Step 6: Test using Postman
If the service is configured to expose port 8080, use:
kubectl port-forward service/studentmarkservice 8080:8080 -n default


Then open Postman and send a GET request to:
http://localhost:8080/


Important: The actual namespace, service name, port and API endpoint must match the downloaded YAML files and the application. If those files specify a different namespace or port, use those values instead.

Result: The student marks service is deployed in Kubernetes and can be tested through Postman.



//namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: studentmarkservice-ns


//deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: studentmarkservice-deployment
  namespace: studentmarkservice-ns
spec:
  replicas: 1
  selector:
    matchLabels:
      app: studentmarkservice
  template:
    metadata:
      labels:
        app: studentmarkservice
    spec:
      containers:
        - name: studentmarkservice-container
          image: ssatyab/studentmarkservice-image:latest
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 8100



//service.yaml

apiVersion: v1
kind: Service
metadata:
  name: studentmarkservice-service
  namespace: studentmarkservice-ns
spec:
  type: NodePort
  selector:
    app: studentmarkservice
  ports:
    - port: 8100          # Service port (inside cluster)
      targetPort: 8100    # Container port
      nodePort: 30081     # Port accessible from Postman (your host)
