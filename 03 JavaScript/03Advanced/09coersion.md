# Types

**Primitive Types**

- undefined
- string
- number
- boolean
- object
- symbol

*Pseudo Types*
- null
- undeclared
- function
- array
- bigint

**Variables**

The variable does not have a type.
The value has a type.

**Operators**

`typeof someVar` returns type of value in variable , known bug if variable is null it returns object

`isNaN` returns true , false , known bug coerces strings to a number first
`Number.isNaN` returns true , false , use this version , no bugs

`Object.is()` 

**Syntax**

`undefined` variable not assigned a value
`undeclared` variable does not exist
`uninitialized` variable in a block scope

`NaN` not a number , invalid number

# Fundamental Objects

Use the `new` keyword for constructing these objects.

- Object()
- Array()
- Function()
- Date()
- RegExp()
- Error()

Do not use the `new` keyword for constructing these objects.

- String()
- Number()
- Boolean()

# Abstract Operations

Coercion is converting one type to another type.
Recursively converts results to type.

**Operators**

`toPrimitive()`
as expected

`toString()`
[] to ""
[[[]],[]] to ","
[,,,] to ",,,"
{} to "[object Object]"

`toNumber()`
"0" to 0
"" to 0
- 0 to "0"
"- 0" to - 0
"009" to 9
"0." to 0
".0" to 0

null to 0
undefined to NaN

false to 0
true to 1

`toBoolean()`

"" , 0 , -0 , null , NaN , false , undefined to FALSE
everything else to TRUE

`String()`
`Number()`
`Boolean(undefined)` false
`Boolean(null)` false
`Boolean({})` true

*Boolean Implicit Coercion*

Operates on one pair of comparisons at a time from left to right.

True
```js
1 < 2 < 3   // returns true
(1 < 2) < 3 // step 1 , evaluates 1 < 2 first
(true) < 3  // step 2 , returns true for 1 < 2 
(1) < 3     // step 3 , returns true
```

False
```js
3 > 2 > 1   // returns false
(3 > 2) > 1 // step 1 , evaluates 3 > 2 first
(true) > 1  // step 2 , returns true for 3 > 2
1 > 1       // step 3 , returns false
```

# Simple Input Validation

**Name Validation**

Example of a function that verifies an input.
- is input a string
- is it at least 3 characters

```js
function validName(name) {
  if(typeof name == "string" && name.trim().length >= 3)  {
    return true;
  }
  return false;
}
```

**Number Validation**

Example of a function that verifies an input.
- is input a string
- is input not empty
- is input at least 0
- is input a whole number
- are hours less than or equal to event duration

```js
function attendedHours(hours,eventDuration) {
  if (typeof hours == "string" && hours.trim() != "") {
    hours = Number(hours);  // explicit coersion of input to number
  }
  if (typeof eventDuration == "string" && hours.trim() != "") {
    hours = Number(eventDuration);  // explicit coersion of input to number
  }
  if (typeof hours == "number" && typeof eventDuration == "number" && hours >= 0 && eventDuration >= 0 && Number.isInteger(hours) && Number.isInteger(eventDuration) && hours <= eventDuration) {
    
  }
  return false;
};
```

# Equality

`==` loose , allows coercion when types are different
`===` strict , use when types are the same

```js
if (something === null || something === undefined) {
  
}

// same as

if (something == null) {
  
}
```

**Gotchas**

`[] == ![]` true
due to implicit coercion of array into a string then to number 0
and compared to negative array coerced into false then to number 0

`if (something) {}` good practice , evaluates something as true and runs code
`if (something == true {}` bad practice , due to implicit coercion of something into a string then to 0 and implicit coercion of true into 1 , does not run code
`if (something == false {}` bad practice , due to implicit coercion of something into a string then to 0 and implicit coercion of false into 0 , runs code

**Advice**

do not use `==` for comparing
- 0 or ""
- non primitives
- true or false

Only use `==` when the types are known.

If types are unknown make a comment on the code.

Use `===` when types are unknown.

Best to refactor code to control types.

**Find Match**

Example of a function that looks through an array for a match.
- exact match
- booleans match
- object match exact same object
- strings can match numbers
- numbers can match strings

```js
function findMatch(match,arr) {
  var ret = [];
  for (let v of arr) {
    if (Object.is(match,v)) {
      ret.push(v); // push onto array
    }
    else if (match == null && v == null) {
      ret.push(v); // push onto array
    }
    else if (typeof match == "boolean" && typeof v == "boolean") {
      if (match === v) { // boolean matches boolean
        ret.push(v);
      }
    }
    else if (typeof match == "string" && match.trim() != "" && typeof v == "number" && !Object.is(v,-0)) {
      if (match == v) {
        ret.push(v);
      }
    }
    else if (typeof match == "number" && !Object.is(match,-0) && !Object.is(match,NaN) && !Object.is(match,Infinity) && !Object.is(match,-Infinity) && typeof v == "string" && v.trim() != "") {
      if (match == v) {
        ret.push(v);
      }
    }
  }
  return ret;
}
```

# Static Typing

**Linters**
- catch type mistakes
- IDE feedback
- guess at type during compile

*TypeScript & FlowType*

Positives
- custom types

Negatives
- requires a build process

# Dynamic Typing

JS has a dynamic typing system which uses coercion for converting types.

By understanding JS types a type linter may not be necessary.
