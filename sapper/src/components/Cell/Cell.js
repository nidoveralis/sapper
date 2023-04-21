import React from 'react';
import cell from '../../images/minesweeper-sprites_9TPZzv3.png';
import './Cell.css';


function Cell({countStart,plantFlag, removeFlag, openBombs,item,handelBlanckCell,open,field,bigBoom,openCells,startGame,gameOver, restart, putFlag}) {

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
  const [start, setStart] = React.useState(false);
  const backgroundX = openCells.includes(item.index) ? imgPosition[item.count].x : imgPosition.blanck.x;
  const backgroundY = openCells.includes(item.index) ? imgPosition[item.count].y : imgPosition.blanck.y;

  function openCell() {
    console.log(item)
    if(isFlag.x===imgPosition.blanck.x) {
      countStart(item)
      if(!item.isBomb) {
        setIsFlag(imgPosition[item.count]);
        handelBlanckCell(item.count===0);
      }else if(item.isBomb) {
        item.state='opened';
        openBombs();
      };
    }
   //console.log(item);
  };

  function clickCell(e) {
    e.preventDefault();
    if(item.state!=='opened'){
    putFlag(item);
    //plantFlag()
    setIsFlag(imgPosition[item.state]);
    }
  };

  React.useEffect((e)=>{
    if(bigBoom) {
      if(item.isBomb) {
       setIsFlag(imgPosition.bomb);
       //item.state='bomb';
       gameOver();
      }else if(item.isBomb && item.state === 'opened') {
        setIsFlag(imgPosition.bombClicked)
      }else if(item.isBomb && item.state === 'flag') {
        setIsFlag(imgPosition.bombDisarmed)
      }
    }
   },[bigBoom]);

   React.useEffect(()=>{
    if(open) {
      if(openCells.includes(item.index)) { 
       setIsFlag(imgPosition[item.count]);
       handelBlanckCell(false);
      }
    }
   },[open]);

   React.useEffect((e)=>{
    if(restart) {
      setIsFlag(imgPosition.blanck);
    }
   },[restart]);

  return(
    <>
      <button className='cell' style={{ backgroundImage: `url(${cell})`, backgroundPositionX:`${isFlag.x}`, backgroundPositionY:`${isFlag.y}`}} onClick={openCell} onContextMenu={clickCell} disabled={bigBoom}/>
    </>
  )
}
export default Cell;
//      <div className='cell' style={{ backgroundImage: `url(${cell})`, backgroundPositionX:`${item.isBomb ? isFlag.x : backgroundX}`, backgroundPositionY:`${item.isBomb ? isFlag.y : backgroundY}`}} onClick={openCell} onContextMenu={clickCell}  >
