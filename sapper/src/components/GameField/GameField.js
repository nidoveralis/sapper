import React from 'react';
import './GameField.css';
import Cell from '../Cell/Cell';

function GameField({field, openCells, openingCell, changeFace, changeFaceNormal, openBombs, gameOver, restart, putFlag, emotions}) {
  const [opening, setOpening] = React.useState(false);

  function openNullCells() {
    setOpening(!opening)
  };
  
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
        gameOver={gameOver} 
        restart={restart} 
        putFlag={putFlag} 
        emotions={emotions}
        openNullCells={openNullCells}
        opening={opening}
        />) }
    </div>
  )
}
export default GameField;