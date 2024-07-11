A promise is a returned JavaScript object that is made when a JS label requests the browser to perform a background task.
The promise is a placeholder awaiting the output of the browser task.

This allows for web tasks that take a while to run to not block the rest of JS code from running.

**Promise**

Hidden Properties
- value : ' ' - for holding data that arrives from web request response
- onFulfillment: [ ] - array for holding functions to run when values are filled from web request response
- onRejection: [ ] - array for holding functions to run when any error is received from the web request response

# Fetch

```js
function display(data) {                                       // 1 (0ms) defines function
  console.log(data);                                           // 6 (501ms) function added to call stack and ran with returned value as its argument , displays 'hi'
}

const futureData = fetch('https: twitter . com / some tweet'); // 2 (1ms) defines const , returns promise object , assigns promise to const , sends request to web browser
                                                               // 5 (500ms) data arrives from twitter 'hi' , data added to value property , onFullfillment array calls function display
futureData.then(display);                                      // 3 (2ms) adds display function to on fullfilled array

console.log("me first");                                       // 4 (3ms) displays me first
```

- get - obtains data from url
- post - posts data to url

**Method**

`someFetchConstant.then` method for adding functions to onFulfillment array
`someFetchConstant.catch` method for adding functions to onRejection array

# onFulfillment Array

Functions are added to the onFulfillment array with the `.then` method.
When data is returned and fills the value property , the function is called with the value as its argument.

Functions in call back queue are dequeued only after micro task queue is completely empty.

**Micro Task Queue**

When a function added to the onFulfillment array is dequeued from the array , it is then enqueued onto the micro task queue.

**Call Back Queue**

When a function such as `setTimeout()` is completed by the browser , it is then enqueued onto the call back queue.

**Execution Thread With Micro Task Queue & Call Back Queue**

```js
function display(data) {                 // 1 (0ms) defines function display
  console.log(data;)                     // 11 function display dequeued from micro task , pushed onto call stack
}                                        //    runs with returned value from fetch as its argument ,
                                         //    displays "tweet" , pops off call stack
function sayHi() {                       // 2 define function sayHi
  console.log("hi";)                     // 12 (303ms) deques from call back stack , pushes onto call stack , 
}                                        //    runs , displays "hi" , pops off call stack

function block300ms() {                  // 3 define function block300ms
  // some code that takes 300ms to run
}

setTimeout(sayHi,0);                     // 4 sends request to browser to set its timer to 0 for function sayHi ,
                                         //   browser adds function sayHi to call back queue and sets timer to 0ms
                                         //   at 0ms dequeues from call back queue
const futureData = fetch('twitter url'); // 5 (1ms) defines constant futureData , makes promise object , 
                                         //   fetch makes network request with url domain and path
                                         // 8 (250ms) data received from url ,
                                         //   puts result into promise value property ,
                                         //   triggers function in onFulfillment array ,
                                         //   puts function display into micro task queue since call stack contains block300ms
futureData.then(display);                // 6 stores display function into onFullfillment array

block300ms();                            // 7 (2ms) calls function , adds to call stack , runs block300ms
                                         // 9 (302ms) function finishes , pops off call stack
console.log("me first");                 // 10 displays "me first"
```
