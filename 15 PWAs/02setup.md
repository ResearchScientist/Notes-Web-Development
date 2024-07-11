# Manifest JSON

If using webpack the manifest.json file wont appear in the dist directory.

Within utils directory open index.js and import the file loader.
```js
import 'file-loader?name=./mymanifest.json!./mymanifest.json';
```

In html add link to manifest file.
```html
<link rel="manifest" href="/mymanifest.json">
```
