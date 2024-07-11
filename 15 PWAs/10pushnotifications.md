# Process

- obtain permission from user to send notifications
- permission grants a push subscription
- API uses subscription to package messages to push service
- push service sends messages to browsers

# SW

SW requires same permissions as notifications.

```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then((registration) => {
    // ask for push subscription
    let subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        'BE...5o'
      )
    };
    return registration.pushManager.subscribe(subscribeOptions);
  })
};
```

# VAPID

Keys used for identifying your messages vs other web traffic.

# Transform VAPID ID

```js
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
```

# Make VAPID Keys

`npm install -g web-push`
`web-push generate-vapid-keys`

- public key - used for making a push subscription
- private key - used for sending a message from your server to the push service

# Push Subscription

```js
JSON.stringify(subscription);
{
 endpoint: 'https://android.googleapis.com/gcm/send/f1LsxkKph...YeZ8kq_A',
 keys: {
   p256dh: 'Blc...rds=',
   auth: '512ONQ=='
 }
};
```

# Receive Message

sw.js
```js
self.addEventListener('push', (event) => {
  let eventData = event.data.text();
});
```

# Example

index.js
```js
let subscribeOptions = {};

let subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        VAPID.publicKey
      )
    };

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then((registration) => {
    console.log('registered');
    return registration.pushManager.subscribe(subsribeOptions).then((pushSubscription) => {
      return fetch('https://localhost:3100/api/push-subscription')
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(pushSubscription)
    })
  })
};
```

sw.js
```js
self.addEventListener('push',event => {
  let {data} = event;
  let textData = data.text();
  if (textData === 'TERMINATE') {
    self.registration.unregister();
    return;
  }
});
```

# Notification Permission

**Request Permission*

```js
Notification.requestPermission().then(permission => {
  console.log(permission);
});
```

**Status**

- default - not prompted user
- granted - notifications allowed
- denied - notifications blocked for ever

**Request Permission & Show Notification When Granted**

```js
if ('Notification' in window) {
  if(Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
      const notification = new Notification('Thanks', {body: 'You will now be able to see notifications.'});
    });
  }
};
```

# Make Notification

```js
const notification = new Notification(
  'notification title',
  {
    body: 'text to show in notification',
    icon: 'someicon.png'
  });
```

# Trigger Notifications With SW

```js
self.addEventListener('activate', event => {
  self.registration.showNotification('hi');
});
```

# Notification Options

- body - notification text
- icon - small image
- image - large image
- badge - chrome on android
- sound - alert
- vibrate - alert

- tag
- data
- requireInteraction
- renotify
- silent

# Libraries

**NODE.JS**
- github.com/web-push-libs/web-push
