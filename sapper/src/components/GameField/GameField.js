import React from 'react';
import './GameField.css';
import Cell from '../Cell/Cell';

function GameField({field,openCells,countStart,plantFlag,removeFlag, handelBlanckCell,open,gameOver}) {

  const [bigBoom, setBigBoom] = React.useState(false);
  const [opened, setOpened] = React.useState(false);

function handelBlanckCell() {
  setOpened(!opened)
}

function openBombs() {
  setBigBoom(true)
}

  return(
    <div className='field'>
      { field.map((item, index) => <Cell  key={index} countStart={countStart} plantFlag={plantFlag} removeFlag={removeFlag} openBombs={openBombs} item={item} handelBlanckCell={handelBlanckCell} open={opened} field={field} bigBoom={bigBoom} openCells={openCells} />) }
    </div>
  )
}
export default GameField;