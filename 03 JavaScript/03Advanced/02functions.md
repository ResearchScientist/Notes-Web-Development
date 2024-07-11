# Structure

```js
var functionName = function(parameter1 , parameter2) {
  // function body
};

functionName(1,2); // invoke function with arguments
```

**Parameters**

Default
`function(a,b=2)` if b not given as argument it defaults to 2

# Arrow Function

```js
const makeTuple = (a,b,c,d) => {
  return [[a,c],[b,d]];
}

let showit = makeTuple('it','be','could','anyone','noone');

console.log(showit);  // it could be anyone
```

# High Order Functions

**Function As Input**

A function that takes another function as an argument (input).

```js
element.addEventListener("change",() => {
  console.log("we made a difference");
});
```
**Function As Output**

A function that returns a function as the output.

```js
const newMenu = (name) => {
  const length = name.length;
  
  return (food) => {
    let menu = length + food.length;
    return !!(menu % 1);
  };
};
```

**Callback**

```js
const ifElse = (condition, isTrue, isFalse) => {
  return condition ? isTrue() : isFalse();
};

ifElse (true,
  () => {console.log(true);},
  () => {console.log(false);}
);
```

```js
const ifElse = (condition, isTrue, isFalse) => {
  return condition ? isTrue() : isFalse();
};

const logTrue = () => {console.log(true);},
const logFalse = () => {console.log(false);}

ifElse(true,logTrue,logFalse);
```
`
**Pass Arguments**

```js
var increment = function(n) {
  return n + 1;
};

var square = function(n) {
  return n * n;
};

var doMath = function(n,func) {
  return func(n);
};

console.log(domath(2,increment));  // 4
console.log(doMath(2,square));  // 3
```

```js
const ifElse = (condition,isTrue,isFalse,p) => {
  return condition ? isTrue(p) : isFalse(p);
};

ifElse(true,fn1,fn2,'hi');
```

# Closure

```js
const myAlert = () => {
  const x = "hi";
  const alerter = () => {
    alert (x);
  };
  alderter();
};

alert()
```

```js
const countClues = () => {
  let n = 0;
  
  return {
    count: () => n++,
    reset: () => n = 0
  };
};

const c = countClues();
const d = countClues();

console.log(c.count());
console.log(d.count());
console.log(c.count());
console.log(d.count());
```

**Closure Format**

- make main function (outerFunction)
- define variables in main function local scope (accessible by sub functions)
- define a nested function (innerFunction) within main function
- return nested function from within main function

```js
function outerFunction() {
  var innerVar = 'local scope variable';
  function innerFunction() {
    return innerVar;
  };
  return innerFunction;
};
```

**Closure Execution**

Debugging
- run main function and save to a variable (var holds what function returns)
- console log var to see what it holds
- run inner function

# Template Strings

Used for string interpolation.
Shows string and var value.

`'some text ${someVar}'`
Use back ticks not single quotes.

`someFunction 'some text ${someVar}'`
Adding a function before the template string causes the function to act on the string.
Useful for formating the string and its values.

# String Formating

**Padding**

`str.padStart(n,c)` Adds white space to beginning of string.
`str.padEnd(n,c)` Adds white space to end of string.

The first passed argument n is the total number of character spaces.
If a string has 4 characters and you pass n as 6 then it adds 2 blank space.

The second optional passed argument c is a string to use as padding instead of blank spaces.
Can be a list of characters to loop through.

```js
let str = "cat";
let stars = str.padStart(5,"*");
let letters = str.padStart(9,"a,b,c");

console.log(str);     // cat
console.log(stars);   // **cat
console.log(letters); // abcabccat
```

**Trim**

Removes all white space. Does not take any arguments.

`str.trim()` Removes characters from both ends of string.
`str.trimStart()` Removes characters from beginning of string.
`str.trimEnd()` Removes characters from end of string.

# Destructuring

Splitting a large component into smaller components.

Useful when receiving a large JSON file and pulling out only necessary parts.

**Array**

Left side of `=` is a pattern describing the data to be received from `getData()`.
```js
var [
  {
    name: name1,               // makes var name1 and assigns it value of name from getData structure
    email: email1 = "noEmail"  // makes var email1 and assigns value of email , if no email value then assigns "noEmail" 
  },
  {
    name: name2,               // makes var name2 and assigns it value of name from getData structure
    email: email2 = "noEmail"  // makes var email2 and assigns value of email , if no email value then assigns "noEmail" 
  }
  
] = getData();
```

*Refactor Imperative Code To Declarative Code*

Imperative Example
```js
function data() {
  return [1,2,3,4,5];
}

var tmp = data();
var first = tmp[0];
var second = tmp[1] !== undefined ? tmp[1] : 20; // returns 20 when index 1 in array is undefined meaning number 2 in the array is missing [1,,3] to [1,20,3] , does not work if null
var third = tmp[2];
var fourth = tmp.slice[3];  // places anything after index 3 into one array [4,5] 
```

Declarative Example
```js
function data() {
  return [1,2,3,4,5];
}

var [
  first,
  second = 20,  // if [1,,3] then [1,20,3] , works if undefined , does not work if null
  third,
  ...fourth     // places anything after index 3 into one array [4,5] 
] = data();
```

To keep access to structure after destructuring give it a name.
```js
var tmp;
var [
  first,
  second = 20,
  third,
  ...fourth
] = tmp = data();
```

*Declare With Variables*

Imperative Example
```js
function data() {
  return [1,2,3,4,5];
}

var tmp = data();
var first,second,third,fourth;

first = tmp[0];
second = tmp[1] !== undefined ? tmp[1] : 20;
third = tmp[2];
fourth = tmp.slice[3];
```

Declarative Example
```js
function data() {
  return [1,2,3,4,5];
}

var tmp;
var first,second,third,fourth;

[
  first,
  second = 20,
  third,
  ...fourth
] = tmp = data();
```

*Declare With Object*

Imperative Example
```js
function data() {
  return [1,2,3,4,5];
}

var tmp = data();
var o = {};

o.first = tmp[0];
o.second = tmp[1] !== undefined ? tmp[1] : 20;
o.third = tmp[2];
o.fourth = tmp.slice[3];
```

Declarative Example
```js
function data() {
  return [1,2,3,4,5];
}

var tmp;
var o = {};

[
  o.first,
  o.second = 20,
  o.third,
  ...o.fourth
] = tmp = data();
```

*Declare With Array*

Imperative Example
```js
function data() {
  return [1,2,3,4,5];
}

var tmp = data();
var o = [];

o.[5] = tmp[0];
o.[10] = tmp[1] !== undefined ? tmp[1] : 20;
o.[15] = tmp[2];
o.[20] = tmp.slice[3];
```

Declarative Example
```js
function data() {
  return [1,2,3,4,5];
}

var tmp = data();
var o = [];

[
  o.[5],
  o.[10] = 20,
  o.[15],
  ...o.[20]
] = tmp;
```

*Ignore Certain Values*

Imperative Example
```js
function data() {
  return [1,2,3,4,5];
}

var tmp = data();
var first = tmp[0];
// var second = tmp[1];    // not included by not assigning
var third = tmp[2];
var fourth = tmp.slice[3];
```

Declarative Example
```js
function data() {
  return [1,2,3,4,5];
}

var [
  first,
  ,          // not included by using an empty comma
  third,
  ...fourth
] = data();
```

*Switch Variables*

Imperative Example
```js
var x = 10;
var y = 20;


{
  let tmp = x;
  x = y;
  y = tmp;
}
```

Declarative Example
```js
var x = 10;
var y = 20;

[x,y] = [y,x];
```

*Parameter As Array*

Imperative Example
```js
function data(tmp = []) {  // default is empty array , in case data is null
  var [
    first,
    second,
    third
  ] = tmp;
}
```

Declarative Example
```js
function data([
  first,
  second,
  third
] = []) {  // default is empty array , in case data is null
  
}
```

*If Data Is Null*

Imperative Example
```js
function data() {
  return null;
}

var tmp = data() || [];  // returns empty array if data is null
var first = tmp[0];
var second = tmp[1];
var third = tmp[2];
var fourth = tmp.slice[3];
```

Declarative Example
```js
function data() {
  return null;
}

var [
  first,
  second,
  third,
  ...fourth
] = data() || [];  // returns empty array if data is null
```

*Nested Arrays*

Imperative Example
```js
function data() {
  return [1,[2,3],4];
}

var tmp = data() || [];

var first = tmp[0];      // 1
var tmp2 = tmp[1] || []  // [2,3]
var second = tmp2[0];    // 2
var third = tmp2[1];     // 3
var fourth = tmp[2];     // 4
```

Declarative Example
```js
function data() {
  return [1,[2,3],4];
}

var tmp;

var [
  first,
  [
    second,
    third
  ] = [],
  fourth
] = tmp = data() || [];
```

**Object**

`property:value`
`a:first = 10`
- a is the source value (property)
- first is the target value (value)
- 10 is the default value

*Defaults*

Imperative Example
```js
function data() {
  return {a:1,b:2,c:3};
}

var tmp = data;

var first = tmp.a;
var second = tmp.b !== undefined ? tmp.b : 20;  // sets 20 as default value
var third = tmp.c;
```

Declarative Example
```js
function data() {
  return {a:1,b:2,c:3,d:4};
}

var {
  a: first,
  b: second = 20, // sets 20 as default value
  ...third        // groups 3 and later together into one object
} = data();
```

*Declaration Without Var*

Imperative Example
```js
function data() {
  return {a:1,b:2,c:3};
}

var tmp = data();
var first, second, third;

first = tmp.a;
second = tmp.b;
third = tmp.c;
```

Declarative Example
```js
function data() {
  return {a:1,b:2,c:3,d:4};
}

var first, second, third;

// use () around full object to disambiguate pattern from block
({
  a: first,
  b: second,
  c: third
} = data());
```
OR
```js
function data() {
  return {a:1,b:2,c:3,d:4};
}

var tmp;
var first, second, third;

tmp = {
  a: first,
  b: second,
  c: third
} = data();
```

*Empty Object*

Imperative Example
```js
function data() {
  return ; // empty
}

var tmp = data() || {}; // return empty object instead of error
var first, second, third;

first = tmp.a;
second = tmp.b;
third = tmp.c;
```

Declarative Example
```js
function data() {
  return ; // empty
}

var {
  a: first,
  b: second,
  c: third
} = data() || {};  // return empty object instead of error
```

*Property And Value Have Same Name*

Imperative Example
```js
function data() {
  return {a:1,b:2,c:3};
}

var tmp = data() || {};

var a = tmp.a;
var b = tmp.b;
var c = tmp.c;
```

Declarative Example
```js
function data() {
  return {a:1,b:2,c:3,d:4};
}

var {
  a,
  b,
  c
} = data() || {};
```

*Nested Objects*

Imperative Example
```js
function data() {
  return {a:1,b:{c:3,d:4}};
}

var tmp = data() || {};

var a = tmp.a;
var b = tmp.b || {};
var c = b.c;
var d = b.d;
```

Declarative Example
```js
function data() {
  return {a:1,b:{c:3,d:4}};
}

var {
  a,
  b: {
    c,
    d,
  } = {} // default is empty object
} = data() || {};
```

*Objects As Parameters*

Imperative Example
```js
function data(tmp = {}) {
  var {
    a,
    b
  } = tmp;
}
```

Declarative Example
```js
function data({
  a,
  b
} = {}) {
  
}
```

*One Source To Multiple Targets*

Imperative Example
```js
var obj = {
  a:1,
  b:2,
  c:3
};
```

Declarative Example
```js
var {
  a,
  b,
  b: z,
  c
} = obj;
```

*One Source To Multiple Nested Targets*

Imperative Example
```js
var obj = {
  a:1,
  b: {
    z: 100
  },
  c:3
};
```

Declarative Example
```js
var {
  a,
  b,        // returns full object b
  b: {
    z: 100  // returns value z of object b
  } = {},
  c
} = obj;
```

**Named Arguments**

Useful for not needing to pass arguments for parameters in a specific order.
Having a list of names to use as arguments helps streamline the code.

Imperative Example
```js
function findCat(place="under bed",id=0) {
  // code to find cat
}

findCat({id:10});  // returns place of cat with id 10
```

Declarative Example
```js
function findCat({
  place = "under bed",
  id = 0
}) {
  // code to find cat
}

findCat({id:10});  // returns place of cat with id 10
```

# Find

Method that takes a function and returns the value found by the passed function.

`someArray.find(someFunction)` returns value found
`someArray.findIndex(someFunction)` returns index of first value found , -1 if not found

`someArray.includes(some value)` returns true or false for given value or values (1) (1,2) (1,2,NaN)

# Map

Method that applies a function to each element of an array.

`someArray.map(someFunction)`

```js
nums = [1,2,3];

var stringit = nums.map(function tupleFun(n) {
  return [n*2,String(n*2)];
});

console.log(stringit);  // [[2,"2"],[4,"4"],[6,"6"]]
```

# Flat

Method that flattens nested arrays.

`someArray.flat(n)`

`var nestedValues = [1,[2,3],[[]],[4,[5]],0]`

`nestedValues.flat(0)` no change `[1,[2,3],[[]],[4,[5]]]`
`nestedValues.flat(1)` removes 1 outer lvl `[1,2,3,[],4,[5]]`
`nestedValues.flat(2)` removes 2 outer lvl `[1,2,3,4,5]`

# FlatMap

Method that first maps then flattens an array.

`someArray.flatMap(someFunction)`

```js
nums = [1,2,3];

var stringit = nums.flatMap(function tupleFun(n) {
  return [n*2,String(n*2)];
});

console.log(stringit);  // [2,"2",4,"4",6,"6"]
```

# Sort

`.sort()`

# For Each

`.forEach()`

# Filter

`.filter()`

# Spread Operator

`[. . .someDataStructure]`

Iterates over the given data structure.
Returns array of its elements.

```js
var str = "hello";

var letters = [...str];
letters;  // ["h","e","l","l","o"]
```

# Iterator

**Basics**

A function that loops through some data.

For Loop
```js
const nums = [1,2,3];

for (let i = 0; i < nums.length; i++) {
  console.log(nums[i]);
}
// 1
// 2
// 3
```

Function Returns Another Function
```js
function makeFunction() {            // 1 define function
  function add2(num) {               // 4 run makeFunction
    return num+2;                    //   define function add2
  }                                  //   do not run add2 
  return add2;                       //   return function add2
}

const copyFunction = makeFunction;   // 2 save function to constant newFunction , do not call function
const newFunction = makeFunction();  // 3 call function and save result to constant newFunction
                                     //   result is function add2
const result = newFunction(3);       // 5 calls newFunction with argument 3
                                     //   newFunction is function add2 renamed
                                     //   runs num + 2 , (3) + 2
                                     //   returns 5 and assigns value to result
```

Returned Inner Function Retains Defined Data Within Its Execution Context
```js
function makeFunction(array) {                     // 1 define function
  let i = 0;                                       // 3 makeFunction runs with given arguments
  function inner() {                               //   inner function does not run
    const element = array[i];                      //   inner function returned
    i++;
    return element;
  }
  return inner;
}

const returnNextElement = makeFunction([4,5,6]);  // 2 define constant , value is undefined
                                                  //   calls function with given arguments
                                                  // 4 returned inner function assigned to constant returnNextElement
const element1 = returnNextElement();             // 5 calls function
                                                  //   
const element2 = returnNextElement();             // 

console.log(element1);                            // 4
console.log(element2);                            // 5
```

Returned Function Execution Context
- looks for variables within local memory , not found
- follows reference to function definition in global that contains the variable data
- runs 

**Defined**

Iterators change the nature of how data is accessed.
Instead of interacting with each element of a static array to select the element of interest , iterators parse through the array and present only the next available element.

This decouples the processes of gathering data from working on data.

Iterators
- contain data array
- manage current array position
- return next element in array each time the iterator is ran

JS native iterators are objects with a next method. When the method is called it returns the next element.

Non Native Example
```js
function makeFunction(array) {
  let i = 0;
  const inner = { next:                          // inner object with property next assigned to method function()
    function() {
      const element = array[i];
      i++;
      return element;
    }
  }
  return inner;                                  // returns inner object
}

const returnNextElement = makeFunction([4,5,6]);
const element1 = returnNextElement.next();       // looks in global for next property and finds its assigned method
                                                 // finds array and i in global copies to local and runs method
                                                 // increments i , stores new i in global , returns array element and assigns to element1

const element2 = returnNextElement.next();       // looks in global finds i and copies that value to its local and runs method as above

console.log(element1);                           // 4
console.log(element2);                           // 5
```

*Next Method*

`.next()` 

Makes an object with 2 properties.
- value - returned element value
- done - true or false

> ## Some Examples

`for (let i of someString) {someCode}` loops through each element of the string,array,set.

**Iterable Data Structures**

Verbose Approach
```js
var hi = "hello";
var greet = ["h","e","l","l","o"];

// custom iterators
var iterator1 = hi[Symbol.iterator]();
var iterator2 = greet[Symbol.iterator]();

iterator1.next(); // h
iterator1.next(); // e
iterator1.next(); // l
iterator1.next(); // l
iterator1.next(); // o
iterator1.next(); // undefined , done:true

iterator2.next(); // h
iterator2.next(); // e
iterator2.next(); // l
iterator2.next(); // l
iterator2.next(); // o
iterator2.next(); // undefined , done:true
```

Declarative Approach
```js
var hi = "hello";

// custom iterator
var iterator = hi[Symbol.iterator]();

for (let c of iterator) {
  console.log(c);  // h e l l o
}
```

Declarative Approach
```js
var hi = "hello";

// native iterator
for (let c of hi) {
  console.log(c);  // h e l l o
}
```

**Non Iterable Data Structures**

`for (let i of someObj) {someCode}` does not work on objects

Imperative Approach
```js
var obj = {
  a:1,
  b:2,
  c:3
  [Symbol.iterator]: function() {
    var keys = Object.keys(this);
    var index = 0;
    return {
      next: () => (index < keys.length) ? 
        {done: false, value: this[keys[index++]]} : 
        {done: true, value: undefined}
    };
  }
};

[...obj];  // [1,2,3]
```

Declarative Approach
```js
var obj = {
  a:1,
  b:2,
  c:3,
  *[Symbol.iterator] () {
    for (let key of Object.keys(this)) {
      yield this[key];
    }
  }
};

[...obj];  // [1,2,3]
```

`Object.keys()` iterates through keys
`Object.values()` iterates through values
`Object.entries()` returns tuples of key & value pairs

# Generator

**Custom Solutions**

`function *someFunctionName() {}` makes a generator function

Static Flow
```js
function *makeFlow() {                     // 1 define function
  yield 4                                  //   function makes object with property next and method as next's value
  yield 5                                  // 4 yields 4 and assigns it to element1
  yield 6                                  // 6 yields 5 and assigns it to element2
}

const returnNextElement = makeFlow();      // 2 define const to receive output of makeFlow
                                           //   call makeFlow

const element1 = returnNextElement.next(); // 3 calls property next method
const element2 = returnNextElement.next(); // 5 calls property next method

// console log
// 4
// 5
```

Dynamic Flow
```js
function *makeFlow() {                       // 1 define function
  const num = 10;
  const newNum = yield num;
  yield 5 + newNum;
  yield 6;
}

const returnNextElement = makeFlow();       // 2 define const its value is undefined until makeFlow returns a value
const element1 = returnNextElement.next();  // 3 define element1
                                            //   runs makeFlow
                                            //   num = 10
                                            //   newNum = yield 10
                                            //   10 yielded and assigned to element1
                                            //   newNum = undefined

const element2 = returnNextElement.next(2); // 4 define element2
                                            //   runs makeFlow with argument 2
                                            //   passes 2 into undefined newNum , newNum = 2
                                            //   5 + newNum , 5 + (2) , 7 yielded and assigned to element2
const element3 = returnNextElement.next();
const element4 = returnNextElement.next();
console.log(element1);
console.log(element2);
console.log(element3);
console.log(element4);

// console log
// 10 , done false
// 7 , done false
// 6 , done false
// undefined , done true
```

In the above code `returnNextElement` is a generator object that when its method next is run it runs `makeFlow()` until it encounters yield.
When it encounters yield
- returns value yielded
- pauses execution context

When method next is called again it continues from paused execution context location.

Asynchronous Generator - Get Tweet And Do Something With It
```js
function afterDataReceived(value) {             // 1 declare function
  returnNextElement.next(value);
}

function *makeFlow() {                          // 2 declare function
  const data = yield fetch('twitter url');      // 5 run function , enter execution context
  console.log(data);                            //   declare const data as undefined
}                                               //   make promise object for fetch api
                                                //   promise contains properties value as undefined , status as pending , onfullfillment array
                                                //   promise yielded out of execution context , so not saved to constant data
                                                //   request sent to browser
                                                //   browser internally uses url , path , get request to fetch data from twitter
                                                // 7 response received , value assigned to promise object value
                                                //   onfullfillment function enqueued to micro task queue
                                                // 8 call stack empty , micro task dequeued , onfullfillment function pushed onto call stack
                                                // 9 run function with response value as argument
                                                //   assign value to constant data
                                                //   console.log the value in constant data

const returnNextElement = makeFlow();           // 3 declare constant as undefined
                                                //   make global object with next property and method

const incomingData = returnNextElement.next();  // 4 declare constant
                                                //   call makeFlow
                                                //   

incomingData.then(afterDataReceived);           // 6 stores passed function into onfullfillment array

```

In the above code returning back into the makeFlow function is controlled by setting up the trigger `returnNextElement.next()` to be run by the function triggered by the promise response.

**Native Solution**

`async` sets up an asynchronous function
`await` exits function and comes back to function where it left off

No need for a separate implicit function to be triggered after API response is received.

Async Await
```js
async function makeFlow() {                 // 1 (0ms) declare async function
  console.log("me first");                  // 3 (2ms) run console log , display me first
  const data = await fetch('twitter url');  //         declare const data as undefined
                                            //         fetch returns promise object with properties value & onFullfillment array , both empty
                                            //         fetch makes xhr request to browser , url & path & type to get tweet , current response value empty
                                            //         await takes thread of execution out of makeFlow function and continues on in global
                                            // 5 (203ms) twitter response received
                                            //           promise value updated
                                            //           function makeFlow pushed to call stack , function runs
                                            //           response value in promise assigned to constant data
  console.log(data);                        // 6 (204ms) run console log , display tweet
}

makeFlow();                                 // 2 (1ms) call function

console.log("me second");                   // 4 (3ms) run console log , display me second

// console log
// me first
// me second
// tweet
```















> ## Some Examples


`function *someName() {yield n;}` asterisk defines function as a generator

Generators produce iterators.

Declarative Approach
```js
function *main() {
  yield 1;  // yield returns the value
  yield 2;
  yield 3;
  return 4; // do not use return
}

var it = main();

it.next();  // 1 , done: false
it.next();  // 2 , done: false
it.next();  // 3 , done: false
it.next();  // 4 , done: true

[...main()]; // [1,2,3] not 4 because return was used instead of yield
```

**Iterator Generator Combination**

Makes 1 to 100
```js
var numbers = {
  *[Symbol.iterator]() {
    for (let i = 0; i <= 100; i++) {
      yield i;
    }
  }
};

for (let num of numbers) {
  console.log(num);  // 1 to 100
};
```

Makes 20 to 80 by 10
```js
var numbers = {
  *[Symbol.iterator]({ // default condition
    start = 0,
    end = 100,
    step = 1
  } = {}) {
    for (let i = start; i <= end; i+= step) {
      yield i;
    }
  }
};

console.log(`my numbers are: ${
  [...numbers[Symbol.iterator]({
    start: 20,
    end: 80,
    step: 10
})]
}`);
```

# RegEx

**Look Ahead**
Item matched and item immediately following matched item also matches.

`.match(/(someCharacter.)someAssertion/g);`

Assertions
`no assertion` returns given character and the next character
`$` restricts return
`?=(someCharacter)` positive look ahead , only match if followed by given character
`?!(someCharacter)` negative look ahead , only match if not followed by given character

```js
let msg = "hello world`

msg.match(/(l.)/g);       // ["ll","ld"]
msg.match(/(l.)$/g);      // ["ld"]
msg.match(/(l.)(?=o)/g);  // ["ll"]
msg.match(/(l.)(?!o)/g);  // ["lo","ld"]
```

**Look Behind**
Item matched and item immediately preceding matched item also matches.

`.match(/(someAssertion)(someCharacter.)/g);`

Assertions

`.match(/(?<=comeCharacter)(someCharacter.)/g);` positive look behind , only match if preceded by given character
`.match(/(?<!comeCharacter)(someCharacter.)/g);` negative look behind , only match if not preceded by given character

```js
let msg = "hello world`

msg.match(/(?<=e)(l.)/g);       // ["ll"]
msg.match(/(?<!e)(l.)$/g);      // ["lo","ld"]
```

**Captured Groups**

```js
let msg = "hello world`

msg.match(/.(l.)/);             // ["ell","ll"]
msg.match(/([jkl])o Wor\1/);    // ["lo Worl","l"]
```

**Named Captured Groups**

`.match(/(<someName>somePattern)/).groups;` saves pattern to group name in brackets

```js
let msg = "hello world`

// name group
msg.match(/(?<cap>l.)/).groups;        // [cap: "ll"]

// match by group name
msg.match(/?<cap>[jkl]o Wor\k<cap>/);  // ["lo worl","l"]

// replace by group name
msg.replace(/(?<cap>l.)/g,"-$<cap>-"); // "he-ll-o wor-ld-"
```
**Flags**

Added to the end of a reg ex.

`g` global
`m` multi line
`i` case insensitive
`s` .all mode for matching across lines
`u` unicode aware

Doesn't work , need to debug.

```js
let poem = `
cats chase birds
dogs chase cats
kids chase dogs
you chase me
I chase you
I love you
you leave me
`;

function *chasing(poem) {
  var re = /(?<=chase)(?<chased>(?:a )\w+)/gs;
  var match;
  while (match = re.exec(poem)) {
    let {
      groups: {
        chased
      }
    } = match;
    yield `chased: ${chased}`;
  }
}

for (let chase of chasing(poem)) {
  console.log(chase);
}
```

# Asynchronous

`async function someName() {}`

```js
async function main() {
  let cat = await getCat();
}

main();
```

Example Code
```js
function getBio(file) {
  return new Promise(function(resolve) {
    fakeAjax(file,resolve);
  });
}

async function loadBios(files) {
  // request all files concurrently
  var promises = files.map(getBio);
  
  for (let promise of promises) {
    console.log(await promise);
  }
}

loadFiles(["bio1","bio2","bio3"]);
```
**Negatives**

- await only works on promises
- await does not work on deeply nested functions
- starvation , promises added to micro queue process before any other queue
- unable to stop an async function

**Async Generator**

Able to pull and push data in same function.

Fetch data as it is available and in order.
```js
async function *fetchSites(urls) {
  for (let url of urls) {
    let response = await fetch(url);
    if (response.status == 200) {
      let text = await response.text();
      yield text.toUpperCase();
    }
    else {
      yield undefined;
    }
  }
}
```

Consume fetched data.
```js
async function main(favouriteSites) {
  for await (let text of fetchSites(favouriteSites)) {
    console.log(text);
  }
}
```
