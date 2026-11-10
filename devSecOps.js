Practical 3: DevSecOps – Identify and Fix Security Issues
Step 1: Create project
mkdir devsecops-demo
cd devsecops-demo


Step 2: Create vulnerable source code
File: app.py

from flask import Flask, request

app = Flask(__name__)

# Issue 1: Hardcoded Secret
password = "admin123"

@app.route('/')
def home():
    return "Welcome!"

# Issue 2: Debug Mode Enabled
@app.route('/hello')
def hello():
    name = request.args.get('name')
    return "Hello " + name

if __name__ == '__main__':
    app.run(debug=True)


Step 3: Install Bandit
pip install bandit


Step 4: Scan code
bandit -r .


Step 5: Identify two security issues
Issue 1: Hardcoded Password
password = "admin123"



Problem:
- Password is stored directly in source code.
- Anyone accessing the code can see it.
Solution: Use environment variables.

Issue 2: Debug Mode Enabled
app.run(debug=True)



Problem:
- Debug mode exposes detailed error information.
- It can expose sensitive application details.
Solution: Disable debug mode.
Step 6: Fix vulnerabilities
Replace app.py with secure code:

from flask import Flask, request
import os

app = Flask(__name__)

# Secure password
password = os.environ.get("APP_PASSWORD")

@app.route('/')
def home():
    return "Welcome!"

@app.route('/hello')
def hello():
    name = request.args.get('name', '')
    return "Hello " + name

if __name__ == '__main__':
    app.run(debug=False)


Step 7: Set environment variable
Windows CMD:
set APP_PASSWORD=secure123


PowerShell:
$env:APP_PASSWORD="secure123"


Step 8: Scan again
bandit -r .


Step 9: Run application
pip install flask
python app.py


Open browser:
http://127.0.0.1:5000
http://127.0.0.1:5000/hello?name=Arbaz


Result
- Identified two security issues.
- Fixed hardcoded password.
- Disabled Flask debug mode.
- Scanned the source code again using Bandit.