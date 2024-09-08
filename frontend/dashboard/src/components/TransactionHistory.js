import { mockTransactions } from '../mockData';

function TransactionHistory() {
  return (
    <div>
      <h2>Transaction History</h2>
      <ul>
        {mockTransactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.type} {transaction.amount} {transaction.token} on {transaction.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionHistory;
