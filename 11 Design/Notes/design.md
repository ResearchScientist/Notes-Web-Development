# Layout

**Composition**

*Rule of thirds*
Divide a canvas into three sections horizontally and 3 sections vertically.
Then place the item of focus in one of the intersections.

*Triad*
To keep the eye from moving out of a canvas place items such that they form a triangle. Such as a focal point near an edge that draws the eye downwards then across the middle of the other side of the canvas before drawing the eye back towards the initial focal point.
This keeps the viewer scanning the canvas.
Motion and gaze are good tools for drawing the eye towards a path.

*Scale*
Relative sizes between items can be used to show their relationship and draw emphasis.

*Z Axis*
Place items slightly in front of or behind each other to add depth.

**Grid**

*Anchoring*
Items are aligned with purpose and relative to each other.

*Primitive Shapes*
Use primitive shapes such circles, rectangles, triangles for the basic layout.

*Diagonals*
You can break the grid effectively by using diagonals in the background.

**Tools**

gridbyexample . com
Site that gives examples of grid layouts.

# Colour Theory

**Modes**

RGB is additive.
CMY is subtractive.

**Mixing**

Based on a colour wheel.
RGB
HSL

HSL lends itself well for generative colour schemes.

*Monochromatic*
One colour with variations of shade.

*Complementary*
Colours that are opposite each other are paired. Such as blue and yellow.

*Analogous*
Colours that are next to each other are used.

*Triadic*
Three colours that are evenly spaced around the wheel.

**Tools**

coolors . co
Site for colour palettes that can be customized.

uigradients
Site for gradient colour examples.

**Custom Palette**

Choose your base colour.
Add variations by changing the shade.
Add grays by desaturating the base colour.

# Images

Double the size then compress.

**Tools**
omg svg

# Inspiration

**Sites**

give and go
ui kits

# Prototype

Make quick thumbnail sketches. These are for generating many different ideas. Easy to make easy to discard.

Storyboards are higher fidelity and used for communicating ideas.

# Typography

*serif* decorated edges
*sans serif* no decoration
*display* for headings, not for paragraphs

**Pairing**
Use 2 styles.
Display (headings) and sans serif (body).
Serif (headings) and sans serif (body).

**Line Length**
Keep lines between 50 and 90 characters.

```css
@media (min-width: 58em) {
  p { max-width: 38em; }  // maintains line at about 70 characters
}
```

**Line Height**
As the length of the lines increase then the line height should also increase in order to maintain readability.
Shorter lines require shorter line heights.

**Font Size**

codepen madebyMike has a post and a js on how to size automatically.

**Unstyled Page**

To avoid the flash of an unstyled page use `webfont` inactive or active.

```css
// shows the local font then switches to the web font once it has finished loading
body {
  font-family: "someWebFont",someLocalFont;
}

.wf-inactive body {
  font-family: someLocalFont;
}
```
```css
// slight adjustments to make fonts match better when switching
p {
  font-size: 1.125em;
  line-height: 1.5;
  .wf-inactive & {
    font-size: 1.2em;
    line-height: 1.475;
  }
}
```

**Variable Fonts**

All styles are able to be animated.
MDN web tools has a font tool to see all the styles available to change.


`font-weight: 50;` thickness off characters
`font-stretch: 200;` characters stretch to fill space

`font-variation-settings: 'wght' 50;`
`font-variation-settings: 'wdth' 200;`
`font-variation-settings: 'opsz' 10;` optical size

Declaration
```css
/* make a different font face for each style and match the path */
@font-face {
  font-family: "someFont";
  font-style: normal;
  font-weight: normal;
  src: url("somePath"); // path to normal style
}
```

**Selectors**

`p:first-of-type:first-line {}` selects first line of paragraph
`p:first-of-type:first-letter {}` selects first letter of paragraph

**Media Queries**

```css
h1 {
  font-size: 2em;
  line-height: 1.25;
}

@media (min-width: 43.75em) {
  h1 {font-size: 2.5em; line-height: 1.25;}
}

@media (min-width: 56.25em) {
  h1 {font-size: 3em; line-height: 1.05;}
}
```
