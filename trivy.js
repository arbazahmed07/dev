Aim: Scan a Docker image using Trivy and identify security vulnerabilities.
Step 1: Install Trivy on Windows
Open PowerShell:
winget install AquaSecurity.Trivy


Check installation:
trivy --version


Step 2: Build Docker image
Use the Dockerfile from Practical 1.
docker build -t flask-app .


Step 3: Scan Docker image
trivy image flask-app


This scans the image for vulnerabilities.
Step 4: Scan only HIGH and CRITICAL issues
trivy image --severity HIGH,CRITICAL flask-app


Step 5: Scan vulnerabilities and secrets
trivy image --scanners vuln,secret flask-app


Step 6: Save scan report
trivy image -f json -o report.json flask-app