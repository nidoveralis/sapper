import React from 'react';
import './App.css';
import Header from '../Header/Header';
import GameField from '../GameField/GameField';
import {FIELD_SIZE, NUMBER_OF_BOMBS} from '../../utils/constants';
import {BOMBS, BOMBS_FREE, OPEN_CELLS, FIELD, makeField} from '../../utils/utils';

makeField();

//const bombs = [200,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,59];


function App() {

  const [start, setStart] = React.useState(false);
  const [emotions, setEmotions] = React.useState('normal');
  const [restart, setRestart] = React.useState(false);
  const [gameOver, setGameOver] = React.useState(false);
  const [ bombsCount, setBombsCount ] = React.useState(NUMBER_OF_BOMBS);


  function addedBombs() {///ставит бомбы
    for(let i =0; i<FIELD_SIZE; i++) {
         if(BOMBS.includes(i)) {
          FIELD[i].isBomb=true;
         } else {
          BOMBS_FREE.push(i);
          FIELD[i].isBomb=false;
        }
     };
     addNextCells();
  };

  function getRandomArray(item) {//создаёт массив рандомных цифр
      while(BOMBS.length < bombsCount  ){
        let b = Math.round(Math.random() * (FIELD_SIZE - 1))
        if(BOMBS.indexOf(b) === -1 && b!==item.index && item.sosed.indexOf(b) === -1) {
          BOMBS.push(b);
        }
      };
      addedBombs();
  };

  function getFirstCell(item) {
    const i=item.index
    const nextCellsPosition =[
      {
        x:FIELD[i].x-1,
        y:FIELD[i].y-1
      },
      {
        x:FIELD[i].x,
        y:FIELD[i].y-1
      },
      {
        x:FIELD[i].x+1,
        y:FIELD[i].y-1
      },
      {
        x:FIELD[i].x-1,
        y:FIELD[i].y
      },
      {
        x:FIELD[i].x+1,
        y:FIELD[i].y
      },
      {
        x:FIELD[i].x-1,
        y:FIELD[i].y+1
      },
      {
        x:FIELD[i].x,
        y:FIELD[i].y+1
      },
      {
        x:FIELD[i].x+1,
        y:FIELD[i].y+1
      }
    ];
    FIELD.find(cell => {
      for(let o=0;o<nextCellsPosition.length;o++) {
        if(cell.x===nextCellsPosition[o].x && cell.y===nextCellsPosition[o].y){
           item.sosed.push(cell.index);
          }
      }
    });
    getRandomArray(item)
  };

  function addNextCells() {///расставляет соседей
    for(let i =0; i<FIELD.length; i++) {
      if(!FIELD[i].isBomb) {
        countNextCell(FIELD[i],FIELD[i].x-1,FIELD[i].y-1);
        countNextCell(FIELD[i],FIELD[i].x,FIELD[i].y-1);
        countNextCell(FIELD[i],FIELD[i].x+1,FIELD[i].y-1);
        countNextCell(FIELD[i],FIELD[i].x-1,FIELD[i].y);
        countNextCell(FIELD[i],FIELD[i].x+1,FIELD[i].y);
        countNextCell(FIELD[i],FIELD[i].x-1,FIELD[i].y+1);
        countNextCell(FIELD[i],FIELD[i].x,FIELD[i].y+1);
        countNextCell(FIELD[i],FIELD[i].x+1,FIELD[i].y+1);
      };
  };
  //console.log(field)
};

  function countNextCell(item,x,y) {/// считатет бомбы и соседей
    let el = FIELD.find(cell =>{
      if(cell.x===x && cell.y===y)
      if(cell.isBomb) {
           item.count++
        }else{
           item.sosed.push(cell.index);
         }
    })
  };

  function findOpenNextCells() {//открывает соседние клетки
    OPEN_CELLS.forEach(item=>{
      if(FIELD[item].count===0) {
        FIELD[item].sosed.forEach((el)=>{
          if(!OPEN_CELLS.includes(el)) {
            OPEN_CELLS.push(el);
            FIELD[el].state='opened';
            findOpenNextCells();
          }
        })
      }
    })
  };

  function openBlankCells(item) {///открывает соседей
    if(!OPEN_CELLS.includes(item.index)) {
      OPEN_CELLS.push(item.index);
    if(item.count === 0) {
        findOpenNextCells();      
    }};
  };

  function monitorOpenedCells(item) {
    openBlankCells(item);
    if(OPEN_CELLS.length===(FIELD_SIZE - NUMBER_OF_BOMBS)) {
      winGame();
    };
  };

  function startGame(item) {
    setStart(true);
    getFirstCell(item);
    setRestart(false);
  };
  
  function openingCell(item) {
    setEmotions('normal');
    if(OPEN_CELLS.length===0) {
      startGame(item);
    };
    monitorOpenedCells(item);
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

  function changeFace() {
    setEmotions('surprise');
  };

  function changeFaceNormal() {
    setEmotions('normal');
  };

  function clearField() {
    setRestart(true);
    setStart(false);
    setGameOver(false);
    setEmotions('normal');
    setBombsCount(NUMBER_OF_BOMBS);
    BOMBS.splice(0,BOMBS.length);
    FIELD.splice(0,FIELD.length);
    OPEN_CELLS.splice(0,OPEN_CELLS.length);
    makeField();
  };

  function openBombs() {
    setEmotions('loss');
    setStart(false);
    setGameOver(true);
  };

  function winGame() {
    if(OPEN_CELLS.sort((a, b) => a - b).join('') === BOMBS_FREE.sort((a, b) => a - b).join('')) {
      setEmotions('win');
      setStart(false);
      setGameOver(true);
    };
  };
  
  return (
    <div className="App">
      <Header 
        start={start} 
        bombsCount={bombsCount} 
        emotions={emotions} 
        clearField={clearField} 
      />
      <GameField 
        field={FIELD} 
        openCells={OPEN_CELLS} 
        openingCell={openingCell} 
        changeFace={changeFace} 
        changeFaceNormal={changeFaceNormal} 
        plantFlag={plantFlag} 
        removeFlag={removeFlag} 
        openBombs={openBombs} 
        gameOver={gameOver} 
        restart={restart} 
        putFlag={putFlag}  
        emotions={emotions}
      />
    </div>
  );
}

export default App;
