# Base

Base styles for main elements.

**Reset Element Styles**
- padding & margin = 0

**Define Colours**
- css variables

**Define Font Size**
- css variables

# Layout

- Grid System
- Major Sections
- Sub Sections

Placement of headers, sections, asides.

# Modules

Modules contain the actual content.
Each module is an interface that the user needs to learn.

- navigation
- buttons

**Components**

Components are the backgrounds, borders, h1, p, within each module.
Use the same style for components to maintain consistency between modules.

# States

Buttons have inactive, active, previously active.

# Theme

Theme is the overall feel of the product which arises from the styling choices.

# Naming

`rootElement-module`
`rootElement--component`

# Icon Components

Place icons in a sprite sheet.
Place an icon in a div and inline-block so it aligns with the text.

# Reduce Selectors

Use the smallest amount of selectors to style an element. This avoids styles having to overwrite eah other.

Renaming the class helps keep number of selectors to a minimum.
```css
/* nested navigation with different styles for each */
.nav {. . .}
.nav > li {. . .}        /* styles only the direct li under the nav  */
.nav > li > a{. . .}     /* styles only the a under the li */

.subnav {. . .}          /* name for nested nav */
.subnav > li > a{. . .}  /* styles only the a under the li */
```

# State Representation

- classes
- pseudo classes
- attribute selectors
- media queries

Avoid a state affecting more than one module.

**Pseudo Classes**

` :hover`
` :checked`

**Attribute Selectors**

```html
<button class="btn" data-state="disabled"> disabled </button>
```

```css3
.btn[data-state=default] {color: light-blue;}
.btn[data-state=pressed] {color: blue;}
.btn[data-state=disabled] {opacity: .5; pointer-events: none;}
```

```js
// this is jq use vanilla js instead
$("btn").bind("click",function() {
  $(this).attr('data-state','pressed');
});
```
