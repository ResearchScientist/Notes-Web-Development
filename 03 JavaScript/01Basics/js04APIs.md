# Cache API

For making webpages available offline.

`manifest` html attribute that signals what file to store in cache , each webpage to be cached must have this attribute
`someFileName.appcache` name of the file that contains listing of items to cache

To force update cached content on client side make a change to the manifest such as an update date.

```html
<!--html-->

<html manifest="manifest.appcache">
```
```
# cache manifest file

CACHE MANIFEST # always included

CACHE: 
/somePage.html
/somePage.css
/somePage.js

/Images/image1.png
/Images/image2.png

NETWORK:
*  # indicates not to cache files not on cache list

FALLBACK:
/someOfflineFile.html # file to display for pages not cached
```

# Web Storage API

Stores structured data client side.

`sessionStorage` data persists until tab is closed
`localStorage` data persists until user deletes it

```javascript
localStorage.firstName = "Hello"; // viewable in dev tools storage
localStorage.lastName = "Kitty";  // viewable in dev tools storage

var firstname = localStorage.firstName;
var lastname = localStorage.lastName;

console.log(firstname,lastname);  // Hello Kitty
```

**Methods**

`localStorage.setItem(key,value)` sets the given value to the given key
`localStorage.getItem(key)` returns given key's value
`localStorage.removeItem(key)` deletes given key
`localStorage.clear()` deletes all keys and values

# Web Components API

Used for encapsulation by importing an HTML page into your HTML page.
Makes use of custom HTML elements.

Google polymer and firefox xtags are two implementations using web components.

**Custom Elements**

`<template>` used as a template for other elements on the page , use js to make copies of it

**Shadow DOM**

Elements that are hidden such as `<audio>` `<video>` and `<input type='date'>` `<input type='color'>`
These elements are sandboxed. They cannot be affected by external css or accessed with query selectors.
They must be attached to the DOM with a shadowRoot node. The shadow container does not render but the element attached via the shadow root node does render.

```html
<!--html-->
<div id="shadowContainer">
  I'm the shadow container.
</div>
```
```javascript
// javascript
var host = document.querySelector('#shadowContainer'); // does not render
const shadowRoot = host.attachShadow({mode:'open'});
shadowRoot.innerHTML = '<div>Im a shadow div</div>'; // renders
```

# Web Workers

Used for managing CPU intensive tasks by moving those tasks to threads not being used for drawing the DOM.

**Dedicated** specific to one page or one tab , do not interact with other web workers
**Shared** can appear on different pages and interact with each other , share the same values

Web workers do not have access to the DOM , window , document.
Web workers access navigation , location , XMLHttpRequest , setTimeout , clearTimeout , setInterval , clearInterval , cache , importScripts.

```javascript
// code in html script tag
// new worker
var worker = new Worker("worker0.js");

// listen for message and do something
worker.onmessage = function(event) {
  alert('received' + event.data.firstName);
};

// send a string message to the worker
worker.postMessage('miu');

// object message
var catObject = {'firstName': 'Hello','lastName': 'Kitty'};
worker.postMessage(catObject);

// one way to stop worker
setTimeout(function() {
  worker.terminate();
},10000); // kills worker after 10 seconds

// code in worker0.js file
onmessage = function(event) {
  if (event.data === 'miu') {
    // some code to run
    done();
    close(); // another way to stop the worker
  }
};

function done() {
  postMessage('miu miu');
}
```

# Orientations

`event.Data.alpha` orientation
`event.Data.beta` front back inclination
`event.Data.gamma` left right inclination

# Accelerometer

Returns orientation and acceleration of device in m/s^2

For devices with a gyroscope use

`event.acceleration.x`
`event.acceleration.y`
`event.acceleration.z`

For all others use

`event.accelerationIncludingGravity.x`
`event.accelerationIncludingGravity.y`
`event.accelerationIncludingGravity.z`

Example code 
```
<!doctype html>
<html>
   <head></head>
   <body>
      <h2>Device Orientation with HTML5</h2>
      You need to be on a mobile device or use a laptop with accelerometer/orientation
      device.
      <p>
      <div id="rawAccel"></div>
      <div id="tiltFB"></div>
      <div id="tiltLR"></div>
      <div id="upDown"></div>
      <img src="http://www.html5rocks.com/en/tutorials/device/orientation/html5_logo.png" id="imgLogo" class="logo">
      <script type="text/javascript">
         if (window.DeviceMotionEvent != undefined) {
         console.log("DeviceMotion is supported");
         window.addEventListener('devicemotion', function(eventData) {
            // Grab the acceleration including gravity from the results
            var acceleration = eventData.accelerationIncludingGravity;
            // Display the raw acceleration data
            var rawAcceleration = "[" + Math.round(acceleration.x) + ", " + Math.round(acceleration.y) 
            + ", " + Math.round(acceleration.z) + "]";
            // Z is the acceleration in the Z axis, and if the device
            // is facing up or down
            var facingUp = -1;
            if (acceleration.z > 0) {
               facingUp = +1;
            }
            // Convert the value from acceleration to degrees
            // acceleration.x|y is the acceleration according to gravity,
            //  we'll assume we're on Earth and divide
            // by 9.81 (earth gravity) to get a percentage value,  
            // and then multiply that by 90 to convert to degrees.
            var tiltLR = Math.round(((acceleration.x) / 9.81) * -90);
            var tiltFB = Math.round(((acceleration.y + 9.81) / 9.81) * 90 * facingUp);
            document.querySelector("#rawAccel").innerHTML =
                               "Raw acceleration" + rawAcceleration;
            document.querySelector("#tiltFB").innerHTML =
                               "Tilt front/back : " + tiltFB;
            document.querySelector("#tiltLR").innerHTML =
                               "Tilt left/right : " + tiltLR;
            document.querySelector("#upDown").innerHTML =
                               "Face Up:Down : " + facingUp;
            updateLogoOrientation(tiltLR, tiltFB);
         }, false);
      } else {
        alert("Not supported on your device or browser. Sorry.");
      }
      function updateLogoOrientation(tiltLR, tiltFB) {
         // USE CSS3 rotations for rotating the HTML5 logo
         //for webkit browser
         document.getElementById("imgLogo").style.webkitTransform =
         "rotate(" + tiltLR + "deg) rotate3d(1,0,0, " + (tiltFB * -1) + "deg)";
         //for HTML5 standard-compliance
         document.getElementById("imgLogo").style.transform =
         "rotate(" + tiltLR + "deg) rotate3d(1,0,0, " + (tiltFB * -1) + "deg)";
      }
   </script>
  </body>
</html>
```

