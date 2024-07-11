# Strict Mode

When declaring a variable inside a function make sure to use var , let , const.
`var name = "cat"` local variable explicitly declared

If you don't use var , let , const then JS will auto declare the var in global scope even if you write it inside a function.
`name = "cat"` global variable implicitly declared

`"use strict"`  placing this at top of JS file forces strict mode so that global var are not auto declared from within functions. When referencing that variable JS returns a reference error.

**Best Practice**

Explicitly declare variables in their appropriate scopes.

# Variable Error

**Undefined**

Variable exists but has no value assigned to it.

**Undeclared**

Variable does not exist.

# Function Scope

**Function Declaration**

Function declared globally.
```js
function addCatsFunction() {
  // some code
};
```

**Function Expression**

Variable declared globally , function declared locally.
Function is read only , cannot be reassigned.
```js
const addCats = addCatsFunction() {
  // some code
};
```

*Named Function Expression*

- easier to call
- improves debugging by showing up on stack tray
- naming helps documentation

```js
const someVar = function someFunctionName() {
  // some code
};
```

*Unnamed Function Expression*

```js
const someVar = function() {
  // some code
};
```

**Immediately Invoked Function**

Runs only once.

Function expression with name
```js
(function someName() {
  var someVar = "cat";
  console.log(someVar); // "cat"
})();                   // calls function
```

Function expression without name
```js
var someVar = "cat";
(function(someVar) {
  console.log(someVar);  // "kitten"
})("kitten");            // calls function with kitten argument

console.log(someVar);    // calls function with cat argument // "cat"
```

# Arrow Functions

Arrow Function
```js
const someVar = someObject.map(someObjectItem => someObjectItem.id);
```

same as

Basic Function
```js
var someVar = someObject.map(function someFunctionName(someObjectItem) {
  return someObjectItem.id;
});
```

# Different Scopes

**Lexical**
Var bound to where it was explicitly declared.

**Dynamic**
Not present in JS.

**Function**
Keep variables private within a function to avoid global pollution and name conflicts.

**Block**
Scopes variables within `{ }`.
Useful for temporary variables.
Requires the use of `let` or `const`.
```js
var name = "cat";
{
  let name = "kitten";
  console.log(name);  // "kitten"
}

console.log(name);    // "cat"
```

# Var

Used for accessing via a large scope.
Var can leave a block scope.
Same var can be reused within the same scope.

# Let

Used for restricting access to a local scope.

# Const

Var that cannot be reassigned.
But can still be mutated.

Reassignment not allowed.
```js
const cats = "so cute";
cats = "so tiny";  // type error
```

Mutation allowed.
```js
const cats = ["cat","kitten"];
cats[1] = "gatto";  // ["gatto","kitten"]
```

# Hoisting

Call to function appears before function declaration.

