import React from 'react';
import './App.css';
import Header from '../Header/Header';
import GameField from '../GameField/GameField';

function App() {
  const [start, setStart] = React.useState(false);

  function countStart() {
    setStart(true);
  }

  return (
    <div className="App">
      <Header start={start} />
      <GameField countStart={countStart} />
      
    </div>
  );
}

export default App;
