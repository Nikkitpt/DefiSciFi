import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import Portfolio from './components/Portfolio';
import { PieChart } from '@mui/x-charts/PieChart';
import DefiBar from './components/DefiBar';
import TransactionHistory from './components/TransactionHistory';
import Assets from './components/CryptoAssets';


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
    const portfolioRef = React.useRef(null);

    const refreshPortfolio = () => {
      if (portfolioRef.current) {
        portfolioRef.current.fetchPortfolio();
      }
    };

return (

  <div className="App">
    <Box sx={{ flexGrow: 1, bgcolor: '#e0f7fa'  }}>
    <h1 style={{ textAlign: 'left' }}>DeFi SciFi </h1>
      <Grid container spacing={2}>
        <Grid size={4}>
          <Item>
            <Portfolio ref={portfolioRef}/>
          </Item>
        </Grid>
        <Grid size={4}>
          <Item>
            <PieChart
              series={[{
                data: [
                  { id: 0, value: 10, label: 'ETH' },
                  { id: 1, value: 15, label: 'DAI' },
                  { id: 2, value: 20, label: 'USDC' },
                ],
              }]}
              width={400}
              height={200}
            />       
          </Item>
        </Grid>
        <Grid size={4}>
          <Item>
            <p> Staked: $200</p>
            <p> Claimed: $200</p>
            <p> Supplied: $200</p>
            <p> Borrowed: $200</p>
          </Item>
        </Grid>
        <Grid size={12}>
          <Item>
              <Assets/>
          </Item>
            
        </Grid>
        <Grid size={12}>
          <Item>
              <DefiBar refreshPortfolio={refreshPortfolio}/>
          </Item>
            
        </Grid>
        <Grid size={12}>
          <Item>
              <TransactionHistory/>
          </Item>
        </Grid>
      </Grid>
    </Box>

  </div>
);
}

export default App;



