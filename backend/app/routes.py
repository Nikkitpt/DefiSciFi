from flask import Blueprint, jsonify, request
from mock_data import mock_transactions, mock_portfolio
from .utils import add_transaction


main = Blueprint('main', __name__)

@main.route('/', methods=['GET'])
def create_transaction():
    # add_transaction(50, "ETH")
    return  jsonify("Hello from the DeFiSciFi API")


@main.route('/portfolio', methods=['GET','OPTIONS'])
def get_portfolio():
    return jsonify(mock_portfolio)

@main.route('/transactions', methods=['GET', "OPTIONS"])
def get_transactions():
    return jsonify(mock_transactions)