

# Modular Functions

A function should only perform one task.

- should not modify parameters
- should not modify states

# Higher Order Functions

Functions that take output from modular functions as input.

# Vector Array Programming

Performing operations exclusively on lists.

# Functions

**Map Function**

Takes an array and applies a function to each element in the array.

```js
var array = [1,2,3,4,5];

var transformed = array.map(function(num) {
  return num + 1;
});
console.log(transformed); // [2,3,4,5,6]
```

You can chain multiple functions.
```js
const twoFunctions = array.map(function(one)).map(function(two));
```

**Reduce Function**

Reduces a list of values to one value.

```js
var list = ['a','b','c'];

list.reduce(function(accumulator,letter) {
  return accumulator + letter.toUpperCase();
}, '');  // '' is the seed
// returns 'ABC' as one string
```

Reduce function is the same as this basicReduce function.
```js
const basicReduce = (list,fn,seed) => {
  let answer = seed;
  for (let i = 0;i < list.length; i++) {
    answer = fn(answer,list[i]);
  }
  return answer;
};
```

**Filter Function**

Takes a list of items and applies a function to each item in the list. If it returns true for an item it keeps the item, if false it removes the item.
Returns a new list containing the filtered items.

```js
const filterOutOddNums = nums => nums.filter(num => num % 2 === 0);
```

Similar to myFilter.
```js
const myFilter = (list,fn) => {
  const answer = [];
  for (let i=0; i<list.length; i++) {
    if (fn(list[i])) {
      answer.push(list[i]);
    }
  }
  return answer;
};
```
