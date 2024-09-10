import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import Portfolio from './Portfolio';
import { PieChart } from '@mui/x-charts/PieChart';
import DefiBar from './DefiBar';
import TransactionHistory from './TransactionHistory';

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


export default function ButtonUsage() {
  
//   return <Button variant="contained">Hello world</Button>;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={4}>
        <Item><Portfolio/></Item>
        </Grid>
        <Grid size={8}>
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
        <Grid size={12}>
          <Item>
              <DefiBar/>
          </Item>
            
        </Grid>
        <Grid size={12}>
          <Item>
              <TransactionHistory/>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}