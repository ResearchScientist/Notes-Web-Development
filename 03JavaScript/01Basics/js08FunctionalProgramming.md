Where as object oriented programming focuses on objects as nouns.
Functional programming focuses on functions as verbs.

# Objects

**Dot Assignment**
```js
var person = [];

person.name = "Ms White";

var who = person.name;

console.log(who); // Ms White

person.name = "Ms Black";

console.log(who); // Ms White
```

Primitive values are passed by value. (a new copy is made)
Objects are passed by reference. (a new pointer references the same data)

Therefore good practice is to make your functions immutable by making a copy of their output and referencing that output and not the function itself.

**Bracket Notation**
```js
var person = [];
var greet = "Hi";

greet;                    // Hi

person[0] = "Oi";         // Oi
person[greet] = "Hello";  // Hello , property name is Hi
person["greet"] = "Hiya"; // Hiya  , property name is greet

person.0 = "Oi";          // error

```

**Summary**

Use dot notation for strings.
Use bracket notation for strings, numbers, variables, expressions.

# Destructuring

Used for writing less code when extracting elements from an object.

**Multiple Assignments**
```js
let [a,b] = ['air','breathe'];
const [a,b] = ['air','breathe'];

let {a,b} = {a: 'air', b: 'breathe'};
const {a,b} = {a: 'air', b: 'breathe'};
```

**Extract**
```js
a // air
b // breathe
```

**Summary**

Not necessary to name the object when assigning key value pairs. Also calling its property (a or b) is same as `objectName.propertyName`.

**Swap Variables**

long way
```js
var a = 1 , b = 2;
var temp = a;
a = b;
b = temp;
```

short way
```js
var a = 1 , b = 2;
[a,b] = [b,a];
```
# List Transformations

**Nesting**
```js
const game = {
  'cats' : [
    {
      name: "suki",
      colour: "calico"
    }, {
      name: "pusheen",
      colour: "gray"
    }
  ]
}

function foo() {
  for(let i=0; i<game.cats.length; i++) {
    console.log(game.cats[i]);
  }
}

foo();  // object {name:suki,colour;calico} , object {name:pusheen,colour:gray}
```

**Matching**
```js
const game = {
  'cats' : [
    {
      name: "suki",
      colour: "calico"
    }, {
      name: "pusheen",
      colour: "gray"
    }
  ]
}

var gameLoop = function(game) {
  for (var i = 0; i < game.cats.length; i++) {
    for (var key in game.cats[i]) {
      if (game.cats[i][key] === "pusheen") {
        console.log("found you");
      } else {
        console.log("next");
      }
    }
  }
}

gameLoop(game); // next found you
```

**Assignment**
```js
const game = {
  'cats' : [
    {
      name: "suki",
      colour: "calico"
    }, {
      name: "pusheen",
      colour: "gray"
    }
  ]
}

// long way
const firstColour = game.cats[0].colour;
const secondColour = game.cats[1].colour;

// short way
var [{colour: firstColour}, {colour: secondColour}] = cats;
```

# List Hidration

Iterates through a list and adds items to object.

**For**
```js
function makeCatsObjects(name) {
  return {
    name: name,
    colour: name.split(' ')[1],
    speak() {
      log("my name is ${name}");
    }
  };
};

var cats = ['suki', 'pusheen', 'kitten'];
var catsList = [];

for(var i = 0; i < cats.length; i++) {
  catsList.push(makeCatsObjects(cats[i]));
  console.log(cats[i]);
}
```

**Map vs Each**

Map returns and array. So make an empty array to store the output.
Each does not return anything.

# Arrow Functions

Arrow replaces function word.
```js
var functName = (name,sex) => {
  return `hi ${name} you're a ${sex}`;
};
```
# Spread Operator

Gathers extra arguments into an array.

Ignores the argument no one.
```js
const makeTuple = (a,b,c,d) => {
  result = [[a,c],[b,d]];
  console.log(result);
}

makeTuple('it','be','could','anyone','no one');
// ['it', 'could'] ['be', 'anyone']
```

Combines arguments anyone and no one into one array.
```js
const makeTuple = (a,b,c, ...d) => {
  result = [[a,c],[b,d]];
  console.log(result);
}

makeTuple('it','be','could','anyone','no one');
// ['it', 'could'] ['be', ['anyone','no one']]
```

# Pseudo Array

Make string from an array like string.
```js
const makeArray = function() {
  const arr = Array.prototype.slice.call(arguments);
  arr.push('the cookies?');
  return arr.join(' ');
};

var eat = makeArray('Did','you','eat');
console.log(eat);  // returns string Did you eat the cookies?
```

Simpler way using from.
```js
const makeArray = function() {
  const arr = Array.from(arguments);
  arr.push('the cookies?');
  return arr.join(' ');
};

var eat = makeArray('Did','you','eat');
console.log(eat);  // returns string Did you eat the cookies?
```

# Global Scope

**Window**

Use `window.` to assign a function to a global variable.
```js
var someFunction = function () {
  // do something;
};

window.globalReachingFunction = someFunction;
```

# Callbacks

Callbacks are functions passed to a function.

**High Order Functions**

Take a function as an argument (input).
```js
element.addEventListener("change", function() {
  //do something;
});
```

Return a function as an output.
```js
function () {
  // do something;
  return anotherFunction() {
    // do something;
  };
};
```

**Arrow Function**
```js
const doIt = (condition, isTrue, isFalse) => {   // 3 parameters
  return condition ? isTrue() : isFalse();       // checks condition , runs isTrue() if True , runs isFalse() if False
};

const logTrue = () => {console.log('true');};    // assign function to constant
const logFalse = () => {console.log('false');};  // assign function to constant

doIt(true, logTrue, logFalse);  // call function and pass 3 arguments, 2 are functions
```

Long Method
```js
var increment = function(n) { return n + 1; }:
var square = function(n) { return n * n };
var doMath = function(n, func) { return func(n); };

doMath(5,increment);
doMath(5,square);
```

Short Method
```js
const increment = n => { return n + 1; };
const square = n => { return n * n; };
const doMath = (n func) => { return func(n); };

doMath(5,increment);
doMath(5,square);
```

**Pass Function As Argument**

Simply give the function name as an argument.
Make sure someFunction has the matching parameters.
Order matters.
```js
const someFunction = (parameter1,parameter2) => {
   // do something
  };

someFunction(arg1,func1);
```

# Closure

A nested function that when returned retains its var.
```js
// Definition
var outerVar = "global scope";

function outerFunc() {
  var innerVar = "local scope";
  function innerFunc() {
    return innerVar;
  };
  return innerFunc;
};

// Execution
var test = outerFunc();
test;                    // this holds the inner function
test();                  // this runs the outer function
```

An example.
```js
const heyCat = () => {
  const say = () => {
    console.log(meow);
  };
  let meow = 'mew mew';
  return say;
};

const findCat = heyCat();

findCat();
```