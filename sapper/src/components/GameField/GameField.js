import cell from '../../images/minesweeper-sprites_9TPZzv3.png';
import './GameField.css';
import Cell from '../Cell/Cell';

function GameField({countStart}) {


  return(
    <div className='field'>
      { [...Array(256)].map((item, index) => <Cell  key={index} countStart={countStart} /> ) }
    </div>
  )
}
export default GameField;