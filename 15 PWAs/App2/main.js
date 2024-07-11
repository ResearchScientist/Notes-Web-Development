// register sw

if ('serviceWorker' in navigator) {
  console.log('browser can use a sw');
  navigator.serviceWorker.register('sw.js').then(registration => {
    console.log('registered sw',registration);
  })
  .catch(error => {
    console.log('something bad happened',error);
  });
}


async function sendSWMessage(target) {
  if (target) {
    target.postMessage(msg);
  }
  else if (svcworker) {
    svcworker.postMessage(msg);
  }
  else {
    navigator.serviceWorker.controller.postMessage(msg);
  }
}







// ************************************ //
//          Doesn't Work                //
// ************************************ //

// inform if online or offline

// kinda works
if ('online' in navigator) {
  console.log('online');
}
else {
  console.log('offline');
}

// doesnt work
window.addEventListener("online", () => {
  console.log('online');
});

window.addEventListener("offline", () => {
  console.log('offline');
});

// don't even know what this does
(function Blog() {
  var offlineIcon;
  var isOnline = ("onLine" in navigator) ? navigator.onLine : true;
  
  //document.addEventListener("DOMContentLoaded",ready,false);
  
  function ready() {
    offlineIcon = document.getElementById("connectivity-status");
    
    if (!isOnline) {
      offlineIcon.classList.remove("hidden");
    }
    window.addEventListener("online",function online() {
      console.log("online");
      offlineIcon.classList.add("hidden");
      
      isOnline = true;
    });
    window.addEventListener("offline",function offline() {
      console.log("offline")
      offlineIcon.classList.remove("hidden");
      
      isOnline = false;
    });
}
})();

//  also causes an error

async function router(req) {
  var url = new URL(req.url);
  var reqURL = url.pathname;
  var cache = await caches.open(cacheName);
  if (url.origin == location.origin) {
    let res;
    if (isOnline) {
      try {
        let fetchOptions = {
          method: req.method,
          headers: req.headers,
          credentials: "same-origin",
          cache: "no-store"
        };
        res = await fetch(req.url,fetchOptions);
        if (res && res.ok) {
          if (req.method == "GET") {
            await cache.put(reqURL,res.clone());
          }
          return res;
        }
      }
      catch (err) {}
    }
    res = await cache.match(reqURL);
    if (res) {
      return res;
    }
    return notFoundResponse();
  }
  // how to handle cors
}

// custom response
function notFoundResponse() {
  return new Response("", {
    status: 404,
    statusText: "not found"
  });
}
