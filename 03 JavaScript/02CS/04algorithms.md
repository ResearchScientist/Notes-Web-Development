# Space & Time Complexity

Space - how much memory is used.
Time - how many primitive operations are executed

**Notation**

|name|# of operations|algorithm|
|--|--|--|
|O(n^2) quadratic|n^2|compare all numbers|
|O(n) linear|2n|find min , find max|
|O(1) constant|2|find first & last in sorted list|

**Speed**

|fast||||slow|
|--|--|--|--|--|
|O(1)|O(log n)|O(n)|O(n^2)|O(k^n)|
|constant|logarithmic|linear|quadratic|exponential|

**Operations**

n is the number of operations performed

Comparing each item to each other item is n^2 , n nested loops.
Comparing min & max is 2n , n loops.
For a sorted list the min is the first item and max is the last item , 2 operations.

**Constant**

Native methods such as math, lookups, inequalities perform only one operation so are constant.
`.pop()`
`someArray[0]`

**Logarithmic**

Each loop reduces the number of elements to be operated on.

**Linear**

Loop through all values of an array.

**Quadratic**

Double nested loops.

**Triadic**

Triple nested loops.

`shift,unshift` linear

# Cache Optimization

Cache means saving something to an object.

**Breadcrumbs Method**

Keep track of previous values in a variable called breadcrumbs.

```js
const uniqSort = function(arr) {
  const breadcrumbs = {};
  const result = [];
  
  for (let i = 0; i < arr.length; i++) {
    if (!breadcrumbs[arr[i]]) {
      result.push(arr[i]);
      breadcrumbs[arr[i]] = true;
    }
  }
  return result.sort((a,b) => a - b);
}

uniqSort([4,2,2,,3,2,2,])
// returns 2,3,4
```

**Memoization**

Cache the value that a function returns.

Good
```js
const times10 = (n) => (n * 10);
const cache = {};

const memoTimes10 = (n) => {
  if (n in cache) {
    console.log('fetching from cache', n);
    return cache[n];
  }
  else {
    console.log('getting result');
    let result = times10(n);
    cache[n] = result;
    return result;
  }
};

console.log(memoTimes10(9));
```

Better
```js
const times10 = (n) => (n * 10);

const memoizedClosureTimes10 = () => {
  let cache = {};  // this cache is private to this function
  return (n) => {
    if (n in cache) {
      console.log('getting from cache',n);
      return cache[n];
    }
    else {
      console.log('getting result');
      let result = n * 10;
      cache[n] = result;
      return result
    }
  };
};

const memoClosureTimes10 = memoizedClosureTimes10(); // saves value from called function
try {
  console.log('calculated value' , memoClosureTimes10(9));
  console.log('cached value' , memoClosureTimes10(9));
} catch(e) {
  console.error(e);
}
```

Best
```js
const times10 = (n) => (n * 10);

const memoize = (cb) => {  // cb call back takes any function
  let cache = {};
  return (n) => {
    if (n in cache) {
      return cache[n];
    }
    else {
      console.log('calculating result');
      let result = cb(n);
      cache[n] = result;
      return result;
    }
  };
};

const memoizedTimes10 = memoize(times10); 
console.log('calculated value' , memoizedTimes10(9));
console.log('cached value' , memoizedTimes10(9));
```

# Recursion

When a function calls itself.

**Call Stack**

*Stack Overflow*
Function calls itself repeatedly until memory runs out.
```js
var callMe = function() {
  callMe();          // calls itself
  callMe();          // does not run
  callMe('anytime'); // does not run
};

callMe();            // calls function
```

```js
// 1st iteration
var tracker = 0;
var callMe = function(arg) { // arg is undefined at 1st iteration
  tracker++
  if (tracker === 3) {       // tracker is 1 so skips
    tracker = 0;
    return 'loops! ${arg}';
  }
  return callMe('anytime');  // returns anytime function value
};

callMe();                    // calls function

// 2nd iteration
var tracker = 0;
var callMe = function(arg) { // arg is now anytime
  tracker++
  if (tracker === 3) {       // tracker is 2 so skips
    tracker = 0;
    return 'loops! ${arg}';
  }
  return callMe('anytime');  // returns anytime function value
};

callMe();                    // calls function

// 3rd iteration
var tracker = 0;
var callMe = function(arg) { // arg is now anytime
  tracker++
  if (tracker === 3) {       // tracker is 3 so runs
    tracker = 0;             // resets 3 to 0
    return 'loops! ${arg}';  // returns string loops! anytime and exits
  }
  return callMe('anytime');  // skips so function not called again
};

callMe();                    // calls function

// loops! anytime
```

**Loop**

How to write a recursive loop.

- Identify the base cases (when the loop should stop)
- Identify recursive cases (what work each loop performs)
- Return as needed
- Make sure each iteration brings you closer to the base case
  
*Loop Recursive*

```js
const loopNtimes = (n) => {
  console.log('n ===', n);
  if (n <= 1) {             // only runs when n = 1 or less
    return 'complete';      // returns complete
  }
  return loopNtimes(n-1);   // while n is 3,2 it decreases n by one and calls itself
};

loopNtimes(3); // calls function with n=3
```

*Loop Factorial*

Factorial takes number (n) and multiplies by its next number (n+1).
`n * (n+1)`

Iteratively
```js
function doFactorial(num) {
  var result = 1;
  
  for(var i = 2; i <= num; i++) {
    console.log(`result = ${result} * ${i} (${result * i})`);
    result *= i;
  }
  return result;
}

doFactorial(5); // 120
```

Recursively
```js
function doFactorial(num) {
  if(num === 1) {
    console.log('reached base case');
    return 1;
  } else {
  console.log(`returning ${num} * doFactorial(${num - 1})`);
  return num * doFactorial(num -1);
  } 
} 

doFactorial(5); //120
```

**Wrapper Function**

With Closure
```js
function wrapperFNloop(start,end) {
  function recurse(i) {
    console.log(`looping from ${start} to ${end}`);
    if(i < end) {
      recurse(i + 1);
    }
  }
  recurse(start);
}

memoizeFNloop(1,3);
```

Without Closure
```js
function memoizeFNloop(i,end) {
  console.log(`looping from ${i} to ${end}`);
  if(i < end) {
    memoizeFNloop(i + 1,end);
  }
}

memoizeFNloop(1,3);
```

**Accumulator**

Method by which an array is concatenated through each iteration.

Recursively
```js
function joinElements(array,joinString) { // joinString is a native JS function
  function recurse(index,resultSoFar) {
    resultSoFar += array[index];
    
    if(index === array.length - 1) {
      return resultSoFar;
    } else {
      return recurse(index + 1, resultSoFar + joinString);
    }
  }
  return recurse(0,'');
}

joinElements(['s','cr','tcod',' :) :)'],'e');
```

Iteratively
```js
function joinElements(array,joinString) {
  let resultSoFar = '';
  
  for(let i = 0; i < array.length - 1; i++) {
    resultSoFar += array[i] + joinString;
  }
  return resultSoFar + array[array.length - 1];
}

joinElements(['s','cr','tcod',' :) :)'],'e');
```

**Recursive Factorial & Memoize**

```js
const memoize = (fn) => {
  let cache = {};
  return (...args) => {
    let n = args[0];
    if (n in cache) {
      console.log('fetching from cache', n);
      return cache[n];
    }
    else {
      console.log('calculating result', n);
      let result = fn(n);
      cache[n] = result;
      return result;
    }
  }
}

const factorial = memoize (
  (x) => {
    if (x === 0) {
      return 1;
    }
    else {
      return x * factorial(x -1);
    }
  }
);

console.log(factorial(5)); // calculated for 5
console.log(factorial(5)); // cached for 5
```

# Divide & Conquer

Minimizes the data set upon each iteration.
Accomplished by making recursive calls on each resulting subset.

- determine base case
- divide data set at each function call
- perform operation on resulted subset
- combine solutions

For a sorted list use a binary search.
Divide a sorted list in half and operate on one half only.
If item not found, divide into 2 again.
Repeat until item is found.

**Linear Search**
```js
function linearSearch(list,item) {
  let index = -1;
  list.forEach((listItem,i) => {
    if (listItem === item) {
      index = i;
    }
  });
  return index;
}

linearSearch([2,6,90,100],90);
```

**Binary Search**
```js
function binarySearch(list,item) {
  var min = 0;
  var max = list.length -1;
  var guess;
  
  while (min <= max) {
    guess = Math.floor((min + max)/2); // begins in the middle
    
    if (list[guegss] === item) {
      return guess;
    }
    else {
      if (list[guess] < item) {
        min = guess + 1;
      }
      else {
        max = guess - 1;
      }
    }
  }
  return -1;
}

binarySearch([2,6,90,100],90)
```

**Sorting Types**

*Naive Sorts*

Loop and compare values until list is sorted.

- bubble sort
- insertion sort
- selection sort

*Divide & Conquer Sorts*

Recursively divide list sorting subsets until entire list is sorted.

- merge sort
- quick sort

**Merge Sort**

Divides unsorted list into 2 lists.
Keeps dividing lists until each list contains only one item.
Compares 2 adjacent lists (comprised of 1 item) sorts and merges them.
Continues until all lists sorted and merged into one list.


Divide
- divide list into n single elements

Merge
- initialize empty array
- compare 1st index of left array to 1st index of 2nd array
- push lower value to an empty array
- shift array with lower value
- repeat until both arrays are empty

Pseudocode
```
mergeSort(list)
base case: if list.length < 2, return
break the list into halves L & R
Lsorted = mergeSort(L)
Rsorted = mergeSort(R)
return merge(Lsorted,Rsorted)
```

```js
function mergeSort (arr) {
  if (arr.length === 1) { // when all arrays have only one item
    return arr;
  }
  const middle = Math.floor(arr.length/2); // round middle item
  const left = arr.slice(0,middle);
  const right = arr.slice(middle);
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);
  
  return merge(sortedLeft,sortedRight);
}

function merge (left,right) {
  let result = [];
  let indexLeft = 0;
  let indexRight = 0;
  
  while (indexLeft < left.length && indexRight < right.length) {
    if (left[indexLeft] < right[indexRight]) {
      result.push(left[indexLeft])
      indexLeft++
    } else {
      result.push(right[indexRight])
      indexRight++
    }
  }
  return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
}

const list = [2,5,1,3,7,2,3];

console.log(mergeSort(list));
```

**Bubble Sort**

Compares adjacent items and switches them to put in sorted order.
Moves to next adjacent item compares and switches them if needed.
Repeats until whole list is sorted.

```js
function bubbleSort(array) {
  var countOuter = 0;
  var countInner = 0;
  var countSwitch = 0;
  for(var i = 0; i < array.length; i++) {
    countOuter++;
    for(var j = 1; j < array.length; j++) {
      countInner++;
      if(array[j - 1] > array[j]) {
        countSwitch++;
        switch(array,j-1,j);
      }
    }
  }
}
```

# Greedy Algorithms

Algorithm that always takes locally optimal choice.
One cookie now instead of two cookies later.

When choosing a path from point A to point B it looks at each adjacent points and picks the smallest pair at a time.
2 - 3 - 2 - 4 - 2 - 2
distance = 15

Even when a better path exists.
2 - 4 - 4 - 2
distance = 12

**Greedy Method**

```js
const makeChange = (coins,amount) => {
  coins.sort((a,b) => b - a);
  let coinTotal = 0;
  let i = 0;
  while (amount > 0) {
    if (coins[i] <= amount) {
      amount -= coins[i];
      coinTotal++;
    } else {
      i++;
    }
  }
  return coinTotal;
};

makeChange([1,6,10],12);
```

**Brute Force Method**

Calculates every single combination possible.

```js
const makeChange = (value,i) => {
  recursionCounter++;
  console.log(`${recursionCounter}: calling ${value} at ${i}`);
  if (value === 0) return 0;
  let minCoins;
  coins.forEach((coin,i) => {
    if (value - coin >= 0) {
      let currMinCoins = makeChange(value - coin, i);
      if (minCoins === undefined || currMinCoins < minCoins) {
        minCoins = currMinCoins;
      }
    }
  });
  return minCoins + 1;
};

makeChange(12);
```

# Dynamic Algorithms

Uses cached values to avoid repeating calculations.

Approach tends to be recursive (top down) and uses memoization instead of iterative (bottom up).

```js
const cache = {};  // instead of this use a memoize function for better performance
const coins = [10,6,11];

const makeChange = (c) => {
  if (cache[c] return cache[c];
  
  let minCoins = -1;
  
  coins.forEach(coin => {
    if (c - coin >= 0) {
      let currMinCoins = makeChange(c - coin);
      if (minCoins === -1 || currMinCoins < minCoins) {
        minCoins = currMinCoins;
      }
    }
  });
  cache[c] = minCoins + 1;
  return cache[c];
};
```
