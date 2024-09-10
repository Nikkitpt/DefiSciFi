import time

mock_balance = {
    'ETH': 10,
    'DAI': 1000,
    'USDC': 500,
}

mock_staked = {
    'ETH': 0,
    'DAI': 0
}

mock_rewards = {
    'ETH': 0,
    'DAI': 0
}

reward_rates = {
    'ETH': 0.05,  # 5% weekly
    'DAI': 0.02   # 2% weekly
}

stake_time = {}

mock_transactions = [
    {'id': 1, 'type': 'Lend', 'token': 'DAI', 'amount': 100, 'date': '2024-09-01'},
    {'id': 2, 'type': 'Stake', 'token': 'ETH', 'amount': 0.5, 'date': '2024-09-03'}
]
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


def simulate_stake(amount, asset):
    if mock_balance.get(asset) and mock_balance[asset] >= amount:
        # Deduct the amount from balance and add to staked balance
        mock_balance[asset] -= amount
        mock_staked[asset] += amount
        stake_time[asset] = time.time()  # Record the time of staking
        return {'status': 'success', 'message': f'Staked {amount} {asset}'}
    return {'status': 'error', 'message': f'Insufficient balance or asset {asset} not supported'}

def calculate_rewards(asset):
    if mock_staked.get(asset) and mock_staked[asset] > 0:
        current_time = time.time()
        staking_duration = current_time - stake_time.get(asset, current_time)
        weeks_staked = staking_duration / (7 * 24 * 3600)  # Convert to weeks
        rewards = mock_staked[asset] * reward_rates[asset] * weeks_staked
        mock_rewards[asset] += rewards
        stake_time[asset] = current_time  # Reset stake time after reward calculation
        return rewards
    return 0

def simulate_claim_rewards(asset):
    # Calculate the current rewards and claim them
    rewards = calculate_rewards(asset)
    if rewards > 0:
        reward_amount = mock_rewards.get(asset, 0)
        mock_balance[asset] += reward_amount  # Add rewards to balance
        mock_rewards[asset] = 0  # Reset rewards after claiming
        return {'status': 'success', 'message': f'Claimed {reward_amount} {asset} as rewards'}
    return {'status': 'error', 'message': f'No rewards available to claim for {asset}'}


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



    