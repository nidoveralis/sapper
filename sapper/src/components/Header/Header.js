import React from 'react';
import './Header.css';
import cell from '../../images/minesweeper-sprites_9TPZzv3.png';


function Header({start}) {
  const [ seconds, setSeconds ] = React.useState(0);
  const [ startGame, setStartGame ] = React.useState(false);
  const [tens, setTens] = React.useState(0);
  const [tensPositions, setTensPositions] = React.useState(13);
  const [secondsPositions, setSecondsPositions] = React.useState(13);

  React.useEffect(() => {
    if (startGame) {
      setTimeout(setSeconds, 1000, seconds++);
      time()
    } 
  }, [ seconds, startGame]);

  React.useEffect(() => {
    setStartGame(start)
  },[start]);

 // React.useEffect(() => { -113

  function restartGame() {
    setStartGame(false);
  };

  function time() {
    console.log(seconds,13 - (14 * seconds), secondsPositions)
    if(seconds > 10 && seconds !== 0) { 
      //setTens(parseInt(seconds / 10))
     // setTensPositions(13 - (14 * tens));
      setSecondsPositions(13 - (14 * seconds%10));
    }else if(seconds < 10) {
      const a = 13 - (14 * seconds)
      setSecondsPositions(13 - (14 * seconds));
    }else if(seconds === 10) {
      setSecondsPositions(13)
    }
  }

const bombsCount = {
  0 : 'background-position: 13px -84px',
  1 : 'background-position: 0px -84px',
  2 : 'background-position: -14px -84px',
  3 : 'background-position: -28px -84px',
}

  return (
    <div className="header">
      <div className='bomb-count counts'>
        <div className='count' style={{ backgroundImage: `url(${cell})`, backgroundPositionX: `13px`}} />
        <div className='count' style={{ backgroundImage: `url(${cell})`}} />
        <div className='count' style={{ backgroundImage: `url(${cell})`}} />
      </div>
      <div className='smile' style={{ backgroundImage: `url(${cell})`}} onClick={restartGame}>
        
      </div>
      <div className='second-count counts'>
      <div className='count' style={{ backgroundImage: `url(${cell})`, backgroundPositionX: `13px`}} />
        <div className='count' style={{ backgroundImage: `url(${cell})`, backgroundPositionX: `${tensPositions}px`}} />
        <div className='count' style={{ backgroundImage: `url(${cell})`, backgroundPositionX: `${secondsPositions}px`}} />
      </div>
    </div>
  );
}

export default Header;