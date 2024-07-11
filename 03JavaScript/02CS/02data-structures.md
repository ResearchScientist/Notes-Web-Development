Data structures are various ways of organizing data.

|data structure|use|+|-|
|--|--|--|--|
|array & string|ordered data , words|fast key lookup , fast append| slow insert , slow delete|
|hash table|optimization|fast lookups|unidirectional lookup|
|linked list|data insert & delete|fast on both ends|slow lookup|
|stack & queue|custom auxiliary data structure|fast|
|tree & heap|hierarchical data|
|graph|complex relationships|

*Linear Data Structures*
array , linked list , stack , queue

- have an order
- one dimensional
- have a start and an end
- traverse in a single run
- easy to implement
- one level

*Non Linear Data Structures*
tree , graph

- no inherit order
- arranged with multiple relationships and properties
- traverse recursively
- complex to implement
- multiple levels


*Time Complexity*

- constant - O(1)
- linear - O(n)

|process|array|linked list|stack|queue|
|--|--|--|--|--|
|insert at end|O(1)|O(1)|O(1)|O(1)|
|insert at beginning|O(n)|O(1)|n/a|n/a|
|delete from end|O(1)|O(1)|O(1)|n/a|
|delete from beginning|O(n)|O(1)|n/a|O(n)|
|lookup|O(n)|O(n)|O()|O(n)|


# Set

A collection of items.
The set has no inherit order.
The set has no duplicates.

Operations
- add
- remove
- contains
- toList

# Map

A key value dictionary.

No inherit order.
Keys have no duplicates.
Values can be duplicates.

# Stack

Last in first out.

Push (add)
Pop (remove)

```js
const stack = [1,2,3,4];
stack.push(5); // [1,2,3,4,5]
stack.pop();   // returns 5 , array is [1,2,3,4]
```

*Example Use*
Undo in text editor removes last added action.

**Stack Code**

All the methods `push() pop() peek()` should be running at constant time.
Which means no loops, no lookups.

```js
// _ is used to denote a variable that should not be altered

class Stack {
  constructor() {
    this._storage = {};
    this._length = 0;
  }
  
  push(value) {
    this._storage[this._length] = value;
    this._length++;
  }
  
  pop() {
    if (this._length) {
      const lastVal = this._storage[this._length - 1];
      this._storage[this._length - 1] = undefined; // deletes value
      this._length--;
      return lastVal;
    }
  }
  
  peek() {
    if (this._length) {
      return this._storage[this._length - 1];
    }
  }
}

const myStack = new Stack();

myStack.push('zero');
myStack.push('one');
console.log(myStack);
```

# Queue

First in first out.

Enqueue (add)
Dequeue (remove)

```js
const queue = [1,2,3,4];
queue.enqueue(5); // [1,2,3,4,5]
queue.dequeue();  // returns 1 , array is [2,3,4,5]
```

Priority queues are beneficial for for streaming video over downloading an update to avoid skipping frames.
Streaming goes in front of queue and update goes to end of queue.

**Queue Code**

```js
class Queue {
  constructor() {
    this._storage = {};
    this._length = 0;
    this._headIndex = 0;
  }
  
  enqueue(value) {
    const lastIndex = this._length + this._headIndex
    this._storage[lastIndex] = value;
    this._length++;
  }
  
  dequeue() {
    if (this._length) {
      const firstVal = this._storage[this._headIndex];
      delete this._storage[this._headIndex];
      this._length--;
      this._headIndex++;
      return firstVal;
    }
  }
  
  peek() {
    
  }
}

var myQ = new Queue();
myQ.enqueue('zero');
myQ.enqueue('one');

console.log(myQ);
```

# Array

An indexed list.
Organizes items sequentially in memory.
Good for obtaining items.
Bad for deleting or inserting items because of shifting.

Very fast constant for looking up a key. For a value it needs to loop.

JavaScript does auto garbage collection.
But in other languages deleting and shifting is computationally expensive.

**Strings**

Strings are immutable.
When changing a string you are actually making a copy.
Best to split a string into an array.

**Search Through An Array**

*Unsorted Array*
For an unsorted array loop through 0 to the length of the array.

```js
function linearSearch(id,array) {
  for (let i = 0; i< array.length; i++) {
    if (id === array[i].id) {
      return array[i];
    }
  }
}
```

*Sorted Array*
For a sorted array use a binary search.

```js
function binarySearch(id,array) {
  let min = 0;
  let max = array.length - 1;
  let index;
  let element;
  
  while(min <= max) {
    index = Math.floor((min + max) / 1);
    element = array[index];
    if (element.id < id) {
      min = index + 1;
    } else if (element.id > id) {
      max = index - 1;
    } else {
      return element;
    }
  }
}
```

# Linked List

A list in which each node is stored sequentially and has a pointer pointing to the next node.
Data is stored by reference.

Good for deleting items.
Bad for obtaining items.

Deletions and shifting less computationally expensive than array lists.

Used for setting the array size in languages that do not have dynamic arrays.
JS has dynamic arrays so it is not necessary to set the array size.

Linked Lists can be used as the data structure of a stack or queue.

**Traverse Flow**
- can only begin at head
- can only go in one direction
- cannot go backwards

*Singly Linked*
- one directional
- each node has only one pointer
- each pointer points to the next node
- begins search at head

```js
const linkedlist = {
  head: {
    value: 1
    next: {
      value: 2
      next: {
        value: 3
        next: null
      }
    }
  }
}
```

*Doubly Linked*
- omni directional
- each node has two pointers
- one points to next node , other points to previous node
- begins search at head or tail

```js
const linkedlist = {
  head: {
    value: 1
    next: {
      value: 2
      next: {
        value: 3
        next: null
        previous: {POINTER}
      }
    }
  }
  
  {
    value: 1,
    next: {POINTER},
    previous: {POINTER}
  }
}
```

**Least Recently Used Cache**
Removes oldest item.

**Linked List Code**

```js
class linkedList {
  constructor(value) {
    this.head = {value, next: null};
    this.tail = this.head;
  }
  
  insert(value) { // should be constant time
    const node = {value, next: null};
    this.tail.next = node;
    this.tail = node;
  }
  
  remove() {
    
  }
  
  removeTail() {
    let currentNode = this.head;
    while(currentNode.next !== this.tail) {
      currentNode = currentNode.next;
    }
    currentNode.next = null;
    this.tail = currentNode;
  }
  
  contains(value) {
    let currentNode = this.head;
    while (currentNode.value !== value) {
      currentNode = currentNode.next;
    }
    return currentNode.value === value;
  }
  
  isHead(node) { // constant time
    return node === this.head;
  }
  
  isTail(node) { // constant time
    return node === this.tail;
  }
}
  
const myList = new linkedList(1);
myList.insert(2);
myList.insert(3);
myList.removeTail();
console.log(myList);
```

# Binary Tree

Useful for ordered searches such as searching through numerical or alphabetical lists.
If you need to search through a list of numbers or words, first sort the list than do a binary search  on the list.

- Each node has either 0,1,2 branches.
- Each element in the left branch is smaller than the node value.
- Each element in the right branch is greater than the node value.

In case of duplicates you need to decide if you want them consistently added to left side or the right side.

O(log n) best scenario
O(n) worst scenario

`bst.add(n)` adds given n to binary tree

![binaryTree](03JavaScript/02CS/binary-tree.png)

*Recursively*
Checks each nested tree for an empty branch.

*Iteratively*
Loops through each nested tree following the correct path.

```js
// Constructor
class Tree {
  constructor() {
    this.root = null;
  }
  toObject() {
    return this.root;
  }
  add(value) {
    if (this.root === null) {
      // if no root node make a root node
      this.root = new Node(value);
      return;
    }
    let current = this.root;
    while(true) {
      if (current.value > value) {
        // go left
        if (current.left) {
          current = current.left;
        }
        else {
          current.left = new Node(value);
          break;
        }
      }
      else {
        // go right
        if (current.right) {
          current = current.right;
        }
        else {
          current.right = new Node(value);
          break;
        }
      }
    }
  }
}

class Node {
  constructor(value, left=null, right=null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

// Visualizer
describe('binary search tree', function() {
  it('creates correct tree', () => {
    const nums = [3,7,4,6,5,1,10,2,9,8];
    const tree = new Tree();
    nums.map(num => tree.add(num));
    const objs = tree.toObject();
    render(objs,nums);
    
    expect(objs.value).toEqual(3);
    expect(objs.left.value).toEqual(1);
    expect(objs.left.left).toBeNull(0);
  })
});
```

# AVL Tree

Similar to a binary tree in terms of nodes and branches.
Advantage is that an AVL tree attempts to keep the branches balanced.
A balanced AVL tree is one in which the difference in nodes between any two joined branches is not greater than one.

It accomplishes this balancing recursively.

- climbs up the tree and checks each node if balanced
- if not balanced performs a rotation of the nodes

O(log n)

*Single Rotation*

Right Rotation
```
# balanced node
5
 \
  8

# add 9
5
 \
  8
   \
    9

# recursive check
5      # 3 - 0 & 2 , not balanced
 \
  8    # 2 - 0 & 1 , balanced
   \
    9  # 1 - both branches 0 , balanced

# switch 3 & 2
# move node 2 to left branch of node 3
# move node 1 to right branch of node 3
  8
 / \
5   9    
```

Left Rotation
```
# Done similarly but the directions are switched.
```

*Double Rotation*

```
# balanced node
5
 \
  8

# add 7
5
 \
  8
 /
7

# recursive check
5    # 3 - 0 & 2 , not balanced
 \
  8  # 2 - 1 & 0 , balanced
 /
7    # 1 - 0 & 0 , balanced

# left rotation
# switch 2 & 1
  5
   \
    7    
   /
  8
# move node 1 to right branch of node 2
  5
   \
    7    
     \
      8

# right rotation

# recursive check
5      # 3 - 0 & 2 , not balanced
 \
  7    # 2 - 0 & 1 , balanced
   \
    8  # 1 - both branches 0 , balanced

# switch 3 & 2
  7
   \
    5
     \
      8

# move node 2 to left branch of node 3
  7
 /
5
 \
  8

# move node 1 to right branch of node 3
  7
 / \
5   8
```

```js
class Tree {
  constructor() {
    this.root = null;
  }
  add(value) {
    if (!this.root) {
      this.root = new Node(value);
    }
    else {
      this.root.add(value);
    }
  }
  toObject() {
    return this.root;
  }
}

class Node {
  constructor(value, left=null, right=null) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.height = 1;
  }
  add(value) {
    if(value < this.value) {
      // go left
      if (this.left) {
        this.left.add(value);
      }
      else {
        this.left = new Node(value);
      }
      if (!this.right || this.right.height < this.left.height) {
        this.height = this.left.height + 1;
      }
    }
    else {
      if (this.right) {
        this.right.add(value);
      }
      else {
        this.right = new Node(value);
      }
      if(!this.left || this.right.height > this.left.height) {
        this.height = this.right.height + 1;
      }
    }
    this.balance();
  }
  balance() {
    const rightHeight = (this.right) ? this.right.height : 0;
    const leftHeight = (this.left) ? this.left.height : 0;
    
    if(leftHeight > rightHeight + 1) {
      const leftRightHeight = (this.left.right) ? this.left.right.height : 0;
      const leftLeftHeight = (this.left.left) ? this.left.left.height : 0;
      
      if (leftRightHeight > leftLeftHeight) {
        this.left.rotateRR();
      }
      this.rotateLL();
    }
    else if (rightHeight > leftHeight + 1) {
      const rightRightHeight = (this.right.right) ? this.right.right.height : 0;
      const rightLeftHeight = (this.right.left) ? this.right.left.height : 0;
      
      if (rightLeftHeight > rightRightHeight) {
        this.right.rotateLL();
      }
      this.rotateRR();
  }
}
  rotateRR() {
    const valueBefore = this.value;
    const leftBefore = this.left;
    this.value = this.right.value;
    this.left = this.right;
    this.right = this.right.right;
    this.left.right = this.left.left;
    this.left.left = leftBefore;
    this.left.value = valueBefore;
    this.left.updateInNewLocation();
    this.updateInNewLocation();
  }
  
  rotateLL() {
    const valueBefore = this.value;
    const rightBefore = this.right;
    this.value = this.left.value;
    this.right = this.left;
    this.left = this.left.left;
    this.right.left = this.right.right;
    this.right.right = rightBefore;
    this.right.value = valueBefore;
    this.right.updateInNewLocation();
    this.updateInNewLocation();
  }

  updateInNewLocation() {
    if (!this.right && !this.left) {
      this.height = 1;
    }
    else if (!this.right || (this.left && this.right.height) < this.left.height) {
      this.height = this.left.height + 1;
    }
    else {
      this.height = this.right.height + 1;
    }
  }
  serialize() {
    const ans = {value: this.valule};
    ans.left = this.left === null ? null : this.left.serialize();
    ans.right = this.right === null ? null : this.right.serialize();
    ans.height = this.height;
    return ans;
  }
```

# Hash Table

A key value store where the key is used to find its value location in memory.
Very good for fast lookup of items.
Avoids the need to traverse the whole array for each lookup by assigning a unique hash table value to each item.

- requires a lot of memory
- multiple inputs should not have the same output
- should be idempotent , input should always give the same output (does not vary)
- don't use for cryptography , this will be slow

Best to use when optimizing a look up.

**Method**

Function
Takes a key and assigns it a hash value.

Hash Value
A numerical value between 0 and the length of the table.

Table
An ordered list comprised of hash values and their content.

Content
Can be a key value pair or an array of key value pairs.

Size
When hash table is half full then you double its size and rehash the values.

*Collision*

When two or more items hash to the same hash value.
Negatively affects lookup run time.

```js
class HashTableSet {
  constructor() {
    this.table = new Array(255);
  }
  add(input) {
    this.table[this.hash(input,255)] = input;
  }
  check(input) {
    return !!this.table[this.hash(input,255)];
  }
  hash(input,max) {
    let num = 0;
    for (let i = 0;i < input.length; i++) {
      num += input.charCodeAt(i) * i;
    }
    return num % max; // keeps number between 0 and length of table
  }
}
```

**Hash Table Code**

```js
class hashTable {
  constructor(val) {
    this._storage = [];
    this._tableSize = val; // val is beginning table size , chosen based on expected needs
    this._inputSize = 0;   // need to add a resize function that doubles the tablesize when half full
  }
  
  insert(key,value) {
    const index = this._hash(key, this._tableSize);
    // handles collisions
    if (!this._storage[index]) {
      this._storage[index] = []; // stores value
    }
    this._storage[index].push([key,value]);
  }
  
  remove() {
    
  }
  
  retrieve(key) {
    const index = this._hash(key, this._tableSize);
    const arrayAtIndex = this._storage[index];
    
    if (arrayAtIndex) {
      for (let i = 0; i < this._storage[index].length; i++;) {
        const keyValueArray = arrayAtIndex[i]
        if (keyValueArray[0] === key) {
          return keyValueArray[1];
        }
      }
    }
  }
  
  // hashing function
  // hashes string value into an integer to be mapped to an array index
  _hash(str,n) {     // str is string to be hashed , n is size of storage array
    let sum = 0;
    for (let i = 0; i < str.length; i++)
      sum += str.charCodeAt(i) * 3
    return sum % n;  // integer between 0 and n
  }
}

const myHT = new hashTable(25); // 25 is initial size of table

myHT.insert('a',1);
myHT.insert('b',2);
console.log(myHT);
```

# Bloom Filters

Fast and memory efficient.

Returns no or maybe.
- tells you that an item is definitely not in a set
- can't tell you if an item is definitely in a set
- can add items
- cannot delete items

Has false positives.
Does not have false negatives.

Adding more items increases false positive rate.
Making a larger array mitigates this , the trade off is needing more memory.

**Bloom Filter Code**
```js

// hash function
// use xxhash.js library for the premade hash function

const h1 = string => Math.abs(XXH.h32(0xABCD).update(string).digest().toNumber() % 100);
const h2 = string => Math.abs(XXH.h32(0x1234).update(string).digest().toNumber() % 100);

console.log(h1('cutie'));  // returns hash key

class bloomFilter {
  _array = new Array(100).fill(0) // makes a new array with 100 zeroes
  add (string) {
    this._array[h1(string)] = 1;
    this._array[h2(string)] = 1;
  }
  contains (string) {
    return !!(this._array[h1(string)] && this._array[h2(string)]) 
  }
};
```
# Tree

```js
class Tree {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
  insertChild(value) {
    const newTree = new Tree(value);
    this.children.push(newTree);
    return newTree;
  }
  removeChild(value) {
    
  }
}

const myTree1 = new Tree(1);
const myTree2 = myTree1.insertChild(2);
console.log(myTree1);
console.log(myTree2);
```

One Level
```js
// tree content
let mom = {name: 'ashleigh'};
const son = {name: 'sam'};
const daugher = {name: 'alex'};

mom = {
  name: 'ashleigh',
  children: [son,daugher],
};

// tree structure
function traverse(tree) {
  console.log(tree.name);
  if (tree.children) {
    tree.children.forEach((val) => {
      console.log(val.name);
    })
  }
}
```

Two Levels
```js
// tree content
const family = {
  name: 'ashleigh',
  children: [{
    name: 'sam',
    children: [{
      name: 'bowser',
      children: [{
        name: 'pickles'
      }],
    }],
  }, {name: 'alex'}]
};

// tree structure
function traverse(tree) {
  console.log(tree.name);
  if (tree.children) {
    tree.children.forEach((child) => {
      traverse(child);
    });
  }
}

traverse(family);
```

# Tree Traversal

Methods for flattening a tree data structure.

```
     8
   /   \
  3    10
 / \     \
1   6    14
   / \   /
  4   7 13
```

**Depth First Traversal**

Process leaf nodes first recursively.

*Pre Order Traversal*

- begin at root node
- add node value to array
- go down left branch (small values)
- add node value to array
- continue until leaf node
- go to adjacent branch node
- go down left branch
- add node value to array
- continue for whole tree

The resulting array [8,3,1,6,4,7,10,14,13].

*In Order Traversal*

- begin at root node
- go down left branch
- stop at node
- go down left branch
- continue until no more branches
- add branchless node
- go back up tree to previous node
- add that node
- go down right branch
- go down left branch
- continue until branchless node
- add that node
- continue pattern for whole tree

The resulting array [1,3,4,6,7,10,13,14].

*Post Order Traversal*

- begin at root node
- go down left branch
- add first leaf node
- go back up node
- add that node
- go down right branch
- go down left branch
- continue until leaf node
- add leaf node
- continue pattern for full tree

The resulting array [1,4,7,6,3,13,14,10,8].

Uses
Pre Order - for a deep copy of a list
In Order - for a sorted list
Post Order - for deleting a tree

**Depth First Traversal Code**

Pre Order
```js
const preOrder = (node,array) => {
  if (!node) return array;
  array.push(node.value);
  array = preOrder(node.left,array);
  array = preOrder(node.right,array);
  return array;
};
```

In Order
```js
const inOrder = (node,array) => {
  if (!node) return array;
  array = inOrder(node.left,array);
  array.push(node.value);
  array = inOrder(node.right,array);
  return array;
};
```

Post Order
```js
const postOrder = (node,array) => {
  if (!node) return array;
  array = postOrder(node.left,array);
  array = postOrder(node.right,array);
  array.push(node.value);
  return array;
};
```

Another Depth First Traversal
```js
class Graph {
  constructor() {
    this.adjList = {};
  }
  addNode(node) {
    this.adjList
  }
}

```


**Breadth First Traversal**

Process nodes adjacent to root node first one layer at a time.
Uses a queue.

- enqueue root node
- enqueue both branches
- dequeue one side
- enqueue other side 

```
     8
   /   \
  3    10
 / \     \
1   6    14
   / \   /
  4   7 13
```

```
[8]         []
8[3,10]     [8]
3[10,1]     [8,3]
10[1,6]     [8,3,10]
1[6,14]     [8,3,10,1]
6[14,4]     [8,3,10,1,6]
14[4,7]     [8,3,10,1,6,14]
4[7,13]     [8,3,10,1,6,14,4]
7[13]       [8,3,10,1,6,14,4,7]
13[]        [8,3,10,1,6,14,4,7,13]
```

**Breadth First Code**

Iterative
```js
const breadthFirst = (queue,array) => 
{
  if (!queue || !queue.length) return array;
  while (queue.length) {
    const node = queue.shift(); // removes from front of array
    array.push(node.value);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return array;
}
```

Recursive
```js
const breadthFirst = (queue,array) => {
  if (!queue.length) return array;
  const node = queue.shift()
  array.push(node.value)
  if (node.left) queue.push(node.left);
  if (node.right) queue.push(node.right);
  return breadthFirst(queue,array);
}
```

# Pathfinding

Find shortest path from point A to point B.
```
. . . . .
. A . . .
. . . . .
. . . . .
. . . B .
```

easy when no obstacles
```
. . . . .
. A . . .
. 1 . . .
. 2 . . .
. 3 4 B .
```

obstacles
```
. . . . .
. A . . .
. . . . .
. x x x x
. . . B .
```

*Dijkstra Algorithm*

Begin at each node in all directions.
```
. 1 . . .
1 A 1 . .
. 1 . . .
. x x x x
. . 1 B 1
```

Continue until hitting an obstacle.
```
2 1 2 . .
1 A 1 2 .
2 1 2 . .
. x x x x
. 2 1 B 1
```

Continue adding paths.
```
2 1 2 3 .
1 A 1 2 3
2 1 2 3 .
3 x x x x
3 2 1 B 1
```

On the next iteration the adjacent 3s intersect and determine the shortest path.
```
2 1 2 3 .
1 A 1 2 3
2 1 2 3 .
3 x x x x
3 2 1 B 1
```

Breadth First traversal solves for the shortest path.

```js
const no_one = 0;
const by_a = 1;
const by_b = 2;

const shortestLength = (maze,[xA,yA],[xB,yB]) => {
  const visited = maze.map((row,y) => {
    return row.map((point,x) => {
      return {
        closed: point ===1,
        length: 0,
        openedBy: no_one,
        x,
        y
      }
    })
  })
  visited[yA][xA].openedBy = by_a;
  visited[yB][xB].openedBy = by_b;
  
  let aQueue = visited[yA][xA];
  let bQueue = visited[yB][xB];
  let iteration = 0;
  
  while (aQueue.length && bQueue.length) {
    iteration++;
    const aNeibors = aQueue.reduce((acc,neighbor) => {
      return acc.concat(getNeighbors(visited,neighbor.x,neighbor.y))
    }, [])
    for (let i = 0; i < aneighbors.length; i++) {
      const neighbor = aneighbors[i];
      if (neighbor.openedby)
    }
  }
}
```

# Graphs

Graphs model relation between items.
Social graphs model relations between people.

Node - entity , such as a person or a row in SQL (nodes also called vertices)
Edge - represents connection between two items
Bidirectional - relation goes both ways , fb friends are each other's friend
Unidirectional - relation goes one way , twitter you can follow someone without them following you
Weighted - some nodes are more important than others
Unweighted - all nodes have equal importance
Cyclic - a node can traverse back to itself
Acyclic - nodes do not connect back to themselves

*Network Degrees Of Separation*
1st degree - direct connections to one node
2nd degree - direct connections to one node & their 1st degree connections

```
   1      2
  suki - neko
 /    \  2
me    pusheen
 \    /
  caty
   1
```

**Graph With Breadth First Code**

Function that finds the most frequent 'title' in a social network for a given degree of separation.

```js
// myID is user at root node
// getUser is function that returns user's object by given ID
// degreesOfSepartion number of degrees to search in the graph

// data is a dictionary of 1000 users showing their id , name , title , list of connection's ids

const findMostCommonTitle = (myId,getUser,degreesOfSeparation) => {
  let queue = [myId];
  const seen = new Set();           // for storing ids and avoiding  processing them twice
  const jobs = {};                  // stores array of titles and their counts (number of times seen)
  
  for (let i = 0; i <= degreesOfSeparation; i++;) {
    queue = queue
    .filter((id) => !seen.has(id))  // returns what has not been seen before
    .map(getUser)                   // from list of ids get array of objects
    // even though side effects , .map(user) returns an array , for each does not
    .map(user => {                  // if user exists add 1 , if not exists then it is 1
      jobs[user.title] = jobs[user.title] ? jobs[user.title] + 1 : 1;
      seen.add(user.id)             // store id in seen set
      return user;
    })
    .map((user) => user.connections) // makes an array of arrays
    .reduce((acc,users) => acc.concat(users),[])  // flattens arrays into 1 array 
  }
  return Object.keys(jobs)           // {'dev':50,'designer':20 . . .}
  .map((job) => [job,jobs[job]])     // tuple (array of 2) ['dev',50]
  .sort((a,b) => {                   // sort by counts
    if (a[1] > b[1]) return -1;      // a[0] is dev , a[1] is 50
    if (a[1] < b[1]) return 1;
    return 0;                        // if a[1] === b[1] return 0
  })[0][0];                          // returns dev since [0] is ['dev',50] and [0][0] is 'dev'
}
```

**Adjacency Matrix**

Graph
```
1 - 2
|  /|\
| / | 3
|/  |/
5 - 4
```

Matrix
```
  1 2 3 4 5
1 0 1 0 0 1
2 1 0 1 1 1
3 0 1 0 1 0
4 0 1 1 0 1
5 1 1 0 1 0
```
1-5 are the vertices.
0,1 are the edges.
0 indicates no linear relation.
1 indicates a linear relation.

Array Within Array
```
[[0,1,0,0,1],
[1,0,1,1,1],
[0,1,0,1,0],
[0,1,1,0,1],
[1,1,0,1,0]];
```

Pseudo Code
```js
function addEdge(v1,v2) {
  adjMatrix[v1][v2] = 1;
  adjMatrix[v2][v1] = 1;
}
addEdge(v1,v2);

function removeEdge(v1,v2) {
  adjMatrix[v1][v2] = 0;
  adjMatrix[v2][v1] = 0;
}
removeEdge(v1,v2);
```

Additions are O(n).
Deletions are O(1).

**Adjacency List**

A list of vertices pointing to adjacent vertices.

Graph
```
1 - 2
|  /|\
| / | 3
|/  |/
5 - 4
```

List
```
1 -> 2 -> 5 -
2 -> 1 -> 5 -> 3 -> 4
3 -> 2 -> 4 -
4 -> 2 -> 5 -> 3
5 -> 4 -> 1 -> 2
```

Arrays
```
1:[2,5],
2:[1,5,3,4],
3:[2,4],
4:[2,5,3],
5:[4,1,2]
```

Pseudo Code
```js
function addEdge(v1,v2) {
  adjList[v1].push(v2);
  adjList[v2].push(v1);
}
addEdge(v1,v2);

function removeEdge(v1,v2) {
  const v2Index = adjList[v1].indexOf(v2);
  const v1Index = adjList[v2].indexOf(v1);
  adjList[v1].splice(v2Index, 1);
  adjList[v2].splice(v1Index, 1);
}
removeEdge(v1,v2);
```

Additions are O(1).
Deletions are O(n).

Actual Code
```js
// data
const adjList = {
  1: [2,5],
  2: [1,5,3,4],
  3: [2,4],
  4: [2,5,3],
  5: [4,1,2]
}

// graph
class Graph {
  constructor() {
    //this.nodes = [];
    this.adjList = {};
  }
  addNode(node) {
    this.adjList [node.value] = {
      node: node,
      edges: []
    }
  }
  addEdge(node1,node2) {
    this.adjList[node1.value].edges.push(node2);
    this.adjList[node2.value].edges.push(node1);
  }
  removeNode(node) {
    delete this.adjList[node.value];
    const nodes = Object.keys(this.adjList);
    nodes.forEach(currNode => {
      const edges = this.adjList[currNode].edges;
      const index = edges.indexOf(node);
      if (index > -1) {
        edges.splice(index,1);
      }
    });
  }
}

const adjList = new Graph();
const node1 = {value: 1};
const node2 = {value: 2};

adjList.addNode(node1);
adjList.addNode(node2);
adjList.addEdge(node1,node2);

console.log({});
```

# Graph Traversal

**Depth First**

Uses a stack.

General Logic
- add unvisited vertex to stack
- mark vertex as visited
- if vertex has branches , visit them and mark them
- if vertex has no branches , pop it from stack
- repeat pattern until stack is empty


*Depth First Code*

This is an iterative approach.
```js
class Graph {
  constructor() {
    this.adjList = {};
  }
  addNode(node) {
    this.adjList[node] = [];
  }
  depthFirstTraversal(startingNode,func = console.log)
  const nodeStack = [];
  const visited = {};

  nodeStack.push(staringNode);
  visited[startingNode] = true;

  while (nodeStack.length) {
    const currrent = nodeStack.pop();
    const neighbors = this.adjList[current];
    func(current);
    
    neighbors.forEach(neighbor => {
      if (!visited[neighbor]) {
        nodeStack.push(neighbor);
        visited[neighbor] = true;
      }
    });
  }
}
```

**Breadth First**

Uses a queue.

General Logic
- set a start node to visit
- add current node to queue
- dequeue to process
- add subnodes to queue
- dequeue next node
- add subnodes to queue
- continue pattern

*Pseudo Code*

```js
const breadthFirst = graph => {
  set start vertex
  enqueue
  while queue not empty
    for each edge incident to vertex
      if its not visited
        enqueue
        mark vertex
}
```

*Breadth First Code*

This is an iterative approach.
```js
const BFS = graph => {
  
}

. . .

breadthFirstTraversal(startingNode, func = console.log)
  const queue = [];
  const visited = {};
  
  queue.push(startingNode));
  visited[staringNode] = true;

  while (queue.length) {
    const current = queue.shift();
    const neighbors = this.adjList[current];
    funct(current);
    
    neighbors.forEach(neighbor => {
      if (!visited[neighbor]) {
        queue.push(neighbor);
        visited[neighbor] = true;
      }
    });
  }
}
```

# Tries

Tree optimized for searching by prefix.

Used for text auto complete.

**Method**

Uses a depth first approach.
- root node is empty
- each sub node is one letter , that letter is the first letter of a valid word
- the second letter of each word can have branches to other nodes prepresenting the first le completing different words
- pattern continues for all words in list

Weight can be assigned to words for priority.

*Tree For Auto Complete*
```
          e      
         /
c - a - n
     \
      t
```

**Trie Code**

Data is a list of names.

```js
class Node {
  children = [];
  value = "";       // current value set to empty string
  terminus = false;
  
  constructor(string) {  // breaks tree down into smaller trees
    this.value = string[0] || "";
    if (string.length > 1) {
      this.children.push(new Node(string.substr(1)));
    } else {
      this.terminus = true;  // stops tree deconstruction
    }
  }
  add(string) {
    const value = string[0];
    const next = string.substr(1);
    for (let i = 0; i < this.children.length; i++;) {
      const child = this.children[i];
      if (child.value === value) {  // checks for word within word
        if (next) {
          child.add(next);
        } else {
          child.terminus = true;
        }
        return;
      }
    }
    this.children.push(new node(string));
  }
  _complete(search,built,suggestions) {
    if (suggestions.length >= 3 || (search && search[0] !== this.value)) {
      return suggestions;                        // returns at most 3 suggestions
    }
    if (this.terminus) {
      suggestions.push(`${built}${this.value}`); // adds complete word to suggestions
    }
    this.children.forEach(child =>
      child._complete(search.subtr(1), `${built}${this.value}`, suggestions)  // adds another word to previous suggestions
    );
    return suggestions;                          // returns all suggestions     
  }
  complete(string) {
    return this.children
      .map(child => child.complete(string,"",[])) // empty string to begin search , array holds list of autocomplete suggestions
      .reduce((acc,item) => acc.concat(item));    // flattens array
  }
}

const createTrie = words => {
  const root = new Node("");
  words.forEach(word => root.add(word.toLowerCase()));
  return root;
};
```

# Chat Bot

Binary tree for a chat bot.

**Diagram**

Binary questions Y,N

```
     Cook?
      / \
     Y   N
         |
        Milk?
       /    \
      Y      N
      |      |
   Cereal? recommend
    / \    go out
   Y   N
   |
recommend
have
cereal
```

Basic Tree Representation
```
   a
b     c
         d
```

Translated Basic Array Representation
```
{
  a: [{b},{c:d}]
}
```

Basic Recursive Value Check
```js
contains(value) {
  if(this.value === value) {
    return true;
  }
  return (false) || (true);
}
```

**Pseudo Code**
```js
const chatBot = {
  question: 'do you cook?',
  yes: {
    
  },
  no: {
    question: 'do you have milk?',
    yes: {
      
    },
    no: {
      
    }
  }
}
```

**Actual Code**

```js
class Tree {
  constructor(question,recommendation) {
    this.question = question;
    this.yes = null;
    this.no = null;
    this.recommendation = recommendation;
  }
  insertChild(question,side) {
    const newQuestion = new Tree(question,recommendation);
    this.[side] = newQuestion;
    return newQuestion;
  }
  removeChild(value) {
    
  }
}

const myTree1 = new Tree(1);
const myTree2 = myTree1.insertChild(2);
console.log(myTree1);
console.log(myTree2);
```

Traverse Binary Tree For Chat Bot
```js
class BinaryTree {
  constructor(question) {
    this.question = question;
    this.yes = null;
    this.no = null;
  }
  
  traverse(func) {
    func(this.question);
    if(this.yes) this.yes.traverse(func)
    if(this.no) this.no.traverse(func)
  }
  
  function countReccomendations(node) {
    if (node === null) return 0;
    if (!node.yes && !node.no) {
      return 1;
    }
    return (countReccomendations(node.yes)) + (countReccomendations(node.no));
  }
  
  contains(question) {    // recursively checks each branch
    if(this.question === question) {
      return true;
    }
    return (this.yes && this.yes.contains(question)? true : false) || (this.no && this.no.contains(question)? true : false);
  }
}

myTree.traverse(console.log);
```