# Caches Storage Methods

- `caches.open()` opens given cache object
- `caches.keys()`
- `caches.has()`
- `caches.match()`
- `caches.delete()` deletes given cache object

`caches.open(someCache).then(function(cache) {// some code});` returns a promise for given cache

`caches.delete(someCache).then(function(boolean) {console.log('cache deleted')});` returns true when deleted false if not deleted

**Open Example**

sw.js
```js
const cacheName = 'assets-v1';

caches.open(cacheName).then(cache => {
  // some code to manage cache
});
```

# Cache Methods

- `cache.add()` adds response object to cache
- `cache.addAll()` adds array of given objects to cache
- `cache.delete()` deletes given objects from cache
- `cache.match()` returns response object to given request

**Add To Cache Example**

sw.js
```js
const cacheName = 'assets-v1';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.add('/noncritical.css'); // if this does not load it does not fail the install
      return cache.addAll(           // if these do not load then it fails the install
        [
          '/index.html',
          '/style.css',
          '/main.js'
        ]
      );
    })
  );
});
```

