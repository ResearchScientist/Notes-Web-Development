# Attributes

- defers action until a successful connection is established
- periodically attempts new connection

# Sync

main.js
```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(registration => {
    registration.sync.register('someEvent');
  });
}
```

sw.js
```js
self.addEventListener('sync', event => {
  if (event.tag === 'someEvent') {
    event.waitUntil(someEventaction());
  }
});
```

# IndexedDB

Store data to be synced in indexedDB.
