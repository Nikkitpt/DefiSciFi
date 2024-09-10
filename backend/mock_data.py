

mock_transactions = [
    {'id': 1, 'type': 'Lend', 'token': 'DAI', 'amount': 100, 'date': '2024-09-01'},
    {'id': 2, 'type': 'Stake', 'token': 'ETH', 'amount': 0.5, 'date': '2024-09-03'}
]

# mock_data.py
mock_balance = {
    'ETH': 10,
    'DAI': 1000,
    'USDC': 500
}

exchange_rates = {
    'ETH': {'DAI': 1800, 'USDC': 1800},
    'DAI': {'ETH': 1/1800, 'USDC': 1},
    'USDC': {'ETH': 1/1800, 'DAI': 1}
}

def simulate_supply(amount, asset):
    if mock_balance.get(asset):
        mock_balance[asset] -= amount
        return {'status': 'success', 'message': f'Supplied {amount} {asset}'}
    return {'status': 'error', 'message': f'Asset {asset} not supported'}

def simulate_borrow(amount, asset):
    if mock_balance.get(asset):
        mock_balance[asset] += amount
        return {'status': 'success', 'message': f'Borrowed {amount} {asset}'}
    return {'status': 'error', 'message': f'Asset {asset} not supported'}

def simulate_send(amount, asset, recipient):
    if mock_balance.get(asset) and mock_balance[asset] >= amount:
        mock_balance[asset] -= amount
        return {'status': 'success', 'message': f'Sent {amount} {asset} to {recipient}'}
    return {'status': 'error', 'message': f'Insufficient balance or asset {asset} not supported'}

def simulate_swap(amount, from_asset, to_asset):
    rate = exchange_rates[from_asset].get(to_asset)
    if not rate:
        return {'message': f'Swap between {from_asset} and {to_asset} is not supported'}

    received_amount = amount * rate
    if mock_balance.get(from_asset):
        mock_balance[from_asset] -= amount
        mock_balance[to_asset] += received_amount
        return {
        'message': f'Successfully swapped {amount} {from_asset} to {received_amount} {to_asset}.',
        'balances': mock_balance
        }
    return {'status': 'error', 'message': f'Insufficient balance or asset {from_asset} not supported'}



    