import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, FormControl, Select, InputLabel } from '@mui/material';

const BorrowForm = ({ refreshPortfolio }) => {
  const [amount, setAmount] = useState('');
  const [asset, setAsset] = useState('ETH');
  const [response, setResponse] = useState('');

  const handleBorrow = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/borrow', {
        amount: parseInt(amount, 10), // Ensuring amount is an integer
        asset: asset,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setResponse(res.data.message);
      refreshPortfolio(); // Refreshing the portfolio view
    } catch (error) {
      console.error('Error during borrow request', error);
      setResponse('Failed to borrow asset. Please try again.');
    }
  };

  return (
    <div>
      <TextField
        type="number"
        label="Borrow Amount"
        variant="outlined"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="asset-label">Asset</InputLabel>
        <Select
          labelId="asset-label"
          value={asset}
          onChange={(e) => setAsset(e.target.value)}
          label="Asset"
        >
          <MenuItem value="ETH">ETH</MenuItem>
          <MenuItem value="DAI">DAI</MenuItem>
          <MenuItem value="USDC">USDC</MenuItem>
        </Select>
      </FormControl>
      <Button
        onClick={handleBorrow}
        variant="contained"
        color="primary"
        fullWidth
      >
        Simulate Borrow
      </Button>
      <p>{response}</p>
    </div>
  );
};

export default BorrowForm;
