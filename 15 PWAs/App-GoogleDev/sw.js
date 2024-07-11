const version = 1;
let cacheName = `talk-${version}`;

self.addEventListener("install",onInstall);
self.addEventListener("activate",onActivate);
//self.addEventListener("fetch",onFetch);

main().catch(console.error);

async function main() {
  console.log(`service worker (${version}) is starting`);
  //await cacheLoggedOutFiles();
}

async function onInstall(evt) {
  console.log(`service worker (${version}) is installed`);
  self.skipWaiting();  // immediately jumps to active state
}

function onActivate(evt) {
  evt.waitUntil(handleActivation());
}

async function handleActivation() {
  console.log(`service worker (${version}) is active`);
}

//async function handleActivation() {
//  await clearCaches();
//  await cacheLoggedOutFiles(true);
//  await clients.claim();
//  console.log(`service worker (${version}) is active`);
//}