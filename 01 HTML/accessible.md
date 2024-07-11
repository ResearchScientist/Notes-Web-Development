# Debugging

**First Steps**

- render in browser
- test navigation with keyboard only
- test colour contrast
- use magnify and zoom
- use screen reader
- use accessibility web extensions

# Keyboard Navigation

Not all users use a mouse.

**Shortcuts**

Make a list of keyboard shortcuts for navigating the site and accessing its various items.
Define custom key bindings that are intuitive.

**Tabbing**

Native Navigation
`tab` next item
`shift + tab` previous item

Cycles through the following tags
`<a>`
`<button>`
`<input>`
`<select>`
`<textarea>`
`<iframe>`

Does not cycle through most other tags
`<div>`
`<section>`

*Tab Index*

Make any element able to be tabbed into, focusable.

`tabindex="n"`

n is hierarchy order
- `0` - default , reached via sequential order based on html position
- `neg number` - can be focused but not via sequential order , can give specific order with JS
- `pos number` - reached via sequential order given by number

**Skip Links**

A link that steps over a group of links that otherwise would be tabbed into and cycled through.
Useful for helping users skip over navigation and go directly into some main content.

HTML
```html
<a href="#maincontnet" class="skip-link">
  skip to main content
</a>

<div class="navigation">
  navigation buttons
</div>

<div id="maincontent" tabindex="-1">
  main content
</div>
```

CSS
```css
#skip-link {
  position: absolute;
  top: -40px;          // I prefer not to hide it , to not confuse anyone
  z-index: 1000;
}

#skip-link:focus {
  top: 0;
}
```

*Good Practice*

Use skip links for navigation and other elements similarly repeated across pages.

# Hidden vs Visible Elements

Renders in DOM but visually hidden.
Reader accessible.
Useful for including screen reader text.
```
.visually-hidden {
  border: 0;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
}
```

Renders in DOM but visually hidden. Accessible.
Reader accessible.
```
.opacity {
  opacity: 0;
}
```

Removed from DOM.
Not reader accessible.
```
.displayNone {
  display: none;
}
```

Renders in DOM but visually hidden.
Not reader accessible.
```
.visibility {
  visibility: hidden;
}
```

# Custom Focusable Elements

Once an element is made to be focusable, add accessibility info to the element.
```html
<div tabIndex="0" role="button" aria-label="Close"></div>
```

Also add accessible controls.
```html
<div tabIndex="0" role="button" aria-label="Close" onClick={clickHandler} onKeyDown={keydownHandler}></div>
```

# Focus

**Debugging**

Write this on chrome or firefox console with a website to inspect open.
```js
document.body.addEventListener('focusing',(event) => {
  console.log(document.activeElement)
});
```

**Save Focus Location**

`var currentElement = document.activeElement;` saves the users current focus location , useful for returning back to where they left off

**Tab Trapping**

Restrict tabbing to focus only on certain contained elements.

- put elements in an array
- listen for tab & shift + tab keydown events
- if moving forward and on last item , focus on first
- if moving backward and on first item , focus on last

```js
if (document.activeElement === firstTabStop) {
  e.preventDefault();
  lastTabStop.focus();
}
```

Example of pop up modal containing navigation elements.
```js
var modal = document.querySelector(".focus-modal");
var modalButton = document.querySelector(".focus-moda-buttonl");
var modalOverlay = document.querySelector(".focus-modal-overlay");
var cancelButton = document.querySelector(".focus-modal-cancel");

modalButton.addEventListener('click,open');
cancelButton.addEventListener('click,close');

function open() {
  var previouslyFocused = document.activeElement;
  
  // list of elements to focus , there are many more than listed here
  var focusableElements = modal.querySelectorAll('a[href],area[href],select:not[disabled]');
  focusableElements = Array.prototype.slice.call(focusableElements);
  
  var firstItem = focusableElements[0];
  var lastItem = focusableElements[focusableElements.length - 1];
  
  modal.addEventListener('keydown',trap);
  // show modal
  modal.style.display = "block";
  modalOverlay.style.display = "block";
  
  function trap(event) {
    console.log(event.keycode) // shows keycode of button pressed to use below
    if (event.keyCode === 9) {
      if (event.shiftkey) {        // moving backwards
        if(document.activeElement === firstItem) {
          event.preventDefault();
          lastItem.focus();
        }
      }
      else {                   // moving forwards
        if(document.activeElement === lastItem) {
          event.preventDefault();
          firstItem.focus();
        }
      }
    }
    else if (event.keycode === 27) { // escape key pressed
      close();
    }
  }
}

function close() {
  // hide modal
  modal.style.display = "none";
  modalOverlay.style.display = "none";
}
```

**Disable Focus On Elements Under A Modal**

```html
<div aria-hidden="true" tabindex="-1"></div>
```

**Focus Styles**

Do not remove focus outline.
Instead customize the focus outline.
I may want to use an inset drop shadow.

```
:hover, :focus {
  outline: 5px auto brandColour;
}
```

# Screen Readers

**Alt**

`img src="some.png" alt="some description"/>` no need to write image of
`alt=""` skips element , such as purely decorative elements
`alt="SOME DESCRIPTION"` words in all caps are read letter by letter

**Audio & Video**

Provide a descriptive text transcript.

**Hidden Elements**

Screen readers do not read any elements with the following attributes.
`display: none;`
`visibility: hidden;`
`<input hidden/>`

# Semantic HTML

`<html lang="en">` declares language for page
`<quote lang="ru"/>` declares language for the quote

Use only one `H1` tag per page.

# ARIA

**Role**

Attribute that semantically describes the element.
Useful for older browsers.

```html
<article role="article">some text</article>  // what new browsers see
<div role="article">some text</div>          // what older browsers see
```

**Label For**

Label for the element it appears in.
```html
<label for="username">Your user name</label>
<input type="text" id="username">
```

**Label By**

Useful for differentiating between a shipping vs billing address.

Groups elements under multiple labels.
```html
<div id="user">User</div>

<div>
  <div id="name">Name</div>
  <input type="text" aria-labelledby="user name"/>
</div>

<div>
  <div id="address">Address</div>
  <input type="text" aria-labelledby="user address"/>
</div>
```

**Describe By**

Screen readers read the text within the element given in the attribute `aria-describedby="someElement"`.
Useful for detailed descriptions of effects based on user actions.
Useful for giving instructions to users on correct format for inputing text.

```html
<button aria-label="Close" aria-describedby="description-Close" onclick="myDialogue.close()">X</button>

<div id="description-Close">Closing this window discards information you entered and returns you to main page.</div>
```

**Live Regions**

Useful for frequently updated data such as a chat application.

`aria-live=""` reads updated information
- `off` does not read updates , default
- `polite` reads update once finished reading current section
- `assertive` stops reading current section and reads updates immediately as they occur

`aria-relevant=""` defines what updated information to read

-`additions`
-`removals`
-`text`
-`all`

*Live Region Example*

Buttons increment or decrement counter by 10.
Adding `aria-live="assertive"` allows the reader to read the value each time it is incremented or decremented.

HTML
```html
<section>
  <div class="display-panel">
    <div id="count" aria-live="assertive">0</div>
  </div>
  <div class="buttons">
    <button id="inc" class="btn btn-primary">increment</button>
    <button id="dec" class="btn btn-default">decrement</button>
  </div>
</section>
```

JS
```js
var increment = document.querySelector('#inc');
var decrement = document.querySelector('#dec');
var counter = document.querySelector('#count');

var count = 0;

increment.addEventListener('click',add);
decrement.addEventListener('click',subtract);

function add() {
  count += 10;
  setCounter();
};

function subtract() {
  count -= 10;
  setCounter();
};

function setCounter() {
  counter.innerHTML = count;
}

setCounter();
```

**CSS Selectors**

```css
.dropdown[aria-expanded="false"].icon::after {
  content:'rightTriangleicon';
}

.dropdown[aria-expanded="true"].icon::after {
  content:'downTriangleicon';
}
```

# Progressive Enhancement

**JS Off**

Some users do not enable JS.

To accommodate this user base
- develop navigation interaction with CSS only
- use JS to check if JS is turned on
- if on
  - use JS to remove CSS only styles
  - use JS to add custom JS navigation
- if off
  - JS does not remove CSS only styles

# Colour

Do not use colour alone in order to convey information.
Use shape , size , contrast in addition to colour.

# Motion

**Start Animation Button**

Include a start animation button to allow users to begin animation.

**Seizures**

Do not make any page element flash more than 3 times per second.

**Customize Animations**

For users that have set their devices to reduce animations.

CSS Solution
```css
@media (prefers-reduced-motion: reduce) {
  .animation {animation: none; transition: none;}
}
```

JS Custom Solution
```js
var motionQuery = matchMedia('(prefers-reduced-motion)');

function handleReducedMotion() {
  if (motionQuery.matches) {
    // adjust animation or transition properties
  }
  else {
    // normal animation
  }
}

motionQuery.addListener(handleReducedMotion);

handleReducedMotion();
```

# Tools

**Google**
Lighthouse

**FireFox**
Look for extensions.

**Readers**
Install a reader to get a sense of what users experience.
Mobile devices and some OSs have built in screen readers.

# Testing

Use a testing library.
Test for the desired outcome instead of testing for the code itself.

- accessilityjs from github
- a11yjs

**Linting**

- look for accessibility specific linting

**Unit Tests**

- interaction & focus APIs
- aria states
- text alternatives

**Integration Tests**

- how well do individual units interact with each other

**User Testing**

- have users interact with the site

# Resources

- a11y
- microsoft inclusive toolkit

# Website Audit

Maintain a checklist of items to cover when developing a site.
