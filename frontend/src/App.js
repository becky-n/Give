import logo from './assets/logo.svg';
import './styles/App.css';
import PollOnPost from './components/PollOnPost';
import React, { useEffect, useState } from 'react';

function App() {
 const [options, setOptions] = useState([]);

  useEffect(() => {
    // Simulate fetching data from backend (replace this with actual API call later)
    const fetchData = async () => {
      // Simulated API delay
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve([
          { label: 'Option 1' },
          { label: 'Option 2' },
          { label: 'Option 3' },
          { label: 'Option 4' },
        ]), 500)
      );
      setOptions(response);
    };

    fetchData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div className="PollBox">
      {options.length > 0 ? (
        <PollOnPost initialOptions={options} />
      ) : (
        <p>Loading poll...</p>
      )}
    </div>
      </header>
    </div>
  );
}

export default App;
