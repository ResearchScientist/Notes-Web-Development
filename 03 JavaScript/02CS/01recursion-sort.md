# Measuring Algorithm Performance

**Big O**

Looks at the big picture.

`3x^2 + x + 1` for this algorithm the `3x^2` portion makes a big impact `x + 1` does not.

**Big O Notation**

`O(n^2)` from `x^2` above

**Loops**
`O(1)` defines a function that returns a constant , no loops involved , constant time
`O(n)` defines a function with a FOR loop
`O(n^2` defines a function with nested FOR loops
`O(log n)` defines a recursive function , diminishing time

# Recursive Function

A function that calls itself.

Can consume memory leading to a stack over flow.

Readable code is preferable to performant code. Unless the performance hit is noticeable. In which case iterative functions are preferred over recursive ones.

**Basic Recursion**

```js
let wr = (msg='---') => document.write(`<br>${msg}`);

function basicRecursion(max,current) {
  if (current > max) return;      // base case for stopping function
  wr(current);
  basicRecursion(max,current+1);  // calls itself and adds one to current
}

basicRecursion(5,1);  // calls function
wr();
wr();
// returns 1 2 3 4 5
```
*wr*
```js
// arrow function
let wr = (msg='---') => document.write(`<br>${msg}`);

// long form , does same as arrow function
function wr (msg) {
  if (!msg) {
    msg = '---';
  }
  document.write('<br>' + msg);
}
```

**Fibonacci Sequence**

Although this is an elegant and well written function , it is very perfomance expensive.
As numbers get larger it calls itself that many times.

```js
function fibonacci(n) {
  if(n <= 2) {
    return 1;
  }
  else {
    return fibonacci(n-1) + fibonacci(n-2);
  }
};

for (var i = 1; 1 <= 20; i++) {
  wr(`${i}.${fibonacci(i)}`);
}
```

**Factorial**

`n * (n-1) * (n-2) . . . * 1`
`5!` = `5 * 4 * 3 * 2 * 1`

```js
function factorial(num) {
  if (num < 2) return 1;  // base case
  return num * factorial(num-1);
}
```

# Sort

Algorithms for sorting numbers.

`5 7 6 4`

**Bubble**

Not useful , slowest.

O(n^2)

- Outer loop goes through numbers. (do while)
- Inner loop switches numbers if out of order.

First Iteration
5 7
5 6 7
5 6 4 7

Second Iteration
5 6
5 4 6 7

Third Iteration
4 5
4 5 6 7

Fourth Iteration
4 5 6 7

Stops because nothing was switched.

```js
const bubble = (nums) => {
  do {
    let switched = false;
    for (let i = 0; i < nums.length;  i++) {
      if (nums[i] > nums[i+1]) {
        const temp = nums[i];
        nums[i] = nums[i+1];
        nums[i+1] = temp;
        switched = true;
      }
    }
  } while(switched)
}

describe('bubble', function() {
  it('sorted correctly', () => {
    var nums = [10,5,3,8,2,6,4,9,1];
    bubble(nums);
    expect(nums).toEqual([1,2,3,4,5,6,7,8,9,10]);
    done();
  });
});

// 101 iterations
```

**Insertion**

Best for partially sorted arrays. Inefficient if array is not sorted at all.

O(n^2)

- outer loop goes over all numbers
- inner loop inserts numbers

- takes first item from original array and puts into a new array
- new array is sorted , it only has one item
- takes second item from original array and compares it to the item in the new array
- is item larger than existing item
- is item smaller than existing item
- inserts second item in relation to existing item in new array

4 1 0

First Iteration
4

Second Iteration
1 4

Third Iteration
0 1 4

```js
const insertion = (nums) => {
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] < nums[j]) {
        const spliced = nums.splice(i,1);
        nums.splice(j,0,spliced[0]);
      }
    }
  }
};

describe('insertion', function() {
  it('sorted correctly', () => {
    var nums = [10,5,3,8,2,6,4,9,1];
    bubble(nums);
    expect(nums).toEqual([1,2,3,4,5,6,7,8,9,10]);
    done();
  });
});

// 45 iterations
```

**Merge**

Better than insertion.

O(n log n)

- divide list into 2 lists
- divide each resulting list into 2 lists
- recursively walk up each resulting list simultaneously comparing each item and placing the smaller one into a new sorted list

```js
const merge = (nums) => {
  if (nums.length < 2) {
    return nums;
  }
  
  const length = nums.length;
  const middle = Math.floor(length/2);
  const left = nums.slice(0,middle);
  const right = nums.slice(middle,length);
  const sortedLeft = merge(left);
  const sortedRight = merge(right);
  
  return stitch(sortedLeft,sortedRight);
};

const stitch = (left,right) => {
  const results =[];
  
  while(left.length && right.length) {
    if (left[0] <= right[0]) {
      results.push(left.shift());
    }
    else {
      results.push(right.shift());
    }
  }

  return results.concat(right,left);
};

describe('merge', function() {
  it('sorted correctly', () => {
    var nums = [10,5,3,8,2,6,4,9,1];
    bubble(nums);
    expect(nums).toEqual([1,2,3,4,5,6,7,8,9,10]);
    done();
  });
});

```

**Quick**

Most powerful sorting algorithm.
Do not use on an already sorted list.

O(n log n)

- takes last element (pivot) from an array and makes 2 lists
- one list contains all elements smaller then the pivot
- other list contains all elements larger then the pivot
- repeat on each list
- concatenate lists and pass pivot to middle

5 7 4 9 6

6 is pivot

5 4 & 7 9

quick sort runs on each list

5 4 (pivot is 4)
empty 5

7 9 (pivot is 9)
7 empty

lists are concatenated

empty 4 5

7 empty 9

empty 4 5 6 7 empty 9

4 5 6 7 9

```js
const quick = (nums) => {
  if (nums.length <= 1) return nums;
  
  const pivot = nums[nums.length - 1];
  const left = [];
  const right = [];
  
  for (let i = 0; i < nums.length -1; i++) {
    if (nums[i] < pivot) {
      left.push(nums[i]);
    }
    else {
      right.push(nums[i]);
    }
  }
  return quick(left).concat(pivot,quick(right));
}

describe('quick', function() {
  it('sorted correctly', () => {
    var nums = [10,5,3,8,2,6,4,9,1];
    bubble(nums);
    expect(nums).toEqual([1,2,3,4,5,6,7,8,9,10]);
    done();
  });
});
```

**Heap Sort**

A heap is a flat array sorted in a particular manner to represent a particular tree data structure.

For any index of an array n
its left sub node is stored at 2n + 1
its right sub node is stored at 2n + 2
the root is always at 0

```
     1
   /   \
  5     3
 / \   /
7   9 8
```

|index|0|1|2|3|4|5|
|--|--|--|--|--|--|--|
|node|1|5|3|7|9|8|

Differences between a binary heap and a binary search tree.

|Binary Heap|Binary Search Tree|
|--|--|
|array|node objects|
|top node > sub node|left nodes < right nodes|
|not possible|in order traversal results in a sorted list|
|all nodes are full , from l to r|sub nodes can be empty|

- max heap - finds largest number in the heap
- min heap - finds smallest number in the heap

Heapify (make a max heap)
- compares both sub nodes and switches larger sub node with main node

Heap Sort Method
- heapify the array
- loop through the array
- dequeue the root node , switch it with the last item
- after dequeuing each item , heapify to find next root node
- dequeue root node switch with second to last item
- heapify the array
- continue pattern until no items are left

Heap Sort Code
```js
const heapSort = (array) => {
  array = createMaxHeap(array);
  let heapSize = array.length;
  let temp;
  for (let i = array.length - 1; i > 0; i--;) {
    temp = array[0];
    array[0] = array[i];
    array[i] = temp;
    heapSize--;
    heapify(array,0,heapSize);
  }
  return array;
}

const createMaxHeap = (array) => {
  for (let i = Math.floor(array.length / 2); i >= 0; i--) {
    heapify(array,i,array.length);
  }
  return array;
}

const heapify = (array,index,heapSize) => {
  const left = 2 * index + 1;
  const right = 2 * index + 2;
  
  let largestValueIndex = index;
  
  if (heapSize > left && array[largestValueIndex] < array[left]) {
    largestValueIndex = left;
  }
  
  if (heapSize > right && array[largestValueIndex] < array[right]) {
    largestValueIndex = right;
  }
  
  if (largestValueIndex !== index) {                                 // if main node larger do not switch
    const temp = array[index];
    array[index] = array[largestValueIndex];
    array[largestValueIndex] = temp;
    heapify(array,largestValueIndex,heapSize);
  }
}
```

**Radix Sort**

A non comparison based sorting method.

Sorts numbers based on their position.

[10,1,32,102,33,45,6,18,9] ones place
[1,102,6,9,10,18,32,33,45] tens place
[1,6,9,10,18,32,33,45,102] hundreds place

This example uses sorting based on decimal position.
Usually this is done with binary.

Radix Sort Code
```js
function getDigit(number,place,longestNumber) {
  const string = number.toString();
  const size = string.length;
  const mod = longestNumber - size;  // looks at numbers from end
  return string[place - mod] || 0;
}

function findLongestNumber(array) {
  let longest = 0;
  for (let i = 0; i < array.length; i++;) {
    const currentLength = array[i].toString().length;
    longest = currentLength > longest ? currentLength : longest;
  }
  return longest;
}

function radixSort(array) {
  const longestNumber = findLongestNumber(array);
  const buckets = new Array(10).fill().map(() => []);  // makes an array of 10 arrays
  
  for (let i = longestNumber - 1; i >= 0; i--;) {
    while (array.length) {
      const current = array.shift();
      buckets[getDigit(current,i,longestNumber)].push(current);
    }
    for (let j = 0; j < 10; j++) {
      while (buckets[j].length) {
        array.push(buckets[j].shift()); // dequeue into array
      }
    }
  }
  return array;
}
```
