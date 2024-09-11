from flask import Blueprint, jsonify, request
from mock_data import mock_transactions, mock_balance, simulate_supply, simulate_borrow, simulate_swap, simulate_send, simulate_stake, simulate_claim_rewards
from .utils import add_transaction
from web3 import Web3
import json
import requests

main = Blueprint('main', __name__)


@main.route('/', methods=['GET'])
def create_transaction():
    return  jsonify("Hello from the DeFiSciFi API")


@main.route('/portfolio', methods=['GET','OPTIONS'])
def get_portfolio():
    #return total balance, 
    # eth, dai, usdc,
    #staked, claimed, supplied, borrowed

    #tb - use $ function
    #pie - exactly the way it is
    #ah - update mocknew from stake, borrow, supplied
    mock_new = {'total_balance': 1000, 'pie_chart': {'ETH': 1, 'DAI': 2, "USDC": 3}, 'asset_history': {'staked': 4, 'claimed': 5, 'borrowed': 6, 'supplied': 7}}
    print(mock_balance)
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


@main.route('/stake', methods=['POST'])
def stake():
    data = request.get_json()
    amount = data.get('amount')
    asset = data.get('asset')
    
    if not amount or not asset:
        return jsonify({'status': 'error', 'message': 'Missing amount or asset'}), 400
    
    result = simulate_stake(amount, asset)
    return jsonify(result)

@main.route('/claim_rewards', methods=['POST'])
def claim_rewards():
    data = request.get_json()
    asset = data.get('asset')
    
    if not asset:
        return jsonify({'status': 'error', 'message': 'Missing asset'}), 400
    
    result = simulate_claim_rewards(asset)
    return jsonify(result)