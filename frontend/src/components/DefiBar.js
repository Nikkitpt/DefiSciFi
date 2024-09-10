import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// Example component imports for each tab
import SwapForm from './SwapForm';
import StakeForm from './Stake';
import SupplyForm from './SupplyForm';
import BorrowForm from './BorrowForm';

export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} variant="fullWidth">
        <Tab label="Swap" />
        <Tab label="Stake" />
        <Tab label="Supply" />
        <Tab label="Borrow" />
      </Tabs>

      <Box sx={{ p: 3 }}>
        {value === 0 && <SwapForm />}
        {value === 1 && <StakeForm />}
        {value === 2 && <SupplyForm />}
        {value === 3 && <BorrowForm />}
      </Box>
    </Box>
  );
}
