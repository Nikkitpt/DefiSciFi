import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, FormControl, Select, InputLabel, Typography } from '@mui/material';

const StakeForm = ({ refreshPortfolio }) => {
    const [stakeAmount, setStakeAmount] = useState('');
    const [asset, setAsset] = useState('ETH');
    const [message, setMessage] = useState('');

    const handleStake = async () => {
        try {
            const res = await axios.post('http://127.0.0.1:5000/stake', {
                amount: parseInt(stakeAmount, 10),
                asset: asset,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setMessage(res.data.message);
            refreshPortfolio();
        } catch (error) {
            console.error('Error during stake request', error);
            setMessage('Failed to stake asset. Please try again.');
        }
    };

    return (
        <div >
            <FormControl fullWidth margin="normal">
                <TextField
                    label="Stake Amount"
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    placeholder="Enter amount to stake"
                    fullWidth
                    variant="outlined"
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel id="asset-select-label">Asset</InputLabel>
                <Select
                    labelId="asset-select-label"
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
                onClick={handleStake}
                variant="contained"
                color="primary"
                fullWidth
            >
                Simulate Stake
            </Button>
            {message && (
                <Typography color="error">
                    {message}
                </Typography>
            )}
        </div>
    );
};

export default StakeForm;
