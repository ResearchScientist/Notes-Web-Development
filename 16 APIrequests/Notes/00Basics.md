# Resources

- mdn docs learn javascript client side web apis fetching data
- MDN Fetch Data [https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data)
- MDN Web API [https://developer.mozilla.org/en-US/docs/Web/API](https://developer.mozilla.org/en-US/docs/Web/API)
- MDN Response [https://developer.mozilla.org/en-US/docs/Web/API/Response/text#:~:text=It's%20been%20available%20across%20browsers%20since%20March%202017.&text=The%20text()%20method%20of,always%20decoded%20using%20UTF%2D8.](https://developer.mozilla.org/en-US/docs/Web/API/Response/text#:~:text=It's%20been%20available%20across%20browsers%20since%20March%202017.&text=The%20text()%20method%20of,always%20decoded%20using%20UTF%2D8.)
- MDN CORS [https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- GitHub examples [https://github.com/mdn/dom-examples/blob/main/fetch/fetch-json/index.html](https://github.com/mdn/dom-examples/blob/main/fetch/fetch-json/index.html)

# Definitions

API - application programming language
CORS - cross origin resource sharing
Endpoint - database url
JSON - javascript object notation , from a server it is returned as a string
Methods - `GET` `POST` `HEAD` `PUT` `DELETE`
Query Parameters - found in url begins with `?` , each separated by `&` , format is `var=value`
Request - 
Response - object returned from an endpoint , usually a server returns JSON , img , text

# JSON

Turn string into a JSON object.

```javascript
someData = {"string returned from database"}
const someDataObject = JSON.parse(someData);
```

Access JSON properties.

```javascript
console.log(someDataObject.someProperty);
```

# Error Handling

For displaying an error.

```javascript
function handleError(err) {
  console.log(`Error ${err}`);
  someDiv.textContent = `The following error happened: ${err}`;
}
```

Higher Order Function.
Useful for handling many different functions with the same error handling function.

```javascript
// High order function
function highOrderErrorHandling(fn,errorHandler) {
  return function() {
    fn().catch(errorHandler);
  }
}

// some function wrapped in the highererrorhandling function
const someHandledFunction = highOrderErrorHandling(someFunction,errorHandler);
someHandledFunction();
```

# Requests / Responses

`fetch` returns a promise


# Fetch

```javascript
const someEndpoint = "some url";
const somePromise = fetch(someEndpoint);
const response = "string returned from database";
const someDiv = document.querySelector("some-div");

somePromise
  .then((response) => response.json()) // turns response into a JSON object
  .then((someData) => {
    console.log(someData);
    someDiv.textContent = `${someData.userName}`;
  })
  .catch(handleError);
```

Async Await

```javascript
const someEndpoint = "some url";
const someDiv = document.querySelector("some-div");

async function showUser(username) {
  const response = await fetch(someEndpoint);
  const someData = await.response.json();

  console.log(someData);
  someDiv.textContent = `${someData.userName}`;
}

showUser().catch(handleError);
```
