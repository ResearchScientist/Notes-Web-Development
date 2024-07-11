JS is single threaded so executes one at a time

# Comments

`//` single line
`/* */` multi line

# Data Types

**undefined** not defined
**null** nothing
**boolean** True or False
**string** string
**number** number
**symbol** immutable primitive value
**object** stores key value pairs

# Conversion

`string(someItem)` converts someItem into a string
`parstInt(someItem)` converts someItem into an integer

# Variables

`var someName = "Kitty"` defines a global variable , identical vars allowed
`let someName = "Kitty"` defines a variable constrained to its scope , identical vars not allowed
`const someName = "Kitty"` defines an immutable variable

`var a;` declares a variable
`a = 5;` assigns a value to a variable
`var a = 10;` declares a variable and assigns a value to it

`"use strict";` forces error checking , such as duplicate vars or unused vars

**Scope**
Local Variables -- variables declared inside a function and only visible to that function
Global Variables -- variables declared outside of functions and visible by all functions

If a global variable and a local variable have the same name then the local variable is used.
Calling the function returns the local variable.
Calling the variable returns the global variable since the function was not called.

Declaring `var` inside a function can still make that variable be available outside its scope.
Declaring `let` inside a function forces that variable to only be accessible inside that function.
Declaring `const` anywhere makes that item a constant , use all caps for name.

Best to use `let` and `const` since they make use of error checking.

# Log

`console.log(a)` displays value of a

# Math Operations

`+ - * / %`

`if num % 2 = 0` then num is even

`someVar++;` increments
`someVar--;` decrements

`a += 10;` adds 10 to current value of a and makes result new value for a
`a -= 10;` subtracts 10 to current value of a and makes result new value for a
`a *= 10;` multiplies current value by 10 and makes result new value for a
`a /= 10;` divides current value by 10 and makes result new value for a

# Boolean Logic

`true` `false`

`==` true for unequal types such as `3 == '3'` (converts data types to be similar)
`===` false for unequal types such as `3 === '3'` (does not convert data types to be similar)
`!=` (converts data types to be similar)
`!==` (does not convert data types to be similar)
`>` `<` `>=` `<=`
`&&` and
`||` or

# Strings

**Quotes**
Enclose in single or double quotes.
Enclose in back ticks to use both single quotes and double quotes inside.

**Escape Characters**
`\'` single quote
`\"` double quote
`\\` backslash
`\n` newline
`\r` return
`\t` tab
`\b` backspace
`\f` form feed

**Concatenate**
`"one" + "" + "two"`

```javascript
var oneStr = "and ";
oneStr += "a one";
console.log(oneStr);
// and a one
```

```javascript
var myName = "Suki";
var myGreeting = "My name is " + myName + ". Meow!";
console.log(myGreeting);
// My name is Suki. Meow!
```

```javascript
var myName = "Suki";
var myGreeting = "My name is ";
console.log(myGreeting += myName);
// My name is Suki
```

**Template Strings**
`${}` serves as a variable
```js
`Hi ${firstName} ${lastName}`
```
**Properties**
`varName.length;` returns length of string

**Index**
`someVar[0];` returns character given by index location

# Arrays

Arrays are an ordered list of items.

`someArray = ["a","b","c",1,2,3];` simple array
`class = [["student a", "a"],["student b","b"],["student c","c"]];` multidimensional array

`class[1][0]` first index `[0]` returns second array `["student b","b"]` second index `[0]` returns first element within second array `"student b"`

**Push**
attaches item to end of array
```javascript
someArray = ["a","b","c",1,2,3];
someArray.push(['yeah','yeah']);
// ["a","b","c",1,2,3,['yeah','yeah']]
```
**Pop**
removes last item from array
```javascript
someArray = ["a","b","c",1,2,3,['yeah','yeah']];
removedArray = someArray.pop();
console.log(someArray,removedArray);
// ["a","b","c",1,2,3]
// ['yeah','yeah']
```

**Shift**
removes first item from array
```javascript
someArray = ["a","b","c",1,2,3,['yeah','yeah']];
removedArray = someArray.shift();
console.log(someArray,removedArray);
// ["b","c",1,2,3,['yeah','yeah']]
// a
```

**Unshift**
adds item to the beginning of an array
```javascript
someArray = ["a","b","c",1,2,3,['yeah','yeah']];
someArray.unshift("ok");
console.log(someArray);
// ["ok","a","b","c",1,2,3,['yeah','yeah']]
someArray.unshift(['sing','it']);
console.log(someArray);
// [['sing','it'],"ok","a","b","c",1,2,3,['yeah','yeah']]
```

**Traverse Array**
```js
const names = ['Suki','Hello Kitty','Pusheen'];

for (let i = 0; i < names.length; i++) {
  console.log(names[i]); // lists each item
}
```

Same as above.
```js
const names = ['Suki','Hello Kitty','Pusheen'];

names.forEach(function(name) {
  console.log(name);
});
```

# Functions

**Declare & Call**
```javascript
function someFunction() {  // declares function
    console.log('Hiya');
}

someFunction(); // calls function
```

**parameters** placeholders for values that a function can accept
**arguments** the values passed into a function

Parameters are optional but if they are declared then their arguments are required.

```javascript
function someFunction(A,B) {  // (parameterA,parameterB)
    console.log(A + B);
}
someFunction(1,2); // (argumentA,argumentB)
// 3
```

Parameters can be given a default value if none is passed in.
```javascript
function someFunction(A,B = 1) {  // (parameterA,parameterB is given value of 1)
    console.log(A + B);
}
someFunction(1); // (argumentA)
// 2
```

**Return**
Allows result of operation inside of function to be accessed outside of function.
```javascript
function someFunction(A) {
    return A - 2;
}
console.log(someFunction(10));
// 8
```

```javascript
var functionResult = 0;  // initialize variable

function someFunction(A) {
    return A - 2;
}

functionResult = someFunction(10);  // assign function call to initialized variable
console.log(functionResult);  // log variable
// 8
```

**return a boolean**
```javascript
function someFunction (a,b) {
    return a < b;
}
console.log(someFunction(1,2)) // true
console.log(someFunction(2,1)) // false
```

**anonymous functions**

```javascript
var today = function() {  // function has no name
    return new Date();
};

console.log(today())  // call function with var name and () , returns date today
```

**arrow functions**
```javascript
var today = () => new Date();  // same as above anonymous function

console.log(today())  // returns date today
```

**arrow functions with parameters**
```javascript
// anonymous function
var join = function(array1,array2) {
    return array1.concat(array2);
};
console.log(join(['a','b','c'],[1,2,3]));  // ["a","b","c",1,2,3]
```

```javascript
// arrow function
var join = (array1,array2) => array1.concat(array2);
console.log(join(['a','b','c'],[1,2,3]));  // ["a","b","c",1,2,3]
```

**arrow functions high order**
useful when one function takes another function as an argument
```javascript
// function that squares only the positive numbers in the list
const numList = [-10,-2,0,3,5,10];

const numsToSquare = (someList) => {
    const squaredNums = someList.filter(num => num > 0).map(x => x * x);
    return squaredNums;
}

const squaredNums = numsToSquare(numList);
console.log(squaredNums);  // [9,25,100]
```

**iife**

```js
const someImmediateFunction = (function() {
  // some code
})();
```

# Conditionals

**if** , **else if** , **else**

```javascript
function someFunction(someNum) {
    if (someNum < 5) {
        return "less than 5"
    }
    else if (someNum < 10) {
        return "less than 10"
    }
    else {
        return "more than or equal to 10"
    }
}
functionResult = someFunction('1');
console.log(functionResult);  // less than 5
functionResult = someFunction('8');
console.log(functionResult);  // less than 10
functionResult = someFunction('11');
console.log(functionResult);  // more than or equal to 10
```

# Switch

Evaluates an expression. Compares the expression's value against a given case and executes statements associated with that case.  
```javascript
function someFunction(someNum) {
    var answer = "";
    switch (someNum) {  // value to compare
        case 1:  // compares someNum to number 1
            answer = "alpha";
            break;
        case 2:  // compares someNum to number 2
            answer = "beta";
            break;
        case 3:  // compares someNum to number 3
            answer = "gamma";
            break;
        case "a":
        case "b":
        case "c":
            answer = "you gave a,b,c";
            break;
        default:  // if someNum does not match any cases given then the following code runs
            answer = "neither 1,2,3 or a,b,c";
            break;
    }
    return answer;
}
functionResult = someFunction(1);
console.log(functionResult);  // alpha
functionResult = someFunction(2);
console.log(functionResult);  // beta
functionResult = someFunction(3);
console.log(functionResult);  // gamma
functionResult = someFunction("a");
console.log(functionResult);  // you gave a,b,c
functionResult = someFunction("b");
console.log(functionResult);  // you gave a,b,c
functionResult = someFunction("c");
console.log(functionResult);  // you gave a,b,c
functionResult = someFunction(4);
console.log(functionResult);  // neither 1,2,3 or a,b,c
```

# Ternary Conditional

A one line if else statement
condition `?` run when true `:` run when false `;`
```javascript
function sameness(a,b) {
    return a === b ? "same" : "not same";
}
console.log(sameness(1,1)) // same
```

```javascript
function signess(a) {
    return a > 0 ? "positive" : a < 0 ? "negative" : "0"; // nested conditionals
}
console.log(signess(0))
```

# Objects

Items in objects have not inherit order.

**Initialize Object**
```javascript
var cat = {
    "name": "Suki",
    "age": 5,
    "mood": "happy",
};
```

**Accessing Object Properties**

```javascript
/*  Dot Notation  */
var cat = {
    "name": "Suki",
    "age": 5,
    "mood": "happy",
};
var theName = cat.name;  // use dot notation (object.property)
console.log(theName);    // Suki
```

```javascript
/*  Bracket Notation  */  // use when property has blank spaces
var cat = {
    "first name": "Suki",
    "estimated age": 5,
    "current mood": "happy",
};
var firstName = cat["first name"];  // use bracket notation (object[property])
console.log(firstName);    // Suki
```
```javascript
/*  Variables  */  // useful when you want to iterate through the properties
var catNames = {
    1: "Suki",
    2: "Hello Kitty",
    3: "Pusheen",
};
var catName = 1;                // assign var for property, can be set to 0 or empty
var cat = catNames[catName];    // assign property and previous var to a new var
console.log(cat);               // Suki
```

Access with dot notation and variable templates.

```js
const cat = {
  name: {
    first: "Hello",
    last: "Kitty"
  },
  address: {
    streetNumber: 123,
    streetName: "Nap Lane"
  },
  getAdress() {
    return `${this.name.first} ${this.name.last} ${this.address.streetNumber} ${this.address.streetName}`;
  }
};

console.log(cat.getAdress());
```

**Change Object Properties**
```javascript
var cat = {
    "name": "Suki",
    "age": 5,
    "mood": "happy",
};
cat.name = "Happy Suki"  // use dot notation to access the property then use assignment operator to change the property value
var theName = cat.name;
console.log(theName);    // Happy Suki
```

**Add Object Properties**
```javascript
var cat = {
    "name": "Suki",
    "age": 5,
    "mood": "happy",
};
cat.size = "small"     // use dot notation to introduce the new property (object.newProperty)
                       // or
cat["size"] = "small"  // use bracket notation to introduce the new property (object["newProperty"])
```

**Remove Object Properties**
```javascript
var cat = {
    "name": "Suki",
    "age": 5,
    "mood": "happy",
    "size": "small"
};
delete cat.size;
```

**Check Object Properties**
```javascript
var cat = {
    "name": "Suki",
    "age": 5,
    "mood": "happy",
};


function lookForProperty (someProperty) {
    if (cat.hasOwnProperty(someProperty)) {
        return cat[someProperty]
    }
    return someProperty + " " + "not found"
}

property = "mood"
findProperty = lookForProperty(property)
console.log(findProperty);    // happy

property = "bath"
findProperty = lookForProperty(property)
console.log(findProperty);    // bath not found
```

**Array of Objects**
```javascript
var pets = [
    {  // object 1
    "name": "Suki",
    "age": 5,
    "moods": ["playful","hungry","indiferent"],
    "toys": true
    },
    {  // object 2
    "name": "Pusheen",
    "age": 10,
    "moods": ["silly","hungry","lazy"],
    "toys": false
    }
];
```

**Accessing Properties Within Array of Objects**
```javascript
var pets = [ {
    "name": "Suki",
    "age": 5,
    "moods": ["playful","hungry","indifferent"],
    "toys": true
},
{
    "name": "Pusheen",
    "age": 10,
    "moods": ["silly","hungry","lazy"],
    "toys": false
}
];

var pet2mood = pets[1].moods[0];
console.log(pet2mood);  // silly
```

**Accessing Properties Within Arrays of Objects Using For Loops**
```javascript
var pets = [ {
    "name": "Suki",
    "age": 5,
    "moods": ["playful","hungry","indiferent"],
    "toys": true
},
{
    "name": "Pusheen",
    "age": 10,
    "moods": ["silly","hungry","lazy"],
    "toys": false
}
];

function giveProperty(petName,petProperty) {
    for (var i = 0; i < pets.length; i++) {
        if (petName === pets[i].name) {
            return pets[i][petProperty] || "property " + petProperty + " not found";  // use or operator as an else statement
        }
    }
    return petName + " not found"
}

findIt = giveProperty("Pusheen","age")
console.log(findIt);  // 10
```

`Object.freeze(someVar)` makes it so that the object cannot be mutated

```javascript
// object mutable
const cat = {
    "name": "Suki",
    "age": 5,
    "mood": "happy"
};
console.log(cat)  // {name: "Suki", age: 5, mood: "happy"}
cat.mood = "sad";
console.log(cat)  // {name: "Suki", age: 5, mood: "sad"}
```

```javascript
// object immutable
const cat = {
    "name": "Suki",
    "age": 5,
    "mood": "happy"
};
console.log(cat)    // {name: "Suki", age: 5, mood: "happy"}
Object.freeze(cat); // makes object immutable , yay no more sad cat
cat.mood = "sad";
console.log(cat)    // {name: "Suki", age: 5, mood: "happy"}
```

# Dictionary

`{item:value}`
```javascript
var someDict = {"one":"uno","two":"due","three":"tre"};
console.log(someDict);  // {one:"uno",two:"due",three:"tre"}
```

**Translate Function**
```javascript
function translateThis(word) {
    var translation = "";
    var someDict = {"one":"uno","two":"due","three":"tre"};
    translation = someDict[word];
    return translation;
};
theTranslation = translateThis("two");
console.log(theTranslation);
```

# JSON

`var someFunctionCopy = JSON.parse(JSON.stringify(someFunction));` saves a copy of the specified function

# Loops

**while**
```javascript
var someArray = [];      // define array
var i = 0;               // initialize counter

while (i < 5) {          // specify condition
    someArray.push(i);   // add item
    i++;                 // increment counter
}

console.log(someArray);  // [0,1,2,3,4]
```

**for**
```javascript
var someArray = [];            // define array

for (var i = 0; i < 5; i++) {  // initialize counter , specify condition , increment counter
    someArray.push(i);         // add item
}

console.log(someArray);        // [0,1,2,3,4]
```

**increment count**
```javascript
// even
var someArray = [];

for (var i = 0; i < 10; i += 2) {  // start at 0 , increment by 2
    someArray.push(i);
}

console.log(someArray);  // [0,2,4,8]
```

```javascript
// odd
var someArray = [];

for (var i = 1; i < 10; i += 2) {  // start at 1 , increment by 2
    someArray.push(i);
}

console.log(someArray);  // [1,3,5,7,9]
```

**iterate through array**
```javascript
var someArray = [1,2,3,4];                    // array to itrate through
var sum = 0                                   // initiate variable

for (var i = 0; i < someArray.length; i++) {  // someArray.length returns array's length
    sum += someArray[i];                      // adds current index value to variable sum
}

console.log(sum);                             // 10
```

**nested arrays**
```javascript
function multiplying(nestedArrays) {
    var result = 1;                                         // initiate variable
    for (var i = 0; i < nestedArrays.length; i++) {         // iterate through outer arrays , (one array contains 2 arrays)
        for (var j = 0; j < nestedArrays[i].length; j++) {  // iterate through inner arrays , (two arrays each contain 3 items)
            result *= nestedArrays[i][j];                   // multiply each item
        }
    }
    return result;
}

var result = multiplying([[1,2,3],[4,5,6]]);                // arrays to pass into function
console.log(result);                                        // 720
```

**do while**
```javascript
// in a while loop the condition is checked before the function is run
var someArray = []
var i = 10;

while (i < 5) {
    someArray.push(i);
    i++;
}

console.log(someArray,i);  // [] 10
// an empty array is returned because the function did not run since i !< 5 
```

```javascript
// in a do while loop the function is run once before the condition is even checked
var someArray = []
var i = 10;

do {
    someArray.push(i);
    i++;
} while (i < 5)

console.log(someArray,i); // [10] 11
// array is 10 because the var i was pushed into the array , then i was incremented by 1 to give 11 , then the condition was checked and since 11 !< 5 the loop does not run again
```

# Built In Math Functions

`Math.random` returns a number between 0 and 1 , includes 0 , does not include 1
`Math.floor` rounds number down to a whole number
`Math.floor(Math.random()*10)` returns a whole number between 0 and 9

```javascript
function randomRange(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(randomRange(5,10)) // returns whole number between 5 and 10
```

`parseInt("5")` converts passed string into an integer , returns 5
`parseInt("00101",2)` optional 2nd parameter is default base 10 , from passed binary returns 5

# Operators

`...` rest operator allows functions to take a changing number of arguments

```javascript
// adds numbers passed in (function can only take in 3 numbers)
const adding = (function() {
    return function adding(x,y,z) {
        const arguments = [x,y,z];
        return arguments.reduce((a,b) => a + b, 0);
    };
})();
console.log(adding(1,2,3)); // 6
```

```javascript
// adds numbers passed in (function can take any quantity of numbers)
const adding = (function() {
    return function adding(...arguments) {
        return arguments.reduce((a,b) => a + b, 0);
    };
})();
console.log(adding(1,2,3)); // 6
console.log(adding(1,2,3,4)); // 10
```

`...` spread operator makes an independent copy of an array
```javascript
const array1 = [1,2,3];
let array2;
array2 = array1;     // makes a copy , both point to same memory location
console.log(array2); // [1,2,3]
array1[0] = 0;
console.log(array2); // [0,2,3]
```

```javascript
const array1 = [1,2,3];
let array2;
array2 = [...array1]; // makes a copy , both point to different memory locations
console.log(array2);  // [1,2,3]
array1[0] = 0;
console.log(array2);  // [1,2,3]
```

# Destructuring Objects

```javascript
// construct object
const cat = {
    "name": "Suki",
    "age": 5,
    "mood": "happy"
};
console.log(cat)  // {name: "Suki", age: 5, mood: "happy"}

// assign var to each object property
const name = cat.name;
const age = cat.age;
const mood = cat.mood;

// access each var
console.log(name,age,mood); // Suki 5 happy
```

```javascript
// construct object
const cat = {
    "name": "Suki",
    "age": 5,
    "mood": "happy"
};
console.log(cat)  // {name: "Suki", age: 5, mood: "happy"}

// assign var a b c to each object property
const {name : a, age : b, mood : c} = cat;

// access each variable
console.log(a,b,c); // Suki 5 happy
```

using a function to destructure an object
```javascript
const dinners = {
    "mon": "crunchy cakes",
    "tue": "fish fingers and custard",
    "wed": "chewy soup"
};

// can expand on this code by adding if statements for each day
function whatsForDinner (dinner) {
    'use strict';
    const {mon : monday, tue : tuesday, wed : wednesday} = dinner;
    return monday
}

console.log(whatsForDinner(dinners));
```

destructure nested objects
```javascript
const dinners = {
    mon: {main: "crunchy cakes", dessert: "pudding"},
    tue: {main: "fish fingers and custard", dessert: "more custard"},
    wed: {main: "chewy soup", dessert: "tart"}
};

function whatsForDinner (dinner) {
    'use strict';
    const {mon: {main: mainDish}} = dinner; // assigns var mainDish to item mapped to property main
    return mainDish;
}

console.log(whatsForDinner(dinners)); // crunchy cakes
```

destructure arrays
```javascript
const [x,y,z] = [1,2,3,4,5];      // arrays are accessed in order
console.log(x,y,z);               // 1 2 3
const [x, ,y, ,z] = [1,2,3,4,5];  // blank spaces skip the number in the array
console.log(x,y,z);               // 1 3 5
```

```javascript
let a = 1, b = 2;
(() => {"use strict"; [a,b] = [b,a]})();  // order of a,b is switched
console.log(a,b);                         // 2 1
```

```javascript
// retrive only array
const someList = [1,2,3,4,5];

function removeTwo(list) {
    const [ , , ...array] = list;
    return array;
}

const array = removeTwo(someList);
console.log(array);    // [3,4,5]
console.log(someList); // [1,2,3,4,5]
```

```javascript
// retrive only a
const someList = [1,2,3,4,5];

function removeTwo(list) {
    const [a,b, ...array] = list;
    return a;
}

const array = removeTwo(someList);
console.log(array);    // 1
console.log(someList); // [1,2,3,4,5]
```

```javascript
// retrive only b
const someList = [1,2,3,4,5];

function removeTwo(list) {
    const [a,b, ...array] = list;
    return array;
}

const array = removeTwo(someList);
console.log(array);    // 2
console.log(someList); // [1,2,3,4,5]
```

pass an object as a parameter for a function
```javascript
// use when only certain parameters are needed
const dinners = {
    "mon": "crunchy cakes",
    "tue": "fish fingers and custard",
    "wed": "chewy soup"
};

const justTwo = (function() {
    return function justTwo({mon,tue}) {
        return (mon + " then " + tue);
    };
})();

console.log(dinners);          // {mon:"crunchy cakes,tue:"fishfingers and custard",wed:"chewy soup"}
console.log(justTwo(dinners)); // crunchy cakes then fish fingers and custard
```

` `` ` allows for variables to be passed into strings
`${object.parameter}` accesses object's parameter to be displayed in string
```javascript
const cat = {
    "name": "Suki",
    "age": 5,
    "mood": "happy"
};
const greeting =`Hi my name is ${cat.name}. I feel ${cat.mood}.`; // variable call inside string

console.log(greeting); // Hi my name is Suki. I feel happy.
```

**Add An HTML Element**
```javascript
const cats = {
    "names": ["Suki","Hello Kitty","Pusheen"],
    "ages": [5,20,8],
    "moods": ["loving","happy","hungry"]
};

function makeList(array) {  // makes array for consisting of each cat name
    const displayArray = [];
    for (let i = 0 ; i < array.length; i++) {
        displayArray.push(`<li class="cat-name">${array[i]}</li>`)
    }
    return displayArray;
}

const displayArray = makeList(cats.names);
console.log(displayArray);  // ["<li class=\"cat-name\">Suki</li>","<li class=\"cat-name\">Hello Kitty</li>","<li class=\"cat-name\">Pusheen</li>"]
```

# Make Object With Passed Parameters

```javascript
// long method
const makeCat = (name,age,mood) => {
    return {
        name: name,
        age: age,
        mood: mood
    };
};

console.log(makeCat("suki",5,"happy")); // {name: "suki", age: 5, mood: "happy"}
```

```javascript
// short method
const makeCat = (name,age,mood) => ({name,age,mood});

console.log(makeCat("suki",5,"happy"));
```

# Function Nested Within Object

```javascript
const boat = {
    speed: "slow",
    setSpeed: function(newSpeed) { // nested function that changes speed
        "use strict";
        this.speed = newSpeed;
    }
};

boat.setSpeed("fast");   // "fast" passed into nested function
console.log(boat.speed); // object parameter speed returns fast
```

# Class for Defining a Constructor Function

```javascript
// constructor
const ship = function(destination) {
    this.destination = destination;
}
// define specific ship and destination
var promethious = new ship("homeworld");
// call object parameter
console.log(promethious.destination);  // homeworld
```

```javascript
// class with constructor
class ship {
    constructor(destination){
        this.destination = destination;
    }
}
// define specific ship and destination
var promethious = new ship("homeworld");
// call object parameter
console.log(promethious.destination); // homeworld
```

```javascript
// function with class and constructor
function makeShip() {
    class ship {
        constructor(name){
            this.name = name;
        }
    }
    return ship;
}

const ship = makeShip();
// define specific ship and destination
const promethious = new ship("promethious");
// call object parameter
console.log(promethious.name);
```

# Object With Getters and Setters

```javascript
function makeClass() {
    class convertTemperature {
        constructor(temp) {
            this._temp = 5/9*(temp-32); // underscore signifies a private varialbe , changes temp to celcius
        }
        get temperature() {
            return this._temp; // returns temperature now in celcius
        }
        set temperature(newTemp) {
            this._temp = newTemp;
        }
    }
    return convertTemperature;
}
// not sure why this below is so convoluted
const convertTemperature = makeClass();
const celTemp = new convertTemperature(76);
let temp = celTemp.temperature;
/*celTemp.temperature = 26;
temp = celTemp.temperature;*/

console.log(temp); // 24.44
```

# Import and Export

`import` calls a variable or function from another file
`export` makes a variable or function available for export to another file

**import selected items from file**
```javascript
// top of html file should add type="module"
<script src="javascript.js" type="module"></script>

// top of main js file
import {capitalizeString} from "./javascriptother.js" // ./ indicates same directory

const capi = capitalizeString("hiya");
console.log(capi);  // HIYA

// top of other js file
export {def as default};  // must state a default
export const capitalizeString = str => str.toUpperCase();  // function to export
let def = "I'm the default"
// can list as many variables and functions as needed
```
**import all items fro file**
```javascript
// top of other js file
export {def as default};  // must state a default
export const capitalizeString = str => str.toUpperCase();  // some function
let def = "I'm the default" // some default
export let a = 1;  // some variable
export let b = 2;  // some variable

// top of main js file
import * as all from "./javascriptother.js";

const capi = all.capitalizeString("hiya");
const a = all.a
const b = all.b
console.log(capi,a,b); // HIYA 1 2
```

**import default**
```javascript
// main js file
import def from "./javascriptother.js";
console.log(def); // I'm the default

// other js file
export {def as default};  // must state a default
let def = "I'm the default"
export let a = 1;
export let b = 2;
```

3 20 25 on video javascript tutorial for beginners