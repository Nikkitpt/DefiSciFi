import React, { useState } from 'react';
import axios from 'axios';

const StakeForm = ({ refreshPortfolio }) => {
    const [stakeAmount, setStakeAmount] = useState(0);
    const [asset, setAsset] = useState('ETH');
    const [message, setMessage] = useState('');
    // const [rewards, setRewards] = useState(null);

    // Function to handle the staking request
    const handleStake = async () => {
        try {
            const res = await axios.post('http://127.0.0.1:5000/stake', {
                amount: parseInt(stakeAmount),
                asset: asset,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setMessage(res.data.message);
            refreshPortfolio();

            // Call refreshPortfolio to update portfolio after staking (if applicable)
            // refreshPortfolio();
        } catch (error) {
            console.error('Error during supply request', error);
            setMessage('Failed to supply asset. Please try again.');
        }
    };

    // // Function to fetch rewards
    // const handleGetRewards = async () => {
    //     try {
    //         // const res = await axios.get(`http://localhost:5000/rewards/${userId}`);
    //         const res = await axios.get('http://localhost:5000/rewards')
    //         setRewards(res.data);
    //     } catch (error) {
    //         setMessage('Error fetching rewards: ' + error.message);
    //     }
    // };

    return (
        <div style={{ padding: '20px' }}>
            <h3>Stake</h3>
            <div>
                <label>Stake Amount:</label>
                <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    placeholder="Enter amount to stake"
                />
            </div>
            <div>
                <label>Asset:</label>
                <select value={asset} onChange={(e) => setAsset(e.target.value)}>
                    <option value="ETH">ETH</option>
                    <option value="DAI">DAI</option>
                    <option value="USDC">USDC</option>
                </select>
            </div>
            <div>
                <button onClick={handleStake}>Stake</button>
            </div>

            <p>{message}</p>

            {/* <div>
                <button onClick={handleGetRewards}>Check Rewards</button>
            </div>

            {rewards && (
                <div>
                    <h3>Your Rewards</h3>
                    <p>Amount Staked: {rewards.amount_staked}</p>
                    <p>Days Staked: {rewards.days_staked}</p>
                    <p>Rewards: {rewards.rewards}</p>
                </div>
            )} */}
        </div>
    );
};

export default StakeForm;
