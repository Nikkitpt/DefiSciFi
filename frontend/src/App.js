import React from 'react';
import './App.css';
import Portfolio from './components/Portfolio';
import TransactionHistory from './components/TransactionHistory';
import SupplyForm from './components/SupplyForm';
import BorrowForm from './components/BorrowForm';
import SwapForm from './components/SwapForm';



function App() {
  return (
    <div className="App">
      <h1>Crypto Dashboard</h1>
      <Portfolio />
      <TransactionHistory />
      <SupplyForm />
      <BorrowForm />
      <SwapForm />
    </div>
  );
}

export default App;
