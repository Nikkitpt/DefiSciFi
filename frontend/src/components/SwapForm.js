import React, { useState } from 'react';
import axios from 'axios';

const SwapForm = ({refreshPortfolio}) => {
    const [amount, setAmount] = useState(0);
    const [fromAsset, setFromAsset] = useState('ETH');
    const [toAsset, setToAsset] = useState('DAI');
    const [response, setResponse] = useState('');
  
    const handleSwap = async () => {
      try {
        const res = await axios.post('http://127.0.0.1:5000/swap', {
          amount: parseInt(amount), // Ensure amount is an integer
          fromAsset: fromAsset, // Ensure fromAsset is a string
          toAsset: toAsset, // Ensure toAsset is a string
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setResponse(res.data.message);
        refreshPortfolio();
      } catch (error) {
        console.error('Error during swap request', error);
        setResponse('Failed to perform swap. Please try again.');
      }
    };
  
    return (
      <div>
        <h3>Swap</h3>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div>
          <label>From:</label>
          <select value={fromAsset} onChange={(e) => setFromAsset(e.target.value)}>
            <option value="ETH">ETH</option>
            <option value="DAI">DAI</option>
            <option value="USDC">USDC</option>
          </select>
        </div>
        <div>
          <label>To:</label>
          <select value={toAsset} onChange={(e) => setToAsset(e.target.value)}>
            <option value="ETH">ETH</option>
            <option value="DAI">DAI</option>
            <option value="USDC">USDC</option>
          </select>
        </div>
        <button onClick={handleSwap}>Simulate Swap</button>
        <p>{response}</p>
      </div>
    );
  };

export default SwapForm;
