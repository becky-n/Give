import logo from './assets/logo.svg';
import './styles/App.css';
import PollOnPost from './components/PollOnPost';
import React, { useEffect, useState } from 'react';

function App() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPoll = async () => {
      try {
        const res = await fetch('http://localhost:5001/polls/1');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const poll = await res.json();  // { id, question, options: [{label}, ...] }
        setOptions(poll?.options ?? []);
      } catch (err) {
        console.error('Failed to load poll:', err);
      } finally {
        setLoading(false);
      }
    };
    getPoll();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="PollBox">
          {loading ? (
            <p>Loading poll...</p>
          ) : (
            <PollOnPost initialOptions={options} />
          )}
        </div>
      </header>
    </div>
  );
}

export default App;