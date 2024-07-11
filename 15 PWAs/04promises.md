# Structure

```js
let p = $.getJSON(url);

// callback function passed to then function
p.then((value) => {
  console.log('value is ', value);
});

// catch function listens for an error
p.catch((err) => {
  console.error(err);
});
```

# Chaining

Items returned from a `.then()` are wrapped in a promise object.
You can use `.then()` on the returned value.

- `.then()` returns a new promise
- passes value to next `.then()`

```js
let p = new Promise((resolve) => resolve(20));

p.then((num) => num + 10)
  .then((num) => Promise.resolve(num + 100))
  .then((num) => {
    console.log(num);
});
```

# Constructor

Promise constructor makes a new promise.

Basic promise with 2 callbacks named resolve , reject.
```js
let p = new Promise((resolve,reject) => {
  resolve(20);
});

p.then((num) => {
  console.log(num);
});
```

**Example**

Render a post to an html file.

```js
const request = $.getJSON('/api/endpoint');

const renderPost = (post) => {
  return `
    <article>
       <h2>${post.title}</h2>
       <p>${post.body}</p>
    </article>
  `;
};

request.then(posts => post.map(renderPost))
  .then(renderPosts => {
  // rendered posts
});
```

Catch an error and continue.

```js
Promise.resolve('something')
  .then((data) => {
    // something bad happended
    throw new Error('oops');
  })
  .catch((error) => {
    console.error('continue on chain');
    return 'this was caught';
  })
  .then((data) => {
    console.log(data);
});
```
