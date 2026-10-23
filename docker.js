Q7. Explain the process of creating a Docker container using a Dockerfile.
Answer:

Step 1: Create a file named Dockerfile.
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]


Step 2: Build the Docker image.
docker build -t myapp .


Step 3: Run the container.
docker run -d -p 3000:3000 --name mycontainer myapp


Step 4: Check the running container.
docker ps


Result: A Docker image is built using the Dockerfile, and a container is created from that image.

Note: This example assumes the project contains a valid package.json with a start script.
Q8. Write the Docker command to pull the latest Docker image.
Answer:
docker pull IMAGE_NAME:latest


Example:
docker pull nginx:latest


