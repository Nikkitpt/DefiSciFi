import pytest
from flask import Flask
from app.routes import app  # Import your Flask app from the main file

@pytest.fixture
def client():
    # Flask provides a test client to simulate requests to the app
    app.config['TESTING'] = True  # Set app in testing mode
    with app.test_client() as client:
        yield client

def test_get_balance(client):
    # Simulate a request to the route '/balance/0x123'
    address = '0x123'
    response = client.get(f'/balance/{address}')
    
    assert response.status_code == 200

    data = response.get_json()
    
    # Ensure the returned data contains the correct address and balance
    assert data['address'] == address
    assert 'balance' in data
    assert 'ETH' in data['balance']
    assert 'DAI' in data['balance']
    assert data['balance']['ETH'] == 1.25
    assert data['balance']['DAI'] == 500
