# Render Tree

Only maps objects visible on the page.
Elements with `display:none;` are not handled by render tree.

# CSS Styles

Nested styles take longer to parse than same level styles.
Class names used for styling are much faster for performance.

- use fewer css styles
- use fewer selectors
- limit competing selectors on same element
- use a system like BEM to use class names as state declarations

# Render Pipeline

- JS
- style
- layout
- paint
- composite

# Threads

**UI Thread**
browser gui

**Render Thread**
JS,HTML,CSS,layout,paint
one per open tab

**Compositor Thread**
uses GPU to draw bitmaps onto the screen

# Reflow

Changes to the layout after initial render.

- CPU intensive
- blocks all other processes

**Causes**

Display Changes
- window resize
- device orientation change

Style Changes
- adding or removing a style sheet
- adding or removing classes

Content Changes
- adding or removing elements
- changing size
- changing position
- calculating size
- calculating position

**Solutions**

- change classes only on lowest level elements
- batch DOM manipulations
- use a framework

*with reflow example*

js
```js
const button = document.getElementById('double');
const boxes = Array.from(document.querySelectorAll('.box'));

const doubleWidth = (element) => {
  const width = element.offsetWidth;
  element.style.width = `${width * 2}px`;
};

button addEventListener('click',(event) => {
  boxes.forEach(doubleWidth);
});
// slow because it calculates each individual width prior to painting it
```

*without reflow example*

js
```js
const button = document.getElementById('double');
const boxes = Array.from(document.querySelectorAll('.box'));

const doubleWidth = (element) => {
  const width = element.offsetWidth;
  element.style.width = `${width * 2}px`;
};

button addEventListener('click',(event) => {
  const widths = boxes.map(element => element.offsetWidth);
  boxes.forEach(element,index) {
    element.style.width = `${widths[index] * 2}px`;
  }
});
// fast because it calculates all widths simultaneously then paints them
```

# Layout Thrashing

Forced synchronous layout.
JS repeatedly writes & reads to the DOM causing reflows.

**Causes**

- reading and writing requests appear one after the other

js
```js
element1.classList.toggle('darker');  // paint
const element1width = element1.width; // calculate
element2.classList.toggle('darker');  // paint
const element2width = element2.width; // calculate
```

**Solution**

- group calculations and calls together

js
```js
element1.classList.toggle('darker');  // paint
element2.classList.toggle('darker');  // paint
const element1width = element1.width; // calculate
const element2width = element2.width; // calculate
```

- do not mix reading & writing layout properties
- use css classes to change appearance of elements
- store data in memory instead of the DOM
- measure to stay within 60fps and 16ms

# Paint

Attributes that do not trigger a repaint.
- opacity
- css transforms

Painting makes bitmaps for the elements and puts them onto layers.

Independent layers
- root object of a page
- fixed , absolute positions
- css transforms
- overflow

# Composition

Uses the GPU and frees up the CPU to continue with other tasks.

Performant
- moving the same bitmap
- scaling
- rotating
- transparency
- filters

**Will Change**

`will-change: ;`

lets browser know that something will change
suggests to browser to give this element its own layer

*constant user interaction*

Place `will-change` in CSS.

*sporadic user interaction*

Place `will-change` in JS>

When a user hovers over a button , it is anticipated that the button will be clicked.
This is a good use for `will change` to inform of a button click animation.

js
```js
// on mouse hover , promote to own layer
element.addEventListener('mouseenter',() => {
  element.style.willChange = 'transform';
});

// on mouse leave , remove from own layer to save memory
element.addEventListener('mouseleave',() => {
  element.style.willChange = 'auto';
});

// some animation on GPU
element.addEventListener('click',() => {
  element.classList.toggle('move');
});

// remove from layer when animation ends
element.addEventListener('transitionend',() => {
  element.style.willChange = 'auto';
});
```
