# Dynamically Building HTML Elements

**Table**

HTML

```html
<section>
  <button onClick="buildTable()">Build Table</button>
  <table>
    <thead><tr><th>Name</th><th>Mood</th></tr></thead>
    <tbody id="tableCats"></tbody>
  </table>
</section>
```

CSS

```css
table {
    margin: 20px auto;
    width: 80%;
    border-spacing: 2px;
    border-radius: 4px;
    border: 1px solid gray;
    
}

thead {
    color: rgb(100,150,250);
    background: rgb(20,20,20);
}

th {
    line-height: 25px;
}

tbody {
    text-align: center;
}

tbody tr:nth-of-type(odd) {
    background: rgb(100,100,100);
}

tbody tr:nth-of-type(even) {
    background: rgb(80,80,80);
}
```

JavaSCript

```javascript
function buildTable() {
    addLineToTable("Suki","happy");
    addLineToTable("Hello Kitty","excited");
    addLineToTable("Pusheen","sleepy");
    addLineToTable("Cuddles","Happy");
}

function addLineToTable(name,mood) {
    var tContent = document.querySelector("#tableCats");
    var tRow = tContent.insertRow();
    var tname = tRow.insertCell();
    tname.innerHTML = name;
    var tmood = tRow.insertCell();
    tmood.innerHTML = mood;
}
```

**Window Resize**
```javascript
// writes window and device dimensions to html elements with IDs "page" , "device"
window.onload = resize;
window.onresize = resize;
function resize(event) {
    let pageSize = document.querySelector('#page');
    pageSize.innerHTML = "PAGE: Width " + window.innerWidth + " Height " + window.innerHeight;
    let deviceSize = document.querySelector('#device');
    deviceSize.innerHTML = "DEVICE: Width " + screen.width + " Height " + screen.height;
}
```

**Horizontal Bar on Window Scroll**
```html
<!--html-->
<html>
  <body>
    <main>
      <div class="progressBar"><p>Completed</p></div>
      <section id="forScroll">
        <p>A</p><p>A</p><p>A</p><p>A</p><p>A</p><p>A</p><p>A</p><p>A</p><p>A</p><p>A</p><p>A</p><p>A</p><p>A</p><p>A</p><p>A</p><p>A</p><p>A</p>
      </section>
    </main>
  </body>
</html>
```
```css
/*css*/
body {
    height: 200px;
}

.progressBar {
    border: 1px solid orange;
    width: 100px;
    height: 20px;
    position: fixed;
    top: 200px;
    right: 100px;
    overflow: hidden;
}

.progressBar > p {
    margin-top: 0px;
    padding-top: 1px;
    height: 20px;
    width: 0%;
    background: orange;
}
```
```javascript
// javascript
window.onload = init;
let progress;
function init() {
    progress = document.querySelector(".progressBar p");
    window.addEventListener("scroll",function() {
      let max = document.body.scrollHeight - window.innerHeight;
      let percent = (window.pageYOffset / max) * 100;
      progress.style.width = percent + "%";
    });
}
```

# Event Listeners

**Click on Element**
```javascript
// writes to DOM which element got clicked as long as it has an ID
window.onclick = processClick;

function processClick(event) {
    let clicks = document.querySelector('main');
    let target = event.target.id;
    if(target === "") {
        clicks.innerHTML += "You are randomly clicking.";
    } else {
        clicks.innerHTML += "You clicked on " + target;
    }
}
```

**Mouse Position On Canvas**
```html
<!--html-->
    <section id="canvasContainer">
      <canvas id="theCanvas"></canvas>
      <div id="mousePositions"></div>
    </section>
```
```css
/*CSS*/
#canvasContainer {
    margin: 20px auto;
    width: 40%;
    text-align: center;
}

#theCanvas {
    width: 300px;
    height: 100px;
    background: rgb(80,80,80);
}
```
```javascript
// javascript
window.onload = myCanvas;

function myCanvas() {
    canvas = document.querySelector('#theCanvas');
    canvas.addEventListener('mousemove',processMouseMove);
}

function processMouseMove(event) {
    let mousePos = document.querySelector('#mousePositions');
    let rect = event.target.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;
    mousePos.innerHTML = "X: " + mouseX + " Y: " + mouseY;
}
```

**Click and Drag**
Works with one div, does not work with multiple divs.
```html
<!--html-->
    <section id="dragSection">
      <div class="draggable" id="dragMe"></div>
    </section>
```
```css
/*CSS*/
#dragSection {
    margin: 20px auto;
    width: 40%;
    height: 200px;
    background: rgb(80,80,80);
}

.draggable {
    background: rgba(100,150,240,0.75);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: move;
    position: absolute;
}
```
```javascript
// javascript
window.onmousemove = moveElem;
window.onmouseup = stopMovingElem;
window.onload = init;

var selected = null;
var oldMouseX, oldMouseY;
var elemX, elemY;

function init() {
    document.querySelector('.draggable').onmousedown = function(event) {
        dragInit(event);
    };
}

// called when user starts to drag
function dragInit(event) {
    selected = event.target;
    elemX = selected.offsetLeft;
    elemY = selected.offsetTop;
    oldMouseX = event.clientX;
    oldMouseY = event.clientY;
}

// called when user dragging
function moveElem(evt) {
    var newMouseX = evt.clientX;
    var newMouseY = evt.clientY;
    if(oldMouseX !== undefined) {
        var dx = newMouseX - oldMouseX;
        var dy = newMouseY - oldMouseY;
    }
    if(selected !== null) {
        changePosOfSelectedElement(dx,dy);
    }
    oldMouseX = newMouseX;
    oldMouseY = newMouseY;
}

function changePosOfSelectedElement(dx,dy) {
    elemX += dx;
    elemY += dy;
    selected.style.left = elemX + 'px';
    selected.style.top = elemY + 'px';
}

function stopMovingElem() {
    selected = null;
}
```

**Adding a Slider**
```html
<!--html-->
<section id="slider">
  <input type="range" min=0 max=10 step=1>
</section>
<div id="sliderValue"></div>
```
```css
/*css*/
#slider {
    margin: 10px;
    padding: 5px 3px 10px 1px;
    width: 25px;
    height: 120px;
    border-radius: 20px;
    background: rgba(100,150,250,.6);
    box-shadow: inset 0px 0px 4px 1px rgb(20,20,20);
}

#slider input {
    width: 120px;
    height: 25px;
    transform-origin: 60px 60px;
    transform: rotate(-90deg);
}
```
```javascript
// javascript
window.oninput = forTheSlider;

function forTheSlider(event) {
    let val = event.target.value;
    let output = document.querySelector('#sliderValue');
    output.innerHTML = "Volume: " + val;
}
```

**Colour Picker**
```html
<!--html-->
<section>
  <p>Pick a colour</p>
  <input type="color" onchange = changeBackgroundColor(this.value);>
  <p id="theColour"></p>
</section>
```
```javascript
function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
    let output = document.querySelector("#theColour");
    output.innerHTML = "Colour " + color;
}
```

**Form Validation**
minimum input length
```html
<!--html-->
<section>
  <p>Name:</p>
  <input type="text" name="name" maxlength="11" required oninput = "validateName(this)">
  <p id="nameTyped"></p>
</section>
```
```javascript
// javascript
function validateName(field) {
    let name = field.value;
    var output = document.querySelector('#nameTyped');
    output.innerHTML = "Name: " + name;
    if(name.length < 3) {
        output.innerHTML = "Name must be more than 3 characters.";
    }
}
```
disallowing certain characters
```html
<!--html-->
<section>
  <p>Name:</p>
  <input type="text" name="name" maxlength="11" required onkeyup = "validateName(event)">
  <p id="keyTyped"></p>
</section>
```
```javascript
// javascript
function validateName(event) {
    var key = event.key;
    var output = document.querySelector('#keyTyped');
    output.innerHTML = "Valid characters: " + key;
    if(key === "!") {
        output.innerHTML = "Invalid character.";
        var name = event.target.value;  // removes the character
        event.target.value = name.substring(0,name.length - 1);
    }
}
```

**Quasi ToDo List** (parent node)
```html
<!--html-->
<section>
  <button id="completed" onclick="completed();">Mark as completed</button>
  <ul id="theList">
    <li><input type="checkbox" name="someOptions" value="option a">option a</li>
    <li><input type="checkbox" name="someOptions" value="option b">option b</li>
    <li><input type="checkbox" name="someOptions" value="option c">option c</li>
  </ul>
</section>
```
```css
/*css*/
ul {
    list-style: none;
    color: rgb(250,250,250);
}
```
```javascript
// javascript
function completed() {
var selectedItems = "";
var list = document.querySelectorAll("#theList input:checked");
list.forEach(function(item) {
   selectedItems += item.value + " "; 
   item.parentNode.style.color = 'green';
});
    document.body.append("Completed: " + selectedItems);
}
```

**Quasi ToDo List** (classList)
```html
<!--html-->
<section>
  <button id="completed" onclick="completed();">Mark as completed</button>
  <ul id="theList">
    <li><input type="checkbox" name="someOptions" value="option a">option a</li>
    <li><input type="checkbox" name="someOptions" value="option b">option b</li>
    <li><input type="checkbox" name="someOptions" value="option c">option c</li>
  </ul>
</section>
```
```css
/*css*/
ul {
    list-style: none;
    color: rgb(250,250,250);
}

#ToDoList {
    margin: 20px auto;
    padding: 20px 0;
    width: 500px;
    background: rgb(20,20,20);
}

#ToDoList #new {
    margin-left: 45px;
}

/*class to be added and removed*/
.itemChecked {
    color: green;
}

#itemToAdd button {
    margin-left: -18px;
    color: rgb(240,240,240);
    background: rgb(50,200,50);
}
```
```javascript
// javascript
function completed() {
var selectedItems = "";
var list = document.querySelectorAll("#theList input:checked");
list.forEach(function(item) {
   selectedItems += item.value + " ";
   var liParent = item.parentNode;
   liParent.classList.add("itemChecked");
});
    document.body.append("Completed: " + selectedItems);
}

function reset() {
    var list = document.querySelectorAll("#theList input");
    list.forEach(function(item) {
       item.checked = false;
        var liParent = item.parentNode;
        liParent.classList.remove("itemChecked");
    });
}
```

in progress one
```javascript
function newItem() {
    var newTask = document.createElement('input');
    newTask.style.margin = '10px 0 5px 45px';
    var addTaskButton = document.createElement('button');
    addTaskButton.textContent = "+";
    addTaskButton.addEventListener('click',function() {
        var addTask = document.createElement('input');
        alert("clicked me");
    });
    var holdTask = document.querySelector('#itemToAdd');
    holdTask.append(newTask);
    holdTask.append(addTaskButton);
}

function completed() {
var selectedItems = "";
var mainList = document.querySelector("#theList")
var checkedList = document.querySelectorAll("#theList input:checked");
checkedList.forEach(function(item) {
  selectedItems += item.value + ' ';
  var liParent = item.parentNode;
  liParent.classList.add("itemChecked");
  mainList.removeChild(liParent);  // removes checked items
});
  let li = document.createElement('li');
  li.textContent = selectedItems;
  li.style.color = 'rgb(75,75,75)';
  let ul = document.querySelector('#completedList');
  ul.append(li);
  
}

function reset() {
    var list = document.querySelectorAll("#theList input");
    list.forEach(function(item) {
       item.checked = false;
        var liParent = item.parentNode;
        liParent.classList.remove("itemChecked");
    });
}
```

# Canvas Animations

**Collision Detection**

```html
<!---html-->
<section id="otherCanvasContainer">
  <canvas id="otherCanvas" width="300" height="300">Canvas not supported by your browser.</canvas>
</section>
```
```css
/*css*/
#otherCanvas {
    background: rgb(100,100,100);
    margin: 20px;
}
```
```javascript
// javascript
var canvas, ctx, w, h;
var ball = {  // as an object it is easier to access positions
    x: 100,
    y: 100,
    radius: 15,
    color: 'orange',
    speedX: 2,
    speedY: 1
}
var player = { // as an object it is easier to access positions
    x: 10,
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
    ctx.clearRect(0,0,w,h);     // clears canvas
    drawBall(ball);
    drawPlayer(player);
    bounceBall(ball);
    requestAnimationFrame(mainLoop); // returns at 60 FPS
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

Moving collision detection
```javascript
var canvas, ctx, w, h;
var mousePos;
var balls = [];  // empty array for balls
/*var structures = []*/
var player = {
    x: 20,
    y: 50,
    width: 10,
    height: 40,
    color: 'rgb(100,150,250)'
}
var structure1 = {
    x:2,
    y:40,
    width: 15,
    height: 15,
    color: 'orange'
}

var structure2 = {
    x:2,
    y:80,
    width: 15,
    height: 15,
    color: 'orange'
}

var structure3 = {
    x:2,
    y:120,
    width: 15,
    height: 15,
    color: 'orange'
}

window.onload = function canvasing() {
    canvas = document.querySelector("#otherCanvas");
    w = canvas.width;
    h = canvas.height;
    ctx = canvas.getContext('2d');
    /*structures = makeStructures(3);*/
    balls = makeBalls(10); // makes 4 balls
    canvas.addEventListener('mousemove',mouseMoved); // add event listener
    mainLoop();
}

function mouseMoved(event) {
    mousePos = getMousePos(canvas,event);
}

function getMousePos(canvas,event) {
    var rect = canvas.getBoundingClientRect();
    return {
        y: event.clientY - rect.top
    };
}

function movePlayerWithMouse() {
    if(mousePos !== undefined) {
        player.y = mousePos.y;
    }
}

function mainLoop() {
    ctx.clearRect(0,0,w,h);          // clears canvas
    makeAllBalls(balls);             // replaces making one at a time
    drawActiveBalls(balls);
    moveAllBalls(balls);             // replaces moving one at a time
    drawStructure(structure1);
    drawStructure(structure2);
    drawStructure(structure3);
    drawPlayer(player);
    movePlayerWithMouse();
    requestAnimationFrame(mainLoop); // animation function
}

/*function makeStructures(n) {
    var structureArray = [];
    for(var i=0; i < n; i++) {
        var s = {
            x: 2,
            y: n += 20,
            width: 15,
            height: 20,
            color: 'orange'
        }
    }
}*/

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
    ballArray.forEach(function(b,index) { // b is current ball in array
      b.x += b.speedX;
      b.y += b.speedY;
      ballAtWall(b);
      ballAtPlayer(b,index);
    });
}

function ballAtPlayer(b,index) {
    if(playerBallOverlap(player.x,player.y,player.width,player.height,b.x,b.y,b.radius)) {
        balls.splice(index,1); // remove 1 ball at index location
    }
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

function drawStructure(s) {
    ctx.save();
    ctx.translate(s.x,s.y);
    ctx.fillStyle = s.color;
    ctx.fillRect(0,0,s.width,s.height);
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

function drawActiveBalls(balls) {  // score
    ctx.save();
    ctx.font="20px Arial";
    if (balls.length === 0) {
        ctx.fillText("YOU WON",100,20);
    } else {
        ctx.fillText("enemies left: " + balls.length,90,20);
    }
    ctx.restore();
}

function playerBallOverlap (x0,y0,w0,h0,cx,cy,r) {
    var testX=cx;
    var testY=cy;
    if (testX < x0) testX=x0;
    if (testX > (x0+w0)) testX=(x0+w0);
    if (testY < y0) testY=y0;
    if (testY > (y0+h0)) testY=(y0+h0);
    return (((cx-testX)*(cx-testX)+(cy-testY)*(cy-testY))<r*r)
}
```

With Controls

does not work need to debug it section by section
```html
<!--html-->
<section id="otherCanvasContainer">
  <div id="controls">
    <label for="nbBalls">Num of Balls: </label><input type="number" min=1 max=50 value=10 id="nbBalls" oninput="changeNbBalls(this.value);"><p></p>
    <label for="colorChooser">Player Colour: </label><input type="color" value="#AA2222" id="colorChooser" oninput="changePlayerColor(this.value);"><p></p>
    <label for="selectColorOfBallToPop">Color to pop: </label>
      <select id="selectColorOfBallToPop" onchange="changeColorToPop(this.value);">
        <option value='red'>red</option>
        <option value='green'>green</option>
        <option value='orange'>orange</option>
      </select><p></p>
    <label for="ballSpeed">Ball speed: </label> - <input type="range" value="1" min=0.5 max=3 step=0.1 id="ballSpeed" oninput="changeBallSpeed(this.value);"> + <p></p>
  </div>
  <canvas id="otherCanvas" width="300" height="300">Canvas not supported by your browser.</canvas>
</section>
```
```javascript
// javasript
var canvas, ctx, w, h;
var mousePos;
var balls = [];
/*var structures = []*/
var initNumBalls;
var globalSpeedMultiplier = 1;
var colorToPop = 'red';
var wrongBallsPopped = rightBallsPopped = 0;
var numOfRightBalls;
var player = {
    x: 20,
    y: 50,
    width: 10,
    height: 40,
    color: 'rgb(100,150,250)'
}
var structure1 = {
    x:2,
    y:40,
    width: 15,
    height: 15,
    color: 'orange'
}

var structure2 = {
    x:2,
    y:80,
    width: 15,
    height: 15,
    color: 'orange'
}

var structure3 = {
    x:2,
    y:120,
    width: 15,
    height: 15,
    color: 'orange'
}

window.onload = function canvasing() {
    canvas = document.querySelector("#otherCanvas");
    w = canvas.width;
    h = canvas.height;
    ctx = canvas.getContext('2d');
    startGame(10);
   //balls = makeBalls(10); // makes 4 balls
    canvas.addEventListener('mousemove',mouseMoved);
    mainLoop();
}

function startGame(nb) {
    do {
        balls = makeBalls(nb);
        initNumBalls = nb;
        numOfRightBalls = countNumOfRightBalls(balls,colorToPop);
    } while(numOfRightBalls === 0);
    wrongBallsPopped = rightBallsPopped = 0;
}

function countNumOfRightBalls(balls,colorToPop) {
    var nb = 0;
    balls.forEach(function(b) {
        if(b.color === colorToPop)
            nb++;
    });
    return nb;
}

function changeNbBalls(nb) {
    startGame(nb);
}

function changeColorToPop(color) {
    colorToPop = color;
}

function changePlayerColor(color) {
    player.color = color;
}

function changeBallSpeed(coef) {
    globalSpeedMultiplier = coef;
}

function mouseMoved(event) {
    mousePos = getMousePos(canvas,event);
}

function getMousePos(canvas,event) {
    var rect = canvas.getBoundingClientRect();
    return {
        y: event.clientY - rect.top
    };
}

function movePlayerWithMouse() {
    if(mousePos !== undefined) {
        player.y = mousePos.y;
    }
}

function mainLoop() {
    ctx.clearRect(0,0,w,h);          // clears canvas
    makeAllBalls(balls);             // replaces making one at a time
    drawActiveBalls(balls);
    moveAllBalls(balls);             // replaces moving one at a time
    drawStructure(structure1);
    drawStructure(structure2);
    drawStructure(structure3);
    drawPlayer(player);
    movePlayerWithMouse();
    requestAnimationFrame(mainLoop); // animation function
}

/*function makeStructures(n) {
    var structureArray = [];
    for(var i=0; i < n; i++) {
        var s = {
            x: 2,
            y: n += 20,
            width: 15,
            height: 20,
            color: 'orange'
        }
    }
}*/

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
    balls.forEach(function(b,index) {  //balls was ballArray
      b.x += (b.speedX * globalSpeedMultiplier);
      b.y += (b.speedY * globalSpeedMultiplier);
      ballAtWall(b);
      ballAtPlayer(b,index);
    });
}

function ballAtPlayer(b,index) {
    if(playerBallOverlap(player.x,player.y,player.width,player.height,b.x,b.y,b.radius)) {
        if(b.color === colorToPop) {
            rightBallsPopped += 1;
        } else {
            wrongBallsPopped += 1;
        }
        balls.splice(index,1); // remove 1 ball at index location
    }
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

function drawStructure(s) {
    ctx.save();
    ctx.translate(s.x,s.y);
    ctx.fillStyle = s.color;
    ctx.fillRect(0,0,s.width,s.height);
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

function drawActiveBalls(balls) {  // score
    ctx.save();
    ctx.font="20px Arial";
    if (balls.length === 0) {
        ctx.fillText("Game Over",100,20);
    } else if(rightBallsPopped === numOfRightBalls) {
        ctx.fillText("You Win Final Score: " + (initNumBalls - wrongBallsPopped),50,20);
    } else {
        ctx.fillText("Balls to pop: " + balls.length,100,20);
        ctx.fillText("Right popped: " + rightBallsPopped,80,40);
        ctx.fillText("Wrong popped: " + wrongBallsPopped,80,60);
    }
    ctx.restore();
}

function playerBallOverlap (x0,y0,w0,h0,cx,cy,r) {
    var testX=cx;
    var testY=cy;
    if (testX < x0) testX=x0;
    if (testX > (x0+w0)) testX=(x0+w0);
    if (testY < y0) testY=y0;
    if (testY > (y0+h0)) testY=(y0+h0);
    return (((cx-testX)*(cx-testX)+(cy-testY)*(cy-testY))<r*r)
}
```

# Loading Assets
**Uses Howler.js Library**

```javascript
window.onload = init;


var assetsToLoadURLs = {
    backgroundImage: { url: 'https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/images/background.png' }, // http://www.clipartlord.com/category/weather-clip-art/winter-clip-art/
    logo1: { url: "https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/images/SkywardWithoutBalls.png" },
    logo2: { url: "https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/images/BoundsWithoutBalls.png" },
    bell: { url: "https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/images/bells.png" },
    spriteSheetBunny: { url: 'https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/images/bunnySpriteSheet.png' },
    plop: { url: 'https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/sounds/plop.mp3', buffer: false, loop: false, volume: 1.0 },
    humbug: { url: 'https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/sounds/humbug.mp3', buffer: true, loop: true, volume: 1.0 },
    concertino: { url: 'https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/sounds/christmas_concertino.mp3', buffer: true, loop: true, volume: 1.0 },
    xmas: { url: 'https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/sounds/xmas.mp3', buffer: true, loop: true, volume: 0.6 }
};

var loadedAssets;

function init() {
    // this call will load all assets
  document.body.innerHTML += "<p>Loading assets...</p>";
    loadAssets(startGame);
}

function startGame(assetsReadyToBeUsed) {
  document.body.innerHTML += "<p>IMAGES, SOUNDS, MUSICS READY TO BE USED!</p>";
  // We're ready to use all sounds, images, musics etc
  loadedAssets = assetsReadyToBeUsed;
  
  // ex: draw the images in a canvas
  drawImages();
  
  // play one of the background music
  // UNCOMMENT THIS LINE!
  playHumbug();
  
  // play plop every second
  // UNCOMMENT THIS LINE!
  setInterval(playPlop, 1000);
}

function playHumbug() {
  loadedAssets.humbug.play();
}

function playPlop() {
    loadedAssets.plop.play();
}

function drawImages() {
  var canvas = document.querySelector('#myCanvas');
  var ctx = canvas.getContext('2d');
  
  // background image drawImage can have different syntaxes : drawImage(img, x, y); or
  // drawImage(x, y, width, height), for other syntaxes see HTML5 fundamentals course
  ctx.drawImage(loadedAssets.backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(loadedAssets.bell, 20, 20);
  
  ctx.drawImage(loadedAssets.spriteSheetBunny, 190, 0);
  
}
//==========================

function loadAssets(callback) {
    // here we should load the sounds, the sprite sheets etc.
    // then at the end call the callback function           
    loadAssetsUsingHowlerAndNoXhr(assetsToLoadURLs, callback);
}

// You do not have to understand in details the next parts of the code...
// just use the above function

/* ############################
    BUFFER LOADER for loading multiple files asyncrhonously. The callback functions is called when all
    files have been loaded and decoded 
 ############################## */
function isImage(url) {
    return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

function isAudio(url) {
    return (url.match(/\.(mp3|ogg|wav)$/) != null);
}

function loadAssetsUsingHowlerAndNoXhr(assetsToBeLoaded, callback) {
    var assetsLoaded = {};
    var loadedAssets = 0;
    var numberOfAssetsToLoad = 0;

    // define ifLoad function
    var ifLoad = function () {
        if (++loadedAssets >= numberOfAssetsToLoad) {
            callback(assetsLoaded);
        }
        console.log("Loaded asset " + loadedAssets);
    };

    // get num of assets to load
    for (var name in assetsToBeLoaded) {
        numberOfAssetsToLoad++;
    }

    console.log("Nb assets to load: " + numberOfAssetsToLoad);

    for (name in assetsToBeLoaded) {
        var url = assetsToBeLoaded[name].url;
        console.log("Loading " + url);
        if (isImage(url)) {
            assetsLoaded[name] = new Image();

            assetsLoaded[name].onload = ifLoad;
            // will start async loading. 
            assetsLoaded[name].src = url;
        } else {
            // We assume the asset is an audio file
            console.log("loading " + name + " buffer : " + assetsToBeLoaded[name].loop);
            assetsLoaded[name] = new Howl({
                urls: [url],
                buffer: assetsToBeLoaded[name].buffer,
                loop: assetsToBeLoaded[name].loop,
                autoplay: false,
                volume: assetsToBeLoaded[name].volume,
                onload: function () {
                    if (++loadedAssets >= numberOfAssetsToLoad) {
                        callback(assetsLoaded);
                    }
                    console.log("Loaded asset " + loadedAssets);
                }
            }); // End of howler.js callback
        } // if

    } // for
} // function
```
# Ball Game

**not working**
```javascript
//ok
let canvas, ctx, w, h;
let mousePos;
let balls = [];
/*var structures = []*/
let initialNumberOfBalls;
let globalSpeedMultiplier = 1;
let colorToEat = 'red';
let wrongBallsEaten = goodBallsEaten = 0;
let numberOfGoodBalls;

//ok
let player = {
    x: 20,
    y: 50,
    width: 10,
    height: 40,
    colour: 'rgb(100,150,250)',
    move(y) {
        this.y = y;
    },
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.fillStyle = this.colour;
        ctx.fillRect(0,0,this.width,this.height);
        ctx.restore();
    }
}

var structure1 = {
    x:2,
    y:40,
    width: 15,
    height: 15,
    color: 'orange'
}

var structure2 = {
    x:2,
    y:80,
    width: 15,
    height: 15,
    color: 'orange'
}

var structure3 = {
    x:2,
    y:120,
    width: 15,
    height: 15,
    color: 'orange'
}
//ok
window.onload = function canvasing() {
    canvas = document.querySelector("#otherCanvas");
    w = canvas.width;
    h = canvas.height;
    ctx = canvas.getContext('2d');
    /*structures = makeStructures(3);*/
    balls = makeBalls(10); // makes 4 balls
    canvas.addEventListener('mousemove',mouseMoved);
    mainLoop();
};
//ok
function mouseMoved(event) {
    mousePos = getMousePos(canvas,event);
}
//ok
function getMousePos(canvas,event) {
    let rect = canvas.getBoundingClientRect();
    return {
        y: event.clientY - rect.top
    };
}

/*delete*/
function movePlayerWithMouse() {
    if(mousePos !== undefined) {
        player.move(mousePos.y);
    }
}
//ok
function mainLoop() {
    ctx.clearRect(0,0,w,h);          // clears canvas
    player.draw(ctx);
    makeAllBalls(balls);             // replaces making one at a time
    moveAllBalls(balls);             // replaces moving one at a time
    drawActiveBalls(balls);
    drawStructure(structure1);
    drawStructure(structure2);
    drawStructure(structure3);
    movePlayerWithMouse();
    requestAnimationFrame(mainLoop); // animation function
}

/*function makeStructures(n) {
    var structureArray = [];
    for(var i=0; i < n; i++) {
        var s = {
            x: 2,
            y: n += 20,
            width: 15,
            height: 20,
            color: 'orange'
        }
    }
}*/


//ok
function randomColour() {
    let colours = ['orange','green','lightBlue','pink'];
    let colourIndex = Math.round((colours.length-1)*Math.random());
    let c = colours[colourIndex];
    return c; // returns random colour
}
//ok
function makeAllBalls(ballArray) {
    ballArray.forEach(function(b) {
       b.draw(ctx); 
    });
}
//ok
function moveAllBalls(ballArray) {
    balls.forEach(function(b,index) { // b is current ball in array
        b.move();
        ballAtWall(b);
        ballAtPlayer(b,index);
    });
}
// ok
function ballAtPlayer(b,index) {
    if(playerBallOverlap(player.x,player.y,player.width,player.height,b.x,b.y,b.radius)) {
        balls.splice(index,1); // remove 1 ball at index location
    }
}
//ok
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



function drawStructure(s) {
    ctx.save();
    ctx.translate(s.x,s.y);
    ctx.fillStyle = s.color;
    ctx.fillRect(0,0,s.width,s.height);
    ctx.restore();
}
//ok
function drawActiveBalls(balls) {  // score
    ctx.save();
    ctx.font="20px Arial";
    if (balls.length === 0) {
        ctx.fillText("YOU WON",100,20);
    } else {
        ctx.fillText("enemies left: " + balls.length,90,20);
    }
    ctx.restore();
}
//ok
function playerBallOverlap (x0,y0,w0,h0,cx,cy,r) {
    let testX=cx;
    let testY=cy;
    if (testX < x0) testX=x0;
    if (testX > (x0+w0)) testX=(x0+w0);
    if (testY < y0) testY=y0;
    if (testY > (y0+h0)) testY=(y0+h0);
    return (((cx-testX)*(cx-testX)+(cy-testY)*(cy-testY))<r*r);
}
//ok
class Ball {
    constructor(x,y,radius,colour,speedX,speedY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.colour = colour;
        this.speedX = speedX;
        this.speedY = speedY;
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.fillStyle = this.colour;
        ctx.beginPath();
        ctx.arc(0,0,this.radius,0,2*Math.PI);
        ctx.fill();
        ctx.restore();
    }
    move() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}
//ok
function makeBalls(n) {              // makes number of balls passed above
    let ballArray = [];              // for keeping track of making balls
    for(let i=0; i < n; i++) {
        let x: w/2;
        let y: h/2;
        let radius: 5 + 15 * Math.random(); // between 5 and 20
        let speedX: 2 + 2 * Math.random();  // between 2 and 4
        let speedY: 1 + 2 * Math.random();  // between 1 and 3
        let colour: randomColour();
        let b = new Ball(x,y,radius,speedX,speedY,colour);
        ballArray.push(b); // ball added to array
    }
    return ballArray;
}
```

**works**
```javascript
let canvas, ctx, w, h; 
let mousePos;

// an empty array!
let balls = []; 
let initialNumberOfBalls;
let globalSpeedMutiplier = 1;
let colorToEat = 'red';
let wrongBallsEaten = goodBallsEaten = 0;
let numberOfGoodBalls;

// SOUNDS
let ballEatenSound;

// Player as a singleton/simple object
let player = {
  x:10,
  y:10,
  width:20,
  height:20,
  color:'red',
  
  move(x, y) {
    this.x = x;
    this.y = y;
  },
  
  draw(ctx) {
    // draw the player at its current position
    // with current width, height and color
    // GOOD practice: save the context, use 2D trasnformations
    ctx.save();
  
    // translate the coordinate system, draw relative to it
    ctx.translate(this.x, this.y);
  
    ctx.fillStyle = this.color;
    // (0, 0) is the top left corner of the monster.
    ctx.fillRect(0, 0, this.width, this.height);
  
    // GOOD practice: restore the context
    ctx.restore();    
  }
}

window.onload = function init() {
    // called AFTER the page has been loaded
  
    // Start playing the background music as soon as the page has loaded
    /*playBackgroundMusic();*/
  
    canvas = document.querySelector("#myCanvas");
  
    // often useful
    w = canvas.width; 
    h = canvas.height;  
  
    // important, we will draw with this object
    ctx = canvas.getContext('2d');
  
    // start game with 10 balls, balls to eat = red balls
    startGame(10);
  
    // add a mousemove event listener to the canvas
    canvas.addEventListener('mousemove', mouseMoved);

    mainLoop();
    // Load the sound and start the game only when the sound has been loaded
/*    ballEatenSound = new Howl({
                urls: ['https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/sounds/plop.mp3'],
                onload: function () {
                  // start the animation
                    mainLoop();
                }
            });*/
  
};



function playBackgroundMusic() {
   let audioPlayer = document.querySelector("#audioPlayer");
   audioPlayer.play();
}

function pausebackgroundMusic() {
   let audioPlayer = document.querySelector("#audioPlayer");
   audioPlayer.pause();  
}

function startGame(nb) {
  do {
    balls = createBalls(nb);
    initialNumberOfBalls = nb;
    numberOfGoodBalls = countNumberOfGoodBalls(balls, colorToEat);
  } while(numberOfGoodBalls === 0);
  
  wrongBallsEaten = goodBallsEaten = 0;
}

function countNumberOfGoodBalls(balls, colorToEat) {
  let nb = 0;
  
  balls.forEach(function(b) {
    if(b.color === colorToEat)
      nb++;
  });
  
  return nb;
}

//===== CALLED BY GUI WHEN THE USER USES INPUT FIELDS
function changeNbBalls(nb) {
  startGame(nb);
}

function changeColorToEat(color) {
  colorToEat = color;
}

function changePlayerColor(color) {
  player.color = color;
}

function changeBallSpeed(coef) {
    globalSpeedMutiplier = coef;
}

//==== CALLED WHEN A USER USES ITS MOUSE
function mouseMoved(evt) {
    mousePos = getMousePos(canvas, evt);
}

function getMousePos(canvas, evt) {
    // necessary work in the canvas coordinate system
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

//==== MAIN ANIMATION GAME LOOP
function mainLoop() {
  // 1 - clear the canvas
  ctx.clearRect(0, 0, w, h);
  
  // draw the player
  player.draw(ctx);
  // draw all balls
  drawAllBalls(balls);
  
  // animate the ball that is bouncing all over the walls
  moveAllBalls(balls);
  
 // make the player follow the mouse
  // the animations starts as the page is loaded
  // maybe the mouse is not yet over the canvas
  // this is why we test if the mousePos is defined
  if(mousePos !== undefined)
      player.move(mousePos.x, mousePos.y);
  
  // draw the game score
  drawScore(balls);

  // ask for a new animation frame
  requestAnimationFrame(mainLoop);
}

//==== UTILITY FUNCTION
// Collisions between rectangle and circle
function circRectsOverlap(x0, y0, w0, h0, cx, cy, r) {
   let testX=cx;
   let testY=cy;
   if (testX < x0) testX=x0;
   if (testX > (x0+w0)) testX=(x0+w0);
   if (testY < y0) testY=y0;
   if (testY > (y0+h0)) testY=(y0+h0);
   return (((cx-testX)*(cx-testX)+(cy-testY)*(cy-testY))< r*r);
}

//=== FUNCTIONS RELATED TO BALLS

class Ball {
  constructor(x, y, radius, color, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
  }
  
  draw(ctx) {
    // GOOD practice: save the context, use 2D trasnformations
    ctx.save();
  
    // translate the coordinate system, draw relative to it
    ctx.translate(this.x, this.y);
  
    ctx.fillStyle = this.color;
    // (0, 0) is the top left corner of the monster.
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, 2*Math.PI);
    ctx.fill();
 
    // GOOD practice: restore the context
    ctx.restore();    
  }
  
  move() {
      this.x += this.speedX;
      this.y += this.speedY;    
  }
}

function createBalls(n) {
  // empty array
  let ballArray = [];
  
  // create n balls
  for(let i=0; i < n; i++) {
     
    // Create some random values...
    let x = w/2;
    let y = h/2;
    let radius =  5 + 30 * Math.random(); // between 5 and 35
    let speedX =  -5 + 10 * Math.random(); // between -5 and + 5
    let speedY =  -5 + 10 * Math.random(); // between -5 and + 5
    let color = getARandomColor();

    // Create the new ball b
    let b = new Ball(x, y, radius, color, speedX, speedY);
    
    // add ball b to the array
    ballArray.push(b);
  }
  // returns the array full of randomly created balls
  return ballArray;
}

function getARandomColor() {
  let colors = ['red', 'blue', 'cyan', 'purple', 'pink', 'green', 'yellow'];
  // a value between 0 and color.length-1
  // Math.round = rounded value
  // Math.random() a value between 0 and 1
  let colorIndex = Math.round((colors.length-1)*Math.random()); 
  let c = colors[colorIndex];
  
  // return the random color
  return c;
}

function drawScore(balls) {
  ctx.save();
  ctx.font="20px Arial";
  
  if(balls.length === 0) {
    ctx.fillText("Game Over!", 20, 30);
  } else if(goodBallsEaten === numberOfGoodBalls) {
    ctx.fillText("You Win! Final score : " + (initialNumberOfBalls - wrongBallsEaten), 
                 20, 30);
  } else {
    ctx.fillText("Balls still alive: " + balls.length, 210, 30);
    ctx.fillText("Good Balls eaten: " + goodBallsEaten, 210, 50);
     ctx.fillText("Wrong Balls eaten: " + wrongBallsEaten, 210, 70);
  }
  ctx.restore();
}


function drawAllBalls(ballArray) {
    ballArray.forEach(function(b) {
      b.draw(ctx);
    });
}


function moveAllBalls(ballArray) {
  // iterate on all balls in array
  balls.forEach(function(b, index) {
      // b is the current ball in the array
      b.move();
  
      testCollisionBallWithWalls(b); 
    
      testCollisionWithPlayer(b, index);
  });
}

function testCollisionWithPlayer(b, index) {
  if(circRectsOverlap(player.x, player.y,
                     player.width, player.height,
                     b.x, b.y, b.radius)) {
    // PLAY A PLOP SOUND!
    /*ballEatenSound.play();*/
    
    // we remove the element located at index
    // from the balls array
    // splice: first parameter = starting index
    //         second parameter = number of elements to remove
    if(b.color === colorToEat) {
      // Yes, we remove it and increment the score
      goodBallsEaten += 1;
    } else {
      wrongBallsEaten += 1;
    }
    
    balls.splice(index, 1);

  }
}

function testCollisionBallWithWalls(b) {
    // COLLISION WITH VERTICAL WALLS ?
    if((b.x + b.radius) > w) {
    // the ball hit the right wall
    // change horizontal direction
    b.speedX = -b.speedX;
    
    // put the ball at the collision point
    b.x = w - b.radius;
  } else if((b.x -b.radius) < 0) {
    // the ball hit the left wall
    // change horizontal direction
    b.speedX = -b.speedX;
    
    // put the ball at the collision point
    b.x = b.radius;
  }
  
  // COLLISIONS WTH HORIZONTAL WALLS ?
  // Not in the else as the ball can touch both
  // vertical and horizontal walls in corners
  if((b.y + b.radius) > h) {
    // the ball hit the right wall
    // change horizontal direction
    b.speedY = -b.speedY;
    
    // put the ball at the collision point
    b.y = h - b.radius;
  } else if((b.y -b.radius) < 0) {
    // the ball hit the left wall
    // change horizontal direction
    b.speedY = -b.speedY;
    
    // put the ball at the collision point
    b.Y = b.radius;
  }  
}
```
# Object Follow the Mouse

```html
<!--html-->
<body onload="init();">
<canvas id="myCanvas" width="400" height="400">Canvas not supported by your browser.</canvas>
</body>
```
```css
/*css*/
#myCanvas {
    background: rgb(100,100,100);
    margin: 20px;
}
```
```javascript
// javascript
var canvas, ctx, width, height;
var rect = {x:40, y:40, radius: 30, width:40, height:40, v:3};
var mousepos = {x:0, y:0};

function init() {
  canvas = document.querySelector("#myCanvas");
  ctx = canvas.getContext('2d');
  width = canvas.width;
  height = canvas.height; 
  
  canvas.addEventListener('mousemove', function (evt) {
        mousepos = getMousePos(canvas, evt);
     }, false); 
 
  mainloop();
}


function mainloop() {
    // 1) clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // 2) move object
    var dx = rect.x - mousepos.x;
    var dy = rect.y - mousepos.y;
    var angle = Math.atan2(dy, dx);
  
    rect.x -= rect.v*Math.cos(angle);   
    rect.y -= rect.v*Math.sin(angle); 
  
    // 3) draw object
    drawRectangle(angle);
  
    // 4) request new frame
     window.requestAnimationFrame(mainloop);
}
 
function drawRectangle(angle) {
  ctx.save();
  
  // These two lines move the coordinate system
  ctx.translate(rect.x, rect.y);
  ctx.rotate(angle);
  // recenter the coordinate system in the middle
  // the rectangle. Like that it will rotate around
  // this point instead of top left corner
  ctx.translate(-rect.width/2, -rect.height/2);
  
  ctx.fillRect(0, 0, rect.width, rect.height);
  ctx.restore();
}

function getMousePos(canvas, evt) {
  // necessary to take into account CSS boudaries
  var rect = canvas.getBoundingClientRect();
  return {
     x: evt.clientX - rect.left,
     y: evt.clientY - rect.top
  };
}
```
