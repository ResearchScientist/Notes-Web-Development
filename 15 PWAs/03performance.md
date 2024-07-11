# Rendering Path

html - css - js - parse - boot - data.json

# Client Side Rendering

Requires parsing JS file before any painting begins.
This can be a huge performance bottleneck.

**Solution**

- start app with a url agnostic html
- embed critical css in index.html
- add a loading animation

# Server Side Rendering

Complex.
