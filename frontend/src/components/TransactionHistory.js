import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios'; // Make sure to install axios with `npm install axios`

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        // Optionally handle errors, e.g., by setting an error state or displaying a notification
      }
    };

    fetchTransactions();
  }, []); // The empty dependency array ensures this effect runs only once after the component mounts

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
          {transactions.map((transaction, index) => (
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
