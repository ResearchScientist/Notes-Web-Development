Web workers run on a different global context than the current window.

# Make Worker

main.js
```js
let w = new Worker('worker.js');
```

**Using a Worker**

main.js
```js
w.postMessage({foo: 'bar'});
console.log('app sent');

w.onmessage = (e) => {
  console.log(`app rcvd: ${e.data}`);
};
```

worker.js
```js
const log = console.info.bind(console);

self.onmessage = ({data}) => {
  log('worker rcvd',data);
  doWork(data.foo);
}

function doWork(value) {
  self.setTimeout(() => {
    let x = value.toUpperCase();
    log('worker sending to app',x);
    self.postMessage(x);
  },2000);
}
```

# Stop Worker

Workers are resource intensive.
Stop them once they complete their task.

main.js
```js
let w = new Worker('worker.js');

w.terminate();  // stops worker even if it has not completed its task
```

# Dedicated or Shared

Dedicated workers only communicate with the script that spawned them.
Multiple JS files linked are considered one script.

Shared workers can communicate with multiple scripts.

# Pos & Neg

Pos
- some location
- setInterval , setTimeout
- fetch , promise
- web socket
- cache storage
- indexedDB

Neg
- cannot manipulate DOM
- cannot set cookies
- no local storage
