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
  const z=openCells.includes(item.index)
  const [op,setOp] = React.useState(openCells.includes(item.index))
  const [isFlag, setIsFlag] = React.useState()
  const [start, setStart] = React.useState(false);
  const backgroundX = z ? imgPosition[item.count].x : imgPosition.blanck.x;
  const backgroundY = z ? imgPosition[item.count].y : imgPosition.blanck.y;
  //const a = op ? imgPosition[item.count].x : imgPosition.blanck.x;
  //const b = op ? imgPosition[item.count].y : imgPosition.blanck.y;


  function openCell() {
    console.log(item);
    
    countStart(item)
    handelBlanckCell()
    setStart(true)
   if(!item.isBomb) {
    setIsFlag(imgPosition[item.count]);
   }else if(item.isBomb) {
    setIsFlag(imgPosition.bomb);
    openBombs()
   }
  };

  React.useEffect(()=>{
    if(bigBoom) {
      if(item.isBomb) {
        setIsFlag(imgPosition.bomb);
      }
    }
   },[bigBoom]);

   //React.useEffect(()=>{
    //console.log(openCells)
   
    //if(openCells.includes(item.index) ) {
      //setOp(true)
   // }
   //},[start]);

  return(
    <>
      <div className='cell' style={{ backgroundImage: `url(${cell})`, backgroundPositionX:`${item.isBomb?imgPosition.blanck.x:backgroundX}`, backgroundPositionY:`${item.isBomb?imgPosition.blanck.y:backgroundY}`}} onClick={openCell} >
      </div>
    </>
  )
}
export default Cell;
//{ backgroundImage: `url(${cell})`, backgroundPositionX:`${isFlag.x}`, backgroundPositionY:`${isFlag.y}`}
//onContextMenu={clickCell} 