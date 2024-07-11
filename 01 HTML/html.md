# Online resources

- mozilla developer network
- css tricks

# Comment

`<!-- some comment -->`

# Semantic

HTML tags are for semantic structure.

main
body
article
button

# Navigation

Use button instead of div to make it accessible to screen readers
`<button></button>`

Drop Down Menu
```
<select> <option>
```

# Attributes

Provide more information for a tag

`<img src="path" alt="some description">`

`<input placeholder="Your Name"/>`

# Boilerplate

What always appears on an html file.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>some title</title>
    <link src="path"/>
    <script></script>
  </head>
  
  <body>
    <main></main>
  </body>
</html>
```

# Responsive Divs

`<picture>` you can wrap a picture tag around an image tag and add different source tags with a media query above the image tag.

I prefer to use a separate media query in the css and add a background image of a specific size within the media query definition.

`srcset` allows for multiple image files based on max width.
`src` is the fall back option.
```html
<img
  src="default.png" 
  srcset="mobile.png 300w, desk.png 900w, tv.png 1200w"
/>
```

# Tables

```html
<table>
  <caption>Some Name</caption>
  <colgroup>
    <col/>
  </colgroup>
  <thead>
    <tr>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th></th>
    </tr>
  </tfoot>
</table>
```
