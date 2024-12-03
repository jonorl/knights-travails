// constructor classes

export class Graph {
  // defining vertex array and
  // adjacent list
  constructor(noOfVertices) {
    this.noOfVertices = noOfVertices;
    this.AdjList = new Map();
  }
  // methods
  addVertex(v) {
    this.AdjList.set(v, []);
  }

  // add edge to the graph
  addEdge(v, w) {
    this.AdjList.get(v).push(w);
  }

  printGraph() {
    // get all the vertices
    let get_keys = this.AdjList.keys();

    // iterate over the vertices
    for (let i of get_keys) {
      let get_values = this.AdjList.get(i);
      let conc = "";
      for (let j of get_values) conc += j + " ";
      console.log(i + " -> " + conc);
    }
  }
}

export class AdjListNode {
  constructor(dest) {
    this.dest = dest;
    this.weight = 1;
  }
  }
 
