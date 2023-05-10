import React from 'react';
import './GameField.css';
import Cell from '../Cell/Cell';

function GameField({field, openCells, openingCell, changeFace, changeFaceNormal, openBombs, startGame, gameOver, restart, putFlag, emotions}) {

  return(
    <div className='field'>
      { field.map((item, index) =>
       <Cell  
        key={index} 
        openingCell={openingCell}
        changeFace={changeFace} 
        changeFaceNormal={changeFaceNormal}  
        openBombs={openBombs} 
        item={item} 
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