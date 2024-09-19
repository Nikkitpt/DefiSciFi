import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Paper } from '@mui/material';

// Example component imports for each tab
import SwapForm from './SwapForm';
import StakeForm from './Stake';
import SupplyForm from './SupplyForm';
import BorrowForm from './BorrowForm';

export default function CenteredTabs({ refreshPortfolio }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box component={Paper} sx={{ width: '100%', bgcolor: 'background.paper', marginBottom: '20px' }}>
      <Tabs value={value} onChange={handleChange} variant="fullWidth">
        <Tab label="Swap" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }} />
        <Tab label="Stake" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }} />
        <Tab label="Supply" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }} />
        <Tab label="Borrow" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }} />
      </Tabs>

      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {value === 0 && <Box sx={{ width: '50%', minWidth: 300 }}><SwapForm refreshPortfolio={refreshPortfolio}/></Box>}
        {value === 1 && <Box sx={{ width: '50%', minWidth: 300 }}><StakeForm refreshPortfolio={refreshPortfolio}/></Box>}
        {value === 2 && <Box sx={{ width: '50%', minWidth: 300 }}><SupplyForm refreshPortfolio={refreshPortfolio}/></Box>}
        {value === 3 && <Box sx={{ width: '50%', minWidth: 300 }}><BorrowForm refreshPortfolio={refreshPortfolio}/></Box>}
      </Box>
    </Box>
  );
}
