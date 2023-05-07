import React from 'react';
import cell from '../../images/minesweeper-sprites_9TPZzv3.png';
import './Cell.css';


function Cell({countStart,changeFace,plantFlag, removeFlag, openBombs,item,handelBlanckCell,open,bigBoom,openCells,startGame,gameOver, restart, putFlag}) {

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
    console.log(item.state)
    if(item.state==='blanck') {
      //item.state='opened';
      countStart(item);
      if(!item.isBomb) {
        //item.state='opened';
        setIsFlag(imgPosition[item.count]);
        handelBlanckCell(item.count===0);
      }else if(item.isBomb) {
        item.state='opened';
        openBombs();
      };
    }
  };

  function clickCell(e) {
    e.preventDefault();
    
    if(item.state!=='opened'){
      if(isFlag.x === imgPosition.blanck.x) {
        item.state='flag';
        setIsFlag(imgPosition.flag);
        plantFlag();
       // putFlag(item);
      }else if(isFlag.x === imgPosition.flag.x) {
        item.state='question';
        setIsFlag(imgPosition.question);
        removeFlag()
      }else if(isFlag.x === imgPosition.question.x) {
        item.state='blanck';
        setIsFlag(imgPosition.blanck);
      }
      //console.log(item)
     // putFlag(item);
      setIsFlag(imgPosition[item.state]);
    }
  };

  React.useEffect((e)=>{
    if(bigBoom) {
      if(item.isBomb) {
       gameOver();
       if(item.state === 'opened') {
        setIsFlag(imgPosition.bombClicked)
      }else if(item.state === 'flag') {
        setIsFlag(imgPosition.bombDisarmed)
      }else {
        setIsFlag(imgPosition.bomb);
      }
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

   React.useEffect(()=>{
    if(open) {
      if(openCells.includes(item.index)) { 
       setIsFlag(imgPosition[item.count]);
       handelBlanckCell(false);
      }
    }
   },[startGame]);

   React.useEffect((e)=>{
    if(restart) {
     // setIsFlag(imgPosition.blanck);
    }
   },[restart]);

  return(
    <>
      <button className='cell' style={{ backgroundImage: `url(${cell})`, backgroundPositionX:`${isFlag.x}`, backgroundPositionY:`${isFlag.y}`}} onContextMenu={clickCell} onMouseDown={changeFace} onClick={openCell} disabled={bigBoom}/>
    </>
  )
}
export default Cell;
//      <div className='cell' style={{ backgroundImage: `url(${cell})`, backgroundPositionX:`${item.isBomb ? isFlag.x : backgroundX}`, backgroundPositionY:`${item.isBomb ? isFlag.y : backgroundY}`}} onClick={openCell} onContextMenu={clickCell}  >
