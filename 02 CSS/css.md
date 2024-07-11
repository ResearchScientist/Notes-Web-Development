# Comments

`/* some comment */`

# Reset

At beginning of file for reseting styles.

```css
/* makes divs include padding and margin in size calculation */
* {
  box-sizing: border-box;
}

/* resets sizes */
main {
  margin: 0;
  padding: 0;
}
```

# Selectors

**Elements**

`element` selects element
`element1, element2` selects both elements
`element1 element2` more specific selector for element2
`.name` class
`#name` id

`div1 > div2` selects nested element
`div1 + div2` selects same level elements
`div1 ~ div2` selects all matching elements

`.div1 .div2 { }` selects all .div2 nested in .div1
`.div1 > .div2 { }` selects only .div2 nested directly .div1

`.someDiv:nth-of-type(n)` selects divs based on n

**Attributes**

`element[attribute]` selects elements with the given attribute
`element:not([attribute])` selects elements without the given attribute
`element[attribute="value"]` selects elements with the given value for the attribute
`element[attribute^="value"]` selects elements that begin with the given value for the attribute
`element[attribute$="value"]` selects elements that end with the given value for the attribute
`element[attribute*="value"]` selects elements that begin with the given value for the attribute

**UI**

`:enabled`
`:disabled`
`:checked`

**Structure**

`:root`
`:nth-of-type()` takes odd,even,3n (every third element),5 (fifth element)
`:only-of-type` matches only one of a kind elements

**Logical**

`element:not(element1)` excludes element1

# Pseudo Class

Selects existing elements.

`.someDiv:hover` on mouse hover
`:active`
`:focus`
`:target`

# Pseudo Elements

Makes faux elements.

`::before`
`::after`

```CSS
p:first-of-type::firstletter {
  /* some styles */
}
```

# Generated Content

For a pseudo element the only required attribute is `content`.

Content values are `none` `string` `image` `counter`.

**String**

```CSS
/* fills in the faux elements with given text in content */
p::before {
  content: "I'm first";
}

p::after {
  content: "I'm last";
}
```

**Counter**

```CSS
/* counts the number of headers */
body {
  counter-reset: sections;
}

header h1.sectiontitle:before {
  content: "Part " counter(sections) ": ";
  counter-increment: sections;
}
```

# Display

`inline` width, height, margin, padding cannot be changed
`block` takes up full width of view port , all attributes can be changed
`inline-block` allows placing div inline with text and able to change all its attributes

div default is block
span default is inline

# Viewport

Always include in head of html.
`<meta name="viewport" content="width"=device-width,initial-scale=1,maximum-scale=1/>`

# Media Queries

```CSS
@media screen and (max-width: 300px) {
  /* styles */
};
```

# Image Media Query

No need to make images with greater than 92dpi since screens do not render higher than that.

```js
@media (min-width: 1px) {
  backgroundImage {
    background: url(imageSmall.png) no-repeat;
    height: 50px;
  }
}

@media (min-width: 500px) {
  backgroundImage {
    background: url(imageMedium.png) no-repeat;
    height: 100px;
  }
}

@media (min-width: 1000px) {
  backgroundImage {
    background: url(imageLarge.png) no-repeat;
    height: 200px;
  }
}
```

# Table

`caption-side: top;`
`border-spacing: px px;`
`border-collapse: separate;`
`vertical-align: baseline;`
`tr:hover {background-color: gray;}`

```html
<table>
  <caption>some table caption</caption>
  <thead>
    <tr>
      <th scope="col">header one</th>
      <th scope="col">header one</th>
      <th scope="col">header one</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>data 1</td>
      <td>data 2</td>
      <td>data 3</td>
    </tr>
    <tr>
      <td>data 4</td>
      <td>data 5</td>
      <td>data 6</td>
    </tr>
  </tbody>
</table>
```

# Background

**Image**
`background-image: url(some.png);` paints image as background for div
`cross-fade()` alternates between given images
`background-attachment:` fixed , local , scroll
`background-size:` cover

**Gradient**
`background-image: linear-gradient(red 0vh,orange 20vh,yellow 40vh,green 60vh,blue 80vh,purple 100vh);` smooth gradient between colours
`background-image: linear-gradient(red 0vh,orange 20vh,yellow 20vh,green 60vh,blue 80vh,purple 100vh);` hard transition between orange and yellow , smooth gradient between rest of colours

# Transform

**2D**

Put multiple attribute values on one transform.
The transformations occur in the order they are entered.

`transform: translate() scale() rotate() skew()` place in any order needed

**3D**

`transform: perspective(n);` n is the distance from the viewer , smaller numbers are closer to viewer
When placed on container it treats all elements as one unit.
When placed on individual elements each element is skewed uniquely.

`perspective-origin: x y;` location of the camera

# Animation

To move elements use `transform: translate();` instead of `position` to improve performance.

**Attributes**

`animation-name:` descriptive name
`animation-duration:` in s
`animation-timing-function:` ease-in,ease-out,cubic-bezier(x1,y1,x2,y2)
`steps:` useful for sprite animations
`animation-iteriation-count:` number of occurrences
`animation-direction:` normal,alternate,reverse,alternate-reverse
`animation-fill-mode:` none,backwards,forwards
`animation-play-state:` paused,running

`animation: ;` shorthand in order listed above , multiple animations can be defined separated by commas , when multiple are defined the order does not matter they will be played in order of duration shortest first longest last

Animations broadcast three events `animationstart`,`animationend`,`animationiteration`.
These can be used by javascript `addEventListener`.

**Keyframes**

```css
@keyframes someName {
  from {someAttribute: ;}
  to {someAttribute: ;}
}
```

```css
@keyframes someName {
  0% {someAttribute: ;}
  100% {someAttribute: ;}
}
```

# Shapes

```css
/* uses shape of png to cut out image on div */
div {
  clip-path: url(some.png);` 
}
```

# Calculations

Performs + - * /.
Units can be different.
Requires spaces around operators.
Calc can be nested.

`calc(100vw - 20px)` 

# CSS Custom Properties

```css
/* root sets as global variables */
:root {
  --primaryColour: salmon;
  --focusColour: pink;
}

h1 {
  color: var(--brandColour);
}
```

# Calculations With Custom Propertions

Example of a grid system.

```css
main {
  display: flex;
  justify-content: space-bwtween;
  --columns: 16;
}

[class*="column-"] {  /* selects all divs with a class name starting with column- */
  --width: 4;         /* number of columns */
  --initialbasiss: calc(var(--width) / var(--columns) * 100%);
  flex: var(--initialbasis);
}

@media (min-width: 400px) {
  someDiv {--width: 2;}  // 2 is used in calulation of initialbase above
}

/* change number of columns in each div , total is 16 */
@media (min-width: 1000px;) {
  #one {
    --width: 5;
  }
  #two {
    --width: 4;
  }
  #three {
    --width: 5;
  }
  #four {
    --width: 2;
  }
}
```
