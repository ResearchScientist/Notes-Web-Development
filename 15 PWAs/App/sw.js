// Count instances , used for debugging , remove for production

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

// SW

//self.addEventListener('install',event => {
//  console.log('installing sw');
//});

//self.addEventListener('activate',event => {
//  console.log('activating');
//});

//self.addEventListener('fetch',event => {
//  console.log('fetching',event.request.url);
//});



// not used

// PRECACHE
//self.addEventListener('install',event => {
//  console.log('installing');
//  event.waitUntil(
//    caches.open(cacheName).then(cache => {
//      return cache.addAll(resourcesToPrecache);
//    })
//  );
//});

//self.addEventListener('activate',event => {
//  console.log('activating');
//});

//self.addEventListener('fetch',event => {
//  console.log('fetching',event.request.url);
//});

// PRECACHE RESOURCES

//const cacheName = 'cache-v1';
//const resourcesToPrecache = [
//  '/',
//  'styles/main.css',
//  'images/alien-starfish.png',
//  'images/alien-starfish.svg',
//];

// RESPOND WITH CACHED RESOURCES

//self.addEventListener('fetch',event => {
//  event.respondWith(caches.match(event.request).then(cachedResponse => {
//    return cachedResponse || fetch(event.request);
//  }));
//});



