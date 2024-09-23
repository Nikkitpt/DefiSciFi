import datetime
import random

current_date = datetime.datetime.now().strftime('%Y-%m-%d')
random_number =random.uniform(0, 0.001)


mock_balance = {
    'total_balance': 100000, 
    'pie_chart': {'ETH': 1, 'DAI': 200, "BTC": 1}, 
    'asset_history': {'staked': 4, 'claimed': 5, 'borrowed': 6, 'supplied': 7}, 
    'assets':[
        {"id": 1, "token": 'DAI', "amount": 200, "value": 200, "change": "0" },
        {"id": 2, "token": 'ETH', "amount": 1, "value": 2500, "change": "-3" },
        {"id": 3, "token": 'BTC', "amount": 1, "value": 65000, "change": "4" },
    ]
}

mock_transactions = [
    {'id': 1, 'type': 'Lend', 'token': 'DAI', 'amount': 100, 'date': '2024-09-01', 'gas': ".00001"},
    {'id': 2, 'type': 'Stake', 'token': 'ETH', 'amount': 0.5, 'date': '2024-09-03','gas': ".00001"}
]

exchange_rates = {
    'ETH': {'DAI': 2500, 'BTC': 1/26},  # 1 ETH = 2500 DAI, 1 ETH = 1/26 BTC (as 1 BTC = 26 ETH)
    'DAI': {'ETH': 1/2500, 'BTC': 1/65000},  # 1 DAI = 1/2500 ETH, 1 DAI = 1/65000 BTC
    'BTC': {'ETH': 26, 'DAI': 65000}  # 1 BTC = 26 ETH, 1 BTC = 65000 DAI
}


def simulate_stake(amount, asset):
    staked = mock_balance['asset_history']['staked']
    mock_balance['asset_history']['staked'] = staked + amount

    if asset == "ETH":
        eth_balance = mock_balance['assets'][1]['amount']
        if amount > eth_balance:
            return {'status': 'error', 'message': f'Insufficient ETH balance to stake {amount} {asset}. Available: {eth_balance}'}

        eth_balance = eth_balance - amount

        mock_balance['assets'][1]['amount'] = eth_balance

        mock_balance['pie_chart']["ETH"] = eth_balance

        mock_balance['total_balance'] -= amount * 2389 #rate as of 9/19

        eth_value = mock_balance['assets'][1]['value']
        eth_value = eth_balance * 2389
        mock_balance['assets'][1]['value'] = eth_value

        new_staked = (amount * 2389) + staked
        mock_balance['asset_history']['staked'] = new_staked

    if asset =="DAI":
        dai_balance = mock_balance['assets'][0]['amount']
        if amount > dai_balance:
            return {'status': 'error', 'message': f'Insufficient DAI balance to stake {amount} {asset}. Available: {dai_balance}'}

        dai_balance = dai_balance - amount

        mock_balance['assets'][0]['amount'] = dai_balance

        mock_balance['pie_chart']["DAI"] = dai_balance

        mock_balance['total_balance'] -= amount

        dai_value = mock_balance['assets'][0]['value']
        dai_value = dai_balance
        mock_balance['assets'][0]['value'] = dai_value

        new_staked = amount + staked
        mock_balance['asset_history']['staked'] = new_staked

    if asset =="BTC":
        btc_balance = mock_balance['assets'][2]['amount']
        if amount > btc_balance:
            return {'status': 'error', 'message': f'Insufficient ETH balance to stake {amount} {asset}. Available: {btc_balance}'}

        btc_balance = btc_balance - amount

        mock_balance['assets'][2]['amount'] = btc_balance

        mock_balance['pie_chart']["BTC"] = btc_balance

        mock_balance['total_balance'] -= amount * 65000 #rate as of 9/19

        btc_value = mock_balance['assets'][2]['value']
        btc_value = btc_balance * 65000
        mock_balance['assets'][2]['value'] = btc_value

        new_staked = (amount * 65000) + staked
        mock_balance['asset_history']['staked'] = new_staked

    new_transaction = {
        'id': len(mock_transactions) + 1,  # Increment ID
        'type': 'Stake',
        'token': asset,
        'amount': amount,
        'date': current_date,  # Example: replace with current date in production
        'gas': .024
    }
    mock_transactions.append(new_transaction)
    print("Transaction added:", new_transaction)
    
    return {'status': 'success', 'message': f'Staked {amount} {asset}'}

def simulate_supply(amount, asset):
    supplied = mock_balance['asset_history']['supplied']
    mock_balance['asset_history']['supplied'] = supplied + amount

    #reduce balance
    if asset == "ETH":
        eth_balance = mock_balance['assets'][1]['amount']
        if amount > eth_balance:
            return {'status': 'error', 'message': f'Insufficient ETH balance to stake {amount} {asset}. Available: {eth_balance}'}
        eth_balance = eth_balance - amount

        mock_balance['assets'][1]['amount'] = eth_balance

        mock_balance['pie_chart']["ETH"] = eth_balance

        mock_balance['total_balance'] -= eth_balance * 2389 #rate as of 9/19

        eth_value = mock_balance['assets'][1]['value']
        eth_value = eth_balance * 2389
        mock_balance['assets'][1]['value'] = eth_value

        new_supplied = (amount * 2389) + supplied
        mock_balance['asset_history']['supplied'] = new_supplied

    if asset == "DAI":
        dai_balance = mock_balance['assets'][0]['amount']
        if amount > dai_balance:
            return {'status': 'error', 'message': f'Insufficient DAI balance to stake {amount} {asset}. Available: {dai_balance}'}
        dai_balance = dai_balance - amount

        mock_balance['assets'][0]['amount'] = dai_balance

        mock_balance['pie_chart']["DAI"] = dai_balance

        mock_balance['total_balance'] -= dai_balance #rate as of 9/19

        dai_value = mock_balance['assets'][0]['value']
        dai_value = dai_balance
        mock_balance['assets'][0]['value'] = dai_value

        new_supplied = amount + supplied
        mock_balance['asset_history']['supplied'] = new_supplied
    
    if asset == "BTC":
        btc_balance = mock_balance['assets'][2]['amount']
        if amount > btc_balance:
            return {'status': 'error', 'message': f'Insufficient BTC balance to stake {amount} {asset}. Available: {btc_balance}'}
        btc_balance = btc_balance - amount

        mock_balance['assets'][2]['amount'] = btc_balance

        mock_balance['pie_chart']["BTC"] = btc_balance

        mock_balance['total_balance'] -= btc_balance * 65000 #rate as of 9/19

        btc_value = mock_balance['assets'][2]['value']
        btc_value = btc_balance * 65000
        mock_balance['assets'][2]['value'] = btc_value

        new_supplied = (amount * 2389) + supplied
        mock_balance['asset_history']['supplied'] = new_supplied

    
    
    new_transaction = {
        'id': len(mock_transactions) + 1,  # Increment ID
        'type': 'Lend',
        'token': asset,
        'amount': amount,
        'date': current_date,  # Example: replace with current date in production
        'gas': random_number
    }
    mock_transactions.append(new_transaction)
    print("Transaction added:", new_transaction)


    return {'status': 'success', 'message': f'Supplied {amount} {asset}'}
   

def simulate_borrow(amount, asset):
    borrowed = mock_balance['asset_history']['borrowed']
    mock_balance['asset_history']['supplied'] = borrowed + amount

    #reduce balance
    if asset == "ETH":
        eth_balance = mock_balance['assets'][1]['amount']
        eth_balance = eth_balance + amount

        mock_balance['assets'][1]['amount'] = eth_balance

        mock_balance['pie_chart']["ETH"] = eth_balance

        mock_balance['total_balance'] += eth_balance * 2389 #rate as of 9/19

        eth_value = mock_balance['assets'][1]['value']
        eth_value = eth_balance * 2389
        mock_balance['assets'][1]['value'] = eth_value

        new_borrowed = (amount * 2389) + borrowed
        mock_balance['asset_history']['borrowed'] = new_borrowed
    
    if asset == "BTC":
        btc_balance = mock_balance['assets'][2]['amount']
        btc_balance = btc_balance + amount

        mock_balance['assets'][2]['amount'] = btc_balance

        mock_balance['pie_chart']["BTC"] = btc_balance 

        mock_balance['total_balance'] += btc_balance * 65000 #rate as of 9/1
        btc_value = mock_balance['assets'][2]['value']
        btc_value = btc_balance * 65000
        mock_balance['assets'][2]['value'] = btc_value

        new_borrowed = (amount * 65000) + borrowed
        mock_balance['asset_history']['borrowed'] = new_borrowed
    new_transaction = {
        'id': len(mock_transactions) + 1,  # Increment ID
        'type': 'Borrow',
        'token': asset,
        'amount': amount,
        'date': current_date,  # Example: replace with current date in production
        'gas': .076
    }
    mock_transactions.append(new_transaction)
    print("Transaction added:", new_transaction)


    return {'status': 'success', 'message': f'Borrowed {amount} {asset}'}

    #     return {'status': 'success', 'message': f'Borrowed {amount} {asset}'}
    # return {'status': 'error', 'message': f'Asset {asset} not supported'}

def simulate_swap(amount, from_asset, to_asset):
    if from_asset not in exchange_rates or to_asset not in exchange_rates[from_asset]:
        return {'message': f'Swap between {from_asset} and {to_asset} is not supported'}

    rate = exchange_rates[from_asset][to_asset]

    received_amount = amount * rate

    from_asset_index = next((i for i, asset in enumerate(mock_balance['assets']) if asset['token'] == from_asset), None)
    to_asset_index = next((i for i, asset in enumerate(mock_balance['assets']) if asset['token'] == to_asset), None)

    if from_asset_index is None or to_asset_index is None:
        return {'message': f'Either {from_asset} or {to_asset} is not available in the balance'}

    if mock_balance['assets'][from_asset_index]['amount'] < amount:
        return {'status': 'error', 'message': f'Insufficient {from_asset} balance'}

    mock_balance['assets'][from_asset_index]['amount'] -= amount
    mock_balance['assets'][to_asset_index]['amount'] += received_amount

    mock_balance['pie_chart'][from_asset] = mock_balance['assets'][from_asset_index]['amount']
    mock_balance['pie_chart'][to_asset] = mock_balance['assets'][to_asset_index]['amount']

    # Update the values of the assets based on the new amounts
    try:
        from_asset_value = mock_balance['assets'][from_asset_index]['amount'] * exchange_rates[from_asset]['DAI']
    except KeyError:
        from_asset_value = 0  # Default to 0 or any appropriate value if 'DAI' rate is not found

    try:
        to_asset_value = mock_balance['assets'][to_asset_index]['amount'] * exchange_rates[to_asset]['DAI']
    except KeyError:
        to_asset_value = 0  # Default to 0 or any appropriate value if 'DAI' rate is not found

    mock_balance['assets'][from_asset_index]['value'] = from_asset_value
    mock_balance['assets'][to_asset_index]['value'] = to_asset_value

    new_transaction = {
        'id': len(mock_transactions) + 1,
        'type': 'Swap',
        'token' : from_asset,
        'amount': amount,
        'date': current_date,  # Use dynamically generated date
        'gas': .002
    }
    mock_transactions.append(new_transaction)

    print("Transaction added:", new_transaction)

    return {
        'message': f'Successfully swapped {amount} {from_asset} to {received_amount} {to_asset}.',
        'balances': mock_balance
    }


