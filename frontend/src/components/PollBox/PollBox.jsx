import React, { useState } from 'react';
import './PollBox.css';

export default function PollBox({ initialOptions }) {
  const [votes, setVotes] = useState(
    initialOptions.reduce((acc, option) => {
      acc[option.label] = 0;
      return acc;
    }, {})
  );

  const [totalVotes, setTotalVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (optionLabel) => {
    if (hasVoted) return;
    setVotes((prevVotes) => ({
      ...prevVotes,
      [optionLabel]: prevVotes[optionLabel] + 1,
    }));
    setTotalVotes((prevTotal) => prevTotal + 1);
    setHasVoted(true);
  };

  const getPercentage = (optionLabel) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes[optionLabel] / totalVotes) * 100);
  };

  return (
    <div className="poll-container">
      {initialOptions.map((option, index) => (
        <div
          key={index}
          className="poll-row"
          onClick={() => handleVote(option.label)}
        >
          <div className="poll-bar-bg">
            <div
              className="poll-bar-fill"
              style={{ width: hasVoted ? `${getPercentage(option.label)}%` : '0%' }}
            />
            <span className="poll-option">{option.label}</span>
            {hasVoted && <span className="poll-percent">{getPercentage(option.label)}%</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
