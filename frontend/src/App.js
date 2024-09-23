import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Portfolio from './components/Portfolio';
import DefiBar from './components/DefiBar';
import TransactionHistory from './components/TransactionHistory';
import { LineChart } from '@mui/x-charts/LineChart';
import { styled } from '@mui/material/styles';
import { Paper, Typography } from '@mui/material';
import { useState } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));


function App() {
    // const portfolioRef = React.useRef(null);

    // const refreshPortfolio = () => {
    //   if (portfolioRef.current) {
    //     portfolioRef.current.fetchPortfolio();
    //   }
    // };
    // const yesterday = new Date();
    // yesterday.setDate(yesterday.getDate() - 1); // Move the date back by one day
    // const dateStr = yesterday.toISOString().split('T')[0]; // Get the date part in YYYY-MM-DD format
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const portfolioRef = React.useRef(null);

    const refreshPortfolio = () => {
      if (portfolioRef.current) {
        portfolioRef.current.fetchPortfolio();
      }
      // Also trigger a refresh for TransactionHistory
      setRefreshTrigger(prev => prev + 1); // Change the refreshTrigger value to trigger a re-fetch
    };

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // Move the date back by one day
    const dateStr = yesterday.toISOString().split('T')[0]; // Get the date part in YYYY-MM-DD format



return (
  <div className="App">
    <Box sx={{ flexGrow: 1, bgcolor: '#F8F8FF', p:3  }}>
    <h1 className="App-title">DeFi SciFi</h1>
      <Portfolio ref={portfolioRef}/>
      <Grid container style={{ marginBottom: '20px' }} spacing={2} rowSpacing={2} >
        <Grid size={6}>
          <DefiBar refreshPortfolio={refreshPortfolio}/>
        </Grid>
        <Grid size={6}>
          <Item>
          < Typography variant="h5" color="black" gutterBottom>ETH change in last 24 hours</Typography>
          <LineChart
            xAxis={[
              {
                scaleType: "utc",
                data: [
                  new Date(`${dateStr}T00:00:00`),
                  new Date(`${dateStr}T04:00:00`),
                  new Date(`${dateStr}T08:00:00`),
                  new Date(`${dateStr}T12:00:00`),
                  new Date(`${dateStr}T16:00:00`),
                  new Date(`${dateStr}T20:00:00`),
                  new Date(`${dateStr}T24:00:00`),
                ],
              },
            ]}
            series={[
              {
                data: [2389, 2405, 2420, 2450, 2435, 2445, 2460],
              },
            ]}
            style={{ width: '100%', height: '20vh' }}
          />
          </Item>

        </Grid>
      </Grid>
        <TransactionHistory refreshTrigger={refreshTrigger}/>
    </Box>
  </div>
);
}

export default App;


