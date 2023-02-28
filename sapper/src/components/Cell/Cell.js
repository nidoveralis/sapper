import React from 'react';
import cell from '../../images/minesweeper-sprites_9TPZzv3.png';
import './Cell.css';


function Cell({countStart}) {
  const [isFlag, setIsFlag] = React.useState('141px');
  const [cellStatus, setCellStatus] = React.useState(false);

  function openCell(e) {
    setIsFlag('123px');
    setCellStatus(true);
    countStart()
  };

  function clickCell(e) {
    e.preventDefault();
    if(e.target.style.backgroundPositionX === '106px') {
      setIsFlag('91px');
    }else if(e.target.style.backgroundPositionX === '91px') {
      setIsFlag('141px');
    }else {
      setIsFlag('106px')
    }
    
  }

  return(
    <>
      <div className='cell' style={{ backgroundImage: `url(${cell})`, backgroundPositionX:`${isFlag}`}} onContextMenu={clickCell} onClick={openCell} >
      </div>
    </>
  )
}
export default Cell;