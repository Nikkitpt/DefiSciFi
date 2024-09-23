import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, FormControl, Select, InputLabel, Typography, Box } from '@mui/material';

const SwapForm = ({ refreshPortfolio }) => {
    const [amount, setAmount] = useState('');
    const [fromAsset, setFromAsset] = useState('ETH');
    const [toAsset, setToAsset] = useState('DAI');
    const [response, setResponse] = useState('');

    const handleSwap = async () => {
      try {
        const res = await axios.post('https://defiscfi-c4f66b4dcc8c.herokuapp.com/swap', {
          amount: parseInt(amount, 10), // Convert amount to an integer
          fromAsset: fromAsset,
          toAsset: toAsset,
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
      <Box sx={{ padding: 3 }}>
        <FormControl fullWidth margin="normal">
          <TextField
            type="number"
            label="Amount"
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="from-asset-label">From:</InputLabel>
          <Select
            labelId="from-asset-label"
            value={fromAsset}
            onChange={(e) => setFromAsset(e.target.value)}
            label="From"
          >
            <MenuItem value="ETH">ETH</MenuItem>
            <MenuItem value="DAI">DAI</MenuItem>
            <MenuItem value="BTC">BTC</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="to-asset-label">To:</InputLabel>
          <Select
            labelId="to-asset-label"
            value={toAsset}
            onChange={(e) => setToAsset(e.target.value)}
            label="To"
          >
            <MenuItem value="ETH">ETH</MenuItem>
            <MenuItem value="DAI">DAI</MenuItem>
            <MenuItem value="BTC">BTC</MenuItem>
          </Select>
        </FormControl>
        <Button
          onClick={handleSwap}
          variant="contained"
          color="primary"
          fullWidth
        >
          Simulate Swap
        </Button>
        {response && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {response}
          </Typography>
        )}
      </Box>
    );
  };

export default SwapForm;
