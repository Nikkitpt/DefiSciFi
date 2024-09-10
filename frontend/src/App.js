import React from 'react';
import './App.css';
import Portfolio from './components/Portfolio';
import TransactionHistory from './components/TransactionHistory';
import SupplyForm from './components/SupplyForm';
import BorrowForm from './components/BorrowForm';
import SendForm from './components/SendForm';


function App() {
  return (
    <div className="App">
      <h1>Crypto Dashboard</h1>
      <Portfolio />
      <TransactionHistory />
      <SupplyForm />
      <BorrowForm />
      <SendForm />
    </div>
  );
}

export default App;
