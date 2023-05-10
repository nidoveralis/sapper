import React from 'react';
import './GameField.css';
import Cell from '../Cell/Cell';

function GameField({field, openCells, countStart, changeFace, changeFaceNormal, openBombs, startGame, gameOver, restart, putFlag, emotions}) {
  
  const [opened, setOpened] = React.useState(false);

function handelBlanckCell(data) {
  setOpened(data ? true : false);
};

React.useEffect(()=>{
  if(restart) {
    //setBigBoom(false);
  }
 },[restart]);

  return(
    <div className='field'>
      { field.map((item, index) => <Cell  
        key={index} 
        countStart={countStart}
        changeFace={changeFace} 
        changeFaceNormal={changeFaceNormal}  
        openBombs={openBombs} 
        item={item} 
        handelBlanckCell={handelBlanckCell} 
        open={opened} 
        openCells={openCells} 
        startGame={startGame} 
        gameOver={gameOver} 
        restart={restart} 
        putFlag={putFlag} 
        emotions={emotions} />) }
    </div>
  )
}
export default GameField;