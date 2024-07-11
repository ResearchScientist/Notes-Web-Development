// app version

const version = 2;
let cacheName = `talk-${version}`;

self.addEventListener("install",onInstall);
self.addEventListener("activate",onActivate);
self.addEventListener("fetch",onFetch);

main().catch(console.error);

async function main() {
  console.log(`service worker (${version}) is starting`);
  await cacheLoggedOutFiles();
}

async function onInstall(evt) {
  console.log(`service worker (${version}) is installed`);
  self.skipWaiting();  // immediately jumps to active state
}

//async function onActivate(evt) {
//  console.log(`service worker (${version}) is active`);
//  evt.waitUntil(handleActivation());
//}

function onActivate(evt) {
  evt.waitUntil(handleActivation());
}

async function handleActivation() {
  await clearCaches();
  await cacheLoggedOutFiles(true);
  await clients.claim();
  console.log(`service worker (${version}) is active`);
}

async function clearCaches() {
  var cacheNames = await caches.keys();
  var oldCacheNames = cacheNames.filter(function matchOldCache(cacheName) {
    if (/^talk-\d+$/.test(cacheName)) {
      let [,cacheVersion] = cacheName.match(/^talk-(\d+)$/);
      cacheVersion = (cacheVersion != null) ? Number(cacheVersion) : cacheVersion;
      return (cacheVersion > 0 && cacheVersion != version);
    }
  });
  return Promise.all(oldCacheNames.map(function deleteCache(cacheName) {
    return caches.delete(cacheName);
  }));
}

// Fetch

function onFetch(evt) {
  evt.respondWith(router(evt.request));
}

async function router(req) {
  var url = new URL(req.url);
  var reqURL = url.pathname;
  var cache = await caches.open(cacheName);
  if (url.origin == location.origin) {
    let res;
    try {
      let fetchOptions = {
        method: req.method,
        headers: req.headers,
        credentials: "omit",
        cache: "no-store"
      };
      res = await fetch(req.url,fetchOptions);
      if (res && res.ok) {
        await cache.put(reqURL,res.clone());
        return res;
      }
    }
    catch (err) {}
    res = await cache.match(reqURL);
    if (res) {
      return res.clone();
    }
  }
  // how to handle cors
}

// Cache

var urlsToCache = {
  loggedOut: [
    "./",
    "./index.html",
    "./main.js",
    "./Styles/main.css",
    "./Assets/online.png",
    "./Assets/offline.png",
    "./Assets/syncing.png",
    "./Assets/not-syncing.png"
    // "./404" add this page
  ]
};

async function cacheLoggedOutFiles(forceReload = false) {
  var cache = await caches.open(cacheName);
  return Promise.all(urlsToCache.loggedOut.map(async function requestFile(url) {
    try {
      let res;
      if (!forceReload) {
        res = await cache.match(url);
        if (res) {
          return res;
        }
      }
      let fetchOptions = {
        method: "GET",
        cache: "no-cache",
        credentials: "omit"
      };
      res = await fetch(url,fetchOptions);
      if (res.ok) {
        await cache.put(url,res);
      }
    }
    catch (err) {
      
    }
  }));
}
