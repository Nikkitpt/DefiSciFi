

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
