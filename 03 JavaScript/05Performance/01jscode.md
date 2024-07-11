# User Perception

|duration (ms)|perceived duration|
|--|--|
|0 to 100|instant|
|100 to 300|slightly noticeable delay|
|300 to 1000|noticeable delay|
|> 1000|mental context switches to other stimuli|

|user action|response goal|
|--|--|
|page load|first paint < 1000ms|
|click|finish paint < 100 ms|
|reading or viewing|run background tasks in 50 ms bursts|
|new frame|finish paint < 16 ms|

# Measurement

- tests on various devices with different levels of hardware abilities
- simulate various online connectivity conditions

# Parsing

JS is compiled in client.
On mobile can be as slow as 1MB/s.

**Eager**

Parses full script.

**Lazy**

Initial partial parse , full parse later.

- scans top level scope , parses active code
- skips function declarations and classes , parses them when needed

Putting `()` around a function forces the function to not be skipped.

# Optimization

Chrome can automatically optimize some JS code.

**View Optimization**

Node can display if a function was optimized.
Use js code found in tools md file.

`node someFile.js` returns start time and duration
`node --trace-opt someFile.js | grep add` returns optimizing details

To show non optimized performance.
- add the following to the js file
`%NeverOptimizeFunction(someFunction)` does not optimize given function
- in node
`node --allow-natives-syntax someFile.js` understands % code and runs file

`%OptimizeFunctionOnNextCall(someFunction)`;

# Type

Occasionally passing different data types to a function causes the function to be initially optimized then unoptimized resulting in very poor performance.

*monomorphic*
same type

*polymorphic*
a few different types , predictable

*megamorphic*
many different types , unpredictable

**View Data Types**

`%HaveSameMap(a,b)` returns true if given values are the same type and shape , false if not the same

same type

js
```js
const a = {a:1};
const b = {a:1};

console.log(%HaveSameMap(a,b));
```

node
```bash
node --allow-natives-syntax someFile.js
# returns true
# since a:1 == a:1
```

different type

js
```js
const a = {a:1};
const b = {b:1};

console.log(%HaveSameMap(a,b));
```

node
```bash
node --allow-natives-syntax someFile.js
# returns false
# since a:1 != b:1
```

|result|a|b|
|--|--|--|
|true|{a:1}|{a:1}|
|true|{a:1}|{a:2}|
|false|{a:1}|{a:"2"}|
|false|{a:1,z:1}|{a:1}|
|false|{a:1}|{b:1}|

Additionally objects must be made in the same manner to return TRUE.

js
```js
class Points {
  constructor(a,b) {
    this.a = a;
    this.b = b;
  }
}

const a = new Point(1,2);
const b = new Point(3,4);

console.log(%HaveSameMap(a,b));
// true
```

The following returns false because even though appending makes them the objects contain the same data , they where not made in the same manner.

js
```js
const a = {a:1,z:100};
const b = {a:1};

b.z = 100;

console.log(%HaveSameMap(a,b));
// false
```

# Scope

Running a class within a function can cause a loss in performance.

*class outside of function*

js
```js
const {performance} = require('perf_hooks');
let iterations = 100000;

class Points {
  constructor(a,b) {
    this.a = a;
    this.b = b;
  }
}

const test = () => {
  const add = point => point.a + point.b;
  const point = new Point(10,20);
  add(point);
};
// runs within 10ms
```

*class inside a function*

js
```js
const {performance} = require('perf_hooks');
let iterations = 100000;

const test = () => {
  const add = point => point.a + point.b;
  class Point {
    constructor(a,b) {
      this.a = a;
      this.b = b;
    }
  }
  const point = new Point(10,20);
  add(point);
};
// runs almost 1000ms
```

# Code Recommendations

Quantity
- ship least amount of code

Objects
- initialize properties when made
- initialize them in same order
- try not to modify them after being made
- for consistency best to use a function to make objects

Type
- use a type system to check your code
