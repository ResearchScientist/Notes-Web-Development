JavaScript is single threaded.

**Execution Context**

Thread Of Execution
- Runs code line by line.

Data Storage
- Saves data (strings,arrays) in memory.

**Function**

Each function goes through its own execution context.
- Parameter - variable awaiting input
- Argument - input passed into the function
- Result - local variable that holds output of function
- Return  - finds the block of memory bound to the variable result and ships that value to the global context

**Call Stack**

Since JavaScript only runs one line of code at at a time it needs to keep track of what function it is currently running.
- begin to run a function - adds to call stack
- finish running a function - remove from call stack
- currently running function - top of call stack
- global function - always at bottom of stack
- nested functions - pushed on top of main function

# Higher Order Functions

Functions are objects.
Can be
- assigned to variables
- passed as arguments into functions
- returned as values from functions

basic function 1 multiplies
```js
function multiplyArrayBy2(array) {
  const output = [];
  for (let i = 0; i < array.length; i++) {
    output.push(array[i] * 2);
  }
  return output;
}

const myArray = [1,2,3];
const result = multiplyArrayBy2(myArray);
console.log(result);
```

basic function 2 divides
```js
function divideArrayBy2(array) {
  const output = [];
  for (let i = 0; i < array.length; i++) {
    output.push(array[i] / 2);
  }
  return output;
}

const myArray = [1,2,3];
const result = divideArrayBy2(myArray);
console.log(result);
```

higher order function makes use of function 1 & 2
function 1 & 2 are now call back functions
```js
function useArrayAndCompute(array,instructions) {  // higher order function
  const output = [];
  for (let i = 0; i < array.length; i++) {
    output.push(instructions(array[i]));
  }
  return output;
}

function multiplyBy2(input) {  // call back function
  return input * 2;
}

function divideBy2(input) {    // call back function
  return input / 2;
}

const result1 = useArrayAndCompute([1,2,3],multiplyBy2);
const result2 = useArrayAndCompute([1,2,3],divideBy2);

console.log(result1);
console.log(result2);
```

*Map Function*
Takes some data applies a function that transforms that data and returns it as a new group of data.
The above higher order function is an example of a map function.

# Arrow Functions

basic function
```js
function multiply2(input) {
  return input * 2;
}

const output = multiply2(2);
console.log(output);  // 4
```

arrow function verbose
```js
const multiply2 = (input) => {return input*2;}

const output = multiply2(2);
console.log(output);  // 4
```

arrow function simplified
```js
const multiply2 = input => input*2;

const output = multiply2(2);
console.log(output);  // 4
```

higher order function with call back functions declared as arrow functions
```js
function useArrayAndCompute(array,instructions) {  // higher order function
  const output = [];
  for (let i = 0; i < array.length; i++) {
    output.push(instructions(array[i]));
  }
  return output;
}

const multiplyBy2 = input => return input * 2;     // call back function
const divideBy2 = input => return input / 2;       // call back function

const result1 = useArrayAndCompute([1,2,3],multiplyBy2);
const result2 = useArrayAndCompute([1,2,3],divideBy2);

console.log(result1);
console.log(result2);
```

higher order function with call back functions as arrow functions within variable declaration
```js
function useArrayAndCompute(array,instructions) {  // higher order function
  const output = [];
  for (let i = 0; i < array.length; i++) {
    output.push(instructions(array[i]));
  }
  return output;
}

const result1 = useArrayAndCompute([1,2,3], input => return input * 2);
const result2 = useArrayAndCompute([1,2,3], input => return input / 2);

console.log(result1);
console.log(result2);
```
