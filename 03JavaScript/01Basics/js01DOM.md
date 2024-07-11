# Variables

`var` a value restricted by scope to within a whole function
`let` a value restricted by scope to within `{}`
`const` a constant immutable value

Variables can begin with letters _ and $. Can contain numbers.

# Data Types

**Primitive**
strings , numbers , boolean , undefined , null

**Object**
lists , arrays , functions

**Special Values**
`NaN`
`Infinity`

`type of` returns what type of data is passed
```javascript
x = 1
console.log(typeof x); // number
```

# Operators

**Math**
`+` `-` `*` `/` `%`
`++` increment
`--` decrement
```
// variable++
var a = 1;
console.log(a++); // 1 (returns 1 then increments value)
console.log(a);   // 2
```
```
// ++variable
var a = 1;
console.log(++a); // 2 (increments value then returns 2)
console.log(a);   // 2
```

**Logical**
`&&` and
`||` or
`!` not

**Comparison**
`==` equal
`===` strict equal
`!==` not equal
`!===` strict not equal
`>` greater than
`<` less than
`>=` greater than or equal to
`<=` less than or equal to

# Statements

`let x = 1;` variable statement
`c = a + b;` expression statement
`{}` block statement holds variable and expression statements


# Strings

Strings are immutable. Assign to a new variable to access changes.

**Concatenate**
`var1 + var2`
`var1 += "something to append"`
`concat()`
```javascript
var1 = 'hi';
var2 = 'there';
var3 = var1.concat(var2);
console.log(var3); // hithere
```

Convert a number to a string by adding a blank string.
```javascript
let n = 1;  // n is a number
n = "" + n; // n is a string
```

Convert a string to a number.
`parseInt()` converts string to integer
`parseFloat()` converts string to float

```javascript
var a = 3.141;
var b = parseInt(a);
var c = parseFloat(a);
console.log(a); // 3.141
console.log(b); // 3
console.log(c); // 3.141
```

**Escape Characters**
`\'`
`\"`
`\\`

**Special Characters**
`\n` new line
`\t` tab

**Methods**

`someString.concat(someOtherString);` joins someString and someOtherString
`someString.toUpperCase()` returns upper case
`someString.toLowerCase()` returns lower case
`someString.charAt(0)` returns character found at given index
`someString.lastIndexOf('a')` returns index of last occurrence of passed character within string
`someString.indexOf('a')` returns index of passed character within string , returns -1 if not found
`someString.indexOf('a',2)` 1st parameter character to find , 2nd parameter index to begin search
`someString.split(" ")` returns an array where elements are separated by passed argument (,. )
`someString.join(" ")` returns string where elements are joined by passed argument
`someString.slice(a,b)` returns substring between given indexes
`someString.substring(a,b)` returns substring between given indexes

Remove Characters
```javascript
s = 'kitten';
console.log(s.substring(0,s.length-1)); // kitte

function removeChars(s,index,numChars) {
    return s.substring(0,index) + s.substring(index + numChars);
}

bye = removeChars(s,1,3);
console.log(bye); // ken
```

Replace Characters
```javascript
s = 'kitten';

function changeChars(s,index,Char) {
    return s.substring(0,index) + Char + s.substring(index + Char.length);
}

dif = changeChars(s,0,"b");
console.log(dif); // bitten

dif = changeChars(s,3,"ch");
console.log(dif); // kitchn
```

# Numbers

**Native Methods**
non destructive
`someVar.toFixed()` sets decimal places
`someVar.toExponential()` returns scientific notation
`someVar.toString()` converts to a string
```javascript
let n = 255.123;
console.log(n);             // 255.123
let n1 = n.toFixed(1);
console.log(n1);            // 255.1
let n2 = n.toExponential();
console.log(n2);            // 2.55123e+2
let n3 = n.toString(10);
console.log(n3);            // 255.123
let n4 = n.toString(16);
console.log(n4);            // ff.1f7ced91687
let n5 = n.toString(2);
console.log(n5);            // 11111111
```

# Math

`Math.random();` returns number between 0 and 1
`Math.round();` rounds to whole number
`Math.round(5*Math.random())` returns whole number between 0 and 5
`Math.PI` returns pi
`Math.min(a,b)` returns smaller number a or b
`Math.max(a,b)` returns larger number a or b
`Math.pow(2,3)` returns 8 , 2^3
`Math.sqrt(25)` returns 5
`Math.sin(Math.PI/2)` returns 1

# Date

`new Date();` object containing current date and time

**Display Current Date**
```javascript
var date = new Date();
console.log(date);       // 2019-03-14T20:25:00

s = date.toString();
console.log(s);          // Thu Mar 14 2019 13:25:00 GMT Pacific Daylight Time

var stringDate = Date();
console.log(stringDate); // Thu Mar 14 2019 13:25:00 GMT Pacific Daylight Time
```
**Get Specific Days**
```javascript
// returns what days of the week valentines day is on
var dayOfTheWeek = [0,0,0,0,0,0,0];               // set each day to be 0
for (var year = 2019; year <= 2020; year++) {     // look between 2019 and 2020
    dayOfTheWeek[new Date(year,1,14).getDay()]++; // months are 0 indexed
}
console.log(dayOfTheWeek);  // [0,0,0,0,1,1,0]  thu and fri
```

# Objects

**Declaration**

One object literal
`let someVar = { property : value };`
```javascript
let cat = {
    name: 'suki',
    age: 5,
    mood: 'happy'
}
```
nested objects
```javascript
let cat = {
    name: 'suki',
    age: 5,
    mood: 'happy',
    parents: {
        mom: 'panther',
        dad: 'jaguar'
    }
};
```
**Access Properties**
`someVar.someProperty`
```javascript
console.log(cat.age);    // 5
console.log(cat['age']); // 5  bracket notation allows for spaces within the property name , can also start with a number
var name = cat.name;
console.log(name); // suki
var name = cat['name'];
console.log(name); // suki
```
nested objects
```javascript
console.log(cat.parents.mom);       // panther
console.log(cat['parents']['mom']); // panther
```

**Custom Method**

A function as an object's property is a method.
```javascript
let cat = {
    name: 'suki',
    age: 5,
    mood: 'happy',
    meaw: function() { // property meaw has a value that is a function
        return "meauw";
    }
};
```
Calling a method.
```javascript
// display on console
console.log(cat.meaw()); // meauw , use the property name with () as the function name

// add into an existing p element with id kittySays
// html <p id="kittySays"></p>
let words = cat.meaw();
function catTalk() {
    let intoP = document.querySelector('#kittySays');
    intoP.append(words);
}
catTalk(); // meauw , as content inside a p element
```

**This**
`this.propertyName` allows properties to reference each other within an object

```javascript
let cat = {
    name: 'suki',       // property as an item
    age: 5,
    mood: 'happy',
    talk: function() {  // property as a method
        return "I'm " + this.name + this.greeting(); // calls other function inside same object
    },
    greeting() {
        return " miauuw ";
    }
}

console.log(cat.talk()); // I'm suki miauuw
```

**Adding and Deleting Properties**

JS allows properties and methods to be added and deleted after making an object.
Other languages do not allow it.

add properties and methods
```javascript
let cat = {};            // empty object

cat.name = 'suki';       // property and its value declared
cat.age = 5;
cat.talk = function() {  // property and its method declared
    return "miu miu " + this.name + this.greeting();
};
cat.greeting = function() {
    return " miauw ";
};

console.log(cat.talk()); // miu miu suki miauw
```

delete properties
```javascript
delete cat.age;  // removes property age from object cat
```

# Classes

`class ClassName {}` defines the class , capitalize name per convention
`constructor(parameter1,parameter2) {}` constructs parameters to be used within class
`this.parameter1 = parameter1` defines property name as name of the parameter
`someMethod() {}` defines a method along with its code
`let someVar = new ClassName('argument1','argument2');` calls class and creates new object with given arguments

```javascript
class Kitten {                                   // defines class
    constructor(name,age,talk) {                 // constructs parameters
        this.name = name;                        // parameter 1
        this.age = age;                          // parameter 2
    }
    talk() {                                     // defines instance method
        var greeting =  "miu miu " + this.name;  // assigns function to a variable
        return greeting;                         // returns variable
    }
}

var suki = new Kitten("Suki",5);                 // creates object Suki based on class kitten

console.log(suki.talk());                        // calls talk method inside Suki object
```

**Class Property**
`ClassName.someVariable` defines a class property
```javascript
class Kitten {
    constructor(name,age,talk) {
        this.name = name;     // instance property
        this.age = age;       // instance property
        Kitten.kittensMade++; // class property incremented
    }
    talk() {
        var greeting =  "miu miu " + this.name;
        return greeting;
    }
}

Kitten.kittensMade = 0; // class property value set to 0

var suki = new Kitten("Suki",5);        // object 1
var pusheen = new Kitten("Pusheen",10); // object 2

console.log(suki.talk()); // miu miu Suki
console.log(Kitten.kittensMade); // 2 , since 2 objects were made
```

**Class Method**
`static.classMethod` refers to the class itself instead of to the instances the class creates
`ClassName.classMethod()` calls the class method which is inside the class
use when the function makes use of the instances properties
```javascript
class Kitten {
    constructor(name,age,talk) {
        this.name = name;
        this.age = age;
        Kitten.kittensMade++;  // class property value incremented
    }
    talk() {
        var greeting =  "miu miu " + this.name;
        return greeting;
    }
    static calcKittensMade() {     // class method
        return Kitten.kittensMade; // class property value returned
    }
}

Kitten.kittensMade = 0;  // class property value set to 0

var suki = new Kitten("Suki",5);        // object 1
var pusheen = new Kitten("Pusheen",10); // object 2

console.log(suki.talk());
console.log(Kitten.calcKittensMade()); // 2 , ClassName.classMethod()
```

# Object References

For primitive values the value is passed directly into the parameters.
For object values the reference to the object value is passed into the parameters.
```javascript
var x = 2;             // primitive value

function sum(a,b) {
    a = a+b;
    return a;
}
console.log(sum(1,2)); // 3
console.log(x);        // 2 , x is unmodified
```
```javascript
var obj = {x:1};

function sum(a,b) {
    a.x += b;
    return a.x;
}
console.log(sum(obj,2)); // 3
console.log(obj);        // 3 , object is modified
```
```javascript
var object1 = {name:'Hello Kitty'};
var copy = object1;
var object2 = {name:'Hello Kitty'};

console.log(object1.name);  // Hello Kitty
console.log(copy.name);     // Hello Kitty

copy.name = 'Pusheen';

console.log(object1.name);  // Pusheen
console.log(copy.name);     // Pusheen
// both object1 and copy are modified because they both point to the same memory location
// each variable is a pointer for the object

console.log(object1 === copy);    // true
console.log(object1 === object2); // false
// object1 and copy are equal because they both point to the same memory location
// object1 and object2 are not equal because they point to different memory locations
```

# Getters and Setters

`get` captures passed variable
`set` sets passed variable to a new value

```javascript
class Kitten {
    constructor(name,greeting) {
        this.name = name;
        this._greeting = greeting;
    }
    get greeting() { // getter
        return this._greeting.toUpperCase();
    }
    set greeting(newHi) { // setter
        // add validation for letters only
        this._greeting = newHi;
    }
    talk() {
        return (this.name + ' says ' + this._greeting);
    }
}

var suki = new Kitten("Suki","miu miu");        // object 1

console.log(suki.talk);     // not sure how to return this
console.log(suki.greeting); // MIU MIU
```



# Arrays

**Declaration**
`let someVar = [];`
```javascript
let cats = ['suki','hello kitty','pusheen'];
```

**Access Elements**
`someArray[index]`
```javascript
console.log(cats[0]); // suki

someArray[someArray.length-1] // returns last element of someArray
```

**Methods**
`someArray.length` returns number of elements within given array
`someArray.push(something)` adds passed element to end of array , destructive
`someArray.pop(something)` removes last element added , destructive
`someArray.sort()` sorts elements of given array , destructive
`someArray.join()` places given string between elements of array (,.-)
`someArray.slice(begin,end)` returns a subset of elements based on their index , (n,n-1) , non descrutive
`someArray.splice(1,2)` removes 2 elements starting from index 1 , destructive
`someArray.splice(1,2,'a','b')` removes 2 elements starting from index 1 , replaces them with a b
if you use `delete someArray[someIndex];` the element will be in the array as undefined

Sort objects based on their properties
```javascript
let kittens = [ // one array with 3 objects , each object has 3 properties
    {name: 'Suki', age: 5 , mood: 'happy'},
    {name: 'Hello Kitty', age: 50 , mood: 'cute'},
    {name: 'Pusheen', age: 10 , mood: 'lazy'}
];

console.log(kittens[0]);      // returns {name:"Suki",age:5,mood:"happy"}
console.log(kittens[0].name); // returns Suki

function compareAge(a,b) {
    if (a.age < b.age)
        return -1;
    if (a.age > b.age)
        return 1;
    return 0;
}

sorted = kittens.sort(compareAge);
console.log(sorted);  // returns array with 3 objects sorted by their age
```

`someArray.forEach(function(){});` runs function once for each element in array , the callback function can have up to 3 parameters , 1st = current element of the array 2nd = index of current element 3rd = the array (only 1st is required)

1 parameter
```javascript
let kittens = ['Suki','Hello Kitty','Pusheen'];

kittens.forEach (function(cat) {
    console.log(cat);
});  // Suki Hello Kitty Pusheen

kittens.forEach (function(cat) {
    var addCat = document.querySelector('#theCats');
    addCat.append(cat);
});  // writes Suki Hello Kitty Pusheen to DOM
```

2 parameters
```javascript
let kittens = [ // one array with 3 objects , each object has 3 properties
    {name: 'Suki', age: 5 , mood: 'happy'},
    {name: 'Hello Kitty', age: 50 , mood: 'cute'},
    {name: 'Pusheen', age: 10 , mood: 'lazy'}
];

kittens.forEach (function(cat,index) {
    var addCat = document.querySelector('#theCats');
    addCat += "name:" + cat.name + " age:" + cat.age + " index:" + index
    console.log(addCat);
});
// [object HTMLElement]name:Suki age:5 index:0
// [object HTMLElement]name:Hello Kitty age:50 index:1
// [object HTMLElement]name:Pusheen age:10 index:2
```

3 parameters
```javascript
kittens.forEach (function(cat,index,array) {
    var addCat = document.querySelector('#theCats');
    addCat += "name:" + cat.name + " age:" + cat.age + " index:" + index + " array length:" + array.length;
    console.log(addCat);
});
// [object HTMLElement]name:Suki age:5 index:0 array length:3
// [object HTMLElement]name:Hello Kitty age:50 index:1 array length:3
// [object HTMLElement]name:Pusheen age:10 index:2 array length:3
```

**Matrix**
Nested arrays.

```javascript
// 2x3 matrix consisting of 2 rows , 3 columns
let nestedArrays = [['a','b','c'],[1,2,3]];

nestedArrays[0][1]; // b
nestedArrays[1][0]; // 1
```

# Functions

**Declaration**
`function functionName(parameters) {code blocks}`
```javascript
function sums(a,b) {
    result = a + b;
    return result;
}
console.log(sums(1,2)); // 3 (arguments 1,2 are passed into function sums parameters)
```

An array named arguments is created automatically within each function. Their elements can be accessed like any array.
`arguments.length` returns number of arguments - 1.
`arguments[0]` returns first argument

# Conditional Functions

**if**
```javascript
let mood = 'happy';
if (mood === 'happy') {
    console.log('yay' + ' ' + mood); // yay happy
}
```

**else**
```javascript
let mood = 'sad';
if (mood === 'happy') {
    console.log('yay' + ` ` + mood);
} else {
    console.log('feeling' + ` ` + mood); // feeling sad
}
```

**if then else**
`(condition)? code block : code block;` if (condition = true) then (run code) else (run code)
```javascript
let mymood = 'sad';
mymood = (mymood === 'happy')? 'yay ' + mymood : 'feeling ' + mymood;
console.log(mymood); // feeling sad
```

# Switch

Useful for replacing multiple if else statements.
```javascript
let mood = 'cute';        // variable to pass into switch
let treat = '';           // variable for executed function

switch (mood) {           // switch function declaration
    case 'happy':         // case to check against passed parameter
    case 'hungry':
        treat = 'snack';  // code to run if any above are true
        break;
    case 'sad':
    case 'cute':
        treat = 'hug';
        break;
    case 'sleepy':
        treat = 'pet';
        break;
    default:              // code to run when none above are true
        treat = 'don\'t understand that mood';
        break;
}

console.log(treat);       // hug
```

# Loops

**while**
Code runs only while condition is true.
`while (condition) code block`
```javascript
let i = 0;
let count = 0;
while (i < 5) {
    i++;
    count += 1;
    console.log(i); // 1 2 3 4 5
    console.log(count); // 1 2 3 4 5
}
```

**do while**
Code runs once then runs again while the condition is true.
`do code block while (condition)`
```javascript
let i = 0;
do {
    console.log(i);
} while (i === 1); // 0 (only runs once since i != 1)
```

**for**
Code runs based on given variables and conditions.
`for (initialization; condition; increment) code block`
```javascript
for (let i = 0; i < 11; i++) {
    console.log(i); // 0 1 2 3 4 5 6 7 8 9 10
}
```
```javascript
// can initialize more than one variable and increment
for (let i = 0 , j = 0; i < 11; i++, j+=2) {
    console.log(i,j); // 0 0  1 2  2 4  3 6  4 8  5 10  6 12  7 14  8 16  9 18  10 20
}
```

**for in**
Iterates through an array.
`for (someVar) code block`
```javascript
let cat = {
    name: 'Suki',
    age: 5,
    mood: 'happy'
}

for(let property in cat) {
    console.log(property);  // name age mood
    console.log(cat[property]) // Suki 5 happy
    console.log(cat.name);  // Suki
}
```

**continue**
Skips current iteration and continues on with next iteration.
```javascript
for (let i = 0; i < 5; i++) {
    if (i === 3) {   // when i === 3 this iteration is skipped and the next one begins
        continue;
    }
    console.log(i);  // 0 1 2 4
}
```

**break**
Ends loop and exits out of function.
```javascript
let cats = ['suki','hello kitty','pusheen'];

function findCat(name,catList) {
    console.log('Total cats are: ' + catList.length); // total cats are: 3
    for(let i = 0; i < catList.length; i++) {
        if (catList[i] === name) {  // runs when name appears in the list
            console.log(name + ' is at location ' + i);
            break;  // ends the loop
        } else {
            console.log(name + ' not at ' + i);
        }
    }
}

findCat('hello kitty',cats); // hello kitty not at 0 , hello kitty is at location 1
```

# Callback Functions

A function passed as an argument for another function and executed within that function.

```javascript
window.addEventListener('click',processMyClick);

function processMyClick(event) {
    document.body.innerHTML += "you clicked me";
}

// writes 'you clicked me' to DOM when page clicked
```

# HTML Selector

`document.querySelector("#someElementID")` searches for given ID within DOM
`someVar.innerHTML` targets div content for given variable

```javascript
let someVar = document.querySelector("#someID"); // assigns var to search for given ID
someVar.innerHTML = "Div New Content"; // changes content of given ID to given string
```

# Targeting CSS

`document.querySelector("#someElementID")` searches for given ID within DOM
`someVar.style.someCSSproperty` targets CSS property for given variable

```javascript
let someVar = document.querySelector("#someID"); // assigns var to search for given ID
someVar.style.someCSSproperty = "someValue"; // changes CSS to given value
```

# Event Listeners

`onClick` listens for click event
Code can be split into html and js files.
```html
// html
<button onClick="addBackground();">Click Me</button>
```

```javascript
// javascript
function addBackground() {
    var title = document.querySelector("#sectionTitle");
    title.style.background = "black";
}
```
Better to have all code on js file.
`addEventListener(type of event,callback function);`
```javascript
// as a call back
window.addEventListener('click',processMyClick);

function processMyClick(event) {
    alert('click');  // pop up dialogue box
    document.body.innerHTML += "you clicked me"; // writes on html
} // notice functions do not require a semicolon
```
```javascript
// as shorthand for a callback
window.addEventListener('click',function(event) {
    alert('click');
    document.body.innerHTML += "you clicked me";
}); // this is executable so requires a semicolon
```
```javascript
// assign function directly to object
window.onclick = function(event) {
    alert('click');
    document.body.innerHTML += "you clicked me";
}; // this is executable so requires a semicolon
```
**Preferred Method**
```javascript
// best method for attaching multiple event listeners
document.getElementById('someDiv').addEventListener('click',function() {
    alert('clicked me');
},false);
```
**Add and Remove Event Listeners**
Remove event listeners once they are done to improve performance.
```javascript
let tickleME = document.querySelector('#tickleMe');
tickleME.addEventListener('click',theClick);

function theClick(event) {
    alert("you tickled me, but just once");
    tickleME.removeEventListener('click',theClick);
}
```

**Event Object**

The only parameter passed into an event listener is an event object.
`function someName(someEventObject) {code block}`

**Events**

_page_
`load` DOM has finished loading
`resize` document view is resized
`scroll` scrollbar is used
_keyboard_
`keydown` pressing a key
`keyup` releasing a key
_mouse_
`click` single click
`dblclick` double click
`mousedown` mouse button push
`mouseup` mouse button released
`mouseenter` pointer moves into an element
`mouseleave` pointer moves out of an element
`mouseout` pointer moves out of an element or into a child element
`mouseover` pointer is on an element
`mousemove` pointer moves while on an element
`contextmenu` right mouse click to open a menu


```javascript
window.addEventListener('keydown',processKeyDown);
// or
window.onkeydown = processKeyDown;
```

**Event Object Properties**

_object_
`someEventObject.type` name of the event
`someEventObject.target` HTML element that fires the event
_keyboard_
`someEventObject.key` keyboard key used
`someEventObject.code` keyboard key mapped
`someEventObject.keyCode` code for keyboard key used
_mouse_
`someEventObject.button` mouse button used
`someEventObject.pageX` mouse x coordinate relative to the page
`someEventObject.clientX` mouse x coordinate relative to viewport
`someEventObject.screenX` mouse x coordinate relative to screen
`someEventObject.detail` number of times mouse was clicked
`someEventObject.altKey` was alt pressed during mouse click
`someEventObject.ctrlKey` was ctrl pressed during mouse click
`someEventObject.shiftKey` was shift pressed during mouse click

```javascript
window.onkeydown = processKeyDown;

function processKeyDown(event) {
    let key = document.querySelector("#key");
    key.innerHTML += "key pressed " + event.key + " key code " + event.keyCode + "<br>";
}
```

**Event Object Methods**
`someEventObject.stopPropagation()` when multiple elements are listening for the same event , the one with this code keeps the others from being listened to once it fires
`someEventObject.preventDefault()` prevents default browser behaviour

**Page Readiness**
`window.onload = someFunction();` or `window.addEventListener('load',someFunction);`
waits to run someFunction until the DOM is completely loaded

```javascript
// good for testing that page has loaded
window.onload = loaded();

function loaded() {
    console.log("page loaded");
}
```
**User Input Field Events**

`focus` element gets focus
`blur` element looses focus
`input` slider moved or text entered
`change` content or checked state changes
`select` text highlighted
`submit` form submitted

# DOM

**Objects**
`window` access to the window (rarely used)
Global variables declared with `let` do not create a property on the global `window` object.
Global variables declared with `var` create a property on the global `window` object and can be inspected with the console.

```javascript
var a = 1;
console.log(a);           // 1
console.log(window.a);    // 1
console.log(window['a']); // 1

let b = 1;
console.log(b);           // 1
console.log(window.b);    // undefined
console.log(window['b']); // undefined
```

**Properties**
`document` access to the elements (document is the same as window.document)

**Methods**

Predefined functions for the global object window.
`parseInt()` or `window.parseInt()` returns integer from passed string
`alert` or `window.alert` DOM pop up window
`prompt` or `window.prompt` DOM pop up window
`addEventListener` or `window.addEventListener` adds event listener
`someVar.valueOf()` returns value of the passed object
`someVar.toString()` converts passed variable into a string
```javascript
var a = [1,2,3];
a.toString(); // "1,2,3"
```

**Grabbing An Element**
`document.querySelector("");` finds first element with given class,id,type (.,#,p)
`document.querySelectorAll("");` finds all elements with given class,id,type (.,#,p)

**Changing CSS Styles**
`elementName.style.cssPropertyName = 'someValue';` property-name becomes propertyName

one element
```html
<!--html-->
<section id="floatingBoxContainer">
  <button id="smallify" onclick="smallify();">Smallify</button>
  <div id="floatingBox"></div>
  <button id="bigify" onclick="bigify();">Bigify</button>
</section>
```
```css
/*css*/
#floatingBoxContainer {
    padding: 20px 0;
    text-align: center;
}

#floatingBox {
    width: 100px;
    height: 100px;
    margin: 5px auto;
    background: rgb(220,220,220);
    box-shadow: 0 0 15px 5px rgb(20,20,20);
}
```
```javascript
// javascript
function smallify() {
    let sbox = document.querySelector("#floatingBox");
    sbox.style.width = "50px";
    sbox.style.height = "50px";
}

function bigify() {
    let sbox = document.querySelector("#floatingBox");
    sbox.style.width = "150px";
    sbox.style.height = "150px";
}
```
all elements
```html
<!--html-->
<section>  // clicking this button makes all buttons orange
  <button id="orangify" onclick="orangify();">Orangify</button>
</section>
```
```javascript
function orangify() {
    let obuttons = document.querySelectorAll("button");
    obuttons.forEach(function(button) {  // this loops through returned array
        button.style.backgroundColor = "orange";
    });
}
```

**List of Classes**
_object_
`classList` returns an array of classes
_methods_
`add()` adds a class
`remove()` removes a class
`contains()` returns true or false
`toggle()` adds class if not in list , removes class if already in list

```javascript
var someElement = document.querySelector("#someId");
var someIdClasses = someElement.classList;

someDiv.classList.add('someClass');
someDiv.classList.remove('someClass');
someDiv.classList.contains('someClass');
someDiv.classList.toggle('someClass');
```

**Change Div Content**

`someDiv.innerHTML` modifies content within someDiv
```javascript
var thing = document.querySelector('#theThing');
thing.innerHTML = "Hi";                   // replaces content with Hi
thing.innerHTML += "<p>Hiya</p>"          // adds to end
thing.innerHTML = "Hi" + thing.innerHTML  // adds to beginning
thing.innerHTML = "";                     // removes all content
```

safer to use against attacks
`someDiv.textContent` modifies only the text within someDiv
```javascript
var thing = document.querySelector('#theThing');
thing.textContent = "Hi";                   // replaces content with Hi
thing.textContent += "<p>Hiya</p>"          // adds to end
thing.textContent = "Hi" + thing.innerHTML  // adds to beginning
thing.textContent = "";                     // removes all content
```

**Add A Div**

`document.createElement('divType')` generates an element of given type
`.append()` places element at end
`.prepend()` places element at beginning
`.insertBefore(,)` places element before given element

```javascript
// adds new li to end of list
let li = document.createElement('li');
li.textContent = 'New list item';
li.style.color = 'gray';
let ul = document.querySelector('#completedList');
ul.append(li);
```

**Move A Div**
For already generated elements `.append` moves them to the given div.
```html
<!--html-->
<section>
  <div id="top"><p onclick="move(this)">move me</p></div>
  <div id="bottom"></div>
</section>
```
```css
/*css*/
#top {background: rgb(40,40,40);}
#bottom {background: rgb(35,35,35);}
```
```javascript
// javascript
function move(element) {
    var targeted = document.querySelector('#bottom');
    targeted.append(element);
    element.onclick = null;
}
```
With saving div id to clipboard (does not work)
```html
<!--html-->
    <section>
      <div id="top"><p id="pToDrag" ondragstart="drag(this,event)">move me</p></div>
      <div id="bottom" ondragover="return false" ondrop="drop(this,event)"></div>
    </section>
```
```css
/*css*/
#top , #bottom {
    height: 100px;
    width: 100%;
}

#top {background: rgb(40,40,40);}
#bottom {background: rgb(35,35,35);}

#pToDrag {
    width: 50px;
    height: 50px;
    background: orange;
}
```
```javascript
// javascript
function drag(target,event) {
    event.dataTransfer.setData("browser",target.id);
}

function drop(target,event) {
    var id = event.dataTransfer.getData("browser");
    target.appendChild(document.getElementById(id));
    event.preventDefault();
}
```

**Remove A Div**

Since a div cannot be removed directly via its own id, call the parent to remove its child.
`.removeChild()` removes child element
```html
<!--html-->
<section>
  <ul id="listies">
    <li id="listy1">one</li>
    <li id="listy2">two</li>
  </ul>
</section>
```
```javascript
// javascript
function removeDiv() {
var listies = document.querySelector("#listies");
var removeLi = document.querySelector("#listy1")
removeLi.parentNode.removeChild(removeLi);
}
removeDiv();
```
