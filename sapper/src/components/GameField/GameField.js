import React from 'react';
import './GameField.css';
import Cell from '../Cell/Cell';

function GameField({field, openCells, countStart, plantFlag, removeFlag, startGame, gameOver, restart}) {

  const [bigBoom, setBigBoom] = React.useState(false);
  const [opened, setOpened] = React.useState(false);

function handelBlanckCell(data) {
  if(data) {
    setOpened(true)
  }else {
    setOpened(false)
  }
};

function openBombs() {
  setBigBoom(true);
};

React.useEffect(()=>{
  if(restart) {
    setBigBoom(false);
  }
 },[restart]);

  return(
    <div className='field'>
      { field.map((item, index) => <Cell  key={index} countStart={countStart} plantFlag={plantFlag} removeFlag={removeFlag} openBombs={openBombs} item={item} handelBlanckCell={handelBlanckCell} open={opened} field={field} bigBoom={bigBoom} openCells={openCells} startGame={startGame} gameOver={gameOver} restart={restart} />) }
    </div>
  )
}
export default GameField;