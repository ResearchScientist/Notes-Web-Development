# Function Memory

Functions do not retain memory of their previous call.
They start fresh every time they are called.
When the function finishes executing , its local memory is cleared , except for returned values.

State - variables & functions in local memory at a particular moment

# Returned Function

Pull a function from local to global
```js
function makeFunction() {
  function multiply2 (num) {          // saved to local
    return num * 2;
  }
  return multiply2;                   // pulls multiply2 function out of local into global
}

const madeFunction = makeFunction();  // pulled multiply2 now called madeFunction
const result = madeFunction(3);       // var result was result of running makeFunction once

console.log(result);  // 6
```

# Nested Function Scope

Call a function inside the same function it was defined in
```js
function outer() {                   // defined in global memory and added to stack , executed
  let counter = 0;                   // var defined localy
  function incrementCounter() {      // function defined localy , added to stack , executed
    counter ++;                      // adds 1 to counter , but where is counter stored
  }
  incrementCounter();
}

var show = outer();

console.log(show);
```

# Function Memory Retained

Call a function outside the function it was defined in
```js
function outer() {               // 1 function defined  // 3 outer function runs
  let counter = 0;               // 4 0 stored in counter memory location
  function incrementCounter() {  // 5 function defined , not ran
    counter ++;
  }
  return incrementCounter();     // 6 returns incrementCounter function & outer function pops off stack
}

const myNewFunction = outer();   // 2 const defined , outer function called & pushed to stack
                                 // 7 incrementCounter function saved as myNewFunction
myNewFunction();                 // 8 function called & pushed to stack , searches global execution context where counter++ is found attached to myNewFunction , increments counter , counter = 1, pops off stack
myNewFunction();                 // 9 function called & pushed to stack , searches global execution context where counter++ is found attached to myNewFunction , increments counter , counter = 2, pops off stack
```

with two different functions calling the outer function , we get 2 separate instances of closure
```js
function outer() {               // 1 function defined  // 3 outer function runs
  let counter = 0;               // 4 0 stored in counter memory location
  function incrementCounter() {  // 5 function defined , not ran
    counter ++;
  }
  return incrementCounter();     // 6 returns incrementCounter function & outer function pops off stack
}

const myNewFunction = outer();   // 2 const defined , outer function called & pushed to stack
                                 // 7 incrementCounter function saved as myNewFunction
myNewFunction();                 // 8 function called & pushed to stack , searches global execution context where counter++ is found attached to myNewFunction , increments counter , counter = 1, pops off stack
myNewFunction();                 // 9 function called & pushed to stack , searches global execution context where counter++ is found attached to myNewFunction , increments counter , counter = 2, pops off stack

const anotherFunction = outer(); // makes a new global execution context based out of the outer function

anotherFunction();               // counter = 1
anotherFunction();               // counter = 2
```

# Scope

- Dynamic Scope - scope based on where function was ran
- Static Scope - scope based on where function was defined

JavaScript has static scope.

**Persistent Lexically Scoped Referenced Data**

This allows for a function to call a returned function and have access to its data even after the returned function has cleared its own execution context.

Also known as closure.

# Helper Functions

**Once**

Code that makes a particular function run only once.

**Memoize**

Method that reuses previous calculations to speed up other calculations.
Saves the result of a computation that takes a long time to execute.

**Iterators**

Function returns next element in an array each time it is run.

**Module Patterns**

Avoids using global space for variables while application is running.
Different functions can access their own variables even when those variables have the same name due to closure.

**Asynchronous JavaScript**

Callbacks and promises are functions that complete a task and use data from the function that defined them.

# Closure

A function having access to its lexical scope via a reference after exiting its lexical scope.



i has one instance returned at end of loop , called 3 times
```js
for (var i = 1; i <= 3; i++) {
  setTimeout(function() {
    console.log(`i: ${i}`)
  }, i*1000);
}
// 4
// 4
// 4
```

j is a new instance returned during each iteration , 3 different j , block scoped
```js
for (var i = 1; i <= 3; i++) {
  let j = i;
  setTimeout(function() {
    console.log(`j: ${j}`)
  }, j*1000);
}
// 1
// 2
// 3
```

using `let` instead of `var` makes a new instance during each iteration , 3 different i
```js
for (let i = 1; i <= 3; i++) {
  setTimeout(function() {
    console.log(`i: ${i}`)
  }, i*1000);
}
// 1
// 2
// 3
```
