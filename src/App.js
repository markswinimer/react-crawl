import React from 'react';
import Game from './Game';
import './App.css';

function App() {
  return (
    <div>
        <h1>React Crawl</h1>

      <div className="Game-container">
      <Game 
        n_rows={55}
        n_cols={55}
      />
      </div>
    </div>
  );
}

export default App;
