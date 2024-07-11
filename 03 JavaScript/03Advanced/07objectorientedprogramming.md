# Encapsulation

Making an object which contains functions and its associated data.

# Object

An object is an array that contains properties defined as key value pairs.

- properties - data , methods
- methods - functions

**Object Construction**

*Filled Object*
Construct an object with all its data and functions.
```js
const user1 = {
  name: "cat",
  score: 3,
  increment: function() {
    user1.score++;
  }
};

user1.increment();  // 4
```

*Empty Object*
Construct an empty object and add data and functions afterwards.
```js
const user2 = {};  // makes empty object

// dot notation for adding data and functions to object
user2.name = "neko";
user2.score = 3;
user2.increment = function() {
  user2.score++;
};
```

*Object.Create*
Construct an object with built in function `Object.create`.
```js
const user3 = Object.create(null);  // makes empty object

user3.name = "gatto";
user3.score = 3;
user3.increment = function() {
  user3.score++;
};
```

*Object Function*
Construct multiple objects with a function.
```js
function userMaker(name,score) {    // parameters for making object
  const newUser = {};               // makes empty object
  newUser.name = name;              // makes property with key as name and value as received argument, adds to newUser object
  newUser.score = score;            // makes property with key as score and value as received argument, adds to newUser object
  newUser.increment = function() {  // adds method to newUser object
    newUser.score++;
  };
  return newUser;
};

const user1 = userMaker("cat",3);  // arguments for making object
const user2 = userMaker("neko",3);
const user3 = userMaker("gatto",3);

user1.increment();
user2.increment();
user3.increment();

console.log(user1); // 4
console.log(user2); // 4
console.log(user3); // 4
```

Pos: Intuitive with ease of use.
Neg: Multiple instances of the same method are stored in memory.
Neg: New attributes need to be added manually to each object.

# Prototype Chain

Store a reusable function in one separate object instead of including the function as a method for each user object.
Makes use of `object.create()`.

*Object.Create()*
Makes a hidden property `_proto_` that links the object to the passed function name.
```js
function userMaker(name,score) {                     // 1 parameters for making object
                                                     // 4 argument cat assigned to parameter name , argument 3 assigned to parameter score
  const newUser = Object.create(userScoreFunction);  // 5 makes empty object & links object to userScoreFunction
  newUser.name = name;                               // 6 makes property with key as name and value as received argument cat, adds to newUser object
  newUser.score = score;                             // 7 makes property with key as score and value as received argument 3, adds to newUser object
  return newUser;                                    // 8 returns made object to user1
};

const userScoreFunction = {                          // 2 makes object with methods increment & login in global
  increment: function() {
    this.score++;
  },
  login: function() {
    console.log("logged in");
  }
};

const user1 = userMaker("cat",3);                    // 3 arguments for making object
const user2 = userMaker("neko",3);                   // 9 steps same as 3 to 8
const user3 = userMaker("gatto",3);                  // 10 steps same as 3 to 8

user1.increment();                                   // 11 calls and runs increment ,
                                                     //    adds an implicit parameter this and assigns user1 to it ,
                                                     //    this.score++ becomes user1.score++ , increments score to 4
user2.increment();                                   // 12 same as 11
user3.increment();                                   // 13 same as 11

console.log(user1); // 4
console.log(user2); // 4
console.log(user3); // 4
```

**Method hasOwnProperty**

`someObject.hasOwnProperty(someProperty)` Used for verifying if an object has the given property.

*_proto_*
All objects have hidden property `_proto_` which links to the prototype object.

*prototype object*
Hidden object that contains methods such as `hasOwnProperty()`.
Also contains a `_proto_` property but its value is set to `null`.

```js
function userMaker(name,score) {                     // 1 parameters for making object
                                                     // 4 argument cat assigned to parameter name , argument 3 assigned to parameter score
  const newUser = Object.create(userScoreFunction);  // 5 makes empty object & links object to userScoreFunction
  newUser.name = name;                               // 6 makes property with key as name and value as received argument cat, adds to newUser object
  newUser.score = score;                             // 7 makes property with key as score and value as received argument 3, adds to newUser object
  return newUser;                                    // 8 returns made object to user1
};

const userScoreFunction = {                          // 2 makes object with methods increment & login in global
  increment: function() {
    this.score++;
  }
};

const user1 = userMaker("cat",3);                    // 3 arguments for making object
const user2 = userMaker("neko",3);                   // 9 steps same as 3 to 8

console.log(user1.hasOwnProperty('score'));          // 10 looks for method in object user1 but not found ,
                                                     //    looks for method in object userScoreFunction but not found ,
                                                     //    follows _proto_ link in object userScoreFunction to object prototype and finds hasOwnProperty method
                                                     //    runs hasOwnProperty() method , returns true
console.log(user1); // 4
console.log(user2); // 4
```

# This

A nested function does not have access to the outside function's `this` data.
The nested function will look for `this` in the global scope.

To avoid that from happening use `.call(this)`.
`someNestedFunction.call(this)` nested function now sets its own `this` equal to outer function's `this`.

Declare and call a new function inside method increment.
```js
function userMaker(name,score) {                     
                                                     
  const newUser = Object.create(userScoreFunction);  
  newUser.name = name;                               
  newUser.score = score;                             
  return newUser;                                    
};

const userScoreFunction = {                          
  increment: function() {                            
    function add1() {
      this.score++;
    }
    add1.call(this);                                 // need to use .call(this) in order for nested function to have access to outer function this
  }
};

const user1 = userMaker("cat",3);                    
const user2 = userMaker("neko",3);                   

user1.increment();

console.log(user1); // "cat",4
```

A more elegant solution is to use an arrow function for the nested function.
The arrow function automatically sets the inner function `this` equal to the outer function's `this`.

Do not use an arrow function for declaring the outer function increment as doing so will set its `this` equal to global.

Arrow function
```js
function userMaker(name,score) {                     
  const newUser = Object.create(userScoreFunction);  
  newUser.name = name;                               
  newUser.score = score;                             
  return newUser;                                    
};

const userScoreFunction = {
  increment: function() {
    const add1 = () => { this.score++}
    add1()
  }
};

const user1 = userMaker("cat",3);
const user2 = userMaker("neko",3);

user1.increment();

console.log(user1); // "cat" , 4
```

**What Does THIS Point To**

Depends on how it was called
- by `new` - then new object
- by `call()` `apply()` `bind()` - then specified object
- on a context object `something.someFunction()` - then context object
- by any other - then global object , except if strict mode then undefined

# New

**Functions as Functions & Objects**

Functions are both functions and objects.
- Using `.` accesses it as an object.
- Using `()` accesses it as a function.

All functions have a prototype property set to an empty object.

```js
function multiply2(num) {          // store function multiply2 in memory
  return num*2;
}

multiply2.stored = 5;              // in object multiply2 adds property stored and assigns value 5
console.log(multiply2(3));         // 6

console.log(myltiply2.stored);     // 5
console.log(multiply2.prototype);  // object
```

**New**

Using the keyword `new` automates and simplifies the making of objects.

- makes an object , called `this`
- returns object
- links `_proto_` property to prototype object.

```js
const user1 = new userMaker("cat",3);
const user2 = new userMaker("neko",3);
```

Make an object with keyword `new`.
```js
function userMaker(name,score) {              // 1 defines function & object with property prototype set to empty object
  this.name = name;                           // 4 adds key name assigns argument cat
  this.score = score;                         //   adds key score assigns argument 3
};                                            //   sets this to empty object
                                              //   links `_proto_` to prototype object
                                              //   passes key value pairs into this object
                                              //   returns object this

userMaker.prototype.increment = function() {  // 2 adds property increment as key and value as function inside property prototype empty object
  this.score++;
};

const user1 = new userMaker("cat",3);         // 3 define user1 , call userMaker function with given arguments
                                              // 5 assigns returned this object to constant user1
const user2 = new userMaker("neko",3);        // 6 same as steps 3 to 5

user1.increment();                            // 7 looks for user1 in global memory , finds it
                                              //   looks for increment in global , does not find it
                                              //   follows `_proto_` link to prototype property finds increment inside property object
                                              //   runs increment function
console.log(user1); // "cat" , 4
```

*When To Use New*

To make it clear that a particular function requires the `new` keyword , capitalize the first letter of the function name.
This is not the most ideal manner to avoid using the `new` keyword correctly.
The `class` keyword automatically takes care of misusing `new` by managing scope.

# Class

`class` makes a combination function & object
`constructor` is the label for the function portion

Everything works the same underneath as the function above.
Difference is its easier to write and resembles other languages.

Making an object with `class` keyword.
```js
class userMaker {                       // makes a function object combo
  constructor (name,score) {            // constructor makes object
    this.name = name;
    this.score = score;
  }
  increment() {                         // adds property increment as key and value as function inside property prototype empty object
    this.score++;
  }
  login() {                             // adds property login as key and value as function inside property prototype empty object
    console.log("login");
  }
};

const user1 = new userMaker("cat",3);
const user2 = new userMaker("neko",3);

user1.increment();

console.log(user1); // "cat" , 4
```

# Prototype Thread Of Execution

![threadOfExecution](03JavaScript/03Advanced/threadOfExecution.png)


# Delegation Oriented Programming

An organization of objects that differs from object oriented programing.

Objects do not have a hierarchical relation.
Objects have equal access to each others functions.

Example of delegation oriented programming.
```js
var AuthenticateControl = {
  authenticate() {
    server.authenticate([this.username,this.password]);
  },
  handleResponse(resp) {
    if (!resp.ok) this.displayError(resp.msg);
  }
};

var LoginControl = Object.assign(Object.create(AuthenticateControl),{
  onSubmit() {
    this.username = this.$username.val();
    this.password = this.password.val();
    this.authenticate();
  },
  displayError(msg) {
    alert(msg);
  }
});
```

# SubClass

An object that has the ability to make use of properties at a higher class level.

- inherits certain properties from a class
- contains some unique properties not found in the class

**Example 1**

Provides a lot of fine grain control.
But very verbose to use in practice.

class
```js
function userMaker(name,score) {
  const newUser = Object.create(userFunctions);
  newUser.name = name;
  newUser.score = score;
  return newUser;
}

userFunctions = {
  sayName: function (){
    console.log('im ' + this.name)
  }
}

const user1 = userMaker('suki',5):
user1.sayName();  // im suki
```

subclass
```js
function paidUserMaker(paidName,paidScore,accountBalance) {
  const newPaidUser = userMaker(paidName,paidScore);
  Object.setPrototypeOf(newPaidUser,paidUserFunctions);
  newPaidUser.accountBalance = accountBalance;
  return newPaidUser;
}

const paidUserFunctions = {
  increaseBalance : function () {
    this.accountBalance++;
  }
};

Object.setPrototypeOf(paidUserFunctions,userFunctions)  // 1st parameter subclass function, 2nd parameter class function

const paidUser1 = paidUserMaker('jen',8,25);

paidUser1.increaseBalance();
paidUser1.sayName();  // im jen
```

# Call

Allows to use a methods from different objects.

`.call()` 
`someObject.someMethod.call(someOtherObject)`

```js
const obj = {
  num: 3,
  increment: function() {
    this.num++;
  }
};

const otherObj = {
  num:10;
};

obj.increment();              // obj.num to 4
obj.increment.call(otherObj); // otherObj.num to 11
```

# Apply

Same as call but it takes an array of arguments.

# SubClass With New

**Examle 2**

class
```js
function userMaker (name,score) {
  this.name = name;
  this.score = score;
}

userMaker.prototype.sayName = function () {
  console.log('im' + this.name);
}

userMaker.prototype.increment = function () {
  this.score++;
}

const user1 = new userMaker('suki',5);
const user2 = new userMaker('pusheen',10);

user1.sayName();  // im suki
```

subclass
```js
function paidUserMaker(paidName,paidScore,accountBalance) {
  userMaker.call(this,paidName,paidScore);
  this.accountBalance = accountBalance;
}

paidUserMaker.prototype = Object.create(userMaker.prototype);

paidUserMaker.prototype.increaseBalance = function() {
  this.accountBalance++;
};

const paidUser1 = new paidUserMaker('jen',8,25);

paidUser1.increaseBalance();
paidUser1.sayName();  // im jen
```

# SubClass With Extend


class
```js
class userMaker {                          // 1 makes empty prototype object
  constructor (name,score) {               // 2 stores in prototype object
    this.name = name;                      // 6 assigns suky and 5 to name and score , makes  __proto__ pointing to prototype object functions
    this.score = score;                    //   returns user1 object which contains above line properties
  }                                        // 8 same as 6
  sayName () {                             // 3 stores method in prototype object
    console.log('im' + this.name);
  }
  increment () {                           // 4 stores method in prototype object
    this.score++;
  }
}

const user1 = new userMaker('suki',5);     // 5 calls userMaker function
const user2 = new userMaker('pusheen',10); // 7 calls userMaker function

user1.sayName();
```

subclass
```js
class paidUserMaker extends userMaker {            // 1 makes prototype object containing increaseBalance method and __proto__ pointing to userMaker prototype 
  constructor(paidName,paidScore,accountBalance) { // 3 stores in local memory paidName jen , paidScore 8 , accountBalance 25 , this uninitialized
    super (paidName,paidScore);                    // 4 makes object at userMaker , name jen , score 8 and stores as this , returns this into paidUserMaker constructor uninitialized this
    this.accountBalance = accountBalance;          // 5 adds account balance to paidUserMaker this property
  }
  increaseBalance() {
    this.accountBalance++;
  }
}
const paidUser1 = new paidUserMaker('jen',8,25);   // 2 calls paidUserMaker function

paidUser1.increaseBalance();                       // 26
paidUser1.sayName();                               // im jen
```
