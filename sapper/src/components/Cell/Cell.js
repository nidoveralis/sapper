import React from 'react';
import cell from '../../images/minesweeper-sprites_9TPZzv3.png';
import './Cell.css';


function Cell({countStart,changeFace,changeFaceNormal, openBombs,item,handelBlanckCell,open,openCells,startGame,gameOver, restart, putFlag, emotions}) {

  const imgPosition = {
    0:{
      x:'122px',
      y:'-135px'
    },
    1:{
      x:'139px',
      y:'-68px'
    },
    2:{
      x:'122px',
      y:'-68px'
    },
    3:{
      x:'105px',
      y:'-68px'
    },
    4:{
      x:'88px',
      y:'-68px'
    },
    5:{
      x:'71px',
      y:'-68px'
    },
    6:{
      x:'54px',
      y:'-68px'
    },
    7:{
      x:'37px',
      y:'-68px'
    },
    8:{
      x:'20px',
      y:'-68px'
    },
    bomb:{
      x:'53px',
      y:'-135px'
    },
    bombClicked:{
      x:'37px',
      y:'-135px'
    },
    bombDisarmed:{
      x:'20px',
      y:'-135px'
    },
    question:{
      x:'88px',
      y:'-135px'
    },
    flag:{
      x:'105px',
      y:'-135px'
    },
    blanck: {
      x:'139px', 
      y: '-135px'
    }
  };
  const [isFlag, setIsFlag] = React.useState(imgPosition.blanck);

  function openCell() {
    if(item.state==='blanck') {
      item.state='opened';
      countStart(item);
      if(!item.isBomb) {
        setIsFlag(imgPosition[item.count]);
        handelBlanckCell(item.count===0);
      }else if(item.isBomb) {
        openBombs();
      };
    };
    //changeFaceNormal();
  };

  function clickCell(e) {
    e.preventDefault();
    if(!gameOver) {
      putFlag(item);
      setIsFlag(imgPosition[item.state]);
      changeFaceNormal();
    }
  };

  React.useEffect((e)=>{
    if(emotions === 'loss') {
      if(item.isBomb) {
        if(item.state === 'opened') {
          setIsFlag(imgPosition.bombClicked)
        }else if(item.state === 'flag') {
          setIsFlag(imgPosition.bombDisarmed)
        }else {
          setIsFlag(imgPosition.bomb);
        }
      } 
    };
   },[gameOver]);

   React.useEffect(()=>{////переделать
    if(open) {
      if(openCells.includes(item.index)) { 
       setIsFlag(imgPosition[item.count]);
       handelBlanckCell(false);////
      }
    }
   },[startGame]);

   React.useEffect((e)=>{
    if(restart) {
      setIsFlag(imgPosition.blanck);
    }
   },[restart]);

  return(
    <>
      <button className='cell' style={{ backgroundImage: `url(${cell})`, backgroundPositionX:`${isFlag.x}`, backgroundPositionY:`${isFlag.y}`}} onContextMenu={clickCell} onMouseDown={changeFace} onClick={openCell} disabled={gameOver}/>
    </>
  )
}
export default Cell;
