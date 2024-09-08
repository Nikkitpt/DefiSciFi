import React from 'react';
import './App.css';
import Portfolio from './components/Portfolio';
import TransactionHistory from './components/TransactionHistory';

function App() {
  return (
    <div className="App">
      <h1>Crypto Dashboard</h1>
      <Portfolio />
      <TransactionHistory />
    </div>
  );
}

export default App;
