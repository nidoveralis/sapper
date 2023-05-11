import {FIELD_SIZE} from './constants';

const BOMBS = [];
const BOMBS_FREE = [];
const OPEN_CELLS=[];
const FIELD = [];

export function makeField() {
  for(let i =0; i<FIELD_SIZE; i++) {
    FIELD.push({index: i, isBomb:false, count:0, x: Math.floor(i%16), y: Math.floor(i/16), sosed:[], state:'blanck'})
 }
};

export {
  BOMBS,
  BOMBS_FREE,
  OPEN_CELLS,
  FIELD
}