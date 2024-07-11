# Basics

- imperative - how function works
- declarative - what function does

Comments should clarify why certain code decisions are made.

# Function

A function takes one input (domain) and gives one output (range).
If one input gives different outputs it is a relation not a function.

**Naming**
Use a function name that shows the relationship between an input and output.

**Side Effects**
Avoid indirect inputs or outputs that unpredictably affect the function or other functions.

**Pure**
A function that uses consistent variables and functions.
A function that performs one task.

**Scope Control**
Minimize the reach of side effects.

Strategies
- Pass output of one function as input for another function.
- Wrap a function inside another function.

**Referential Transparency**
When a function call can be replaced with its returned value and not affect the rest of the code.

# Arguments

unary - one input , one output
binary - two inputs , one output

**Higher Order Function**
Takes another function as input or outputs another functions.

**Nested Arguments**

```js
function add1(c) {
  return function add2(a,b) {
    return a + b + c;
  };
}

var result = add1(1)(2,3);
console.log(result);
```

# Point Free

A function defined without any specific values.
The function is defined by other functions.

**Equational Reasoning**
Functions with same shape can be interchanged.

```js
function1(function function2(thing) {
  return function3(thing);
});

// same as

function1(function2);
```
**Imperative Approach**

```js
function odds(n) {
  return n % 2 == 1;
}

function evens(n) {
  return !odds(n);
}

result = evens(4);

console.log(result); // true
```

**Declarative Approach**

```js
function not(fn) {
  return function negated(...args) {
    return !fn(...args);
  };
}

function odds(n) {
  return n % 2 == 1;
}

var evens = not(odds);

result = evens(4);

console.log(result); // true
```

**Currying Example**

```js
function modul(y) {
  return function forX(x) {
    return x % y;
  };
}

function equal(y) {
  return function forX(x) {
    return x === y;
  };
}

var mod2 = modul(2);
var eq1 = equal(1);

function odds(x) {
  return eq1(mod2(x));
}

function compose(fn2,fn1) {
  return function composed(n) {
    return fn2(fn1(n));
  };
}

var odds = compose(eq1,mod2);

// or better

var odds = compose(equal(1),modul(2));
```

# Functor

`map:`
`fold:`
`chain:`

Identity Function
```js
const Box = x =>
({
  map: f => Box(f(x)),
  fold: f => f(x),
  toString: `Box(${x})`
})

const nextChar = str =>
  Box(str)
  .map(x => x.trim())
  .map(trimmed => parseInt(trimmed,10))
  .map(number => new Number(number + 1))
  .fold(String.fromCharCode)

const result = nextChar(" 64 ");

console.log(result);  // A
```

Non Composed
```js
const first = xs =>
  xs[0];

const half_ = xs => {
  const found = xs.filter(x => x >= 20);
  const answer = first(found) / 2;
  return `the answer is ${answer}`;
}

const result = half([1,4,50]);

console.log(result);  // 25
```

Composed
```js
const first = xs =>
  xs[0];

const Box = x =>
({
  map: f => Box(f(x)),
  fold: f => f(x),
  toString: `Box(${x})`
})

const compose = (f,g) => x =>
  Box(x).map(g).fold(f)

const half = xs =>
  Box(xs)
  .map(xs => xs.filter(x => x >= 20))
  .map(found => first(found) / 2)
  .fold(answer => `the answer is ${answer}`)

const result = half([1,4,50]);

console.log(result);
```

Each variable introduces a new box. Not complete.
```js
const Box = x =>
({
  map: f => Box(f(x)),
  fold: f => f(x),
  chain: f => f(x),
  toString: `Box(${x})`
})

const giveDiscount = (price,discount) =>
  Box(money(price))
  .chain(cents =>
    Box(percent(discount))
    .map(savings => cents - (cents * savings))
  )
  .fold(x => x)
```

# Closure

Function retains access to values in closed execution context.

```js
function add1(c) {
  return function add2(a,b) {
    return a + b + c;
  };
}

var result = add1(1)(2,3);
console.log(result);
```

**Memoize**

A function that runs a calculation once then saves result in memory.
When called again returns the value stored in memory instead of running calculation again.

Declarative Method
```js
function repeats(n) {
  var str;
  return function manyA() {
    if (str == undefined) {
      str = "".padStart(n,"a");
    }
    return str;
  };
}

var a = repeats(10);

console.log(a()); // aaaaaaaaaa
```

Memoize Function From Library
```js
function repeats(n) {
  return memoize(function manyA() {
    return "".padStart(n,"a");
  });
}

var a = repeats(10);

console.log(a()); // aaaaaaaaaa
```

**Currying**

Allows a function with multiple parameters to take one argument at a time.
The first argument is the one the function should remember.
The second argument is the one the function operates on.

Basic Example
```js
const add = (x,y) => x + y;

const curry = f => x => y => f(x,y);

const curryAdd = curry(add);   // pass function add into function curry 

const increment = curryAdd(1); // 1 = x

const result = increment(2);   // 2 = y

console.log(result);
```

Passing one argument at a time.
```js
function getTweet(url) {
  return function getData(data) {
    return function getCB(cb) {
      // some code
    };
  }
}

getTweet(someHashTag)({id:10})(recentTweet);

var getTrending = getTweet(someHashTag);
var getUser = getData({id:10});
```

Nested arrow functions for passing one argument at a time.
```js
var getTweet = url => data => cb => { "some code" };
```

# Composition

**Declarative Data Flow**

- One function's output is input for another function.
- Instead of using temp variables to pass inputs between functions , the functions are nested.
- Each function name semantically explains what the function does.
- Utility function takes as input multiple functions and returns a custom function.
- Output of last function is input of penultimate function on and on until first function returns result.

Innermost nested function runs first.
Likewise its associated argument listed last gets passed first.

**Compose**

Data flows right to left.
```js
const compose = (f,g) => x => f(g(x));
```

```js
const toUpper = str => str.toUpperCase();
const exclaim = str => str + "!";
const first = xs => xs[0];

const compose = (f,g) => x => f(g(x));  // const compose = x => exclaim(toUpper(x));
const shout = compose(exclaim,toUpper);

console.log(shout("tears"));  // TEARS!
```

**Pipe**

Data flows left to right.
```js
const compose = (f,g) => x => g(f(x));
```

# Immutability

`const` value cannot be reassigned

Primitives declared with `const` are immutable.
Functions and objects declared with `const` can have their properties mutated.

**Read Only**

Function that is not editable.

`Object.freeze(someFunction)`  calls given function as read only

For nested functions it only freezes the top level function.
Must call `Object.freeze()` on each nested function to make each one read only.

```js
let function1 = {
  // some code
}

function2(Object.freeze(function1));
```

**Immutable Data Structures**

Not native to JS.

# Recursion

Evaluate one character at a time and shorten string.
```js
function isVowel(char) {
  return ["a","e","i","o","u"].includes(char);
}

function countVowels(str) {
  if (str.length == 0) {                    // base condition
    return 0;
  }
  var first = (isVowel(str[0]) ? 1 : 0);    // returns 1 if vowel 0 if not
  return first + countVowels(str.slice(1)); // removes 1 character
}

let sentence = "hi there";

let cv = countVowels(sentence);

console.log(cv);  // 3
```

Is the string a palindrome.
```js
function isPali(str) {
  if (str.length <= 1) {
    return true;          // one letter word is a palindrome
  }
  var first = str[0];
  var last = str[str.length-1];
  if (first === last) {
    return isPali(str.substring(1,str.length-1));
  }
  return false;
}

let word = "abcba";

let ip = isPali(word);

console.log(ip);  // true
```

**Memory**

Stack Frame - reserved memory allocation for a particular task

Recursive calls can potentially overflow the stack. Memory full.

Avoid overflowing the stack by having only one call in the stack and then removing it after it runs. 

*Tail Calls*

Not yet available in all browsers.

```js
"use strict";

function isVowel(char) {
  return ["a","e","i","o","u"].includes(char);
}

function countVowels(count,str) {
  count += (isVowel(str[0]) ? 1 : 0);
  if (str.length <= 1) {
    return count;
  }
  return countVowels(count,str.slice(1));
}

let sentence = "hi there";

let cv = countVowels(0,sentence); // required to set count to 0

console.log(cv);                  // 3
```

*Trampoline*

A function that calls one function to run in the stack at a time instead of stacking all the functions and then running each one.

```js
"use strict";

function isVowel(char) {
  return ["a","e","i","o","u"].includes(char);
}

function countVowels(str,cont = v => v) {
  var first = (isVowel(str[0]) ? 1 : 0);
  if (str.length <= 1) {
    return cont(first);
  }
  return countVowels(str.slice(1),function f(v) {
    return cont(first + v);
  });
}

let sentence = "hi there";

let cv = countVowels(sentence);

console.log(cv);
```

# List Operations

**Map**

`.map()` transforms values in an object or array by given function

```js
ones = [1,2,3];

function add10(numbers) {
  return numbers + 10;
}

tens = ones.map(add10);

console.log(tens);  // [11,12,13]
```

**Filter**

`.filter()` returns values selected by given function

**Reduce**

`.reduce()` combines various inputs into one output

Initial value should be something like 0 or "".

```js
let cats = ['suki','nero','pusheen'];
let colours = ['white','black','gray'];

let small = cats.reduce(someFunction,[]);

console.log(small);
```

# Transduction

Composition of map filter reduce.

# Data Structure Operations

This is incomplete.
```js
var nums = {
  first: [1,2,3,4,5],
  second: [5,6,7,8,],
  third: [2,4,6,8]
};

function mapObj(mapFn,o) {
  var newObj = {};
  var keys = Object.keys(o);
  for (let key of keys) {
    newObj[key] = mapFn(o[key]);
  }
  return newObj;
}

function filterObj(predicateFn,o) {
  var newObj = {};
  var keys = Object.keys(o);
  for (let key of keys) {
    if (predicateFn(o[key])) newObj[key] = o[key];
  }
  return newObj;
}

function reduceObj(reduceFn,initialValue,o) {
  var result = initialValue;
  var keys = Object.keys(o);
  for (let key of keys) {
    result = reduceFn(result,o[key]);
  }
  return result;
}
```

# Monad

A pattern for pairing data with a set of behaviours so it can interact with other monads.

Basic Structure
```js
function Just(val) {
  return {map,chain,ap};
  
  function map(fn) {
    return Just(fn(val));
  }
  
  function chain(fn) {
    return fn(val);
  }
  
  function ap(anotherMonad) {
    return anotherMonad.map(val);
  }
}
```

Found item is undefined.
```js
const findColour = name =>
  ({red:'#ff4444',blue:'#3b5998',yellow:'#fff68f'}[name]);

const result = findColour('red').toUpperCase(); // gives error

console.log(result);
```

**Either**

Use either monad to define item.
One monad handles successes the other monad handles failures.

Displays array for found colour.
```js
const Right = x =>
({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f,g) => g(x),
  toString: `Right(${x})`
});

const Left = x =>
({
  chain: f => Left(x),
  map: f => Left(x),
  fold: (f,g) => f(x),
  toString: `Left(${x})`
});

const findColour = name => {
  const found = {red:'#ff4444',blue:'#3b5998',yellow:'#fff68f'}[name]
  return found ? Right(found) : Left("not found");
}

const result = findColour('red').map(x => x.toUpperCase());

console.log(result);  // log result

// returns array with found colour in upper case
```

Displays found colour.
```js
const Right = x =>       // used for finding value
({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f,g) => g(x),
  toString: `Right(${x})`
});

const Left = x =>        // used for error handling
({
  chain: f => Left(x),
  map: f => Left(x),
  fold: (f,g) => f(x),
  toString: `Left(${x})`
});

const findColour = name => {
  const found = {red:'#ff4444',blue:'#3b5998',yellow:'#fff68f'}[name]
  return found ? Right(found) : Left("not found");
}

const result = () =>
  findColour('red')
  .map(x => x.toUpperCase()) // makes letters uppercase
  .map(x => x.slice(1))      // removes first character
  .fold(
    () => "no colour",
    colour => colour
  )

console.log(result()); // call result as a function

// console log
// FF4444
```

Only run items in list that are not null.
```js
const fromNullable = x => // only run on items in list
  x != null ? Right(x) : Left()

const Right = x =>        // used for finding value
({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f,g) => g(x),
  toString: `Right(${x})`
});

const Left = x =>         // used for error handling
({
  chain: f => Left(x),
  map: f => Left(x),
  fold: (f,g) => f(x),
  toString: `Left(${x})`
});

const findColour = name =>
  fromNullable({red:'#ff4444',blue:'#3b5998',yellow:'#fff68f'}[name]);

const result = () =>
  findColour('red')
  .map(x => x.toUpperCase()) // makes letters uppercase
  .map(x => x.slice(1))      // removes first character
  .fold(
    () => "no colour",
    colour => colour
  )

console.log(result()); // call result as a function

// console log
// FF4444
```

Try Catch
```js
//const fs = require('fs');

const Right = x =>        // used for finding value
({
  map: f => Right(f(x)),
  fold: (f,g) => g(x),
  inspect: `Right(${x})`
});

const Left = x =>         // used for error handling
({
  map: f => Left(x),
  fold: (f,g) => f(x),
  toString: `Left(${x})`
});

const fromNullable = x =>
  x != null ? Right(x) : Left(null);

const tryCatch = f => {  // only need one try catch function for errors
  try {
    return Right(f());
  }
  catch(e) {
    return Left(e);
  }
};

const readFileSync = path => tryCatch(() => fs.readFileSync(path));

const getPort = () => 
  readFileSync('config.json')
  .map(contents => JSON.parse(contents))
  .map(config => config.port)
  .fold(() => 8080, x => x);

const result = getPort();

console.log(result);
```

Flatten Try Catch Monads
```js
//const fs = require('fs');

const Right = x =>        // used for finding value
({
  map: f => Right(f(x)),
  chain: f => f(x),
  fold: (f,g) => g(x),
  inspect: `Right(${x})`
});

const Left = x =>         // used for error handling
({
  map: f => Left(x),
  chain: f => Left(x),
  fold: (f,g) => f(x),
  inspect: `Left(${x})`
});

const fromNullable = x =>
  x != null ? Right(x) : Left(null);

const tryCatch = f => {  // only need one try catch function for errors
  try {
    return Right(f());
  }
  catch(e) {
    return Left(e);
  }
};

const readFileSync = path => tryCatch(() => fs.readFileSync(path));

const parseJSON = contents => tryCatch(() => JSON.parse(contents));

const getPort = () => 
  readFileSync('config.json')
  .chain(contents => parseJSON(contents))
  .map(config => config.port)
  .fold(() => 8080, x => x);

const result = getPort();

console.log(result);
```

**Debug**

Use console log with a custom function to view mapped functions at specific points of the code.

Custom log function
```js
const logMe = x => {
  console.log(x);
  return x;
}
```

Map custom function after map you want to see.
```js
const someVar = someVar =>
  someCode(someVar => thing)
  .map(something)
  .map(logMe) 
  .map(somethingelse)
  .map(logMe)
```

# Ternary Operator

`item to check ? if true do this : if false do this`

Easy to read and functional.
```js
const street = user => {
  const address = user.address;
  return address ? address.street : return "no street";
}
```

As a monad more verbose.
```js
const street = user =>
  from Nullable(user.adress)
  .map(address => address.street)
  .fold(() => "no street",x => x);
```
