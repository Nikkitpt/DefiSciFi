export const mockPortfolio = [
    { token: 'ETH', balance: 2 },
    { token: 'DAI', balance: 500 },
    { token: 'USDC', balance: 300 }
  ];
  
  export const mockTransactions = [
    { id: 1, type: 'Lend', token: 'DAI', amount: 100, date: '2024-09-01', gas: "0.001 ETH" },
    { id: 2, type: 'Stake', token: 'ETH', amount: 0.5, date: '2024-09-03', gas: "0.001 ETH" }
  ];

  export const mockAssets = [
    { id: 1, token: 'DAI', amount: 100, value: '$3000', change: "chart" },
    { id: 2, token: 'ETH', amount: 0.5, value: '$400', change: "chart" },
    { id: 3, token: 'USDC', amount: 0.5, value: '$400', change: "chart" },
  ];
  