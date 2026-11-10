
//  Python Automated Testing
Aim: Automate Python application testing using Pytest.

Step 1: Install Pytest
pip install pytest


Step 2: Create calculator.py

def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b



Step 3: Create test_calculator.py

from calculator import add, subtract, multiply

def test_add():
    assert add(5, 3) == 8

def test_subtract():
    assert subtract(5, 3) == 2

def test_multiply():
    assert multiply(5, 3) == 15



Step 4: Run tests
pytest -v


Expected output:
test_add PASSED
test_subtract PASSED
test_multiply PASSED

3 passed