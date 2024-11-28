// constructor classes

// Creates a node that's composed of a value and a pointer to its next node.
class Node {
    // Constructor
    constructor(key = null, value = null, nextNode = null) {
      this.key = key;
      this.value = value;
      this.nextNode = nextNode;
    }
  }
  // Methods
  
  // Creates the linked list composed of a link of nodes.
  class LinkedList {
    constructor() {
      this.header = null;
    }
    // Adds a new node containing value to the end of the list.
    append(key, value) {
      if (this.header === null) {
        this.header = new Node(key, value);
      } else {
        let nodeChecker = this.header;
        while (nodeChecker.nextNode !== null) {
          nodeChecker = nodeChecker.nextNode;
        }
        nodeChecker.nextNode = new Node(key, value);
      }
    }
    // Adds a new node containing value to the start of the list.
    prepend(key, value) {
      if (this.header === null) {
        this.header = new Node(key, value);
      } else {
        let tmp = new Node(key, value);
        tmp.nextNode = this.header;
        this.header = tmp;
      }
    }
    // Returns the total number of nodes in the list.
    size() {
      let nodeLoop = this.header;
      let nodeCounter = 0;
      while (nodeLoop !== null) {
        nodeCounter++;
        nodeLoop = nodeLoop.nextNode;
      }
      return nodeCounter;
    }
    // Returns the first node in the list.
    head() {
      if (this.header === null) return "empty list";
      else return this.header.value;
    }
    // Returns the last node in the list.
    tail() {
      if (this.header === null) return "empty list";
      else {
        let nodeLoop = this.header;
        while (nodeLoop.nextNode !== null) {
          nodeLoop = nodeLoop.nextNode;
        }
        return nodeLoop;
      }
    }
    // Returns the node at the given index.
    at(index) {
      if (this.header === null) return "empty list";
      else if (this.size() - 1 < index || index < 0) return "index out of bounds";
      let nodeLoop = this.header;
      let nodeCounter = 0;
      while (nodeLoop.nextNode !== null && nodeCounter !== index) {
        nodeCounter++;
        nodeLoop = nodeLoop.nextNode;
      }
      return nodeLoop;
    }
    // Removes the last element from the list.
    pop() {
      if (this.header === null) return "empty list";
      let nodeLoop = this.header;
      let nodeCounter = 0;
      while (nodeLoop.nextNode !== null) {
        nodeCounter++;
        nodeLoop = nodeLoop.nextNode;
      }
      this.at(nodeCounter - 1).nextNode = null;
      return this;
    }
    // Returns true if the passed in value is in the list and otherwise returns false.
    contains(value) {
      if (this.header === null) return false;
      let nodeLoop = this.header;
      while (nodeLoop.nextNode !== null) {
        if (nodeLoop.value === value) {
          return true;
        }
        nodeLoop = nodeLoop.nextNode;
      }
      return false;
    }
    // Returns the index of the node containing value, or null if not found.
    find(value) {
      if (this.header === null) return null;
      let nodeLoop = this.header;
      let nodeCounter = 0;
      while (nodeLoop.nextNode !== null) {
        if (nodeLoop.value === value) {
          return nodeCounter;
        }
        nodeCounter++;
        nodeLoop = nodeLoop.nextNode;
      }
      if (nodeLoop.value === value) {
        return nodeCounter;
      } else return null;
    }
    // Represents your LinkedList objects as strings, so you can print them out and preview them in the console.
    // The format should be: ( value ) -> ( value ) -> ( value ) -> null.
    toString() {
      if (this.header === null) return "empty list";
  
      let nodeLoop = this.header;
      let nodeArray = [];
      while (nodeLoop.nextNode !== null) {
        nodeArray.push(nodeLoop.value);
        nodeLoop = nodeLoop.nextNode;
      }
      nodeArray.push(nodeLoop.value);
      if (nodeLoop.nextNode === null) {
        nodeArray.push("null");
      } else nodeArray.push(nodeLoop.nextNode);
      return "(" + nodeArray.join(") -> (") + ")";
    }
    // Extra Credit: insertAt(value, index) that inserts a new node with the provided value at the given index.
    insert(value, index) {
      if (index > this.size() || index < 0)
        return console.log("index out of bounds");
      else if (index === 0) return this.prepend(value);
      else if (index === this.size()) return this.append(value);
      else {
        let tmp = new Node(value);
        tmp.nextNode = this.at(index);
        this.at(index - 1).nextNode = tmp;
      }
    }
    // Extra Credit: removeAt(index) that removes the node at the given index.
    removeAt(index) {
      if (index >= this.size() || index < 0)
        return console.log("index out of bounds");
      else if (index === this.size() - 1) return this.pop();
      else if (index === 0) {
        this.header = this.header.nextNode;
      } else {
        let tmp = this.at(index - 1);
        tmp.nextNode = this.at(index + 1);
      }
    }
  }
  
  // Hash Map
  
  export class HashMap {
    // Constructor
    constructor(loadFactor = 0.75, capacity = 8) {
      this.loadFactor = loadFactor;
      this.capacity = capacity;
      this.tmpCapacity = 0;
      this.bucket = [];
      for (let i = 0; i < capacity; i++) {
        this.bucket.push(i);
      }
    }
  
    // Methods
  
    // Takes a key and produces a hash code with it.
    hash(key) {
        let hashCode = 0;
        if (Array.isArray(key)){
          key = String(key[0] + key[1]);
        }
        const primeNumber = 31;
          hashCode = (primeNumber * hashCode + key.charCodeAt(0)) % this.capacity;
        return hashCode;
      }
  
    // takes two arguments: the first is a key, and the second is a value that is assigned to this key.
    // If a key already exists, then the old value is overwritten, and we can say that we update the key’s value.
    set(key, value) {
      if (typeof this.bucket[this.hash(key)] === "number") {
        this.bucket[this.hash(key)] = new LinkedList();
        this.bucket[this.hash(key)].prepend(key, value);
      } else {
        // FIX THIS!!! check if any of the children have the same key
        let nodeLoop = this.bucket[this.hash(key)].header;
        while (nodeLoop.nextNode !== null) {
          if (nodeLoop.key !== key && nodeLoop.nextNode === null) {
            this.bucket[this.hash(key)].append(key, value);
          } else if (nodeLoop.key === key && nodeLoop.nextNode === null) {
            this.bucket[this.hash(key)].header.value = value;
          }
          nodeLoop = nodeLoop.nextNode;
        }
        if (nodeLoop.key !== key && nodeLoop.nextNode === null) {
          this.bucket[this.hash(key)].append(key, value);
        } else if (nodeLoop.key === key && nodeLoop.nextNode === null) {
          nodeLoop.value = value;
        }
      }
      this.increaseCapacity();
    }
  
    // Helper method to increase capacity when loadFactor is > 0.75
    increaseCapacity() {
      this.loadFactor = this.length() / this.capacity;
      this.tmpCapacity = this.capacity;
      while (this.loadFactor > 0.75) {
        this.capacity *= 2;
        this.loadFactor = this.length() / this.capacity;
      }
      let tempArray = [];
      for (let i = 0; i < this.capacity; i++) {
        tempArray.push(i);
      }
      this.bucket.forEach((element) => {
        if (typeof element === "object") {
          element = element.header;
          while (element.nextNode !== null) {
            let key = element.key;
            let value = element.value;
            this.tmpSet(tempArray, key, value);
            element = element.nextNode;
          }
          let key = element.key;
          let value = element.value;
          this.tmpSet(tempArray, key, value);
        }
      });
      this.bucket = tempArray;
      tempArray = [];
    }
  
    tmpHash(key) {
      let hashCode = 0;
  
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode =
          (primeNumber * hashCode + key.charCodeAt(i)) % this.tmpCapacity;
      }
      return hashCode;
    }
  
    tmpSet(tempArray, key, value) {
      if (typeof tempArray[this.hash(key)] === "number") {
        tempArray[this.hash(key)] = new LinkedList();
        tempArray[this.hash(key)].prepend(key, value);
      } else {
        if (tempArray[this.hash(key)].header.key !== key) {
          tempArray[this.hash(key)].append(key, value);
        } else {
          tempArray[this.hash(key)].header.value = value;
        }
      }
    }
  
    // takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null.
    get(key) {
      if (this.bucket[this.hash(key)].header === undefined) return null;
      let nodeLoop = this.bucket[this.hash(key)].header;
      while (nodeLoop !== null) {
        if (nodeLoop.key === key) {
          return nodeLoop.value;
        } else nodeLoop = nodeLoop.nextNode;
      }
      return null;
    }
  
    // Takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
    has(key) {
        if (this.bucket[this.hash(key)].header === undefined) return false;
        let nodeLoop = this.bucket[this.hash(key)].header;
        while (nodeLoop !== null) {
          if (JSON.stringify(nodeLoop.key) === JSON.stringify(key)) {
            return true;
          } else {
            nodeLoop = nodeLoop.nextNode;}
        }
        return false;
      }
  
    // Takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true.
    // If the key isn’t in the hash map, it should return false.
    remove(key) {
      if (this.has(key) === false) return false;
      let nodeLoop = this.bucket[this.hash(key)].header;
      while (nodeLoop.nextNode !== null) {
        if (nodeLoop.nextNode.key === key) {
          nodeLoop.nextNode = nodeLoop.nextNode.nextNode;
          return true;
        } else if (nodeLoop.key === key) {
          this.bucket[this.hash(key)] = new LinkedList();
          this.bucket[this.hash(key)].prepend(
            nodeLoop.nextNode.key,
            nodeLoop.nextNode.value
          );
          this.bucket[this.hash(key)].header.nextNode =
            nodeLoop.nextNode.nextNode;
          return true;
        }
        nodeLoop = nodeLoop.nextNode;
      }
      if (nodeLoop.key === key) {
        this.bucket[this.hash(key)] = this.hash(key);
        return true;
      }
      return false;
    }
  
    // Returns the number of stored keys in the hash map.
    length() {
      let blankArray = [];
      for (let i = 0; i < this.capacity; i++) {
        blankArray.push(i);
      }
      if (JSON.stringify(this.bucket) === JSON.stringify(blankArray)) return 0;
      let counter = 0;
      for (let i = 0; i < this.bucket.length; i++) {
        if (typeof this.bucket[i] === "object") {
          let key = this.bucket[i].header.key;
          let nodeLoop = this.bucket[i].header;
          while (nodeLoop.nextNode !== null) {
            counter++;
            nodeLoop = nodeLoop.nextNode;
          }
          counter++;
        }
      }
      return counter;
    }
  
    // Removes all entries in the hash map.
    clear() {
      this.bucket = [];
      for (let i = 0; i < 16; i++) {
        this.bucket.push(i);
      }
    }
  
    // Returns an array containing all the keys inside the hash map.
    keys() {
      let blankArray = [];
      for (let i = 0; i < this.capacity; i++) {
        blankArray.push(i);
      }
      if (JSON.stringify(this.bucket) === JSON.stringify(blankArray))
        return "No keys found";
      let tmpArr = [];
      for (let i = 0; i < this.bucket.length; i++) {
        if (typeof this.bucket[i] === "object") {
          let key = this.bucket[i].header.key;
          let nodeLoop = this.bucket[this.hash(key)].header;
          while (nodeLoop.nextNode !== null) {
            tmpArr.push(nodeLoop.key);
            nodeLoop = nodeLoop.nextNode;
          }
          tmpArr.push(nodeLoop.key);
        }
      }
      return tmpArr;
    }
  
    // Returns an array containing all the values.
    values() {
      let blankArray = [];
      for (let i = 0; i < this.capacity; i++) {
        blankArray.push(i);
      }
      if (JSON.stringify(this.bucket) === JSON.stringify(blankArray)) return 0;
      let tmpArr = [];
      for (let i = 0; i < this.bucket.length; i++) {
        if (typeof this.bucket[i] === "object") {
          let key = this.bucket[i].header.key;
          let nodeLoop = this.bucket[this.hash(key)].header;
          while (nodeLoop.nextNode !== null) {
            tmpArr.push(nodeLoop.value);
            nodeLoop = nodeLoop.nextNode;
          }
          tmpArr.push(nodeLoop.value);
        }
      }
      return tmpArr;
    }
  
    // Returns an array that contains each key, value pair.
    entries() {
      let blankArray = [];
      for (let i = 0; i < this.capacity; i++) {
        blankArray.push(i);
      }
      if (JSON.stringify(this.bucket) === JSON.stringify(blankArray))
        return "empty list";
      let tmpArray = [];
      for (let i = 0; i < this.bucket.length; i++) {
        if (typeof this.bucket[i] === "object") {
          let key = this.bucket[i].header.key;
          let nodeLoop = this.bucket[this.hash(key)].header;
          let nodeArray = [];
          let tmpString;
          let tmpArray2 = [];
          while (nodeLoop.nextNode !== null) {
            tmpArray2.push(nodeLoop.key);
            tmpArray2.push(nodeLoop.value);
            tmpString = tmpArray2.join();
            tmpArray.push(tmpString);
            tmpString = "";
            tmpArray2 = [];
            nodeLoop = nodeLoop.nextNode;
          }
          tmpArray2.push(nodeLoop.key);
          tmpArray2.push(nodeLoop.value);
          tmpString = tmpArray2.join();
          tmpArray.push(tmpString);
          tmpArray = tmpArray.concat(nodeArray);
        }
      }
      return tmpArray;
    }
  }
  