import React from 'react';
import './GameField.css';
import Cell from '../Cell/Cell';

function GameField({field, openCells, countStart, changeFace, plantFlag, removeFlag, startGame, gameOver, restart, putFlag}) {
//console.log(openCells)
  const [bigBoom, setBigBoom] = React.useState(false);
  const [opened, setOpened] = React.useState(false);

function handelBlanckCell(data) {
  
  setOpened(data ? true : false);
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
      { field.map((item, index) => <Cell  key={index} countStart={countStart} changeFace={changeFace} plantFlag={plantFlag} removeFlag={removeFlag} openBombs={openBombs} item={item} handelBlanckCell={handelBlanckCell} open={opened} bigBoom={bigBoom} openCells={openCells} startGame={startGame} gameOver={gameOver} restart={restart} putFlag={putFlag} />) }
    </div>
  )
}
export default GameField;