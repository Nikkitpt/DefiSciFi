# DefiSciFi

**DeFiSciFi** is a decentralized finance dashboard that simulates key DeFi operations such as lending, borrowing, swapping, and staking. This project is built to showcase proficiency in web3, blockchain, Python, Flask, and React technologies by providing users with a hands-on experience in simulating transactions using mock data on a testnet.

## Features

- **Lending & Borrowing Simulation:** Users can simulate lending and borrowing assets using a testnet, such as Sepolia.
- **Swapping:** The dashboard allows users to simulate token swaps between different assets.
- **Staking:** Users can simulate staking of tokens and view the results.
- **Portfolio Management:** Displays balance and allows portfolio rebalancing simulations for various assets.
- **Real-Time Data:** The app integrates price feed utilities to display real-time or near real-time price data of different assets using helper functions in the `simulate` class.

## Technologies Used

- **Backend:** Python (Flask)
- **Frontend:** React, Material UI (MUI)
- **Blockchain Integration:** Web3, Aave testnet pool proxy
- **Database:** PostgreSQL, SQLAlchemy
- **Tools:** Flask-Migrate for database migrations, Infura, Alchemy, MetaMask for wallet integration

## Usage
1. **Connect your MetaMask wallet**: Make sure your MetaMask wallet is connected to the Sepolia testnet.
2. **Simulate DeFi operations**: Use the dashboard to simulate transactions like lending, borrowing, swapping, and staking.
3. **View real-time balance**: The dashboard will display your current testnet balances and allow you to simulate different portfolio allocations.

## Project Structure

```bash
defisci/
│
├── backend/
│   ├── app.py               # Main Flask app entry point
│   ├── models.py            # SQLAlchemy models for database
│   ├── mock_data.py         # Mock data for simulations
│   ├── routes.py            # Routes for API endpoints
│   ├── utils.py             # Utility functions for updating database
│   ├── migrations/          # Flask-Migrate database migrations
│   └── requirements.txt     # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── App.js           # Main React app entry point
│   │   ├── components/      # Reusable React components
│   │   └── pages/           # Pages for different sections of the app
│   └── package.json         # Node dependencies
└── README.md                # Project documentation

