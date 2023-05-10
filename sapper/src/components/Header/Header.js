import React from 'react';
import './Header.css';
import cell from '../../images/minesweeper-sprites_9TPZzv3.png';

function Header({start, bombsCount, loss, faceSurprised, clearField}) {

  const smileEmotion = {
    surprise:'86px',
    losss: '31px',
    win: '58px',
    normal:'-1px'
  };
  
  const [ time, setTime ] = React.useState(0);
  //const [smile, setSmile] = React.useState(smileEmotion.loss);
  const smile =smileEmotion[loss];
  const seconds = time % 10;
  const tens = parseInt(time / 10);
  const hundreds = parseInt(time / 100);
  
  function restartGame() {
    startTime(0);
    //setSmile('-1px');
    clearField();
  };
  
  function startTime(data) {
    setTimeout(setTime, 1000, data);
  }
  
  React.useEffect(() => {
    if(start) {
      startTime(time + 1)
    }
  }, [ time, start]);

  React.useEffect(() => {

    //if(loss) {
      //setSmile('31px');
   // }
  },[loss]);

  React.useEffect(() => {
   //setSmile(faceSurprised ? '86px' : '-1px');
  },[faceSurprised]);

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