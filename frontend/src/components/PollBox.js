import React from 'react';
import ReactDOM from 'react-dom/client';
import PollResults from './PollOnPost';
import './PollOnPost.css';

const options = [
  { label: 'Option 1', percentage: 50 },
  { label: 'Option 2', percentage: 7 },
  { label: 'Option 3', percentage: 23 },
  { label: 'Option 4', percentage: 20 },
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<PollResults options={options} />);
