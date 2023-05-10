import React from 'react';
import './GameField.css';
import Cell from '../Cell/Cell';

function GameField({field, openCells, countStart, changeFace, changeFaceNormal, plantFlag, removeFlag, startGame, gameOver, restart, putFlag, emotions}) {
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
      { field.map((item, index) => <Cell  key={index} countStart={countStart} changeFace={changeFace} changeFaceNormal={changeFaceNormal} plantFlag={plantFlag} removeFlag={removeFlag} openBombs={openBombs} item={item} handelBlanckCell={handelBlanckCell} open={opened} bigBoom={bigBoom} openCells={openCells} startGame={startGame} gameOver={gameOver} restart={restart} putFlag={putFlag} emotions={emotions} />) }
    </div>
  )
}
export default GameField;