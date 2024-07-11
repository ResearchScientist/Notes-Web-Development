# Canvas Set Up

**Element**

`<canvas>` 

**Required Attributes**

`id`
`width`
`height`

**Content**

`var ctx = canvas.getContext('2d');` 2d
`var ctx = canvas.getContext('webgl');` 3d

**Timing**

These two methods are similar to `console.log`.

`console.time("someName")` begins timer
`console.timeEnd("someName")` ends timer

Placing a function or loop between them allows for the length of time that it took for the function or loop to run to be displayed in the console.

```javascript
console.time("timeywimey");
function someFunction() {
    // someCodeBlock
}
console.timeEnd("timeywimey");
```

# Styles

`ctx.fillStyle = '' ` background , color pattern or gradient
`ctx.strokeStyle = '' ` outline , color pattern or gradient
`ctx.lineWidth = '' ` sets line width of stroke , does not apply to fill
`ctx.lineCap = ''` butt (default) , round , square
`ctx.lineJoin = ''` miter (default) , round , bevel
`ctx.font = '' ` set some font such as bold 18pt AdventPro

# Colour Gradients

`ctx.createLinearGradient(x0,y0,x1,y1);` x,y give direction of gradient
`ctx.createRadialGradient();` cx1,cy1,radius1,cx2,cy2,radius2 (inner circle,outer circle)
`someGradient.addColorStop()` 1st param from 0 to 1 represents % , 2nd param is colour

**Linear**
```javascript
aCanvas = document.querySelector("#awesomeCanvas");
ctx = aCanvas.getContext('2d');

softBox = ctx.createLinearGradient(0,0,300,0);
softBox.addColorStop(0,'rgb(100,100,100)');
softBox.addColorStop(0.5,'rgb(200,200,200)');
softBox.addColorStop(1,'rgb(100,100,100)');
ctx.fillStyle = softBox;
ctx.fillRect(0,0,300,150);
ctx.strokeStyle = softBox;
ctx.lineWidth = 10;
ctx.strokeRect(40,170,310,200);
```

**Radial**
```javascript
aCanvas = document.querySelector("#awesomeCanvas");
ctx = aCanvas.getContext('2d');

softCircle = ctx.createRadialGradient(100,100,25,100,100,75);
softCircle.addColorStop(0,'rgb(100,100,100)');
softCircle.addColorStop(0.5,'rgb(200,200,200)');
softCircle.addColorStop(1,'rgb(100,100,100)');
ctx.fillStyle = softCircle;
ctx.beginPath();
ctx.arc(100,100,100,0,2*Math.PI);
ctx.fill();
```

# Shadows

`setShadow()`
`shadowColor`
`shadowBlur`
`shadowOffsetX`
`shadowOffsetY`

```javascript
aCanvas = document.querySelector("#awesomeCanvas");
ctx = aCanvas.getContext('2d');

function setShadow() {
    ctx.shadowColor = 'grey';
    ctx.shadowBlur = '20';
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
}

ctx.beginPath();
ctx.arc(200,250,50,0,2*Math.PI,false);
ctx.save(); // comment out for inset shadow
ctx.fillStyle = 'orange';
setShadow();
ctx.fill();
ctx.restore(); // comment out for inset shadow
```

# Shapes

`rect()` parameters x,y,width,height
`ctx.fillRect()` fills rectangular area x,y,width,height
`ctx.clearRect()` clears fill applied to area specified x,y,width,height

# Paths

`ctx.moveTo(x,y)` moves pen without drawing
`ctx.lineTo(x,y)` draws from current position to given position 
`ctx.beginPath()` clears the buffer , useful between different paths
`ctx.closePath()` closes path , draws from last point to the first point
`ctx.strokeStyle = ''`
`ctx.fillStyle = ''`
`ctx.stroke()` draws the buffer content
`ctx.fill()` draws the buffer content
`ctx.arc()` cx,cy,radius,startAngle,endAngle,drawInverse (circle center radius radians clockwise false)
`ctx.arcTo()` x0,y0,x1,y1,radius useful for drawing curved boxes
`ctx.quadraticCurveTo()` controlX,controlY,endX,endY useful for controlling curved lines
`ctx.bezierCurveTo()` controlX1,controlY1,controlX2,controlY2,endX,endY

**A Bezier Curve**
```javascript
function drawBezierCurve() {
    ctx.beginPath();
    ctx.moveTo(100,20);
    ctx.bezierCurveTo(290,-40,200,200,400,100)
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'orange';
    ctx.stroke();
}

aCanvas = document.querySelector("#awesomeCanvas");
ctx = aCanvas.getContext('2d');
drawBezierCurve();
```

**Curved Box**
```javascript
function drawCurvedBox(ctx,x,y,width,height,radius,fill,stroke) {
ctx.moveTo(x+radius, y);
ctx.arcTo(x+width, y,x+width, y+height, radius);
ctx.arcTo(x+width, y+height, x, y+height, radius); 
ctx.arcTo(x, y+height, x, y,radius);
ctx.arcTo(x, y, x+width, y,radius);
    if(fill) {
        ctx.fill();
    }
    if(stroke) {
        ctx.stroke();
    }
}

aCanvas = document.querySelector("#awesomeCanvas");
ctx = aCanvas.getContext('2d');
ctx.fillStyle = 'pink';
ctx.strokeStyle = 'red';
ctx.lineWidth = 10;
drawCurvedBox(ctx,15,15,160,120,20,true,true);
```


**Curved Arrow**
From example, probably nicer ways to implement this.
```javascript
function drawCurvedArrow(startPointX, startPointY,
                         endPointX, endPointY,
                         quadPointX, quadPointY,
                         lineWidth,
                         arrowWidth,
                         color) {
    // BEST PRACTICE: the function changes color and lineWidth -> save context!
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
 
    // angle of the end tangeant, useful for drawing the arrow head
    var arrowAngle = Math.atan2(quadPointX - endPointX, quadPointY - endPointY) + Math.PI;
 
    // start a new path
    ctx.beginPath();
    // Body of the arrow
    ctx.moveTo(startPointX, startPointY);
    ctx.quadraticCurveTo(quadPointX, quadPointY, endPointX, endPointY);
    // Head of the arrow
    ctx.moveTo(endPointX - (arrowWidth * Math.sin(arrowAngle - Math.PI / 6)),
               endPointY - (arrowWidth * Math.cos(arrowAngle - Math.PI / 6)));
 
    ctx.lineTo(endPointX, endPointY);
 
    ctx.lineTo(endPointX - (arrowWidth * Math.sin(arrowAngle + Math.PI / 6)),
               endPointY - (arrowWidth * Math.cos(arrowAngle + Math.PI / 6)));
 
    ctx.stroke();
    ctx.closePath();
    // BEST PRACTICE -> restore the context as we saved it at the beginning
    // of the function
    ctx.restore();
}

aCanvas = document.querySelector("#awesomeCanvas");
ctx = aCanvas.getContext('2d');
drawCurvedArrow(10,10,200,200,150,250,10,10,'red');
```

# Text

**Methods**
`ctx.strokeText()` parameters text,x,y,[max width]
`ctx.fillText()` parameters text,x,y,[max width]

**Properties**
`ctx.font = ''` passed values are style,weight,size,face
`ctx.lineWidth = `

`textBaseline`
`textAlign` center start left end right , aligns to given x value in `fillText` or `strokeText`
`direction`

# Images

**Methods**
`ctx.drawImage()` image or video ,x,y or image,x,y,newSizeX,newSizeY or img,sx,xy,sw,sh,dx,dy,dw,dh
s is source & d is destination

For images not already on the page use a callback to use them.
```javascript
window.onload = function startImg() {
    canvas = document.querySelector("someCanvas");
    ctx = canvas.getContext('2d');
    imageObj = document.querySelector('#theImageId');
    drawImages();
}

function drawImages() {
    console.log("Image loaded.");
    ctx.drawImage(imageObj,0,0,100,100);
}
```
```html
<!--html-->
<video id="sourcevide" autoplay="true" loop="true"><source src="somevid.mp4" type="video/mp4" /></video>
<canvas id="myCanvas" width="620" height="360"></canvas>
```
```javascript
// javascript

```

rewrite this to top js section above
```js
   var video;
   var canvas, ctx;
   var angle = 0;
 
 function init() {
   video = document.getElementById('sourcevid');
   canvas = document.getElementById('myCanvas');
   ctx = canvas.getContext('2d');
 
   setInterval("processFrame()", 25); // call processFrame each 25ms
 }
 
 function processFrame() {
    ctx.drawImage(video, 0, 0, 320, 180); // can use video from webcam stream 

    drawRotatingVideo(480, 90);

    ctx.drawImage(video, 0, 180, 320, 180);
    ctx.drawImage(video, 320, 180, 320, 180);
 }
 
 function drawRotatingVideo(x, y) {
     // Clear the zone at the top right quarter of the canvas
    ctx.clearRect(320, 0, 320, 180);
 
    // We are going to change the coordinate system, save the context!
    ctx.save();
    // translate, rotate and recenter the image at its "real" center,
    //not the top left corner
    ctx.translate(x, y);
    ctx.rotate(angle += 0.01); // rotate and increment the current angle
    ctx.translate(-80, -45);
 
    ctx.drawImage(video, 0, 0, 160, 90);
 
    // restore the context
    ctx.restore();
 }
```

**Drawing 3 Bars Directly**
```javascript
window.onload = inits;

function inits() {
    aCanvas = document.querySelector("#awesomeCanvas");
    ctx = aCanvas.getContext('2d');
    drawSomething();
    cutSomething();
    textSomething();
}

function drawSomething(x,y) {
    ctx.fillStyle='orange';
    ctx.fillRect(0,0,20,100);
    ctx.fillRect(100,0,20,100);
    ctx.fillRect(200,0,20,100);
}

function cutSomething() {
    ctx.clearRect(5,40,10,10);
}

function textSomething() {
    ctx.fillText('Canvas',125,20);
}
```

**Drawing 3 Bars Using (x,y) Parameters**
```javascript
window.onload = inits;

function inits() {
    aCanvas = document.querySelector("#awesomeCanvas");
    ctx = aCanvas.getContext('2d');
    drawSomething(0,100);
    cutSomething();
    textSomething();
}

function drawSomething(x,y) {
    ctx.fillStyle='orange';
    ctx.fillRect(x,y,20,100);
    ctx.fillRect(x+50,y,20,100);
    ctx.fillRect(x+100,y,20,100);
}

function cutSomething() {
    ctx.clearRect(5,40,10,10);
}

function textSomething() {
    ctx.fillText('Canvas',125,20);
}
```

# Nested Loops

```javascript
function nestedLoop() {                       // draws a grid of squares
    for (var x=0;x<10;x++) {                  // across x axis
        for (var y=0;y<5;y++) {               // across y axis
            ctx.strokeRect(x*10,y*10,20,20);  // put draw instructions into innermost loop
        }
    }
}
```

# Transformations 2D

`ctx.translate(x,y)` shifts whole coordinate system over by passed amounts
`ctx.rotate(angle)` angle given in radians
`ctx.scale(x,y)` 1,1 no change , 2,2 twice as big , 0.5,0.5 half as big

**Happy Face**

Normal Orientation and Size
```html
<!-- html -->
<section id="awesomeCanvasSection">
  <canvas id="awesomeCanvas" width="400" height="400">get some canvas</canvas>
</section>
```
```javascript
// javascript
window.onload = inits;

function inits() {
    aCanvas = document.querySelector("#awesomeCanvas");
    ctx = aCanvas.getContext('2d');
    drawHappyFace(100,100);
    textSomething();
}

function drawHappyFace(x,y,angle,faceColour,faceBitsColours) {
    ctx.save(); // save the context of these changes
    ctx.translate(x,y);
    ctx.rotate(angle);
    ctx.scale(0.5,0.5);
    //head
    ctx.fillStyle=faceColour;
    ctx.fillRect(0,0,200,200);
    //eyes
    ctx.fillStyle=faceBitsColours;
    ctx.fillRect(50,50,20,20);
    ctx.fillRect(140,50,20,20);
    //nose
    ctx.fillRect(95,70,20,60);
    //mouth
    ctx.fillRect(60,150,90,20);
    ctx.restore(); // return context to original state before saving
}

function textSomething() {
    ctx.fillText('Happy',180,20);
}
```

Rotated and Scaled
```javascript
window.onload = inits;

function inits() {
    aCanvas = document.querySelector("#awesomeCanvas");
    ctx = aCanvas.getContext('2d');
    drawHappyFace(100,100);
    textSomething();
}

function drawHappyFace(x,y) {
    ctx.translate(25,25); // this shifts the whole coordinate system right 25 down 25
    ctx.rotate(Math.PI/4);
    ctx.scale(0.5,0.5);
    //head
    ctx.fillStyle='orange';
    ctx.fillRect(x,y,200,200);
    //eyes
    ctx.fillStyle='rgb(50,50,50)';
    ctx.fillRect(x+50,y+50,20,20);
    ctx.fillRect(x+140,y+50,20,20);
    //nose
    ctx.fillRect(x+95,y+70,20,60);
    //mouth
    ctx.fillRect(x+60,y+150,90,20);
}

function textSomething() {
    ctx.fillText('Happy',180,20);
}
```

# Save Restore Context Properties

These are used to reset any transformation rules so that subsequent items are not transformed.

`ctx.save()` saves the current context
`ctx.restore()` restores the context to a previous state

**Happy Face with Save Restore**
```javascript
window.onload = inits;

function inits() {
    aCanvas = document.querySelector("#awesomeCanvas");
    ctx = aCanvas.getContext('2d');
    drawHappyFace(50,100,Math.PI/4,'orange','black'); // passed arguments
    textSomething();
}

function drawHappyFace(x,y,angle,faceColour,faceBitsColours) { // parameters
    ctx.save(); // save the context of these changes
    ctx.translate(x,y);
    ctx.rotate(angle);
    ctx.scale(0.5,0.5);
    //head
    ctx.fillStyle=faceColour;
    ctx.fillRect(0,0,200,200);
    //eyes
    ctx.fillStyle=faceBitsColours;
    ctx.fillRect(50,50,20,20);
    ctx.fillRect(140,50,20,20);
    //nose
    ctx.fillRect(95,70,20,60);
    //mouth
    ctx.fillRect(60,150,90,20);
    ctx.restore(); // return context to original state before saving
}

function textSomething() {
    ctx.fillStyle='orange';
    ctx.fillText('Happy',180,80); // this text is not transformed
}
```


Drawing simple shapes
```html
<!--html-->
<section id="canvasContainer">
  <canvas id="theCanvas" width="300" height="300"></canvas>
</section>
```
```css
/*css*/
#theCanvas {
    background: rgb(100,100,100);
}
```
```javascript
// javascript
var canvas;
var ctx;

window.onload = function canvasing() {
    canvas = document.querySelector("#theCanvas");
    ctx = canvas.getContext('2d');
    // square
    ctx.fillStyle = 'rgb(100,150,250)';
    ctx.fillRect(10,10,20,20); // x y w h
    // square outline
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 2;
    ctx.strokeRect(60,10,20,20);
    // circle
    ctx.beginPath();
    ctx.arc(120,20,10,0,2*Math.PI);
    ctx.fill();
    // text
    ctx.fillStyle = 'orange';
    ctx.font = '20px Arial';
    ctx.fillText("hi",150,27);
}
```
Makes use of saving context and translating positions
```javascript
var canvas, ctx, w, h;

window.onload = function canvasing() {
    canvas = document.querySelector("#theCanvas");
    w = canvas.width;  // might be useful
    h = canvas.height; // might be useful
    ctx = canvas.getContext('2d');
    
    drawArectangle(10,20,40,40,'green');
    drawAcircle(80,40,20,'orange');
}

function drawArectangle(x,y,width,height,colour) {
    ctx.save(); // saves the context
    ctx.translate(x,y);
    ctx.fillStyle = colour;
    ctx.fillRect(0,0,width,height);
    ctx.restore(); // restores the context
}

function drawAcircle(x,y,radius,colour) {
    ctx.save();
    ctx.translate(x,y);
    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.arc(0,0,radius,0,2*Math.PI);
    ctx.fill();
}
```
Drawing objects relative to another by translating origin.
```javascript
var canvas, ctx, w, h;

window.onload = function canvasing() {
    canvas = document.querySelector("#theCanvas");
    ctx = canvas.getContext('2d');
    drawHappyFace(150,150);
}

function drawHappyFace(x,y) {
    ctx.save();
    ctx.translate(x,y); // changes origin
    // face
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.arc(0,0,100,0,2*Math.PI);
    ctx.fill();
    // eyes
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(-35,-20,20,0,2*Math.PI);
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(35,-20,20,0,2*Math.PI);
    ctx.fill();
    // mouth
    ctx.fillRect(-20,25,40,20);
    ctx.restore();
}
```
# Animation

Animation Cycle
clear canvas `->` draw object `->` move object `->` clear canvas

`requestAnimationFrame(someFunction)` optimized animation (60FPS) of function passed
this function runs only once so needs to be called again within end of animated function
`cancelAnimationFrame()` stops the animation passed in as an id

**Stop An Animation**
```javascript
function startSomeAnimation() {
    // code block
    id = requestAnimationFrame(animating);
}
function stopSomeAnimation() {
    if (id) {
        cancelAnimationFrame(id);
    }
}
```

**Simple Block Animation**
```javascript
window.onload = inits;

function inits() {
    aCanvas = document.querySelector("#awesomeCanvas");
    ctx = aCanvas.getContext('2d');
    rectangleX = 0;
    speed = 1;
    requestAnimationFrame(animate);
}

function animate() {
    ctx.clearRect(0,0,aCanvas.width,aCanvas.height);
    ctx.fillStyle = 'red';
    ctx.fillRect(rectangleX,0,80,100);
    rectangleX = rectangleX + speed;
    if ((rectangleX + 80 > 400) || (rectangleX < 0)) {
        speed = -speed * 1;
    }
    requestAnimationFrame(animate);
}
```

**Bouncing Box With Controls For Width and Colour**

```html
<!--html-->
<section id="awesomeCanvasSection">
  <canvas id="awesomeCanvas" width="400" height="400" tabindex="1">get some canvas</canvas>
  <label for="size">Size</label><input id="size" type="range" min="10" max="100" value="50"><output id="sizeValue">50</output>
  <label for="colour">Colour</label><input id="colour" type="color">
</section>

```
```javascript
// javascript
window.onload = inits;

function inits() {
    aCanvas = document.querySelector("#awesomeCanvas");
    ctx = aCanvas.getContext('2d');
    rectangleX = 0;
    speed = 1;
    size = 50;
    colour = 'red';
    requestAnimationFrame(animate);
}

function animate() {
    ctx.clearRect(0,0,aCanvas.width,aCanvas.height);
    ctx.fillStyle = colour;
    ctx.fillRect(rectangleX,0,size,100);
    rectangleX = rectangleX + speed;
    if ((rectangleX + 80 > 400) || (rectangleX < 0)) {
        speed = -speed * 1;
    }
    requestAnimationFrame(animate);
}

var sizeSlider = document.querySelector('#size');
var colourSlider = document.querySelector('#colour');

sizeSlider.oninput = changeSize;
function changeSize(evt) {
  size = evt.target.value;
  console.log(size);
  document.querySelector('#sizeValue').innerHTML = size;
}

colourSlider.oninput = changeColour;
function changeColour(evt) {
  colour = evt.target.value;
  console.log(colour);
}
```


**Event Handlers Within Canvas**

Restrict arrow buttons to function only when mouse pointer is over canvas.
```javascript
window.onload = inits;

function inits() {
    aCanvas = document.querySelector("#awesomeCanvas");
    ctx = aCanvas.getContext('2d');
    rectangleX = 200;
    incrementX = 0;
    aCanvas.addEventListener('keydown',handleKeydown,false);
    aCanvas.addEventListener('keyup',handleKeyup,false);
    aCanvas.addEventListener('mouseenter',setFocus,false);
    aCanvas.addEventListener('mouseout',unsetFocus,false);
    requestId = requestAnimationFrame(animate);
}

function setFocus(evt) {
    aCanvas.focus();
};

function unsetFocus(evt) {
    aCanvas.blur();
    incrementX = 0;
};

function handleKeydown(evt) {
    if (evt.keyCode === 37) { // left key
        incrementX = -1;
    } else if (evt.keyCode === 39) { // right key
        incrementX = 1;
    }
}

function handleKeyup(evt) {
    incrementX = 0;
}

function animate() {
    ctx.clearRect(0,0,aCanvas.width,aCanvas.height); // clear canvas
    ctx.fillStyle = 'red';                           // draw object
    ctx.fillRect(rectangleX,0,80,100);
    rectangleX += incrementX;                        // move object
    requestAnimationFrame(animate);
}
```

```javascript
var canvas, ctx, w, h;
var xFace = 150;
var yFace = 150;
var faceSpeed = 1;

window.onload = function canvasing() {
    canvas = document.querySelector("#theCanvas");
    w = canvas.width;  // might be useful
    h = canvas.height; // might be useful
    ctx = canvas.getContext('2d');
    mainLoop();
}

function mainLoop() {
    ctx.clearRect(0,0,w,h);     // clears canvas
    drawHappyFace(xFace,yFace); // draws face
    yFace += faceSpeed;         // changes y position
    if (((yFace + 100)>w)||(yFace<100)) { // changes direction when at wall
        faceSpeed = -faceSpeed;
    }
    requestAnimationFrame(mainLoop); // returns at 60 FPS
}

function drawHappyFace(x,y) {
    ctx.save();
    ctx.translate(x,y); // changes origin
    // face
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.arc(0,0,100,0,2*Math.PI);
    ctx.fill();
    // eyes
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(-35,-20,20,0,2*Math.PI);
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(35,-20,20,0,2*Math.PI);
    ctx.fill();
    // mouth
    ctx.fillRect(-20,25,40,20);
    ctx.restore();
}
```
version with 2 balls
```javascript
var canvas, ctx, w, h;
var ball1 = {
    x: 100,
    y: 100,
    radius: 15,
    color: 'orange',
    speedX: 2,
    speedY: 1
}

var ball2 = {
    x: 80,
    y: 80,
    radius: 10,
    color: 'green',
    speedX: 3,
    speedY: 2
}

var player = {
    x: 2,
    y: 50,
    width: 10,
    height: 40,
    color: 'rgb(100,150,250)'
}

window.onload = function canvasing() {
    canvas = document.querySelector("#otherCanvas");
    w = canvas.width;  // might be useful
    h = canvas.height; // might be useful
    ctx = canvas.getContext('2d');
    mainLoop();
}

function mainLoop() {
    ctx.clearRect(0,0,w,h);          // clears canvas
    drawBall(ball1);                 // ball 1
    drawBall(ball2);                 // ball 2
    bounceBall(ball1);
    bounceBall(ball2);
    drawPlayer(player);
    requestAnimationFrame(mainLoop); // animation function
}

function bounceBall(b) {
    b.x += b.speedX;
    b.y += b.speedY;
    ballAtWall(b);
}

function ballAtWall(b) {
    if((b.x + b.radius) > w) { // right wall
        b.speedX = -b.speedX;  // change direction
        b.x = w - b.radius;    // ball at collision point
    } else if ((b.x - b.radius) < 0) { // left wall
        b.speedX = -b.speedX;
        b.x = b.radius;
    }
    if((b.y + b.radius) > h) { // bottom wall
        b.speedY = -b.speedY;
        b.y = h - b.radius;
    } else if ((b.y -b.radius) < 0) { // top wall
        b.speedY = -b.speedY;
        b.y = b.radius;
    }
}

function drawPlayer(r) {
    ctx.save();
    ctx.translate(r.x,r.y);
    ctx.fillStyle = r.color;
    ctx.fillRect(0,0,r.width,r.height);
    ctx.restore();
}

function drawBall(c) {
    ctx.save();
    ctx.translate(c.x,c.y);
    ctx.fillStyle = c.color;
    ctx.beginPath();
    ctx.arc(0,0,c.radius,0,2*Math.PI);
    ctx.fill();
    ctx.restore();
}
```
version with many balls
```javascript
var canvas, ctx, w, h;
var balls = [];  // empty array for balls
var player = {
    x: 2,
    y: 50,
    width: 10,
    height: 40,
    color: 'rgb(100,150,250)'
}

window.onload = function canvasing() {
    canvas = document.querySelector("#otherCanvas");
    w = canvas.width;
    h = canvas.height;
    ctx = canvas.getContext('2d');
    balls = makeBalls(4); // makes 4 balls
    mainLoop();
}

function mainLoop() {
    ctx.clearRect(0,0,w,h);          // clears canvas
    makeAllBalls(balls);             // replaces making one at a time
    moveAllBalls(balls);             // replaces moving one at a time
    drawPlayer(player);
    requestAnimationFrame(mainLoop); // animation function
}

function makeBalls(n) {              // makes number of balls passed above
    var ballArray = [];              // for keeping track of making balls
    for(var i=0; i < n; i++) {
        var b = {
            x: w/2,
            y: h/2,
            radius: 5 + 15 * Math.random(), // between 5 and 20
            speedX: 2 + 2 * Math.random(),  // between 2 and 4
            speedY: 1 + 2 * Math.random(),  // between 1 and 3
            colour: randomColour(),
        }
        ballArray.push(b); // ball added to array
    }
    return ballArray;
}

function randomColour() {
    var colours = ['orange','green','lightBlue','pink'];
    var colourIndex = Math.round((colours.length-1)*Math.random());
    var c = colours[colourIndex];
    return c; // returns random colour
}

function makeAllBalls(ballArray) {
    ballArray.forEach(function(b) {
       drawBall(b); 
    });
}

function moveAllBalls(ballArray) {
    ballArray.forEach(function(b) { // b is current ball in array
      b.x += b.speedX;
      b.y += b.speedY;
      ballAtWall(b);
    });
}

function ballAtWall(b) {
    if((b.x + b.radius) > w) { // right wall
        b.speedX = -b.speedX;  // change direction
        b.x = w - b.radius;    // ball at collision point
    } else if ((b.x - b.radius) < 0) { // left wall
        b.speedX = -b.speedX;
        b.x = b.radius;
    }
    if((b.y + b.radius) > h) { // bottom wall
        b.speedY = -b.speedY;
        b.y = h - b.radius;
    } else if ((b.y -b.radius) < 0) { // top wall
        b.speedY = -b.speedY;
        b.y = b.radius;
    }
}

function drawPlayer(r) {
    ctx.save();
    ctx.translate(r.x,r.y);
    ctx.fillStyle = r.color;
    ctx.fillRect(0,0,r.width,r.height);
    ctx.restore();
}

function drawBall(c) {
    ctx.save();
    ctx.translate(c.x,c.y);
    ctx.fillStyle = c.colour;
    ctx.beginPath();
    ctx.arc(0,0,c.radius,0,2*Math.PI);
    ctx.fill();
    ctx.restore();
}
```

**Mouse Position Within Canvas**

Add an event listener
`canvas.addEventListener('mousedown',function(event) {some code});`
`clientX,clientY` returns position relative to viewport
`getBoundingClientRect()` returns position relative to an element such as canvas

```html
<!--html-->
<section id="canvasContainer">
  <canvas id="theCanvas" width="300" height="300">Canvas not supported by your browser.</canvas>
</section>
```
```javascript
// javascript
window.onload = function init() {
    canvas = document.getElementById('theCanvas');
    ctx = canvas.getContext('2d');
    canvas.addEventListener('mousemove',function(event) {
        mousePos = getMousePos(canvas,event);
        var message = 'Position is ' + mousePos.x + ' ' + mousePos.y;
        writeMessage(canvas,message);
    }, false);
};

function getMousePos(canvas,event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function writeMessage(canvas,message) {
    ctx.save();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.font = '18pt Calibri';
    ctx.fillStyle = 'black';
    ctx.fillText(message,20,20);
    ctx.restore();
}
```

**Move Element With Mouse**
Link position of mouse to position of element.
```javascript
var canvas, ctx, w, h;
var mousePos;    // mouse position
var balls = [];  // empty array for balls
var player = {
    x: 2,
    y: 50,
    width: 10,
    height: 40,
    color: 'rgb(100,150,250)'
}

window.onload = function canvasing() {
    canvas = document.querySelector("#otherCanvas");
    w = canvas.width;
    h = canvas.height;
    ctx = canvas.getContext('2d');
    balls = makeBalls(4); // makes 4 balls
    canvas.addEventListener('mousemove',mouseMoved); // add event listener
    mainLoop();
}

function mouseMoved(event) {                     // fires getMousePos when mouse moved
    mousePos = getMousePos(canvas,event);
}

function getMousePos(canvas,event) {             // returns position within canvas 
    var rect = canvas.getBoundingClientRect();
    return {
        y: event.clientY - rect.top
    };
}

function movePlayerWithMouse() {  // assigns canvas mouse position to player position
    if(mousePos !== undefined) {
        player.y = mousePos.y;
    }
}

function mainLoop() {
    ctx.clearRect(0,0,w,h);          // clears canvas
    makeAllBalls(balls);             // replaces making one at a time
    moveAllBalls(balls);             // replaces moving one at a time
    drawPlayer(player);
    movePlayerWithMouse();
    requestAnimationFrame(mainLoop); // animation function
}

function makeBalls(n) {              // makes number of balls passed above
    var ballArray = [];              // for keeping track of making balls
    for(var i=0; i < n; i++) {
        var b = {
            x: w/2,
            y: h/2,
            radius: 5 + 15 * Math.random(), // between 5 and 20
            speedX: 2 + 2 * Math.random(),  // between 2 and 4
            speedY: 1 + 2 * Math.random(),  // between 1 and 3
            colour: randomColour(),
        }
        ballArray.push(b); // ball added to array
    }
    return ballArray;
}

function randomColour() {
    var colours = ['orange','green','lightBlue','pink'];
    var colourIndex = Math.round((colours.length-1)*Math.random());
    var c = colours[colourIndex];
    return c; // returns random colour
}

function makeAllBalls(ballArray) {
    ballArray.forEach(function(b) {
       drawBall(b); 
    });
}

function moveAllBalls(ballArray) {
    ballArray.forEach(function(b) { // b is current ball in array
      b.x += b.speedX;
      b.y += b.speedY;
      ballAtWall(b);
    });
}

function ballAtWall(b) {
    if((b.x + b.radius) > w) { // right wall
        b.speedX = -b.speedX;  // change direction
        b.x = w - b.radius;    // ball at collision point
    } else if ((b.x - b.radius) < 0) { // left wall
        b.speedX = -b.speedX;
        b.x = b.radius;
    }
    if((b.y + b.radius) > h) { // bottom wall
        b.speedY = -b.speedY;
        b.y = h - b.radius;
    } else if ((b.y -b.radius) < 0) { // top wall
        b.speedY = -b.speedY;
        b.y = b.radius;
    }
}

function drawPlayer(r) {
    ctx.save();
    ctx.translate(r.x,r.y);
    ctx.fillStyle = r.color;
    ctx.fillRect(0,0,r.width,r.height);
    ctx.restore();
}

function drawBall(c) {
    ctx.save();
    ctx.translate(c.x,c.y);
    ctx.fillStyle = c.colour;
    ctx.beginPath();
    ctx.arc(0,0,c.radius,0,2*Math.PI);
    ctx.fill();
    ctx.restore();
}
```

**Collision Detection**

Check that the element's width or height is within the canvas.
```javascript
function ballAtWall(b) {
    // (position of element + width of element) > canvas width
    if((b.x + b.radius) > w) { // right wall
        b.speedX = -b.speedX;  // change direction
        b.x = w - b.radius;    // ball at collision point
    // (position of element - width of element) < canvas width
    } else if ((b.x - b.radius) < 0) { // left wall
        b.speedX = -b.speedX;
        b.x = b.radius;
    }
    // (position of element + height of element) > canvas height
    if((b.y + b.radius) > h) { // bottom wall
        b.speedY = -b.speedY;
        b.y = h - b.radius;
    // (position of element - height of element) < canvas height
    } else if ((b.y -b.radius) < 0) { // top wall
        b.speedY = -b.speedY;
        b.y = b.radius;
    }
}
```

Test if a square and a circle have collided.
```javascript
function playerBallOverlap (x0,y0,w0,h0,cx,cy,r) {
    var testX=cx;
    var testY=cy;
    if (testX < x0) testX=x0;
    if (testX > (x0+w0)) testX=(x0+w0);
    if (testY < y0) testY=y0;
    if (testY > (y0+h0)) testY=(y0+h0);
    return (((cx-testX)*(cx-testX)+(cy-testY)*(cy-testY))<r*r) // true or false
}
```

**User Drawing**

Making a box wider when holding down mouse button
```javascript
window.onload = inits;

var mousePos;

function inits() {
    aCanvas = document.querySelector("#awesomeCanvas");
    ctx = aCanvas.getContext('2d');
    rectangleX = 200;
    rectangleY = 200;
    incrementX = 0;
    rectangleAngle = 0;
    incrementAngle = 0;
    aCanvas.addEventListener('mousemove',handleMousemove,false);
    aCanvas.addEventListener('mousedown',handleMousedown,false);
    aCanvas.addEventListener('mouseup',handleMouseup,false);
    requestId = requestAnimationFrame(animate);
}

function handleMousemove(evt) {
    mousePos = getMousePos(aCanvas,evt);
}

function handleMousedown(evt) {
    incrementAngle = 0.1;
}

function handleMouseup(evt) {
    incrementAngle = 0;
}

function handleKeyup(evt) {
    incrementX = 0;
}

function getMousePos(aCanvas,evt) {
    var rect = aCanvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function animate() {
    ctx.clearRect(0,0,aCanvas.width,aCanvas.height); // clear canvas
    ctx.fillStyle = 'red';                           // draw object
    ctx.fillRect(rectangleX,rectangleY,rectangleAngle,80,100);
    if (mousePos !== undefined) {
        rectangleX = mousePos.x;
        rectangleY = mousePos.y;
        rectangleAngle += incrementAngle;
    }
    requestAnimationFrame(animate);
}
```

Draw on canvas when mouse button down
```javascript
window.onload = inits;

var previousMousePos;

function inits() {
    aCanvas = document.querySelector("#awesomeCanvas");
    ctx = aCanvas.getContext('2d');
    painting = false;
    aCanvas.addEventListener('mousemove',handleMousemove,false);
    aCanvas.addEventListener('mousedown',clicked);
    aCanvas.addEventListener('mouseup',released);
};

function drawLineImmediate(x1,y1,x2,y2) {
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.strokeStyle = "red";
    ctx.stroke();
}

function handleMousemove(evt) {
    var mousePos = getMousePos(aCanvas,evt);
    if (painting) {
        drawLineImmediate(previousMousePos.x,previousMousePos.y,mousePos.x,mousePos.y);
        previousMousePos = mousePos;
    }
}

function getMousePos(aCanvas,evt) {
    var rect = aCanvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function clicked(evt) {
    previousMousePos = getMousePos(aCanvas,evt);
    painting = true;
}

function released(evt) {
    painting = false;
}
```

Supposed to rescale but it does not
```javascript
window.onload = inits;

var previousMousePos;

function inits() {
    aCanvas = document.querySelector("#awesomeCanvas");
    ctx = aCanvas.getContext('2d');
    containerCanvas = document.querySelector("#awesomeCanvasSection");
    painting = false;
    drawCube();
    aCanvas.addEventListener('mousemove',handleMousemove,false);
    aCanvas.addEventListener('mousedown',clicked);
    aCanvas.addEventListener('mouseup',released);
    window.addEventListener('resize',resizeCanvasRelativeToContainerSize,false);
};

function drawLineImmediate(x1,y1,x2,y2) {
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.strokeStyle = "red";
    ctx.stroke();
}

function handleMousemove(evt) {
    var mousePos = getMousePos(aCanvas,evt);
    if (painting) {
        drawLineImmediate(previousMousePos.x,previousMousePos.y,mousePos.x,mousePos.y);
        previousMousePos = mousePos;
    }
}

function getMousePos(aCanvas,evt) {
    var rect = aCanvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function clicked(evt) {
    previousMousePos = getMousePos(aCanvas,evt);
    painting = true;
}

function released(evt) {
    painting = false;
}

function resizeCanvasRelativeToContainerSize() {
    aCanvas.width = containerCanvas.clientWidth;
    aCanvas.height = containerCanvas.clientHeight;
    drawCube();
}

function drawCube() {
    ctx.save();
    ctx.fillStyle = 'red';
    ctx.fillRect(20,20,100,100);
    if(aCanvas.width < 300) {
        var scaleX = aCanvas.width/200;
        var scaleY = scaleX;
    }
    ctx.scale(scaleX,scaleY);
    ctx.restore();
}
```

# Plots

**Simple Histogram**
```html
<!--html-->
<section id="barPlotSection">
  <canvas id='barPlotCanvas' width='500' height='500'>you need canvas</canvas>
</section>
```

```javascript
// javascript
window.onload = inits;

function inits() {
  aCanvas = document.querySelector("#barPlotCanvas");
  ctx = aCanvas.getContext('2d');
  width = 400;
  height = 400;
  x = 50;
  y = 450;
  values = [1,10,2,30,50,80,20,9,40,30];
  makePlot(x,y,width,height,values);
}

function getMax(values) {
  var maxValue = 0;
  for (i=0;i<values.length;i++) {
    if (maxValue < values[i])
      maxValue = values[i];
  }
  return maxValue;
}

function makePlot(x,y,width,height,values) {
  ctx.save();
  ctx.translate(x,y); // changes origin to bottom left
  var maxValue = getMax(values);
  var rectWidth = width/parseFloat(values.length);
  var vStep = -height/parseFloat(maxValue);
  ctx.fillStyle = 'green';
  ctx.strokeStyle = 'black';
  for (i = 0; i < values.length; i++) {
    ctx.fillRect(i * rectWidth,0,rectWidth,vStep * values[i]);
    ctx.strokeRect(i * rectWidth,0,rectWidth,vStep * values[i])
  }
  drawAxis(width,height,values,maxValue);
}

function drawAxis(width,height,values,maxValue) {
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'black';
  var unit = 1;
  while (maxValue/(unit*10)>1) {
    unit *= 10;
  }
  var yMaxOnAxis = parseInt(maxValue)/unit;
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(0,-height);
  ctx.moveTo(0,0);
  ctx.lineTo(width,0);
  ctx.textAlign = 'left';
  for (i=0;i<=yMaxOnAxis;i++) { // tick marks
    ctx.moveTo(0,-height/yMaxOnAxis*i);
    ctx.lineTo(-5,-height/yMaxOnAxis*i);
    ctx.fillText(i*unit,-25,-height/yMaxOnAxis*i);
  }
  var counter = 0;
  ctx.textAlign = 'center';
  var rectanglesWidth = width/values.length;
  for (i=0;i<=values.length;i++) {
    ctx.moveTo(i*rectanglesWidth,0);
    ctx.lineTo(i*rectanglesWidth,5);
    ctx.fillText(i,i*rectanglesWidth,15);
    counter++;
  }
  ctx.stroke();
}
```

**Interactive Histogram Controls**
Works but value 5 slider affects all bars.
```html
<!--html-->
<section id="barPlotSection">
  <canvas id='barPlotCanvas' width='500' height='500'>you need canvas</canvas>
  <ul id="sliders"></ul>
</section>
```
```javascript
// javascript
window.onload = inits;

function inits() {
  aCanvas = document.querySelector("#barPlotCanvas");
  ctx = aCanvas.getContext('2d');
  width = 400;
  height = 400;
  x = 50;
  y = 450;
  values = [1,10,2,30,50,80,20,9,40,30];
  var list = document.querySelector("#sliders");
  var max = getMax(values);
  for (i=0;i<values.length;i++) {
    var input = document.createElement('input');
    var li = document.createElement('li');
    var label = document.createElement('label');
    label.setAttribute('for','id' + i);
    label.textContent = 'value' + i + ' ';
    li.appendChild(label);
    input.setAttribute('type','range');
    input.setAttribute('id','id' + i);
    input.setAttribute('max',max);
    input.value = values[i];
    input.setAttribute('oninput','changeValue(' + i + ') ');
    li.appendChild(input);
    list.appendChild(li);
  }
  makePlot(x,y,width,height,values);
  makePieChart(300,100,90,values);
  makeBrokenLines(40,370,width,height,values);
}

function changeValue(index) {
  var value = document.getElementById("id" + index).value;
  values[parseInt(index)] = parseInt(value);
  ctx.clearRect(0,0,aCanvas.width,aCanvas.height);
  makePlot(x,y,width,height,values);
  makePieChart(300,100,90,values);
  makeBrokenLines(40,370,width,height,values);
}

function getMax(values) {
  var maxValue = 0;
  for (i=0;i<values.length;i++) {
    if (maxValue < values[i])
      maxValue = values[i];
  }
  return maxValue;
}

function drawAxis(width,height,values,maxValue) {
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'black';
  var unit = 1;
  while (maxValue/(unit*10)>1) {
    unit *= 10;
  }
  var yMaxOnAxis = parseInt(maxValue)/unit;
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(0,-height);
  ctx.moveTo(0,0);
  ctx.lineTo(width,0);
  ctx.textAlign = 'left';
  for (i=0;i<=yMaxOnAxis;i++) { // tick marks
    ctx.moveTo(0,-height/yMaxOnAxis*i);
    ctx.lineTo(-5,-height/yMaxOnAxis*i);
    ctx.fillText(i*unit,-25,-height/yMaxOnAxis*i);
  }
  var counter = 0;
  ctx.textAlign = 'center';
  var rectanglesWidth = width/values.length;
  for (i=0;i<=values.length;i++) {
    ctx.moveTo(i*rectanglesWidth,0);
    ctx.lineTo(i*rectanglesWidth,5);
    ctx.fillText(i,i*rectanglesWidth,15);
    counter++;
  }
  ctx.stroke();
}

function makePlot(x,y,width,height,values) {
  ctx.save();
  ctx.translate(x,y); // changes origin to bottom left
  var maxValue = getMax(values);
  var rectWidth = width/parseFloat(values.length);
  var vStep = -height/parseFloat(maxValue);
  ctx.fillStyle = 'green';
  ctx.strokeStyle = 'black';
  for (i = 0; i < values.length; i++) {
    ctx.fillRect(i * rectWidth,0,rectWidth,vStep * values[i]);
    ctx.strokeRect(i * rectWidth,0,rectWidth,vStep * values[i])
  }
  drawAxis(width,height,values,maxValue);
}

function makePieChart(cx,cy,radius,values) {
  ctx.save();
  var sum=0;
  for (var n=0;n<values.length;n++) {
    sum += values[n];
  }
  var red = 0;
  var green = 0;
  var blue = 0;
  var startAngle = 0;
  var endAngle = 0;
  var percent;
  ctx.strokeStyle = 'grey';
  for (var i=0;i<values.length;i++) {
    ctx.beginPath();
    switch (i % 3) {
      case 0:
        red += 80;
        break;
      case 1:
        green += 80;
        break;
      case 2:
        blue += 80;
        break;
      default:
        alert("something went wrong");
        return;
    }
    ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
    percent = values[i]/parseFloat(sum);
    endAngle = startAngle + Math.PI*2*percent;
    ctx.arc(cx,cy,radius,startAngle,endAngle);
    ctx.lineTo(cx,cy);
    startAngle = endAngle;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
}

function makeBrokenLines(x,y,width,height,values) {
  ctx.save();
  ctx.translate(x,y);
  var maxValue = getMax(values);
  var hStep = width/parseFloat(values.length);
  var vStep = -height/parseFloat(maxValue);
  ctx.fillStyle = 'black';
  ctx.lineWidth = 1;
  ctx.moveTo(0,0);
  ctx.beginPath();
  for(i=0;i<values.length;i++) {
    ctx.lineTo(i*hStep,vStep*values[i]);
  }
  ctx.stroke();
  for(i=0;i<values.length;i++) {
    ctx.beginPath();
    ctx.arc(i*hStep,vStep*values[i],3,0,2*Math.PI);
    ctx.fill();
  }
  drawAxis(width,height,values,maxValue);
  ctx.restore();
}
```
