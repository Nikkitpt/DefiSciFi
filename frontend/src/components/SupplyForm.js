import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, FormControl, Select, InputLabel,Typography } from '@mui/material';

const SupplyForm = ({ refreshPortfolio }) => {
  const [amount, setAmount] = useState('');
  const [asset, setAsset] = useState('ETH');
  const [response, setResponse] = useState('');

  const handleSupply = async () => {
    try {
      const res = await axios.post('https://defiscfi-c4f66b4dcc8c.herokuapp.com/supply', {
        amount: parseInt(amount, 10),
        asset: asset,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setResponse(res.data.message);

      // Call refreshPortfolio to update portfolio after supply
      refreshPortfolio();
    } catch (error) {
      console.error('Error during supply request', error);
      setResponse('Failed to supply asset. Please try again.');
    }
  };

  return (
    <div>
      <TextField
        type="number"
        label="Supply Amount"
        variant="outlined"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Asset</InputLabel>
        <Select
          value={asset}
          label="Asset"
          onChange={(e) => setAsset(e.target.value)}
        >
          <MenuItem value="ETH">ETH</MenuItem>
          <MenuItem value="DAI">DAI</MenuItem>
          <MenuItem value="BTC">BTC</MenuItem>
        </Select>
      </FormControl>
      <Button
        onClick={handleSupply}
        variant="contained"
        color="primary"
        fullWidth
      >
        Simulate Supply
      </Button>
      <Typography color="error">
                    {response}
      </Typography>
      {/* <p>{response}</p> */}
    </div>
  );
};

export default SupplyForm;
