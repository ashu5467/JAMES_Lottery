import React, { useEffect, useState } from 'react';
import { fetchResults } from '../../services/resultService';

const ResultList = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getResults = async () => {
      const data = await fetchResults();
      setResults(data);
    };
    getResults();
  }, []);

  return (
    <div>
      <h2>Lottery Results</h2>
      <ul>
        {results.map((result) => (
          <li key={result._id}>
            Lottery: {result.lotteryName} - Winner: {result.winner}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultList;
