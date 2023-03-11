import React from 'react';
import cell from '../../images/minesweeper-sprites_9TPZzv3.png';
import './Cell.css';


function Cell({countStart,plantFlag,removeFlag,openBombs,item,handelBlanckCell,open,field,bigBoom,openCells}) {

  const imgPosition = {
    0:{
      x:'123px',
      y:'-134px'
    },
    1:{
      x:'140px',
      y:'-67px'
    },
    2:{
      x:'123px',
      y:'-67px'
    },
    3:{
      x:'106px',
      y:'-67px'
    },
    4:{
      x:'89px',
      y:'-67px'
    },
    5:{
      x:'72px',
      y:'-67px'
    },
    6:{
      x:'55px',
      y:'-67px'
    },
    7:{
      x:'38px',
      y:'-67px'
    },
    8:{
      x:'21px',
      y:'-67px'
    },
    bomb:{
      x:'38px',
      y:'-134px'
    },
    question:{
      x:'89px',
      y:'-134px'
    },
    flag:{
      x:'106px',
      y:'-134px'
    },
    blanck: {
      x:'140px', 
      y: '-134px'
    }
  };
  const [isFlag, setIsFlag] = React.useState(imgPosition.blanck);
  const [start, setStart] = React.useState(false);
  const backgroundX = openCells.includes(item.index) ? imgPosition[item.count].x : imgPosition.blanck.x;
  const backgroundY = openCells.includes(item.index) ? imgPosition[item.count].y : imgPosition.blanck.y;

  function openCell() {    
    countStart(item)
    setStart(true)
   if(!item.isBomb) {
    setIsFlag(imgPosition[item.count]);
    handelBlanckCell()
   }else if(item.isBomb) {
    openBombs()
    setIsFlag(imgPosition.bomb);
   }
   console.log(item);
  };

  function clickCell(e) {
    e.preventDefault();
    
    if(item.state==='blanck') {
      console.log(item)
      item.state='flag'
      setIsFlag(imgPosition.flag);
    }else if(item.state==='flag') {
      item.state='question'
      setIsFlag(imgPosition.question);
    }else if(item.state==='question') {
      item.state='blanck'
      setIsFlag(imgPosition.blanck);
    }
  };

  React.useEffect(()=>{
    if(bigBoom) {
      if(item.isBomb) {
        setIsFlag(imgPosition.bomb);
      }
    }
   },[bigBoom]);

  return(
    <>
      <div className='cell' style={{ backgroundImage: `url(${cell})`, backgroundPositionX:`${item.isBomb ? isFlag.x : backgroundX}`, backgroundPositionY:`${item.isBomb ? isFlag.y : backgroundY}`}} onClick={openCell} onContextMenu={clickCell}  >
      </div>
    </>
  )
}
export default Cell;
//
//{ backgroundImage: `url(${cell})`, backgroundPositionX:`${isFlag.x}`, backgroundPositionY:`${isFlag.y}`}
//onContextMenu={clickCell} 