//server.js

const express = require("express");
const app = express();

app.use(express.json());

let students = [];

app.get("/students", (req, res) => {
  res.json(students);
});

app.post("/students", (req, res) => {
  students.push(req.body);
  res.status(201).json(req.body);
});

app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students[index] = { ...students[index], ...req.body, id };
  res.json(students[index]);
});

app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  students = students.filter(s => s.id !== id);
  res.json({ message: "Student deleted" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});



//Dockerfile

FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY server.js .
EXPOSE 3000
CMD ["node", "server.js"]


//deployment.yaml

apiVersion: apps/v1
kind: Deployment
metadata:
  name: student
spec:
  selector:
    matchLabels:
      app: student
  template:
    metadata:
      labels:
        app: student
    spec:
      containers:
      - name: student
        image: student:latest


//service.yaml

apiVersion: v1
kind: Service
metadata:
  name: student
spec:
  selector:
    app: student
  ports:
  - port: 3000
    targetPort: 3000


//docker commands
docker build -t student .
docker run -d  -p 3000:3000 student
curl http://localhost:3000/students
docker rm -f student

//k8s
kubectl apply -f deployment.yml
kubectl apply -f service.yml
kubectl get pods
kubectl get all
kubectl logs deploy/student
kubectl port-forward svc/student 3000:3000
