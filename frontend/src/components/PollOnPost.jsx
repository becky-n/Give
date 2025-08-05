import React, { useState } from 'react';
import './PollOnPost.css';

const PollOnPost = ({ initialOptions }) => {
  const [votes, setVotes] = useState(
    initialOptions.reduce((acc, option) => {
      acc[option.label] = 0;
      return acc;
    }, {})
  );

  const [totalVotes, setTotalVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (optionLabel) => {
    if (hasVoted) return;  // Prevent multiple votes for now
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
            {/* Fill Bar */}
            <div
              className="poll-bar-fill"
              style={{ width: hasVoted ? `${getPercentage(option.label)}%` : '0%' }}
            ></div>

            {/* Option Text */}
            <span className="poll-option">{option.label}</span>

            {/* Percentage Text */}
            {hasVoted && (
              <span className="poll-percent">{getPercentage(option.label)}%</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PollOnPost;
