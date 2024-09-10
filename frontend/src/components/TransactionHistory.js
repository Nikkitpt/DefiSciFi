import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { mockTransactions } from '../mockData';

function TransactionHistory() {
  return (
    <TableContainer component={Paper}><h1>Transaction History </h1>
      <Table> 
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Token</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.token}</TableCell>
              <TableCell>{transaction.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TransactionHistory;
