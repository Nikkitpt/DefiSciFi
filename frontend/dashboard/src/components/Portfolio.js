import { mockPortfolio } from '../mockData';

function Portfolio() {
  return (
    <div>
      <h2>Your Portfolio</h2>
      <ul>
        {mockPortfolio.map((item, index) => (
          <li key={index}>
            {item.token}: {item.balance}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Portfolio;
