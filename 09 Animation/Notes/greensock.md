# Syntax

`TweenMax.from(selector,time {property1:value1,property2:value2},delay);`

```js
TweenMax.to('div', 2, {
  scaleX:0.75, scaleY:0.5, x:100, ease:Elastic.easeOut
})
```

**Properties**

TweenMax uses camelcase.
TweenMax does not use units.

|CSS|TweenMax|
|--|--|
|`transform: translateX(10px);`|`x: 10`|
|`transform: translateY(10px);`|`y: 10`|
|`transform: translateZ(10px);`|`z: 10`|
|`transform: scale(10px);`|`scale: 10`|
|`transform: scaleX(10px);`|`scaleX: 10`|
|`transform: skew(10deg);`|`skew: 10`|
|`transform: skewX(10deg);`|`skewX: 10`|
|`transform: rotate(10deg);`|`rotation: 10`|
|`transform: rotateX(10deg);`|`rotationX: 10`|
|`transform: perspective:10px;`|`perspective: 10`|
|`transform-origin: 50% 50%;`|`transformOrigin: 50% 50%`|

# Stagger

`.staggerTo`

Applies animation to all elements with given div name.

```js
TweenMax.staggerTo('div', 2, {
  x:100, ,backgroundColor: #4f0d88, ease:Elastic.easeOut
}, 0.05);
```

# Timeline

- stacks animations
- change their order
- group into scenes
- add labels
- animate scenes
- change speed of whole animation

```js
var tl = new TimelineLite();

tl.to(".orange", 1, {x:750})
  .to(".red", 1, {x:750})          # starts when above finishes
  .to(".green", 1, {x:750}, "+=1") # starts 1s after above animation finishes
  .to(".blue", 1, {x:750}, "2")    # for a specifc start time , starts at 2s
  .add("newLabel")                 # helps organize animation
tl.to(".pink", 1, {x:750}, "newLabel+=3")  # starts 3s after newLabel
```

**Functions**

`tl.pause()` 
`tl.resume()` 
`tl.restart()` 
`tl.play(x)` play from Xs
`tl.play(-x)` play Xs from end
`tl.seek(x)` go to Xs or label
`tl.reverse()` 
`tl.timeScale(x)` speed up slow down
`tl.progress(0.5)` skip to halfway

**Custom Functions**

Useful for adding and removing filters so they are used only when needed. Improves performance.
```js
tl.call(addAttr);     // call function
tl.fromTo(something);
tl.to(something);
tl.call(removeAttr);  // remove function
```

# Nested Timelines

```js
// set up properties
TweenMax.set(el, {
  perspective: 400
});

// scene 1
function sceneOne() {
  var tl = new TimelineMax();
  
  tl.to(el,3, {
    fill: 'white',
    ease: Elastic.easeOut
  });
  return tl;  // return the timeline to outside function
}

// master timeline
var master = new TiemlineMax({options});

// add scences to master
master.add(sceneOne(),"labelOnMaster");

// find specific location on animation for troubleshooting
// master.seek("labelOnMaster+=2"); uncomment as needed
```

# Repeat Timeline

```js
// make function
function someName() {
  var tl = new TimelineMax();
  tl.add('begin');
  tl.to('#div1, #div2',4, {
    rotation: 360,
    ease: Linear.easeNone
  }, 'begin');
  return tl;
}

// repeat function
const repeat = new TimelineMax({repeat:-1});
repeat.add(someName());
```

# Run Timeline OnClick

```js
// make function
function someName() {
  var tl = new TimelineMax();
  tl.add('begin');
  tl.to('#div1, #div2',4, {
    rotation: 360,
    ease: Linear.easeNone
  }, 'begin');
  return tl;
}

// pause function
const clickIt = new TimelineMax({paused:true});
triggerPaint.add(someName());

// run function on click
button.addEventListener('click', () => {
  triggerPaint.restart();
});
```

# Motion Along a Path

```js
TweenMax.to($firefly1,6, {
  bezier: {
    type:"soft",
    values:[{x:10,y20},{x:-30,y:20}],
    autoRotate:true
  },
  ease:Linear.easeNone,repeat:-1
}, "start+=3");
```

**Attributes**

`curviness: 10`
The amount of randomness in the path.
Higher values give more randomness.

`autoRotate: true`
Div rotates to follow direction along path.

`autoRotate: ["x","y","rotation",0,false]`

`x` is position x
`y` is position y
`rotation`can be rotation , rotationX , rotationY
`0` is additional amount of rotation in deg
`false`for deg set true for radians

# Night Scene

Incremently change the hue to darken or lighten a scene.

```js
funcion hued() {
  var ch1 = "hsl(+=110%,+=0%,+=0%)",
  tl = new TimelineMax( {
    paused: true
  });
  tl.add("hu");
  tl.to(mult,1.25, {
    fill: ch1
  }, "hu");
  tl.to(body,1.25, {
    backgroundColor: ch1
  }, "hu");
  return tl;
}

var hue = hued();
```

# Clipping & Masking

**Clipping**
Uses the geometry of a shape to make the cut.

**Masking**
Uses the colour of the shape to make the cut.

```html
<clipPath id="clippy">
  <ellipse cx="250" cy="150" rx="100" ry="50"/>
</clipPath>
```
```css
.img {
  clip-path: url(#clippy);
}
```

# Viewbox

`getBBox()` returns an object's x,y,width,height

Zoom in on an object.
```js
// returns position and dimensions of object kitty within SVG
const kitty = document.getElementById('kitty'),
  k = kitty.getBBox();
console.log(k);
```
```js
// pass position and dimensions to new viewbox
var newView = `${k.x} ${k.y} ${k.width} ${k.height}`;
```
```js
// set new dimensions to viewbox
const foo = document.getElementById('foo');
foo.setAttribute('viewBox',newView);
```

Good for animating navigation within data visualization, maps, flowcharts.

# SVG Origin

Depicts a point on the SVG so that all objects revolve around it.

`svgOrigin:"x,y"`

```js
TweenMax.set(cow, {
  svgOrigin:"320,320",
  rotation: 50
});
```

# Tools

svg ease vizualizer

# Draggable Plugin

```js
Draggable.create(".box", {
  type:"x,y",
  edgeResistance: 0.65,
  bounds: "#container", throwProps:true
});
```

**Callbacks**

`onClick`
`onPress`
`onDrag`
`onDragStart`
`onDragEnd`
`onRelease`
`onLockAxis`

**Events**

```js
someDraggable.addEventListener("dragend", someFunction);
```

# Morph SVG Plugin

Morph from one SVG to another SVG

```js
// point from one ID to another ID
TweenMax.to("#start",1,{morphSVG:{shape:"#end"},
  ease:Linear.easeNone});
```
Also works with shapes but they need to be converted to paths first.
```js
// convert shape to path data
MorphSVGPlugin.convertToPath("circle,rect,
  ellipse,line,polygon,polyline");

MorphSVGPlugin.convertToPath("#foo");
```

**GUI Tool**

```js
TweenMax.to("#start",1,{morphSVG:{shape:"#end",
  shapeIndex:"1"}});
```

# Flash of All Elements

To avoid the sudden display of all elements while JS loads use visibility hidden in the CSS and change to visibility visible with JS.

```css
/* CSS */
.someClass {
  visibility: hidden;
}
```

```js
TweenMax.set(".someClass", {
  visibility: "visible"
});
```
