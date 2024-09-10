from flask import Blueprint, jsonify, request
from mock_data import mock_transactions, mock_balance
from .utils import add_transaction
from web3 import Web3
import json
import requests
from mock_data import simulate_supply, simulate_borrow, simulate_swap, simulate_send

main = Blueprint('main', __name__)



@main.route('/', methods=['GET'])
def create_transaction():
    return  jsonify("Hello from the DeFiSciFi API")


@main.route('/portfolio', methods=['GET','OPTIONS'])
def get_portfolio():
    return jsonify(mock_balance)

@main.route('/transactions', methods=['GET', "OPTIONS"])
def get_transactions():
    return jsonify(mock_transactions)



@main.route('/supply', methods=['POST'])
def supply():
    data = request.get_json()
    amount = data.get('amount')
    asset = data.get('asset')
    result = simulate_supply(amount, asset)
    return jsonify(result)

@main.route('/borrow', methods=['POST'])
def borrow():
    data = request.get_json()
    amount = data.get('amount')
    asset = data.get('asset')
    result = simulate_borrow(amount, asset)
    return jsonify(result)

@main.route('/send', methods=['POST'])
def send():
    data = request.get_json()
    amount = data.get('amount')
    asset = data.get('asset')
    recipient = data.get('recipient')
    result = simulate_send(amount, asset, recipient)
    return jsonify(result)


@main.route('/swap', methods=['POST'])
def swap():
    data = request.get_json()
    amount = data.get('amount')
    from_asset = data.get('fromAsset')
    to_asset = data.get('toAsset')
    result = simulate_swap(amount,from_asset,to_asset)
    return jsonify(result)
