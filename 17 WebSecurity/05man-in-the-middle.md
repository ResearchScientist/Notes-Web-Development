# Attack Method

- scans devices in area and reads what networks they have previously connected to
- drops their current wifi connection
- transmits network with name previously known to devices
- devices connect to previously known name

# Attack Vectors

- wifi

# Effect

- listen to traffic
- cross site script
- obtain credentials

# HTTPS

Encrypts data in transit.

# Open SSL

Public Private Key Pair

For encrypting data.

Node.js can be used for making the keys.

# HTTPS Downgrade

Man In The Middle intercepts connection and redirects to http instead of https.

**Defend**

- restrict the browser from making http connections to the web domain.

HTTP Response Header
```js
Strict-Transport-Security: max-age=30000000; includeSubDomains
```

- add domain name to HSTS preload list at hstspreload . org
