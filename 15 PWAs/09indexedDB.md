# Attributes

- versioned
- indexed
- varied types
- data store

# Open

`let open = indexedDB.open('mydatabase',1);` opens given database and its version 1

`open.onupgradeneeded = (evt) => {}` use when version called does not match current version

`open.onsuccess = () => {}` use when database successfully opens

# Make Schema

Upgrade from older version to newer version.

```js
open.onupgradeneeded = (evt => {
  let db = open.result;
  let store = null;
  switch (evt.oldVersion) {
    case 0: // upgrade from 0
    case 1: // upgrade from 1
  }
});
```

# Transaction

```js
open.onsuccess = () => {
  let db = open.result;
  let tx = db.transaction('MyObjectStore','readwrite');
  let store = tx.objectStore('MyObjectStore');
  
  // some code to run
  
  tx.oncomplete = () => db.close();
}
```

# Example

```js
// MAKE INDEX
let index = store.index('NameIndex');

// ADD DATA
store.put({
  id: 10, // required for all indexedDB items
  name: {first: 'hello', last: 'kitty'},
  age: 50
});

//QUERY THE DATA
let getCatbyID = store.get(10);
let getCatbyindexname = index.get(['hello','kitty']);
```

# Libraries

- idb
