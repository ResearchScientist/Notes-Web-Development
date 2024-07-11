# Characteristics

- responsive
- offline
- downloadable
- push notifications
- local storage

# Metrics

**Chrome Dev Tools**

- Network
- Performance
- Lighthouse

To maintain 60 FPS each function must complete within 13 ms.

# Project Elements

```
Project
| 
-  Client  -  DB  -  Dist  -  Server  -  WebPack  -  keys
|    |        |        |
|components  sqlite  development
|routes              production
|sass
```

**Client**

Browser that handles the user interface.

- html
- css
- js

*Framework*

- vue
- react
- angular

If used then also creates components.

- index.jsx
- styles.scss

As well as creates routes and sass directories.

**DataBase**

- sqlite

**Dist**

Directory for development and production builds.

**Server**

- node.js API

**WebPack**

Build configuration.

**Keys**

.vapid.json

Private and public keys for developing in https.

# Device Emulation

**Web Dev Tools**

Responsive mode in chrome , firefox , safari.

**iOS Simulator**

On mac machines, Xcode has a built in iOS simulator for mobile devices.
Under develop menu click simulator.

**Android Simulator**

On windows the local host address 10.0.2.2 is your local machine.
Under develop menu click simulator.

**Android Studio**

Android virtual device manager.
Tools, Android, AVD Manager.

- define device to emulate
- make at least a phone and a tablet

# PWA Architecture

**Shell Pattern**

Design that separates
- user interface
- content

Displays the user interface items first via cache since they rarely change.
Displays the actual dynamic content via fetch or cache.

Components
- top address bar shows information
- middle section has content added and removed
- bottom navigation bar

**PRPL Pattern**

Design that uses routes for displaying content.

- push - critical resources
- render - initial route
- pre cache - all other routes
- lazy load - load all other routes as needed
