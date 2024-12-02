// Imports

import { Graph } from "./class.mjs";

function lookForNextMoves(arr1) {
  let nextPotentialMoveHorizontal = [];
  let nextPotentialMoveVertical = [];
  let potentialMove = [];
  switch (arr1[0]) {
    case 0:
      nextPotentialMoveHorizontal.push(1, 2);
      break;
    case 1:
      nextPotentialMoveHorizontal.push(0, 2, 3);
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
      nextPotentialMoveVertical.push(0, 2, 3);
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
        potentialMove.push([
          nextPotentialMoveHorizontal[i],
          nextPotentialMoveVertical[j],
        ]);
      }
    }
  }
  return potentialMove;
}

let chessboard = [
  //     0  1  2  3  4  5  6  7
  /*0*/ [0, 0, 0, 0, 0, 0, 0, 0],
  /*1*/ [0, 0, 0, 0, 0, 0, 0, 0],
  /*2*/ [0, 0, 0, 0, 0, 0, 0, 0],
  /*3*/ [0, 0, 0, 0, 0, 0, 0, 0],
  /*4*/ [0, 0, 0, 0, 0, 0, 0, 0],
  /*5*/ [0, 0, 0, 0, 0, 0, 0, 0],
  /*6*/ [0, 0, 0, 0, 0, 0, 0, 0],
  /*7*/ [0, 0, 0, 0, 0, 0, 0, 0],
];

function createNodes() {
  let chessboardX = [0, 1, 2, 3, 4, 5, 6, 7];
  let chessboardY = [0, 1, 2, 3, 4, 5, 6, 7];
  let edges = [];
  let coordinates = [];
  chessboardX.forEach((moveX) => {
    chessboardY.forEach((moveY) => {
      coordinates.push([moveX, moveY]);
      edges.push(lookForNextMoves(coordinates));
    });
  });
  let coordinatesString;

  coordinates.forEach((coordinate) => {
    coordinate = coordinate[0].toString() + coordinate[1].toString() + ", ";
    coordinatesString += coordinate;
  });
  coordinatesString = coordinatesString.slice(9);
  coordinatesString = coordinatesString.slice(0, -2);
  let coordinatesSplit = coordinatesString.split(", ");
  let chessboardGraph = new Graph(coordinates.length);
  for (let i = 0; i < coordinatesSplit.length; i++) {
    chessboardGraph.addVertex(coordinatesSplit[i]);
  }

  coordinates.forEach((coordinate) => {
    chessboardGraph.addEdge(
      coordinate.toString().replace(",", ""),
      lookForNextMoves(coordinate)
    );
  });
  // chessboardGraph.printGraph();

  return chessboardGraph;
}

function bfs(start, end) {

  let myGraph = createNodes();
  const visited = new Set();

  const queue = [start];

  while (queue.length > 0) {

    const nextInQueue = queue.shift();
    let nextMoves = myGraph.AdjList.get(nextInQueue)
    console.log(nextMoves)
    for (const nextMove of nextMoves){

      queue.push(nextMove)

      if (JSON.stringify(nextMove).includes(end)){
        console.log("found it!")
        return "found it!"
      }
      if (!visited.has(nextMove)){
        visited.add(nextMove);
        queue.push(nextMove)
        console.log(nextMove)
      }
    }
  }
}

bfs("33", [3, 4]);
