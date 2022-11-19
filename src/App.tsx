import React from 'react';
import pokeball from './img/pokeball.png';
import logo from './img/logo.svg.png';
import './App.css';
import Card from './Card';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className='logoPokemon' alt="logo" />
        <img src={pokeball} className="App-logo" alt="logo" />
        <div>
          <Card />
        </div>
      </header>
    </div>
  );
}

export default App;
