from flask import Blueprint, jsonify
from mock_data import mock_transactions, mock_portfolio

main = Blueprint('transactions', __name__)

@main.route('/', methods=['GET','OPTIONS'])
def home():
    return jsonify("Hello from the DeFiSciFi API")

@main.route('/portfolio', methods=['GET','OPTIONS'])
def get_portfolio():
    return jsonify(mock_portfolio)

@main.route('/transactions', methods=['GET', "OPTIONS"])
def get_transactions():
    return jsonify(mock_transactions)