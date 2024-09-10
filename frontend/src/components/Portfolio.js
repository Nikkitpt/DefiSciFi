import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Portfolio() {
  const [portfolio, setPortfolio] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5000/portfolio');
        setPortfolio(res.data);  // Assuming res.data contains the mock_balance
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        setError('Failed to fetch portfolio data.');
      }
    };

    fetchPortfolio();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!portfolio) {
    return <p>Loading portfolio...</p>;
  }

  return (
    <div>
      <h2>Your Portfolio</h2>
      <ul>
        {Object.keys(portfolio).map((token, index) => (
          <li key={index}>
            {token}: {portfolio[token]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Portfolio;
