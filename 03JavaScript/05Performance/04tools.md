# Optimization

optimize-js
test-optimize-js shows how much smaller a js file will be if optimize js is used.

# Function Duration

**Node**

`performance` user timing module , included in node

Returns start time and duration of measured function.

JS
```js
// set up benchmark

const {performance,PerformanceObserver} = require('perf_hooks');

let iterations = 1e7; // 1000000 times

const a = 1;
const b = 2;

const add = (x,y) => x + y;

// run benchmark

performance.mark('start');

while(iterations--) {
  add(a,b);
}

performance.mark('end');

// measure benchmark

const obs = new PerformanceObserver((list,observer) => {
    console.log(list.getEntries()[0]);
    performance.clearMarks();
    observer.disconnect();
});

obs.observe({
    entryTypes: ['measure']
});

performance.measure('my benchmark','start','end');
```

Node
```bash
node someFile.js  # returns start time and duration
```

Node
```bash
node --trace-opt someFile.js | grep add # returns optimizing details
```

**Chrome Performance**

Returns start and duration time of function.

In address bar
`about:blank`

In console
```js
let iterations = 1e7; // 1000000 times

const a = 1;
const b = 2;

const add = (x,y) => x + y;

// run benchmark

performance.mark('start');

while(iterations--) {
  add(a,b);
}

performance.mark('end');

// measure benchmark

const obs = new PerformanceObserver((list,observer) => {
    console.log(list.getEntries()[0]);
    performance.clearMarks();
    observer.disconnect();
});

obs.observe({
    entryTypes: ['measure']
});

performance.measure('my benchmark','start','end');
```

In performance tab
- reload to record

# Rendering

**Chrome**

Rendering
paint flashing - shows what is being repainted
layers - shows a 3d view of all layers on page

# Build

- webpack

# Sites

- crux-compare.netlify.app
- web.dev

# API

- google web vitals
-`window.performance`
-`performance.getEntries()`

gets field data
```js
(function (ready) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    ready();
  }
  else {
    document.addEventListener("readystatechange",function() {
      if (document.readyState === "complete") {
        ready();
      }
    });
  }
})(function perf() {
  var data = {
    url: window.location.href,
    dcl: 0,
    load: 0,
    fcp: 0,
    lcp: 0,
    cls: 0,
    fid: 0
  };
  // more code in screen shots
});
```

