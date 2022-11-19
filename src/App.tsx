import React from 'react';
import logo from './img/pokeball.png';
import './App.css';
import Card from './Card';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <Card />
        </div>
      </header>
    </div>
  );
}

export default App;
