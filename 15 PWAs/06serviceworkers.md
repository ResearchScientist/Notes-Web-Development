# Attributes

- works away from main thread
- intercepts web requests
- can run in the background

# Facilitates

- offline notifications
- background sync

# LifeCycle

- only one active service worker at a time
- sw runs only when all other processes are finished

# Register SW

In main js file register a sw.
The following includes console logs for debugging.

main.js
```js
if ('serviceWorker' in navigator) {
  console.log('browser can use a sw');
  navigator.serviceWorker.register('sw.js').then(registration => {
    console.log('registered sw',registration);
  })
  .catch(error => {
    console.log('something bad happened',error);
  });
}
```

# Make SW

In sw.js file give sw instructions.
The following code has counts and console logs for debugging.

sw.js
```js
const counts = {
  installs: 0,
  activations: 0,
  fetches: 0
};

self.addEventListener('install',() => {
  console.log('installing sw',++counts.installs);
});

self.addEventListener('activate',() => {
  console.log('activating',++counts.activations);
});

self.addEventListener('fetch',() => {
  console.log('fetching',++counts.fetches);
});
```
# SW Handlers

- install
- activate
- fetch

**Install**

- use for caching static assets such as images and css files
- sw.js & manifest files are auto cached

sw.js
```js
self.addEventListener('install', event => {
  // some code
});
```

**Activate**

- occurs before fetch handler fires
- use for clearing out old cache files

sw.js
```js
self.addEventListener('activate', event => {
  // some code
});
```

**Fetch**

- behaves as a small local server
- can direct if requests should be served by main server or by local cache
- requests can be assets and other JS code

sw.js
```js
self.addEventListener('fetch', event => {
  // some code
  console.log(event.request.url);
});
```

*Fetch Events*

- `event.request` the requested object
- `event.request.url` the original URL request
- `event.request.method` the http method used
- `event.respondWith` respond with different object than the one requested

# SW Events

`event.waitUntil()` keeps current sw process going until its promise resolves , if promise rejects then sw process fails

# SW States

- `.installing`
- `.waiting`
- `.active`

# View SW States

For debugging.

main.js
```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(registration => {
    registration.addEventListener('update',() => {
    const newWorker = registration.installing;
    newWorker.state; // installing,waiting,active
    newWorker.addEventListener('statechange',() => {
      // state has changed
    });
  });
});
```

# SW Cache Example

sw.js
```js
const CURRENT_CACHE = 'cache-v1.0'; // good practice to maintain a version log

const filesToCache = [
  './index.html',
  './main.css',
  './somepath/image.png'
  // add files as needed
]

// cache assets
self.addEventListener('install', event => {
  console.log('installing')
  event.waitUntil(
    caches.open(CURRENT_CACHE).then( cache => {
      return cache.addAll(filesToCache)
    })
  );
});

const CURRENT_CACHE = 'cache-v2.0'

// delete previous non current cache version
self.addEventListener('activate', event => {
  event.waitUntil(
     caches.keys().then(cacheVersions => Promise.all(cacheVersions.filter(cacheVersion => {
       return cacheVersion != CURRENT_CACHE
     }).map(cacheVersion => caches.delete(cacheVersion))
    ))
  );
});

// decide on proper response
self.addEventListener('fetch',function (event) {
  event.respondWith(
    caches.match(event.request).then(async function (cachedResponse) {
      // first , attempt to server from cache
      if (cachedResponse) {
        return cachedResponse;
      }
      // otherwise serve from main server
      try {
        let freshResponse = await fetch(event.request)
        if (freshResponse) {
          return freshResponse;
        }
      }
      // if main server not availabel display offline page
      catch (error) {
        var offlinePageResponse = new Response(
          '',
          {
            status: 302,
            statusText: 'found',
            headers: {
              Location: '/offline.html'
            }
          }
        )
        return offlinePageResponse;
      }
    })
  )
});
console.log('sw loaded'); 
```

# Fallback Asset

Return a unique asset when requested asset not retrieved.
Useful for 404s or response taking too long.

sw.js
```js
const FALLBACK_IMAGE_URL = 'somesite.com/image.png';
const fallbackimages = 'theImages';

self.addEventListener('install', event => {
  event.waitUntil(
  caches.open(fallbackimages).then(cache => {
    cache.add(FALLBACK_IMAGE_URL);
  }))
});

self.addEventListener('activate', () => {
  caches.keys().then(cacheNames => {})
});

function fetchImageorFallback(fetchEvent) {
  return fetch(fetchEvent.request, {
    mode: 'no-cors'
  }).then(response => {
    if (!response.ok) {
      return caches.match(FALLBACK_IMAGE_URL, {cacheName: fallbackimages});
    }
    else {
      return response;
    }
  }).catch(error => {
    return caches.match(FALLBACK_IMAGE_URL, {cacheName: fallbackimages});
  })
}

self.addEventListener('fetch', event => {
  let acceptHeader = event.request.headers.get('accept');
  let requestURL = new URL(event.request.url);
  if (acceptHeader.indeOf('image/*') >= 0) {
    if (requestUrl.pathname.indexOf('/images/') === 0 {
        event.respondWith(fetchImagerofFallback(event))
        })
  }
});
```

# Cache Strategies

**Cache Only**

Only retrieves from cache never gets updated from server.

```js
self.addEventListener('fetch',event => {
  event.respondWith(caches.match(event.request));
});
```

**Server Only**

Goes through sw but sw does not do anything instead request goes straight through to server.

```js
self.addEventListener('fetch',event => {
  event.respondWith(fetch(event.request));
});
```

**Cache Then Server**

First retrieves from cache , if not in cache then retrieves from server.

```js
self.addEventListener('fetch',event => {
  event.respondWith(caches.match(event.request).then(response => {
    return response || fetch(event.request);
  }));
});
```

```js
const fetchFromServer = fetch('/somefile.json').then(response => {
  return response.json();
}).then(data => {
  isthereceiveddatanew = true;
  usethenewdata(data);
});
```

**Server Then Cache**

First retrieves from server , if server error then retrieves from cache.

```js
self.addEventListener('fetch',event => {
  event.respondWith(fetch(event.request).catch(() {
    return caches.match(event.request);
  }));
});
```

**Cache Update Refresh**

Retrieves cached version , then retrieves from server and saves to cache.
On next request retrieves new cached version.

```js
caches.match('/somefile.json').then(response => {
  return response.json();
}).then(data => {
  if (!isthereceiveddatanew) {
   usethenewdata(data); 
  }
}).catch(() => {
  return fetchfromserver;
});
```

# Fallback Image

Displays given image when cache and server both fail.

```js
self.addEventListener('fetch',event => {
  event.respondWith(caches.match(event.request).then(response => {
    return response || fetch(event.request);
  }).catch(() => {
    return caches.match('/placeholder.png');
  }));
});
```

# Handle Different Assets

```js
if (acceptHeader.indexOf('image/*')) {
  console.log('an image');
}
```

```js
if (acceptHeader.indexOf('text/css')) {
  console.log('a css file');
}
```

```js
if (acceptHeader.indexOf('text/html')) {
  console.log('an html file');
}
```

```js
if (acceptHeader.indexOf('*/*')) {
  console.log('it is anything');
}
```
