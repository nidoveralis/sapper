import React from 'react';
import './Header.css';
import cell from '../../images/minesweeper-sprites_9TPZzv3.png';


function Header({start, bombsCount,bigBoomm}) {
  const [ time, setTime ] = React.useState(0);
  const [ startGame, setStartGame ] = React.useState(false);
  
  const seconds = time % 10;
  const tens = parseInt(time / 10);
  const hundreds = parseInt(time / 100);
  
  function restartGame() {
    setStartGame(false);
  };

  React.useEffect(() => {
    if (startGame) {
      setTimeout(setTime, 1000, time + 1);
    } 
  }, [ time, startGame]);

  React.useEffect(() => {
    setStartGame(start)
  },[start]);

  return (
    <div className="header">
      <div className='bomb-count counts'>
        <div className='count' style={{ backgroundImage: `url(${cell})`, backgroundPositionX: `13px`}} />
        <div className='count' style={{ backgroundImage: `url(${cell})`, backgroundPositionX: `${(13 - (14 * parseInt(bombsCount/10)))}px`}} />
        <div className='count' style={{ backgroundImage: `url(${cell})`, backgroundPositionX: `${(13 - (14 * (bombsCount % 10)))}px`}} />
      </div>
      <div className='smile' style={{ backgroundImage: `url(${cell})`, backgroundPositionX: `-1px` }} onClick={restartGame}>
        
      </div>
      <div className='second-count counts'>
      <div className='count' style={{ backgroundImage: `url(${cell})`, backgroundPositionX: `${(14 - (14 * hundreds))}px`}} />
        <div className='count' style={{ backgroundImage: `url(${cell})`, backgroundPositionX: `${(14 - (14 * tens))}px`}} />
        <div className='count' style={{ backgroundImage: `url(${cell})`, backgroundPositionX: `${(14 - (14 * seconds))}px`}} />
      </div>
    </div>
  );
}

export default Header;