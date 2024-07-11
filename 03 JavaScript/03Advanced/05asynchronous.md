**Browser Features**

Browsers have features such as sockets and network requests.

JavaScript does not have an implementation of these features.
Instead it has a label to access those features through the browser.

|javascript label|browser API|
|--|--|
|fetch|network request|
|document|dom|
|setTimeout|timer|
|localStorage|local storage|
|console|console|

# Synchronous Execution

JavaScript is single threaded.
Runs one line at a time. It does not run multiple lines of code simultaneously.

```js
function sayHi() {   // 1 define function
  return "hi";       // 3 enter function execution context
}

console.log(sayHi);  // 2 call function
                     // 4 hi
```

**Execution Context**

*Components*

Thread Of Execution
- Runs code line by line.

Data Storage
- Saves data (strings,arrays) in memory.

*Path*

- Stores variable names and corresponding values in global memory.
- Stores declared function names and their corresponding function in global memory.
- Does not step into a function until it is called.
- Calling a function opens a new execution context.
- Within new execution context variable names and their values are stored in local memory.
- Within new execution context function names and their functions are stored in local memory.
- Continues until end of function is reached.
- Exiting a function deletes its execution context. Local memory is cleared and values are lost unless returned.
- Thread continues onto global context until a new function call is made.

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

# Asynchronous Execution

JavaScript interacts with the web browser and makes requests via an API to complete tasks.
While browser completes the request JavaScript continues along its thread.

```js
function showTweet(tweet) {                // 1 define function
  console.log(tweet);
}

const incomingTweet = fetch(twitter url);  // 2 ask browser to get new tweet
                                           //   makes promise object
incomingTweet.then(showTweet);             // 3 add function showTweet to onFullfillment array in promise object
```

**Execution Context**

Identical to the synchronous execution path with the added path of the web browser execution.

*Event Loop*

Internal JS process that checks if call stack is empty and all global code has been run.
When both requirements are met dequeues item from call back queue and pushes onto call stack.

*Path*

- JS label makes a request to a web API
- JS label returns a promise object that contains
  - property value with undefined content as it waits for the API returned value
  - property onFulfillment containing array of functions to run when value gets updated
  - property onRejection containing array of functions to run when a response error is received
  - property status assigned pending (default) , resolved , rejected
- web browser receives request and runs necessary internal functions
- assigns returned response data to value property of promise object
- assignment triggers any existing onFulfillment functions
- places completed request in call back queue
- dequeues item from call back queue and pushes onto call stack only when call stack is empty and all global code has been ran

*Queues*

Queued functions won't be added to the call stack until the call stack is empty.
All synchronous code must finish running before any queued functions are ran.

micro task queue - functions completed from promise object property onFullfillment array enqueued onto micro task queue
callback queue - functions completed from web browser enqueued onto callback queue

micro task queue must be empty before call back queue can be dequeued

`someRequest.then(someFunction)` adds given function to onFullfillment array of promise for given API request
`someRequest.catch(someFunction)` adds given function to onRejection array of promise for given API request

Deferred Functions
```js
function showTweet(tweet) {                // 1 (0ms) define function
  console.log(tweet);                      // 13 (202ms) run , display tweet
}                                          //            pop from call stack

function sayHi() {                         // 2 (1ms) define function
  console.log("hi");
}

function block200ms() {                    // 3 (2ms) define function
  // code that lasts 200ms                 // 9 (6ms) push function onto call stack , run function
}                                          //   pop from call stack after 200ms

setTimeout(sayHi,0);                       // 4 (3ms) request to browser to set its timer for 0ms before running sayHi function
                                           // 5 (3ms) after 0ms sayHi function enqueue to call back queue
                                           // 14 (203ms) deqeue from call back
                                           //            push onto call stack , display hi
                                           //            pop from call stack

const incomingTweet = fetch(twitter url);  // 6 (4ms) consequence - ask browser to get new tweet
                                           //         consequence - make promise object
                                           // 10 (100ms) response received
                                           //            assign to promise value property
                                           //            enqeue onto micro task queue
                                           // 12 (202ms) deqeue from micro task queue
                                           //            push onto call stack

incomingTweet.then(showTweet);             // 7 (5ms) add function showTweet to onFullfillment array

block200ms();                              // 8 (6ms) call function

console.log("me first");                   // 11 (201ms) push function console.log() onto call stack
                                           //            run
                                           //            me first

// console log
// (201ms) me first
// (202ms) tweet
// (203ms) hi
```
