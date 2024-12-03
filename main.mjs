// Imports

import { AdjListNode, Graph } from "./class.mjs";

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

let graphKeys;
let graphEdges;
let graph = [];
const V = 64;
let counter = 0;
let verticesObj = {};
let source = 63;

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
  graphKeys = Array.from(chessboardGraph.AdjList.keys());
  graphEdges = Array.from(chessboardGraph.AdjList.values());

  for (let i = 0; i < V; i++) {
    graph.push([]);
  }
  
  for (let i = 0; i < V; i++) {
    for (let j = 0; j < graphEdges[i][0].length; j++) {
      let tmpStr = graphEdges[i][0][j].toString().replace(",", "");
      tmpStr = tmpStr.toString();
      tmpStr = tmpStr.padStart(2, "0");
      graph[i].push(new AdjListNode(formatVertexId(graphEdges[i][0][j])));
    }
  }

  graphKeys.forEach((element) => {
    verticesObj[counter] = element;
    counter++;
  });

  return chessboardGraph;
}

function dijkstra(V, graph, source) {
  const distance = new Array(V).fill(Infinity);
  const visited = new Array(V).fill(false);

  distance[source] = 0;

  for (let count = 0; count < V - 1; count++) {
    const u = getMinDistanceVertex(distance, visited);

    visited[u] = true;

    for (let v of graph[u]) {
      const vertexIndex = graphKeys.findIndex(
        (key) => formatVertexId(key) === formatVertexId(v.dest)
      );

      if (
        !visited[vertexIndex] &&
        distance[u] !== Infinity &&
        distance[u] + v.weight < distance[vertexIndex]
      ) {
        distance[vertexIndex] = distance[u] + v.weight;
      }
    }
  }

  return distance;
}

function getMinDistanceVertex(distance, visited) {
  let minDistance = Infinity;
  let minIndex = -1;

  for (let i = 0; i < distance.length; i++) {
    if (!visited[i] && distance[i] <= minDistance) {
      minDistance = distance[i];
      minIndex = i;
    }
  }

  return minIndex;
}

function formatVertexId(vertex) {
  if (Array.isArray(vertex)) {
    vertex = vertex.join("");
  }

  return vertex.toString().padStart(2, "0");
}

createNodes();
let distance = dijkstra(V, graph, source);

// console.log("Vertex Distance from Source");
// for (let i = 0; i < V; i++) {
//   console.log(
//     "Index: " + [i] + " \t\t " + graphKeys[i] + " \t\t " + distance[i]
//   );
// }

function knightMoves (source, destination){
  let sourceStr = source.toString().replace(",", "")
  let destinationStr = destination.toString().replace(",", "")
  let sourceKey;
  let destinationKey;


  for (const [key, val] of Object.entries(verticesObj)) {
    if (val === sourceStr) {
      sourceKey = key;
    }
  }

  for (const [key, val] of Object.entries(verticesObj)) {
    if (val === destinationStr) {
      destinationKey = key;
    }
  }
  sourceStr = sourceKey;
  dijkstra(V, graph, sourceStr)
  console.log(`To get from ${source} to ${destination} it requires a minimum of: `,  distance[destinationKey], ` moves`)
}

knightMoves([3,3], [4,3])