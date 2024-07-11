# Metadata

**Title**
`<title></title>`
30 to 60 characters

**Description**

`<meta name="description" content="some description"/>`

Favor more detailed and unique descriptions vs general popular descriptions.
120 to 150 characters

# Twitter Cards

Image
`<meta name="twitter:card" content="summary_large_image"/>`
`<meta name="twitter:site" content="@websitename"/>`
`<meta name="twitter:creater" content="@twittername"/>`
`<meta name="twitter:image" content="someimage.png"/>`

Video
`<meta name="twitter:card" content="player"/>`

App
`<meta name="twitter:card" content="app"/>`

# Pinterest Rich Pins

Follow pinterest website instructions.

# Structured Data

JSON ld schema

```html
<script type="application/ld+json">
{

}
```

google breadcrumblist
google structure data testing tool

# Mobile Optimization

`<meta name="viewport" content="width=device-width, initial-scale=1">`

`<meta name="apple-mobile-web-app-capable" content="yes">`
`<meta name="apple-mobile-web-app-status-bar-style" content="blue">`
`<meta name="apple-mobile-web-app-title" content="short title">`

**Manifest JSON**

html
```html
<link rel="manifest" href="/manifest.json">
```

JSON file
```json
{
  "name": "some name",               // app name
  "icons": [
    {
      "src": "/somefile192x192.png", // home screen
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/somefile512x512.png", // splash screen
      "sizes": "512x512",
      "type": "image/png"
    }
  ],                 // various icon sizes
  "theme_color": "#dd50AA",    // title bar
  "background_color": #"BBBBBB", // start up screen
  "display": "standalone"      // launch as an app
}
```

# Accelerated Mobile Page

google amp project
