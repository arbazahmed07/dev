from flask import Flask
import os

app = Flask(__name__)

APP_MODE = os.getenv("APP_MODE", "development")
APP_MESSAGE = os.getenv("APP_MESSAGE", "Default Message")

@app.route('/')
def home():
    return f"Welcome to Python Backend Application! Mode: {APP_MODE}"

@app.route('/hello')
def hello():
    return APP_MESSAGE

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)