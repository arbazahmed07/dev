Step 1: Create the PostgreSQL container
docker run -d --name MyPostgresContainer -e POSTGRES_PASSWORD=abcd1234 -p 5432:5432 postgres:latest


Step 2: Pull the latest traefik/whoami image
docker pull traefik/whoami:latest


Step 3: Run two containers on different ports
docker run -d --name whoami1 -p 8686:80 traefik/whoami:latest
docker run -d --name whoami2 -p 8787:80 traefik/whoami:latest


Step 4: Check the containers
docker ps


Step 5: Execute the curl commands
curl http://localhost:8686


curl http://localhost:8787


Difference between the outputs
- Both URLs return information about the whoami service.
- Port 8686 accesses the first container.
- Port 8787 accesses the second container.
- The hostname and container-related details may differ because they are separate containers.