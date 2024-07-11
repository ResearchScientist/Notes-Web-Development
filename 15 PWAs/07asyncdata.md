# Fetch

Rejects
- only rejects upon network failure responses
- does not reject upon 400 or 500 level status codes

Obtains
- xml , json , images , videos , scripts , csv
- if in href or src it can be fetched

**Basic Structure**

```js
fetch('https://website.com')
  .then((response) => response.json())
  .then((jsonData) => {
    // some code
});
```

**Fetch Request**

Request image from within own domain.

Example
```js
const imgThing = document.querySelector('img');

fetch('cat.png').then(response => {
  return response.blob();  // image
}).then(response => {
  const objectURL = URL.createObjectURL(response);
  imgThing.src = objectURL;
});
```

**Fetch Request With CORS**

Do not set CORS to a wildcard as this allows any site access.
Be specific about which sites are allowed access.

Request image from an outside domain.

Example without cors.
```js
const suki = 'https:// webiste.com/images/suki.png';

fetch(suki).then(response => {
  console.log(response);
});

// request not allowed
```

Example with cors set to no.
```js
const suki = 'https:// webiste.com/images/suki.png';

fetch(suki,{mode:'no-cors'}).then(response => {
  console.log(response.type);
  const objectURL = URL.createObjectURL(response);
  imageElement.src = objectURL;
});

// opaque version of image is returned
// does not work for any other file types
```

# Async

**Basic Structure**

```js
const getData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    // some code
  }
  catch (error) {
    // code to run when error occurs
  }
}
```

# Request

```js
const headers = new Headers();

const options = {
  method: 'GET',
  headers: headers,
  mode: 'cors',
  cache: 'default'
};

const request = new Request('cat.png',options);
```

```js
fetch(request).then(response => {
  return response.blob();
}).then(response => {
  const objectURL = URL.createObjectURL(response);
  imageElement.src = object.URL;
});
```

Example
```js
const suki = 'https:// webiste.com/images/suki.png';
const request = new Request(suki,{mode: 'no-cors'});

fetch(request).then(response => {
  console.log(response.type);   // opaque
});
```

# Response

```js
fetch(request)
  .then(response => response.json())
  .then(doSomethingWithResponse);

response.blob();
response.json();
response.text();
response.formData();
response.arrayBuffer();

```










