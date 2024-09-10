import React, { useState } from 'react';
import axios from 'axios';

const BorrowForm = ({refreshPortfolio}) => {
  const [amount, setAmount] = useState(0);
  const [asset, setAsset] = useState('ETH');
  const [response, setResponse] = useState('');

  const handleBorrow = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/borrow', {
        amount: parseInt(amount), // Ensure amount is an integer
        asset: asset, // Ensure asset is a string
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setResponse(res.data.message);
      refreshPortfolio();
    } catch (error) {
      console.error('Error during borrow request', error);
      setResponse('Failed to borrow asset. Please try again.');
    }
  };

  return (
    <div>
      <h3>Borrow</h3>
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
      <button onClick={handleBorrow}>Simulate Borrow</button>
      <p>{response}</p>
    </div>
  );
};

export default BorrowForm;
