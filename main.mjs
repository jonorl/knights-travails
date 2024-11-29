// Imports

import { Graph } from "./class.mjs";

let queue = [];
let visitedQueue = new Set([]);

function knightMoves(arr1, arr2) {
  visitedQueue.add(JSON.stringify(arr1));
  // put the next moves in the queue
  queue = lookForNextMoves(arr1);
  // duplicate the queue
  let nextMoveQueue = queue;
  // check if the target value is in the queue
  queue.forEach((move) => {
    if (JSON.stringify(move) === JSON.stringify(arr2)) {
      console.log(visitedQueue);
      return true;
    }
  });
  queue = [];
  // Compare the nextMoveQueue against the set and remove values if any:
  nextMoveQueue = nextMoveQueue.filter(
    (item) => !visitedQueue.has(JSON.stringify(item))
  );
  // On the queue clone, look for next moves and put them back in the queue starting all over recursively
  nextMoveQueue.forEach((move) => {
    knightMoves(move, arr2);
  });
}

function lookForNextMoves(arr1) {
  let nextPotentialMoveHorizontal = [];
  let nextPotentialMoveVertical = [];
  let potentialMove = [];
  switch (arr1[0]) {
    case 0:
      nextPotentialMoveHorizontal.push(1, 2);
      break;
    case 1:
      nextPotentialMoveHorizontal.push(0, 1, 2);
      break;
    case 2:
      nextPotentialMoveHorizontal.push(0, 1, 3, 4);
      break;
    case 3:
      nextPotentialMoveHorizontal.push(1, 2, 4, 5);
      break;
    case 4:
      nextPotentialMoveHorizontal.push(2, 3, 5, 6);
      break;
    case 5:
      nextPotentialMoveHorizontal.push(3, 4, 6, 7);
      break;
    case 6:
      nextPotentialMoveHorizontal.push(4, 5, 7);
      break;
    case 7:
      nextPotentialMoveHorizontal.push(5, 6);
      break;
  }

  switch (arr1[1]) {
    case 0:
      nextPotentialMoveVertical.push(1, 2);
      break;
    case 1:
      nextPotentialMoveVertical.push(0, 1, 2);
      break;
    case 2:
      nextPotentialMoveVertical.push(0, 1, 3, 4);
      break;
    case 3:
      nextPotentialMoveVertical.push(1, 2, 4, 5);
      break;
    case 4:
      nextPotentialMoveVertical.push(2, 3, 5, 6);
      break;
    case 5:
      nextPotentialMoveVertical.push(3, 4, 6, 7);
      break;
    case 6:
      nextPotentialMoveVertical.push(4, 5, 7);
      break;
    case 7:
      nextPotentialMoveVertical.push(5, 6);
      break;
  }

  for (let i = 0; i < nextPotentialMoveHorizontal.length; i++) {
    for (let j = 0; j < nextPotentialMoveVertical.length; j++) {
      if (
        (Math.abs(nextPotentialMoveHorizontal[i] - arr1[0]) % 3 === 1 &&
          Math.abs((nextPotentialMoveVertical[j] - arr1[1]) % 3) === 2) ||
        (Math.abs((nextPotentialMoveHorizontal[i] - arr1[0]) % 3) === 2 &&
          Math.abs((nextPotentialMoveVertical[j] - arr1[1]) % 3) === 1)
      ) {
        if (
          !visitedQueue.has(
            JSON.stringify([
              nextPotentialMoveHorizontal[i],
              nextPotentialMoveVertical[j],
            ])
          )
        ) {
          potentialMove.push([
            nextPotentialMoveHorizontal[i],
            nextPotentialMoveVertical[j],
          ]);
        }
      }
    }
  }
  return potentialMove;
}
// console.log(visitedQueue)



let chessboard = [
  //   0  1  2  3  4  5  6  7
  /*0*/ [0, 0, 0, 0, 0, 0, 0, 0],
  /*1*/ [0, 0, 0, 0, 0, 0, 0, 0],
  /*2*/ [0, 0, 0, 0, 0, 0, 0, 0],
  /*3*/ [0, 0, 0, 0, 0, 0, 0, 0],
  /*4*/ [0, 0, 0, 0, 0, 0, 0, 0],
  /*5*/ [0, 0, 0, 0, 0, 0, 0, 0],
  /*6*/ [0, 0, 0, 0, 0, 0, 0, 0],
  /*7*/ [0, 0, 0, 0, 0, 0, 0, 0],
];

// knightMoves([3, 3], [4, 3]);

function knightMovesV2(arr1, arr2) {
  let vertices = lookForNextMoves(arr1);
  let chessboardGraph = new Graph(vertices.length);

  // adding vertices
  for (let i = 0; i < vertices.length; i++) {
    chessboardGraph.addVertex(vertices[i]);
  }
  // adding edges
  vertices.forEach((move) => {
    chessboardGraph.addEdge(move,lookForNextMoves(move));
  });
  // Prints the graph
  chessboardGraph.printGraph();
  // chessboardGraph.bfs(vertices, arr1)
}

knightMovesV2([3, 3], [4, 3]);
