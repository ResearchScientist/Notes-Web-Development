# Concepts

- functions are kept small , 1 to few lines
- descriptive names
- app is built upon self contained functions

# Higher Order Functions

A function that either
- takes a function as input
- passes a function as output

Useful for eliminating code duplication.

**Normal Functions**

Normal functions 1 and 2 are mostly duplicates of each other.

normal function 1
```js
const copyArrayAndMultiplyBy2 = (array) => {
  const output = [];
  for (let i = 0; i < array.length; i++) {
    output.push(array[i] * 2);
  }
  return output;
}

const myArray = [1,2,3];
const result = copyArrayAndMultiplyBy2(myArray);
```

normal function 2
```js
const copyArrayAndDivideBy2 = (array) => {
  const output = [];
  for (let i = 0; i < array.length; i++) {
    output.push(array[i] / 2);
  }
  return output;
}

const myArray = [1,2,3];
const result = copyArrayAndDivideBy2(myArray);
```

**Higher Order Function**

Passing the uniqueness of each normal function as a call back function to the general higher order function gives clearer code.

higher order function and call back functions
```js
// High Order Function
const copyArrayAndMathIt = (array,instructions) => {
  const output = [];
  for (let i = 0; i < array.length; i++) {
    output.push(instructions(array[i]));
  }
  return output;
}

// Callback Function
const multiplyBy2 = (input) => {
  return input * 2;
}

// Callback Function
const divideBy2 = (input) => {
  return input / 2;
}

const result = copyArrayAndMathIt([1,2,3],multiplyBy2);
const result = copyArrayAndMathIt([1,2,3],divideBy2);
```

**Arrow Functions**

Simpler syntax can be used when only one argument is being passed into the arrow function.
This makes it easier to read what the function is doing.

callback functions written without `(),{},return`
```js
// Callback Function
const multiplyBy2 = input => input * 2;

// Callback Function
const divideBy2 = input => input / 2;
```

callback functions written as anonymous functions
```js
// Callback Function
input => input * 2;

// Callback Function
nput => input / 2;
```
**Higher Order Function**

higher order function and call back functions as anonymous functions
```js
// High Order Function
const copyArrayAndMathIt = (array,instructions) => {
  const output = [];
  for (let i = 0; i < array.length; i++) {
    output.push(instructions(array[i]));
  }
  return output;
}

// Callback Function
const multiplyBy2 = (input) => {
  return input * 2;
}

// Callback Function
const divideBy2 = (input) => {
  return input / 2;
}

const result = copyArrayAndMathIt([1,2,3],input => input * 2);
const result = copyArrayAndMathIt([1,2,3],input => input / 2);
```

# Map & Reduce

Transforms data.

**Map**

Loops through each item.

The function `copyArrayAndMathIt` is like a `map` function.

**Reduce**

Takes 2 items and combines them into one.

`[1,2,3]  ` some array
`* 2      ` some mapped manipulation
`[]+[2]   ` iteration 1 , pushed
`[2]+[4]  ` iteration 2 , pushed
`[2,4]+[6]` iteration 3 , pushed
`[2,4,6]  ` reduction complete

**Accumulator**

The empty array along with its pushed items is the accumulator.

Can be an array , string , number.

**Reducer**

The action by which the items are combined is the reducer.

Can be any logic , code , function.

# Reduce Function

This shows how a reduce function works.

```js
const reduce = (array,howToCombine, buildingUp) => {
  for (let i = 0; i < array.length; i++) {
    buildingUp = howToCombine(buildingUp,array[i])
  }
  return buildingUp
}

const add = (a,b) => a + b;
const summed = reduce([1,2,3],add,0);
```

# Array Methods

Built in higher order functions that all arrays have.
They iterate through each element in the array and perform their function on each.

- map
- reduce
- push
- filter
- flatMap
- forEach

**Reduce**

`someArray.reduce(someReducer,someAccumulator)`

```js
const add = (a,b) => a + b;
const summed = [1,2,3].reduce(add,0);  // returns 6
```

**Filter**

```js
const array = [1,2,3,4,5];
const greaterThan2 = num => num > 2; // returns true if num > 2

const filteredArray = array.filter(greaterThan2); // returns [3,4,5]
```

# Chaining Higher Order Functions

`someArray.someFunction().someFunction();`

```js
const array = [1,2,3,4,5];
const greaterThan2 = num => num > 2; // returns true if num > 2
const add = (a,b) => a + b;
const sumOfGreaterThan2 = array.filter(greaterThan2).reduce(add,0); // returns 12
```

# Function Composition

Reducing a series of functions and their outputs.

The following block of code is usually wrapped around a function and named compose.

```js
const multiplyBy2 = x => x * 2;
const add3 = x => x + 3;
const divideBy5 = x => x / 5;

const reduce = (array,howToCombine,buildingUp) => {
  for (let i = 0; i < array.length; i++) {
    buildingUp = howToCombine(buildingUp,array[i]);
  }
  return buildingUp;
}

const runFunctionOnInput = (input,fn) => {
  return fn(input);
}

const output = reduce(
  [
    multiplyBy2,
    add3,
    divideBy5
  ],
  runfunctionOnInput,11
); //returns 5
```

# Pure Functions

**Point Free Style**

Listing functions one after the other without calling them with arguments.
This works for composition as output of one is input of next.

```js
[
    multiplyBy2,
    add3,
    divideBy5
],
```

**Output**

- only have one consequence
- function affects only next function
- no side effects

**Input**

Immutability
Do not mutate the initial array.
Doing so affects all functions (side effects).

**Map**

The `someArray.map()` function takes in an array and makes a copy of it to perform functions.
It does not mutate any input that is passed in by reference.

# Closure

Functions loose their memory after they run.
They start with a clean slate on each call.

Function has no idea it was called twice.
```js
const multiplyBy2 = inputNumber => inputNumber * 2;

const output1 = multiplyBy2(7); // returns 14
const output2 = multiplyBy2(3); // returns 6
```

Gives a function persistent memory by saving into another function.

```js
const functionMaker = () => {      // 1
  let counter = 0;
  const add3 = (num) => {
    const result = num + 3;
    return result;
  }
  return add3;
}

const madeFunc = functionMaker();  // 2
const answer = madeFunc(2);        // 3
```

- 1 save functionMaker , with no inputs
- 2 run functionMaker , store output into madeFunc
  funcitonMaker function is not being stored into madeFunc , only its output is being stored
  the `()` indicate that the function is ran and then its output is stored
  the output from functionMaker is a function , and that function is stored into madeFunc
- 3 calls madeFunc which is the returned function from functionMaker and passes 2 as an argument
  the label `add3` is not stored into madeFunc only its content
  as a result calling madeFunc runs the returned function and passes it the given argument

**Lexical Scope**

```js
const outer = () => {
  let counter = 0;
  const incrementCounter = () => {
    counter++;
  }
  return incrementCounter;
}

const newFunction = outer();
newFunction(); // returns 1
newFunction(); // returns 2

```

When calling `newFunction()` it attempts to increment counter
- looks in its local scope , not there
- cannot look into outer function scope because outer function execution context is cleared after it runs
- looks in global scope , where counter is stored along with the rest of incrementCounter function content
- increments counter

When called again , it increments the global counter which has saved the value of the previous increment.
This allows for persistent data.

**Closure**

When declaring a function its content can be passed to another function.
That content persists as data via a reference.

The local memory or variable environment within its execution context gets externally saved.
So after the execution context gets cleared , the data persists.

This storage is known as Persistent Lexical Scope Reference Data or Closed Over Variable Environment or Closure.

# Function Decoration

Allows for apparently altering the behaviour of an already declared function.
By copying its function content into an outer scope that is accessed by another function.

limits running of function to run only once
```js
const oncify = (convertMe) => {                  // 1
  let counter = 0;
  const inner = (input) => {
    if (counter === 0) {
      const output = convertMe(input);
      counter++;
      return output;
    }
    return "sorry";
  }
  return inner;
}

const multiplyBy2 = num => num * 2;              // 2
const oncifiedMultiplyBy2 = oncify(multiplyBy2); // 3

oncifiedMultiplyBy2(10); // returns 20           // 4
oncifiedMultiplyBy2(20); // returns sorry        // 5
```

- 1 save function as oncify
- 2 save function as multiplyBy2
- 3 save output from oncify as oncifiedMultiplyBy2
  within oncify local memory multiplyBy2 replaces convertMe , counter = 0 , inner function
  upon execution context exit the inner function and its backpack (closure) are assigned to oncifiedMultiplyBy2
  oncifiedMultiplyBy2 now contains convertMe as multiplyBy2 & counter as 0
- 4 call oncifiedMultiplyBy2 with argument 10 , it runs copied inner function content
  local memory input = 10
  tests conditional counter === 0 , first looks in local - not found , looks in oncifiedMultiplyBy2 backpack - finds counter = 0
  since counter === 0 it saves const output as result of running convertMe(input)
  looks for converMe in local - not found , looks in oncifiedMultiplyBy2 backpack - finds function
  looks for input in local - finds input = 10
  runs convertMe function with input 10 - increments counter to 1 and returns 20
- 5 call oncifiedMultiplyBy2 with argument 20 , it runs copied inner function content
  local memory input = 10
  tests conditional counter === 0 , first looks in local - not found , looks in oncifiedMultiplyBy2 backpack - finds counter = 1
  since counter === 1 it returns sorry

# Partial Application

Parity Mismatch - number of passed arguments do not match number of expected parameters

Transform Parity of 2 into Parity of 1
In order to pass 2 inputs into a function that only accepts one input
place a function with a default input into its backpack

```js
const multiply = (a,b) => a * b;                   // 1

function prefillFunction (fn , prefilledValue) {   // 2
  const inner = (liveInput) => {
    const output = fn(liveinput , prefilledValue);
    return output;
  }
  return inner;
}

const multiplyBy2 = prefillFunction(multiply , 2); // 3
const result = multiplyBy2(5);                     // 4
```

- 1 declare function multiply , this function takes 2 inputs & returns one output
- 2 declare function prefillFunction
- 3 call function prefillFunction and save its output to multiplyBy2
  local memory has fn = multiply , prefilled value = 2 , inner = its function content
  returns local memory content and assigns it to multiplyBy2
- 4 call function multiplyBy2 and save its output to result
  multiplyBy2 function content is same as inner function content before execution context cleared it
  local memory is liveinput = 5 , output = undefined
  execution context is output = fn(liveinput,prefilledValue)
  looks for fn in local - not found , looks in multiplyBy2 backpack - finds fn with value of multiply
  fn becomes multiply
  output = multiply(liveinput,prefilledValue)
  output = multiply(5,2) , 5 is from local memory , 2 is from multiplyBy2 backpack
  output = 10
  assigns output value to result

This is closure in functional programming.

