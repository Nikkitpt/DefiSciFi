import React from 'react';
import './App.css';
import Portfolio from './components/Portfolio';
import TransactionHistory from './components/TransactionHistory';
import SupplyForm from './components/SupplyForm';
import BorrowForm from './components/BorrowForm';
import SwapForm from './components/SwapForm';
import Stake from './components/Stake';


function App() {
  const portfolioRef = React.useRef(null);

  const refreshPortfolio = () => {
    if (portfolioRef.current) {
      portfolioRef.current.fetchPortfolio();
    }
  };
  return (
    <div className="App">
      <h1>DeFi SciFi </h1>
      <Portfolio ref={portfolioRef} />
      <TransactionHistory />
      <SupplyForm refreshPortfolio={refreshPortfolio} />
      <BorrowForm refreshPortfolio={refreshPortfolio} />
      <SwapForm refreshPortfolio={refreshPortfolio} />
      <Stake refreshPortfolio={refreshPortfolio} />
    </div>
  );
}

export default App;


// import React from 'react';
// import Portfolio from './components/Portfolio';
// import SupplyForm from './components/SupplyForm';
// // import SwapForm from './SwapForm';

// function App() {
//   const portfolioRef = React.useRef(null);

//   const refreshPortfolio = () => {
//     if (portfolioRef.current) {
//       portfolioRef.current.fetchPortfolio();
//     }
//   };

//   return (
//     <div>
//       <h1>DeFi Dashboard</h1>
//       <Portfolio ref={portfolioRef} />
//       <SupplyForm refreshPortfolio={refreshPortfolio} />
//       {/* <SwapForm refreshPortfolio={refreshPortfolio} /> */}
//     </div>
//   );
// }

// export default App;
