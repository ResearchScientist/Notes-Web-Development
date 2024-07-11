# Ajax

Used for making a request to a server.
Returns a json file.

When you click refresh on email, an ajax request is sent to the server and it returns a json file with your new emails.

Example of making a request to an API database that returns a new image of a cat.
```js
const CATPICS_URL = "some url to a database";
const cats = document.querySelector(".cats");

function addNewCat() {
  const promise = fetch(CATPICS_URL);
  promise
    .then(function(response) {
      const processingPromise = response.json();
      return processingPromise;
    })
    .then(function(processedResponse) {
      const img = document.createElement("img");
      img.src = processedResponse.message;
      img.alt = "cute cat";
      cats.appendChild(img);
    });
}

document.querySelector(".add-cats").addEventListener("click", addNewCat);
```