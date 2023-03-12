import React from 'react';
import './Header.css';
import cell from '../../images/minesweeper-sprites_9TPZzv3.png';


function Header({start, bombsCount, loss}) {
  const [ time, setTime ] = React.useState(0);
  const [ startGame, setStartGame ] = React.useState(false);
  const [smile, setSmile] = React.useState('-1px');
  
  const seconds = time % 10;
  const tens = parseInt(time / 10);
  const hundreds = parseInt(time / 100);
  
  function restartGame() {
    t(0)
    setStartGame(false);
    setSmile('-1px');
  };

  function t(data) {
    setTimeout(setTime, 1000, data);
  }

  React.useEffect(() => {
    if (startGame) {
      t(time + 1)
    }
  }, [ time, startGame]);
  //console.log(start)
  React.useEffect(() => {
    setStartGame(start)
  },[start]);

  React.useEffect(() => {
    if(loss) {
      setSmile('31px');
      setStartGame(false);
    }
  },[loss]);

  return (
    <div className="header">
      <div className='bomb-count counts'>
        <div className='count' style={{ backgroundImage: `url(${cell})`, backgroundPositionX: `13px`}} />
        <div className='count' style={{ backgroundImage: `url(${cell})`, backgroundPositionX: `${(13 - (14 * parseInt(bombsCount/10)))}px`}} />
        <div className='count' style={{ backgroundImage: `url(${cell})`, backgroundPositionX: `${(13 - (14 * (bombsCount % 10)))}px`}} />
      </div>
      <div className='smile' style={{ backgroundImage: `url(${cell})`, backgroundPositionX: `${smile}` }} onClick={restartGame}>
        
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