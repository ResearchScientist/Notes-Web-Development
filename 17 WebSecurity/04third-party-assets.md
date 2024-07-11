# Attack Method

- malicious downloads
- outdated versions

# Version Control

- use LTS versions
- use a lockfile for builds
- test app behaviour

# Sub Resource Integrity

Make sha keys to authenticate files.

- add integrity and crossorigin to html
- open file in browser
- console error displays valid sha key
- replace blank with sha key

index.html
```html
<link rel="stylesheet" integrity="blank" crossorigin="anonymous" href="./styles/main.css"/>
```
