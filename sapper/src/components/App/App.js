import React, { useEffect } from 'react';
import './App.css';
import Header from '../Header/Header';
import GameField from '../GameField/GameField';

function App() {
  const [firstCell, setFirstCell] = React.useState();
  const [start, setStart] = React.useState(false);
  const [ bombsCount, setBombsCount ] = React.useState(40);
 // const [ bombs, setBombs ] = React.useState([...new Array(40)].map(() => Math.round(Math.random() * 256)));
  const bombs = []
  const field = [];
  const openCells=[]
  //const [openCells,setOpenCells] = React.useState([]);

  function getRandomArray() {//создаёт массив рандомных цифр
  while(bombs.length < bombsCount){
    let b = Math.round(Math.random() * 256)
    if(bombs.indexOf(b) === -1) {
      bombs.push(b);
    } 
    bombs.sort((a, b) => a - b);
  }
};
    
  function makeField() {
    for(let i =0; i<256; i++) {
      field.push({index: i, isBomb:false, count:0, x: Math.floor(i%16), y: Math.floor(i/16), sosed:[]})
    }
    getRandomArray()
  } 

  makeField()

  function findNextCell() {///расставляет соседей
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
  }
  console.log(field)
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
           field[i].state='blanck';
         } else {
          field[i].isBomb=false;
          field[i].state='blanck';
        }
     } 
  };

  function handelBlanckCell(item) {
    
  };
  
  function countStart(item) {
    if(openCells.length===0) {
      addedBombs()
      findNextCell()
    }
    item.state='opened';
    openBlankCells(item);
  };

  function findOpenNextCells() {//открывает соседние клетки
    openCells.forEach(item=>{
      if(field[item].count===0) {
        field[item].sosed.forEach((el)=>{
          if(!openCells.includes(el)) {
            openCells.push(el);
            field[el].state='opened';
            findOpenNextCells();
           // console.log(openCells.sort((a, b) => a - b))
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
    }}
  };

  function plantFlag() {
    setBombsCount(bombsCount - 1);
  };

  function removeFlag() {
    setBombsCount(bombsCount + 1);
  };

  return (
    <div className="App">
      <Header start={start} bombsCount={bombsCount} />
      <GameField field={field} openCells={openCells} countStart={countStart} plantFlag={plantFlag} removeFlag={removeFlag} handelBlanckCell={handelBlanckCell} open={openCells} />
      
    </div>
  );
}

export default App;
