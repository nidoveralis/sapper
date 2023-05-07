import React, { useEffect } from 'react';
import './App.css';
import Header from '../Header/Header';
import GameField from '../GameField/GameField';

const field = [];

function makeField() {
  for(let i =0; i<256; i++) {
   field.push({index: i, isBomb:false, count:0, x: Math.floor(i%16), y: Math.floor(i/16), sosed:[], state:'blanck'})
 }
};

makeField();

const bombs = [];
  
const openCells=[];

function App() {
  const [start, setStart] = React.useState(false);
  const [loss, setLoss] = React.useState(false);
  const [faceSurprised, setFaceSurprised] = React.useState(false);
  const [restart, setRestart] = React.useState(false);

  const [ bombsCount, setBombsCount ] = React.useState(40);
 

  function getFirstCell(item) {
    const i=item.index
    const nextCellsPosition =[
      {
        x:field[i].x-1,
        y:field[i].y-1
      },
      {
        x:field[i].x,
        y:field[i].y-1
      },
      {
        x:field[i].x+1,
        y:field[i].y-1
      },
      {
        x:field[i].x-1,
        y:field[i].y
      },
      {
        x:field[i].x+1,
        y:field[i].y
      },
      {
        x:field[i].x-1,
        y:field[i].y+1
      },
      {
        x:field[i].x,
        y:field[i].y+1
      },
      {
        x:field[i].x+1,
        y:field[i].y+1
      }
    ];
    field.find(cell =>{
      for(let o=0;o<nextCellsPosition.length;o++) {
        if(cell.x===nextCellsPosition[o].x && cell.y===nextCellsPosition[o].y){
           item.sosed.push(cell.index);
          }
      }
    });
    getRandomArray(item)
  };

  function getRandomArray(item) {//создаёт массив рандомных цифр
    while(bombs.length < bombsCount  ){
      let b = Math.round(Math.random() * 256)
      if(bombs.indexOf(b) === -1 && b!==item.index && item.sosed.indexOf(b) === -1) {
         bombs.push(b);
      } 
      //bombs.sort((a, b) => a - b);
    };
    addedBombs();
};

  function addNextCells() {///расставляет соседей
    for(let i =0; i<field.length; i++) {
      if(!field[i].isBomb) {
        countNextCell(field[i],field[i].x-1,field[i].y-1);
        countNextCell(field[i],field[i].x,field[i].y-1);
        countNextCell(field[i],field[i].x+1,field[i].y-1);
        countNextCell(field[i],field[i].x-1,field[i].y);
        countNextCell(field[i],field[i].x+1,field[i].y);
        countNextCell(field[i],field[i].x-1,field[i].y+1);
        countNextCell(field[i],field[i].x,field[i].y+1);
        countNextCell(field[i],field[i].x+1,field[i].y+1);
      };
  };
  console.log(field)
  //setStart(true);
};

  function countNextCell(item,x,y) {/// считатет бомбы и соседей
    let el = field.find(cell =>{
      if(cell.x===x && cell.y===y)
      if(cell.isBomb) {
           item.count++
        }else{
           item.sosed.push(cell.index);
         }
    })
  };

  function addedBombs() {///ставит бомбы
    for(let i =0; i<256; i++) {
         if(bombs.includes(i)) {
           field[i].isBomb=true;
         } else {
          field[i].isBomb=false;
        }
     };
     addNextCells();
  };

  function findOpenNextCells() {//открывает соседние клетки
    openCells.forEach(item=>{
      if(field[item].count===0) {
        field[item].sosed.forEach((el)=>{
          if(!openCells.includes(el)) {
            openCells.push(el);
            field[el].state='opened';
            findOpenNextCells();
            //console.log(openCells.sort((a, b) => a - b))
          }
        })
      }
    })
  };

  function openBlankCells(item) {///открывает соседей
    if(!openCells.includes(item.index)) {
      openCells.push(item.index);
    if(item.count === 0) {
        findOpenNextCells();      
    }};
  };

  function countStart(item) {
    if(openCells.length===0) {
      startGame(item);
    }
    openBlankCells(item);
  };

  function plantFlag() {
    if(bombsCount<=0) {
      setBombsCount(0);
    }else {
      setBombsCount(bombsCount-1);
    }
  };

  function removeFlag() {
    setBombsCount(bombsCount + 1);
  };


  function putFlag(data) {
    if(data.state==='blanck') {
      data.state='flag';
    }else if(data.state==='flag') {
      data.state='question';
    }else if(data.state==='question') {
      data.state='blanck';
    }
  };

function startGame(item) {
  setStart(true);
  getFirstCell(item);
  openBlankCells(item);
  setRestart(false);
  };

  function changeFace() {
    setFaceSurprised(!faceSurprised);
  };

  
  function gameOver() {
    setLoss(true);
    setStart(false);
  };

  function clearField() {
    setRestart(true);
    setStart(false);
    setLoss(false);
    setBombsCount(40);
    bombs.splice(0,bombs.length);
    field.splice(0,field.length);
    openCells.splice(0,openCells.length);
    makeField();
    console.log(field)
  };
  
  return (
    <div className="App">
      <Header start={start} bombsCount={bombsCount} loss={loss} faceSurprised={faceSurprised} clearField={clearField} />
      <GameField field={field} openCells={openCells} countStart={countStart} changeFace={changeFace} plantFlag={plantFlag} removeFlag={removeFlag} startGame={start} gameOver={gameOver} restart={restart} putFlag={putFlag}/>
    </div>
  );
}

export default App;
