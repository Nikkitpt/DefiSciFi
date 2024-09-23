import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import Grid from '@mui/material/Grid2';


const Portfolio = forwardRef((props, ref) => {
  const [portfolio, setPortfolio] = useState(null);
  const [error, setError] = useState('');

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

  const fetchPortfolio = async () => {
    try {
      const res = await axios.get('https://defiscfi-c4f66b4dcc8c.herokuapp.com/portfolio');
      console.log("API Response:", res.data);  // Ensure this logs correctly
      setPortfolio(res.data);  // Update state with fetched data
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      setError('Failed to fetch portfolio data.');
    }
  };

  useImperativeHandle(ref, () => ({
    fetchPortfolio
  }));

  useEffect(() => {
    fetchPortfolio();  // Fetch data on component mount
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!portfolio) {
    return <p>Loading portfolio...</p>;
  }

  return (
    <div>
      <Grid container style={{ marginBottom: '20px' }} spacing={2} rowSpacing={2} >
        <Grid size={4}>
          <Item>
            <Typography variant="h4" color="black">Total Balance</Typography>
              <p>${portfolio.total_balance.toLocaleString()}</p>
          </Item>
        </Grid>
        <Grid size={4}>
          <Item>
         < Typography variant="h5" color="black" gutterBottom>Distribution</Typography>
            <PieChart
              series={[{
                data: Object.entries(portfolio.pie_chart).map(([key, value]) => ({
                  label: key,
                  value
                })),
              }]}
              style={{ width: '100%', height: '20vh' }}
            />
          </Item>
        </Grid>
        <Grid size={4}>
          <Item>
          <Typography variant="h5" color="black">Investment History</Typography>
            <p>Staked: ${portfolio.asset_history.staked}</p>
            <p>Claimed: ${portfolio.asset_history.claimed}</p>
            <p>Supplied: ${portfolio.asset_history.supplied}</p>
            <p>Borrowed: ${portfolio.asset_history.borrowed}</p>
            {/* <DefiBar/> */}

          </Item>
        </Grid>
      </Grid>
      <TableContainer style={{ marginBottom: '20px', marginTop: '20px' }} component={Paper}>
      <Typography variant="h5" style={{ margin: '16px' }}>Portfolio Overview</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', width: '25%' }}>Token</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', width: '25%' }}>Amount</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', width: '25%' }}>Value</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', width: '25%' }}>24 Hour Change</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {portfolio.assets.map((asset, index) => (
            <TableRow key={asset.id} style={{ backgroundColor: index % 2 ? '#f9f9f9' : 'white' }}>
              <TableCell>{asset.token}</TableCell>
              <TableCell>{asset.amount}</TableCell>
              <TableCell>${asset.value}</TableCell>
              <TableCell style={{ color: asset.change.startsWith('-') ? 'red' : 'green' }}>
                {asset.change.startsWith('-') ? '↓' : '↑'} {Math.abs(asset.change)}%
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
});

export default Portfolio;
