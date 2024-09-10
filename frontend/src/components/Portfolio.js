import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';

// Use React.forwardRef to allow this component to be referenced
const Portfolio = forwardRef((props, ref) => {
  const [portfolio, setPortfolio] = useState(null);
  const [error, setError] = useState('');

  // Function to fetch portfolio data
  const fetchPortfolio = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/portfolio');
      setPortfolio(res.data);  // Assuming res.data contains the mock_balance
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      setError('Failed to fetch portfolio data.');
    }
  };

  // Expose fetchPortfolio function via ref
  useImperativeHandle(ref, () => ({
    fetchPortfolio
  }));

  useEffect(() => {
    fetchPortfolio();  // Fetch portfolio on component mount
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!portfolio) {
    return <p>Loading portfolio...</p>;
  }

  return (
    <div>
      <h1 color='black'>Total Balance</h1>
      <ul>
        {Object.keys(portfolio).map((token, index) => (
          <li key={index}>
            {token}: {portfolio[token]}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Portfolio;
