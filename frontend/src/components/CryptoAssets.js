import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { mockAssets } from '../mockData';

function Assets() {
  return (
    <TableContainer component={Paper}><h1>Assets</h1>
      <Table> 
        <TableHead>
          <TableRow>
            <TableCell>Token</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>24 Hour Change</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockAssets.map((Asset) => (
            <TableRow key={Asset.id}>
              <TableCell>{Asset.token}</TableCell>
              <TableCell>{Asset.amount}</TableCell>
              <TableCell>{Asset.value}</TableCell>
              <TableCell>{Asset.change}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Assets;