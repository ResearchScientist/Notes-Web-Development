# Viewport

Use for all devices.
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

# Themes

```html
<meta name="theme-color" content="#aabbcc">
```

# Apple Specific

Removes browser chrome.
```html
<meta name="apple-mobile-web-app-capable" content="yes">
```

Defines colour of top bar as white or black.
```html
<meta name="apple-mobile-web-app-status-bar-style" content="black">
```

Title that appears under iOS icon. Max is 16 characters.
```html
<meta name="apple-mobile-web-app-title" content="some title">
```

```html
<link rel="apple-touch-icon" href="">
```

# Manifest

html
```html
<link rel="manifest" href="/manifest.json">
```

Do not include comments in json file as they invalidate the file.

json
```json
{
  "name": "my App",              // app name under icon
  "short_name": "myapp",         // shorter name
  "start_url": ".",              // 
  "icons": [                     // multiple icon sizes
    {"src": "/somename-192x192.png", // add to home screen size
    "sizes": "192x192",
    "type": "image/png"},
    {"src": "/somename-512x512.png", // splash screen size
    "sizes": "512x512",
    "type": "image/png"}
  ],
  "theme_color": "#25FFAA",      // title bar
  "background_color": "#2020AA", // splash screen and unstyled areas
  "display": "standalone"        // launch as an app
}
```

# Home Screen Icons

```html
<link href="https://someaddress" sizes="180x180" rel="apple-touch-icon"
```

PNGs must be squares and have the following exact dimensions.

iPhone
57,114,120,180

iPad
72,144,152,167

Android
128,192

# Schema

```html
<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "something"
}
</script>
```
