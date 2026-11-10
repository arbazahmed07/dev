1. Start Jenkins Using Docker
Step 1: Check Docker
docker --version


Step 2: Download Jenkins
docker pull jenkins/jenkins:lts


Step 3: Run Jenkins
docker run -d --name jenkins -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts


Step 4: Check Jenkins
docker ps


Step 5: Get Password
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword


Step 6: Open Jenkins
http://localhost:8080


2. Jenkins Freestyle Job
Step 1: Click New Item.

Step 2: Enter MyFirstJob.

Step 3: Select Freestyle Project → Click OK.

Step 4: Select Source Code Management → Git.

Step 5: Enter GitHub URL.
https://github.com/username/repository.git


Step 6: Enter branch.
*/main


Step 7: Select Build Steps → Execute shell.

Step 8: Enter commands.
echo "Jenkins Job Started"
ls -la


Step 9: Click Save → Build Now.

Step 10: Check Build History → Console Output.

Expected:
Jenkins Job Started
Finished: SUCCESS


3. Jenkins CI/CD Pipeline
Step 1: Click New Item.

Step 2: Enter MyPipeline.

Step 3: Select Pipeline → Click OK.

Step 4: Go to Pipeline → Definition → Pipeline script.

Step 5: Enter code.
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building Application'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing Application'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying Application'
            }
        }
    }
}


Step 6: Click Save → Build Now.

Step 7: Check Console Output.

Expected:
Building Application
Testing Application
Deploying Application
Finished: SUCCESS


4. Useful Docker Commands
docker ps
docker ps -a
docker start jenkins
docker stop jenkins
docker restart jenkins
docker logs jenkins


Open Jenkins anytime:
http://localhost:8080