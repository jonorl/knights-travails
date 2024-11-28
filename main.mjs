// Imports

import { HashMap } from "./class.mjs"

let chessboard = [ 
      // 0  1  2  3  4  5  6  7
  /*0*/ [0, 0, 0, 0, 0, 0, 0, 0],
  /*1*/ [0, 0, 0, 0, 0, 0, 0, 0],
  /*2*/ [0, 0, 0, 0, 0, 0, 0, 0],
  /*3*/ [0, 0, 0, 0, 0, 0, 0, 0],
  /*4*/ [0, 0, 0, 0, 0, 0, 0, 0],
  /*5*/ [0, 0, 0, 0, 0, 0, 0, 0],
  /*6*/ [0, 0, 0, 0, 0, 0, 0, 0],
  /*7*/ [0, 0, 0, 0, 0, 0, 0, 0]]

function knightMoves(arr1, arr2){
  const knight = new HashMap();
  let nextPotentialMoveHorizontal = []
  let nextPotentialMoveVertical = []
  let potentialMove = []

  switch(arr1[0]){
    case 0: nextPotentialMoveHorizontal.push(1, 2); break
    case 1: nextPotentialMoveHorizontal.push(0, 1, 2); break
    case 2: nextPotentialMoveHorizontal.push(0, 1, 3, 4); break
    case 3: nextPotentialMoveHorizontal.push(1, 2, 4, 5); break
    case 4: nextPotentialMoveHorizontal.push(2, 3, 5, 6); break
    case 5: nextPotentialMoveHorizontal.push(3, 4, 6, 7); break
    case 6: nextPotentialMoveHorizontal.push(4, 5, 7); break
    case 7: nextPotentialMoveHorizontal.push(5, 6); break
  }

  switch(arr1[1]){
    case 0: nextPotentialMoveVertical.push(1, 2); break
    case 1: nextPotentialMoveVertical.push(0, 1, 2); break
    case 2: nextPotentialMoveVertical.push(0, 1, 3, 4); break
    case 3: nextPotentialMoveVertical.push(1, 2, 4, 5); break
    case 4: nextPotentialMoveVertical.push(2, 3, 5, 6); break
    case 5: nextPotentialMoveVertical.push(3, 4, 6, 7); break
    case 6: nextPotentialMoveVertical.push(4, 5, 7); break
    case 7: nextPotentialMoveVertical.push(5, 6); break
  }

  for (let i = 0; i < nextPotentialMoveHorizontal.length; i++){
    for (let j = 0; j < nextPotentialMoveVertical.length; j++){
        if(((Math.abs(nextPotentialMoveHorizontal[i] - arr1[0]) % 3 === 1) && 
        Math.abs((nextPotentialMoveVertical[j] - arr1[1]) % 3) === 2) || 
        (Math.abs((nextPotentialMoveHorizontal[i] - arr1[0]) % 3) === 2 && 
        Math.abs((nextPotentialMoveVertical[j] - arr1[1]) % 3) === 1)){
            potentialMove.push([nextPotentialMoveHorizontal[i], nextPotentialMoveVertical[j]]);
        }
    }
  }
  potentialMove.forEach(element => {
    knight.set(element);
  });
  console.log(knight.has([2, 1]))
  console.log(knight)
}

knightMoves([3,3])