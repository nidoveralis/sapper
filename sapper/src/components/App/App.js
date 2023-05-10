import React from 'react';
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

const bombs = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,59];
const bombsFree = [];
const openCells=[];

function App() {

  const [start, setStart] = React.useState(false);
  const [emotions, setEmotions] = React.useState('normal');
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
  //  while(bombs.length < bombsCount  ){
    //  let b = Math.round(Math.random() * 255)
    //  if(bombs.indexOf(b) === -1 && b!==item.index && item.sosed.indexOf(b) === -1) {
    //     bombs.push(b);
    //  }
      ////bombs.sort((a, b) => a - b);
    //};
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
  //console.log(field)
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
          bombsFree.push(i);
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

  function startGame(item) {
    setStart(true);
    getFirstCell(item);
    //openBlankCells(item);
    setRestart(false);
  };

  function countStart(item) {
    console.log(openCells.length)
    setEmotions('normal');
    if(openCells.length===0) {
      startGame(item);
    }
    openBlankCells(item);///////вынеси в отдельную функцию
    if(openCells.length===216) {
      winGame();
    }
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
      plantFlag();
    }else if(data.state==='flag') {
      data.state='question';
      removeFlag()
    }else if(data.state==='question') {
      data.state='blanck';
    }
  };

  function changeFace() {/////////
    setEmotions(start && 'surprise');
  };

  function changeFaceNormal() {/////////
    setEmotions('normal');
  };

  function clearField() {//////переделать
    setRestart(true);
    setStart(false);
    setEmotions('normal');
    setBombsCount(40);
    bombs.splice(0,bombs.length);
    field.splice(0,field.length);
    openCells.splice(0,openCells.length);
    makeField();
  };

  function gameOver() {
    setEmotions('losss');
    setStart(false);
  };

  function winGame() {
    console.log(openCells.length)
    if(openCells.sort((a, b) => a - b).join('') === bombsFree.sort((a, b) => a - b).join('')) {
      setEmotions('win');
      setStart(false);
    };
  };
  
  return (
    <div className="App">
      <Header start={start} bombsCount={bombsCount} emotions={emotions} clearField={clearField} />
      <GameField field={field} openCells={openCells} countStart={countStart} changeFace={changeFace} changeFaceNormal={changeFaceNormal} plantFlag={plantFlag} removeFlag={removeFlag} startGame={start} gameOver={gameOver} restart={restart} putFlag={putFlag}  emotions={emotions}/>
    </div>
  );
}

export default App;
