import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { mockTransactions } from '../mockData';

function TransactionHistory() {
  return (
    <TableContainer style={{ marginBottom: '20px', marginTop: '20px' }} component={Paper}>
      <Typography variant="h5" style={{ margin: '16px' }}>Transaction History</Typography>
      <Table> 
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', width: '20%' }}>Type</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', width: '30%' }}>Amount</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', width: '25%' }}>Token</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', width: '25%' }}>Date</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', width: '25%' }}>Gas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockTransactions.map((transaction, index) => (
            <TableRow key={transaction.id} style={{ backgroundColor: index % 2 ? '#f9f9f9' : 'white' }}>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.token}</TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.gas}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TransactionHistory;
