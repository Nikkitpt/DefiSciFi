from datetime import datetime

# Get today's date
today = datetime.now()

# Format the date as 'YYYY-MM-DD'
formatted_date = today.strftime('%Y-%m-%d')

print(formatted_date)


mock_balance = {
    'total_balance': 100000, 
    'pie_chart': {'ETH': 10, 'DAI': 200, "USDC": 250}, 
    'asset_history': {'staked': 4, 'claimed': 5, 'borrowed': 6, 'supplied': 7}, 
    'assets':[
        {"id": 1, "token": 'DAI', "amount": 200, "value": 3000, "change": "-2" },
        {"id": 2, "token": 'ETH', "amount": 10, "value": 400, "change": "3" },
        {"id": 3, "token": 'USDC', "amount": 2.5, "value": 400, "change": "4" },
    ]
}



print(mock_balance['pie_chart']['ETH'])

mock_transactions = [
    {'id': 1, 'type': 'Lend', 'token': 'DAI', 'amount': 100, 'date': '2024-09-01', 'gas': ".00001"},
    {'id': 2, 'type': 'Stake', 'token': 'ETH', 'amount': 0.5, 'date': '2024-09-03','gas': ".00001"}
]

exchange_rates = {
    'ETH': {'DAI': 1800, 'USDC': 1800},
    'DAI': {'ETH': 1/1800, 'USDC': 1},
    'USDC': {'ETH': 1/1800, 'DAI': 1}
}


def simulate_stake(amount, asset):
    staked = mock_balance['asset_history']['staked']
    #update staked 
    mock_balance['asset_history']['staked'] = staked + amount

    #reduce balance
    if asset == "ETH":
        eth_balance = mock_balance['assets'][1]['amount']
        print("ETH BALANCE \n", eth_balance)
        eth_balance = eth_balance - amount
        mock_balance['assets'][1]['amount'] = eth_balance

        mock_balance['pie_chart']["ETH"] = eth_balance

        mock_balance['total_balance'] -= eth_balance * 2389 #rate as of 9/19

        new_staked = (amount * 2389) + staked

        mock_balance['asset_history']['staked'] = new_staked
        
        # history = {'id': len(mock_transactions) + 1, 'type': 'Stake', 'token': 'ETH', 'amount': amount, 'date': formatted_date,'gas': ".00001"}
        # mock_transactions.append(history)



    if asset =="DAI":
        pass
    if asset =="USDC":
        pass
    
    #update balance 

    #add logic add to transaction history

    return {'status': 'success', 'message': f'Staked {amount} {asset}'}
    # return {'status': 'error', 'message': f'Insufficient balance or asset {asset} not supported'}


def simulate_supply(amount, asset):
    if mock_balance.get(asset):
        mock_balance[asset] -= amount

        #add logic add to transaction history

        return {'status': 'success', 'message': f'Supplied {amount} {asset}'}
    return {'status': 'error', 'message': f'Asset {asset} not supported'}

def simulate_borrow(amount, asset):
    if mock_balance.get(asset):
        mock_balance[asset] += amount

        #add logic add to transaction history

        return {'status': 'success', 'message': f'Borrowed {amount} {asset}'}
    return {'status': 'error', 'message': f'Asset {asset} not supported'}

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


        #add logic add to transaction history

    return {'status': 'error', 'message': f'Insufficient balance or asset {from_asset} not supported'}








    