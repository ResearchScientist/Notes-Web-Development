Fetch is a client side API.

# Basic Template Local

```javascript
fetch(url)                // returns promise from server given
.then((response) => {     // handles response
  if(!response.ok) {      // displays server response error if any
    throw new Error(`HTTP Error : ${response.status}`);
  }
  return response.text(); // returns promise and resolves the response body to a string
})
.then((text) => {         // handles returned string
  poemDisplay.textContent = text;  // writes to div poemDisplay
})
.catch((error) => {       // displays any errors with either returned promise
  poemDisplay.textContent = `could not fetch text ${error}`;  // writes to div poemDisplay
});
```

`fetch()` is asynchronous and returns a promise
`response.text()` is asynchronous and returns a promise
`.then()` handles the returned promise
`catch()` handles errors from either promise

# Basic Template Server JSON

```javascript
fetch("somefile.json")    // returns promise from server given
.then((response) => {     // handles response
  if(!response.ok) {      // displays server response error if any
    throw new Error(`HTTP Error : ${response.status}`);
  }
  return response.json(); // returns promise and resolves the response body to json
})
.then((json) => {         // handles returned json object
  initialize(json)        // some function does something
})
.catch((err) => {       // displays any errors with either returned promise
  console.err(`could not fetch text ${err.message}`)  // logs error to console
});
```

# Basic Template Server Blob

```javascript
fetch(url)    // returns promise from server given
.then((response) => {     // handles response
  if(!response.ok) {      // displays server response error if any
    throw new Error(`HTTP Error : ${response.status}`);
  }
  return response.blob(); // returns promise and resolves the response body to a blob
})
.then((blob) => {         // handles returned blob object
  someFunction(blob,item) // some function does something
})
.catch((err) => {       // displays any errors with either returned promise
  console.err(`could not fetch blob ${err.message}`)  // logs error to console
});
```

# Basic Template Async

```javascript
async function getMovies() {
  const response = await fetch("https://somesite.com/movies.json");  // returns promise resolving to a response object
  const movies = await response.json(); // returns promise to resolve response body as json
  console.log(movies);
}
```
