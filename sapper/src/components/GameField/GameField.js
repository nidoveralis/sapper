import React from 'react';
import './GameField.css';
import Cell from '../Cell/Cell';

function GameField({field,openCells,countStart,plantFlag,removeFlag, handelBlanckCell,open,gameOver}) {

  const [bigBoom, setBigBoom] = React.useState(false);
  const [bm, setBm] = React.useState(false);

function a(item) {
  countStart(item)
}

function openBombs() {
  setBigBoom(true)
}

function opens() {
  setBm(true);
}

  return(
    <div className='field'>
      { field.map((item, index) => <Cell  key={index} countStart={a} plantFlag={plantFlag} removeFlag={removeFlag} openBombs={opens} item={item} handelBlanckCell={openBombs} open={open} field={field} bigBoom={bigBoom} openCells={openCells} />) }
    </div>
  )
}
export default GameField;