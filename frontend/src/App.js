import logo from './assets/logo.svg';
import './styles/App.css';
import PollOnPost from './components/PollOnPost';

function App() {
  const options = [
    { label: 'Option 1', percentage: 50 },
    { label: 'Option 2', percentage: 20 },
    { label: 'Option 3', percentage: 15 },
    { label: 'Option 4', percentage: 15 },
  ];

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
        <p>Poll results will be displayed below:</p>
        <PollOnPost options={options} />
      </header>
    </div>
  );
}

export default App;
