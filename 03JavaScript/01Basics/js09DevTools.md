# Elements

**Styles**

`shift + click` on a colour box changes between hex, rgb, hsl

Crossed out CSS items indicate they are not applied. Perhaps a more specific selector was used instead.

# Debugging

**Watch**
Entering a variable name here displays what it is set to such as arguments, length, scope, defined, undefined.

**Call Stack**
Lists all functions called at that instance. Hierarchy of the current variable.

**Scope**
Current scope of something given in watch.

**Global**
Shows all functions and variables in global scope. Easier to see specific variables and functions with watch.

**Breakpoints**
Toggle individual break points.

Right click to add a conditional break point.

# Network

Click on network tab then refresh. Shows order and how long it took to load files.
Click on capture screen shots to see rendered images as they render.

Colour Code
- `white` Item queued (if more than 6 files, they get queued)
- `gray` Item blocked (waiting)
- `blue` DNS look up (prior to cache)
- `orange` Initial connect
- `dark orange` SSH verification
- `green` sending request and waiting
- `blue` download time for response

# Performance

You can check how long a specific function takes to execute by adding performance marks to the code.

```js
function someFunction() {
  performance.mark("start");
  // do something
  performance.mark("end");
  performance.measure("getIt","start","end");
  const measurements = performance.getEntriesByType("measure");
  console.log(measurements);
}
```
By wrapping your function body with the above code the performance tab can give detailed execution times for each of its items after refresh.

# Memory

In chrome , more tools , task manager , right click on header and select javascript memory.

In dev tools performance tab click on memory and record for about 10 seconds.
In memory tab click heap snapshot. Filter by shallow size. The larger the shallow size the more memory its responsible for.
