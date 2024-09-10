import React, { useState } from 'react';
import axios from 'axios';

const SupplyForm = () => {
  const [amount, setAmount] = useState(0);
  const [asset, setAsset] = useState('ETH');
  const [response, setResponse] = useState('');

  const handleSupply = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/supply', {
        amount: parseInt(amount), // Ensure amount is an integer
        asset: asset, // Ensure asset is a string
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setResponse(res.data.message);
    } catch (error) {
      console.error('Error during supply request', error);
      setResponse('Failed to supply asset. Please try again.');
    }
  };

  return (
    <div>
      <h3>Supply</h3>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={asset} onChange={(e) => setAsset(e.target.value)}>
        <option value="ETH">ETH</option>
        <option value="DAI">DAI</option>
        <option value="USDC">USDC</option>
      </select>
      <button onClick={handleSupply}>Simulate Supply</button>
      <p>{response}</p>
    </div>
  );
};

export default SupplyForm;
