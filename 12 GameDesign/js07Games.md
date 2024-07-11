# Elements and APIs

**Canvas**
For drawing

**Request Animation Frame**
For rendering 60 FPS

**Audio**
`<audio>` used for streaming compressed audio , such as mp3 and microphone
Web Audio API used for uncompressed audio , must be loaded into memory and decompressed

**Control**
Game Pad API a game controller used instead of keyboard and mouse APIs

# Event Listeners

```javascript
element.addEventListener('click',function(evt) {
  // some code
},false);
```

# Mouse Location

```javascript
canvas.addEventListener('mousemove',function(evt) {
  inputStates.mousePos = getMousePos(canvas,evt);
  var message = 'Mouse pos: ' + inputStates.mousePos.x + ',' + inputStates.mousePos.y;
  writeMessage(canvas,message);
},false);
canvas.addEventListener('mousedown',function(evt) {
  inputStates.mousedown = true;
  inputStates.mouseButton = evt.button;
  var message = 'Mouse button: ' + evt.button + 'down at ' + inputStates.mousePos.x + ' , ' + inputStates.mousePos.y;
  writeMessage(canvas,message);
},false);
canvas.addEventListener('mouseup',function(evt) {
  inputStates.mousedown = false;
  inputStates.mouseButton = evt.button;
  var message = 'Mouse up at ' + inputStates.mousePos.x + ' , ' + inputStates.mousePos.y;
  writeMessage(canvas,message);
},false);

function getMousePos(canvas,evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
```

# Arrow Keys

```javascript
// Check keyboard inputs
if (inputStates.left) {
  ctx.fillText("left",150,20);
}
if (inputStates.up) {
  ctx.fillText("up",150,50);
}
if (inputStates.right) {
  ctx.fillText("right",150,80);
}
if (inputStates.down) {
  ctx.fillText("down",150,120);
}
if (inputStates.space) {
  ctx.fillText("space bar",140,150);
}
```

# Game Pad Controller

**Controls**
buttons: 16 array of objects with 2 properties each pressed and value
axes: array of values -1(up,left) to 1(down,right)

**Queries For Connected Gamepads**
```javascript
var gamepad;

function mainLoop() {
  scangamepads();
}

function scangamepads() { // continously checks for connected gamepads
  var gamepads = navigator.getGamepads();
  for (var i=0; i < gamepads.length; i++) {
    if (gamepads[i] !== undefined)
      gamepad = gamepads[i];
  }
}

window.addEventListener("gamepadconnected",function(e) {
  var gamepad = e.gamepad;
  var index = gamepad.index;
  var id = gamepad.id;
  var nbButtons = gamepad.buttons.length;
  var nbAxes = gamepad.axes.length;
  console.log("Gamepad no " + index + " with id " + id + " connected. Contains " + nbButtons + " buttons and " + nbAxes + " axes.");
});
```

**Queries for Button Press**
```javascript
function checkButtons(gamepad) {
  for (var i = 0; i < gamepad.buttons.length; i++) {
    if(gamepad === undefined) return;
    if(!gamepad.connected) return;
    var b = gamepad.buttons[i];
    if(b.pressed) {
      console.log("button " + i + " pressed.");
      if(b.value !== undefined)
        console.log("value " + b.val)
    }
  }
}

function mainloop() {
  scangamepads();
  checkButtons(gamepad);
  requestAnimationFrame(mainloop)
}
```

**Query for Axes Values**
```javascript
function checkAxes(gamepad) {
  if(gamepad === undefined) return;
  if(!gamepad.connected) return;
  for(var i=0; i < gamepad.axes.length; i++) {
    var axisValue = gamepad.axes[i];
    // code to do something with value
  }
}
```

**Query Axes Direction and Angles**
```javascript
var inputStates = {};
...
function mainloop() {
   // clear, draw objects, etc...
   // update gamepad status
   scangamepads();
  // Check gamepad button states
  checkButtons(gamepad);
  // Check joysticks states
  checkAxes(gamepad);
  // Move the player, taking into account
  // the gamepad left joystick state
  updatePlayerPosition();
  // We could use the same technique in
  // order to react when buttons are pressed
  //...
  // animate at 60 frames/s
  requestAnimationFrame(mainloop);
}
 
function updatePlayerPosition() {
   directionDiv.innerHTML += "";
   if(inputStates.left) {
      directionDiv.innerHTML = "Moving left";
   }
   if(inputStates.right) {
      directionDiv.innerHTML = "Moving right";
   }
   if(inputStates.up) {
      directionDiv.innerHTML = "Moving up";
   }
   if(inputStates.down) {
      directionDiv.innerHTML = "Moving down";
   }
   // Display the angle in degrees, in the HTML page
   angleDiv.innerHTML = Math.round((inputStates.angle*180/Math.PI));
}
 
// gamepad code below
// -------------------------
// detect axis (joystick states)
function checkAxes(gamepad) {
  if(gamepad === undefined) return;
  if(!gamepad.connected) return;
  ...
  // Set inputStates.left, right, up, down
  inputStates.left = inputStates.right = inputStates.up = inputStates.down = false;
  // all values between [-1 and 1]
  // Horizontal detection
  if(gamepad.axes[0] > 0.5) {
     inputStates.right=true;
     inputStates.left=false;
  } else if(gamepad.axes[0] < -0.5) {
     inputStates.left=true;
     inputStates.right=false;
  }
  // vertical detection
  if(gamepad.axes[1] > 0.5) {
    inputStates.down=true;
    inputStates.up=false;
  } else if(gamepad.axes[1] < -0.5) {
    inputStates.up=true;
    inputStates.down=false;
  }
 
  // compute the angle. gamepad.axes[1] is the
  // sinus of the angle (values between [-1, 1]),
  // gamepad.axes[0] is the cosinus of the angle.
  // we display the value in degree as in a regular
  // trigonometric circle, with the x axis to the right
  // and the y axis that goes up.
  // The angle = arcTan(sin/cos); We inverse the sign of
  // the sinus in order to have the angle in standard
  // x and y axis (y going up)
  inputStates.angle = Math.atan2(-gamepad.axes[1], gamepad.axes[0]);
}
```

# Game Structure

**Game Loop**
Game action that occurs regardless of user input.


# Move Cube And Change Speed

```html
<!--html-->
<main>
  <canvas id="myCanvas" width="400" height="400"></canvas>
</main>
```
```css
/* css */
body {
  background: rgb(100,100,100);
}

#myCanvas {
  background: rgb(20,20,20);
  width: 90vh;  /* responsive to height */
  height: 90vh; /* responsive to height */
}
```
```javascript
// javascript
// once window is ready
window.onload = function init() {
  var game = new GF();  // constructor
  game.start(); // Game Instance
};

// Game Framework
var GF = function() {
  // test FPS
  var frameCount = 0;
  var lastTime;
  var fpsContainer;
  var fps;
  var measureFPS = function(newTime) {  // private function
    if(lastTime === undefined) {
      lastTime = newTime;
      return;
    }
    var diffTime = newTime - lastTime;
    if(diffTime >= 1000) {
      fps = frameCount;
      frameCount = 0;
      lastTime = newTime;
    }
    fpsContainer.innerHTML = 'FPS: ' + fps;
    frameCount++;
  };
  // Canvas
  var canvas;
  var ctx;
  var w;
  var h;
  
  function clearCanvas() {
    ctx.clearRect(0,0,w,h);
  }
  
  // the cube
  var theCube = {
    x:10,
    y:10,
    speed:1
  }
  
  function drawCube(x,y) {
    ctx.save(); // save the context of these changes
    ctx.translate(x,y);
    //head
    ctx.fillStyle='orange';
    ctx.fillRect(0,0,100,100);
    //eyes
    ctx.fillStyle='rgb(50,50,50)';
    ctx.fillRect(20,20,10,10);
    ctx.fillRect(70,20,10,10);
    //nose
    ctx.fillRect(47,40,10,20);
    //mouth
    ctx.fillRect(25,80,50,10);
    ctx.restore(); // return context to original state before saving
  }
  // Keyboard Inputs
  var inputStates = {}; // global variable
  
  var mainLoop = function(time) {  // private function
    measureFPS(time); // calls function to test FPS
    clearCanvas();
    drawCube(theCube.x,theCube.y);
    updateCubePosition();
    requestAnimationFrame(mainLoop);
  };
  
  function updateCubePosition() {
    theCube.speedX = 0;
    theCube.speedY = 0;
    // Check keyboard inputs
    if (inputStates.left) {
      ctx.fillText("left",150,20);
      theCube.speedX = -theCube.speed;
    }
    if (inputStates.up) {
      ctx.fillText("up",150,50);
      theCube.speedY = -theCube.speed;
    }
    if (inputStates.right) {
      ctx.fillText("right",150,80);
      theCube.speedX = theCube.speed;
    }
    if (inputStates.down) {
      ctx.fillText("down",150,120);
      theCube.speedY = theCube.speed;
    }
    if (inputStates.space) {
      ctx.fillText("space bar",140,150);
      theCube.speed = 5;
    } else {
      theCube.speed = 1;
    }
    theCube.x += theCube.speedX;
    theCube.y += theCube.speedY;
  }
  
  var start = function() {
    fpsContainer = document.createElement('div'); // makes div
    document.body.appendChild(fpsContainer); // attaches div
    canvas = document.querySelector('#myCanvas');
    w = canvas.width;
    h = canvas.height;
    ctx = canvas.getContext('2d');
    ctx.fillStyle="white";
    ctx.font="20px Arial";
    window.addEventListener('keydown',function(event) {
      if (event.keyCode === 37) {
        inputStates.left = true;
      } else if (event.keyCode === 38) {
        inputStates.up = true;
      } else if (event.keyCode === 39) {
        inputStates.right = true;
      } else if (event.keyCode === 40) {
        inputStates.down = true;
      } else if (event.keyCode === 32) {
        inputStates.space = true;
      }
    },false);
    window.addEventListener('keyup',function(event) {
      if (event.keyCode === 37) {
        inputStates.left = false;
      } else if (event.keyCode === 38) {
        inputStates.up = false;
      } else if (event.keyCode === 39) {
        inputStates.right = false;
      } else if (event.keyCode === 40) {
        inputStates.down = false;
      } else if (event.keyCode === 32) {
        inputStates.space = false;
      }
    },false);
    requestAnimationFrame(mainLoop);
  };
  
  function writeMessage(canvas,message) {
    ctx.save();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.font = '18pt Calibri';
    ctx.fillStyle = 'orange';
    ctx.fillText(message,10,25);
    ctx.restore();
  }

  return {
    start: start
  };
};
```

# Time Based Animation

Used when program runs on different devices such as desktop and mobile since mobile may not guarantee 60 FPS. In order to avoid differences in animation timing run a lower frame rate on the slower devices. This is achieved by computing the the amount of time elapsed between the last drawn frame and the current one. Then based on the change in time adjust the distance objects need to travel.
When a mobile device renders at 20FPS that means the object is drawn only 20 times per second, so it does not move as far as a desktop running at 60FPS.

Used for sprite based animations.

Used when finer control over frame rate is required such as allocating resources for physics engines and ai.

**Compute Change in Time**

`performance.now()` returns sub millisecond accuracy
`date.now()` returns millisecond accuracy

**Optional timestamp Parameter**

This is the preferred way to optimize for mobile.
Similar example to this at jsbin.com/xacebu/edit?html,js,output that mimics a slow device.

```javascript
// once window is ready
window.onload = function init() {
  var game = new GF();  // constructor
  game.start(); // Game Instance
};

// Game Framework
var GF = function() {
  // test FPS
  var frameCount = 0;
  var lastTime;
  var fpsContainer;
  var fps;
  var measureFPS = function(newTime) {  // private function
    if(lastTime === undefined) {
      lastTime = newTime;
      return;
    }
    var diffTime = newTime - lastTime;
    if(diffTime >= 1000) {
      fps = frameCount;
      frameCount = 0;
      lastTime = newTime;
    }
    fpsContainer.innerHTML = 'FPS: ' + fps;
    frameCount++;
  };
  // Measure time between frames
  var x,y,incX;
  var speedX;
  var now = 0;
  var delta = 0;
  var oldTime = 0; // = performance.now()

  // Canvas
  var canvas;
  var ctx;
  var w;
  var h;
  
  function clearCanvas() {
    ctx.clearRect(0,0,w,h);
  }
  
  // the cube
  var theCube = {
    x:10,
    y:10,
    speed:1
  }
  
  function drawCube(x,y) {
    ctx.save(); // save the context of these changes
    ctx.translate(x,y);
    //head
    ctx.fillStyle='orange';
    ctx.fillRect(0,0,100,100);
    //eyes
    ctx.fillStyle='rgb(50,50,50)';
    ctx.fillRect(20,20,10,10);
    ctx.fillRect(70,20,10,10);
    //nose
    ctx.fillRect(47,40,10,20);
    //mouth
    ctx.fillRect(25,80,50,10);
    ctx.restore(); // return context to original state before saving
  }
  // Keyboard Inputs
  var inputStates = {}; // global variable
  
  var mainLoop = function(time) {  // private function
    measureFPS(time); // calls function to test FPS
    clearCanvas();
    drawCube(theCube.x,theCube.y);
    // measures time between frames
    delta = time - oldTime; // measures time
    incX = calcDistanceToMove(delta,speedX);  // measures time
    x += incX; // measures time
    updateCubePosition(delta); // measures time when added delta
    requestAnimationFrame(mainLoop);
  };
  var calcDistanceToMove = function(delta,speed) { // measures time
    //console.log("delta" + delta + speed);
    return (speed * delta) / 1000; // measures time
  } // measures time
  
  function updateCubePosition() {
    theCube.speedX = 0;
    theCube.speedY = 0;
    // Check keyboard inputs
    if (inputStates.left) {
      ctx.fillText("left",150,20);
      theCube.speedX = -theCube.speed;
    }
    if (inputStates.up) {
      ctx.fillText("up",150,50);
      theCube.speedY = -theCube.speed;
    }
    if (inputStates.right) {
      ctx.fillText("right",150,80);
      theCube.speedX = theCube.speed;
    }
    if (inputStates.down) {
      ctx.fillText("down",150,120);
      theCube.speedY = theCube.speed;
    }
    if (inputStates.space) {
      ctx.fillText("space bar",140,150);
      theCube.speed = 5;
    } else {
      theCube.speed = 1;
    }
    theCube.x += theCube.speedX;
    theCube.y += theCube.speedY;
  }
  
  var start = function() {
    fpsContainer = document.createElement('div'); // makes div
    document.body.appendChild(fpsContainer); // attaches div
    canvas = document.querySelector('#myCanvas');
    w = canvas.width;
    h = canvas.height;
    ctx = canvas.getContext('2d');
    ctx.fillStyle="white";
    ctx.font="20px Arial";
    window.addEventListener('keydown',function(event) {
      if (event.keyCode === 37) {
        inputStates.left = true;
      } else if (event.keyCode === 38) {
        inputStates.up = true;
      } else if (event.keyCode === 39) {
        inputStates.right = true;
      } else if (event.keyCode === 40) {
        inputStates.down = true;
      } else if (event.keyCode === 32) {
        inputStates.space = true;
      }
    },false);
    window.addEventListener('keyup',function(event) {
      if (event.keyCode === 37) {
        inputStates.left = false;
      } else if (event.keyCode === 38) {
        inputStates.up = false;
      } else if (event.keyCode === 39) {
        inputStates.right = false;
      } else if (event.keyCode === 40) {
        inputStates.down = false;
      } else if (event.keyCode === 32) {
        inputStates.space = false;
      }
    },false);
    requestAnimationFrame(mainLoop);
  };
  
  function writeMessage(canvas,message) {
    ctx.save();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.font = '18pt Calibri';
    ctx.fillStyle = 'orange';
    ctx.fillText(message,10,25);
    ctx.restore();
  }

  return {
    start: start
  };
};
```

**Set A Specific Frame Rate**

```javascript
var canvas = document.querySelector("#myCanvas");
   var ctx = canvas.getContext("2d");
   var width = canvas.width, height = canvas.height;
   var lastX = width * Math.random();
   var lastY = height * Math.random();
   var hue = 0;
 
   // Michel Buffa: set the target frame rate. TRY TO CHANGE THIS VALUE AND SEE
   // THE RESULT. Try 2 frames/s, 10 frames/s, 60 frames/s Normally there
   // should be a limit of 60 frames/s in the browser's implementations.
   setFrameRateInFramesPerSecond(10); // 60
 
  // for time based animation. DelayInMS corresponds to the target framerate
  var now, delta, delayInMS, totalTimeSinceLastRedraw = 0;
 
  // High resolution timer
  var then = performance.now();
 
  // start the animation
  requestAnimationFrame(mainloop);
 
  function setFrameRateInFramesPerSecond(frameRate) {
    delayInMs = 1000 / frameRate;
  }
 
  // each function that is going to be run as an animation should end by
  // asking again for a new frame of animation
  function mainloop(time) {
    // Here we will only redraw something if the time we want between frames has
    // elapsed
    // Measure time with high resolution timer
    now = time;
 
    // How long between the current frame and the previous one?
    delta = now - then;
    // TRY TO UNCOMMENT THIS LINE AND LOOK AT THE CONSOLE
    // console.log("delay = " + delayInMs + " delta = " + delta + " total time = " +
    // totalTimeSinceLastRedraw);
 
    // If the total time since the last redraw is > delay corresponding to the wanted
    // framerate, then redraw, else add the delta time between the last call to line()
    // by requestAnimFrame to the total time..
    if (totalTimeSinceLastRedraw > delayInMs) {
       // if the time between the last frame and now is > delay then we
       // clear the canvas and redraw
 
       ctx.save();
 
       // Trick to make a blur effect: instead of clearing the canvas
       // we draw a rectangle with a transparent color. Changing the 0.1
       // for a smaller value will increase the blur...
       ctx.fillStyle = "rgba(0,0,0,0.1)";
       ctx.fillRect(0, 0, width, height);
 
       ctx.translate(width / 2, height / 2);
       ctx.scale(0.9, 0.9);
       ctx.translate(-width / 2, -height / 2);
 
       ctx.beginPath();
       ctx.lineWidth = 5 + Math.random() * 10;
       ctx.moveTo(lastX, lastY);
       lastX = width * Math.random();
       lastY = height * Math.random();
 
       ctx.bezierCurveTo(width * Math.random(),
                         height * Math.random(),
                         width * Math.random(),
                         height * Math.random(),
                         lastX, lastY);
 
       hue = hue + 10 * Math.random();
       ctx.strokeStyle = "hsl(" + hue + ", 50%, 50%)";
       ctx.shadowColor = "white";
       ctx.shadowBlur = 10;
       ctx.stroke();
 
       ctx.restore();
 
       // reset the total time since last redraw
       totalTimeSinceLastRedraw = 0;
    } else {
       // sum the total time since last redraw
       totalTimeSinceLastRedraw += delta;
    }
 
    // Store time
    then = now;
 
    // request new frame
    requestAnimationFrame(mainloop);
  }
```


# An Interactive Game

first draft
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
    canvas = document.querySelector("#myCanvas");
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
        y: event.clientY - rect.top - 25
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

**2nd Draft**

```javascript
var canvas, ctx, w, h;
var mousePos;
var ballArray = [];

var player = {
    x: 20,
    y: 50,
    width: 10,
    height: 40,
    color: 'rgb(100,150,250)'
}

window.onload = init();

function init() {
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext('2d');
    w = canvas.width;
    h = canvas.height;
    createBalls(10); // makes given number of balls
    canvas.addEventListener('mousemove',mouseMoved); // add event listener
    requestAnimationFrame(mainLoop);
}

function createBalls(n) {              // makes number of balls passed above
    for(var i=0; i < n; i++) {
        var ball = new Ball(w*Math.random(),h*Math.random(),(10*Math.random())-5,(10*Math.random())-5,30*Math.random());
        ballArray[i] = ball;
    }
}

// Ball Constructor
function Ball(x,y,angle,v,diameter) {
  this.x = x;
  this.y = y;
  this.angle = angle;
  this.v = v;
  this.radius = diameter/2;
  // method
  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
    ctx.fill();
  };
  // method
  this.move = function() {
    this.x += this.v * Math.cos(this.angle);
    this.y += this.v * Math.sin(this.angle);
  };
}

function mouseMoved(event) {
    mousePos = getMousePos(canvas,event);
}

function getMousePos(canvas,event) {
    var rect = canvas.getBoundingClientRect();
    return {
        y: event.clientY - rect.top - 25
    };
}

function movePlayerWithMouse() {
    if(mousePos !== undefined) {
        player.y = mousePos.y;
    }
}

function mainLoop() {
    ctx.clearRect(0,0,w,h);          // clears canvas
    drawPlayer(player);
    movePlayerWithMouse();
    for(var i=0; i < ballArray.length; i++) {
      var ball = ballArray[i];
      ball.move();
      ball.draw();
      ballAtWall(ball);
      playerAtWall(player);
    }
    requestAnimationFrame(mainLoop); // animation function
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


/*function ballAtPlayer(b,index) {
    if(playerBallOverlap(player.x,player.y,player.width,player.height,b.x,b.y,b.radius)) {
        balls.splice(index,1); // remove 1 ball at index location
    }
}*/

function ballAtWall(ball) {
    if (ball.x < ball.radius) { // left wall
        ball.x = ball.radius;    // ball at collision point
        ball.angle = -ball.angle + Math.PI;
    }
    if (ball.x > w - (ball.radius)) { // right wall
        ball.x = w - (ball.radius);
        ball.angle = -ball.angle + Math.PI;
    }
    if (ball.y < ball.radius) { // top wall
        ball.y = ball.radius;
        ball.angle = -ball.angle;
    }
    if (ball.y > h - (ball.radius)) { // bottom wall
        ball.y = h - (ball.radius);
        ball.angle = -ball.angle;
    }
}

function playerAtWall(player) {
  if (player.y < (5) ) {
    player.y = (5);
  }
  if (player.y > h - (player.height + 5)) {
    player.y = h - (player.height + 5);
  }
}

function drawPlayer(r) {
    ctx.save();
    ctx.translate(r.x,r.y);
    ctx.fillStyle = r.color;
    ctx.fillRect(0,0,r.width,r.height);
    ctx.restore();
}


/*function drawActiveBalls(balls) {  // score
    ctx.save();
    ctx.font="20px Arial";
    if (balls.length === 0) {
        ctx.fillText("YOU WON",100,20);
    } else {
        ctx.fillText("enemies left: " + balls.length,90,20);
    }
    ctx.restore();
}*/

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

**3d Draft**
works ok , but balls are slow and need to add mouse player move
```javascript
// INITIALIZE

window.onload = function init() {
  var game = new GF();
  game.start();
};

// GAME FRAMEWORK

// need to add var speed somewhere

var GF = function() {
  // canvas
  var canvas, ctx, w, h;
  function clearCanvas() {
    ctx.clearRect(0,0,w,h);
  }
  // measure FPS
  var frameCount = 0;
  var lastTime;
  var fpsContainer;
  var fps;
  var measureFPS = function(newTime) {
    if (lastTime === undefined) {
      lastTime = newTime;
      return;
    }
    var diffTime = newTime - lastTime;
    if (diffTime >= 1000) {
      fps = frameCount;
      frameCount = 0;
      lastTime = newTime;
    }
    fpsContainer.innerHTML = 'FPS ' + fps;
    frameCount++;
  };
  // time based animation
  var delta = 0;
  var oldTime = 0;
  var ballArray = [];
  var calcDistanceToMove = function(delta,speed) {
    return (speed * delta) / 1000;
  };
  function timer(currentTime) {
    var delta = currentTime - oldTime; // might be able to remove the var part
    oldTime = currentTime;
    return delta;
  }
  // inputs
  var inputStates = {};
  // mouse position
  var mousePos;
  // player
  var player = {
    x: 20,
    y: 50,
    width: 10,
    height: 40,
    speed: 100, // in pixels
    color: 'rgb(100,150,250)'
  };
  function drawPlayer(r) {
    ctx.save();
    ctx.translate(r.x,r.y);
    ctx.fillStyle = r.color;
    ctx.fillRect(0,0,r.width,r.height);
    ctx.restore();
  };
  var mainLoop = function(time) {
    measureFPS(time);
    delta = timer(time);
    clearCanvas();
    drawPlayer(player);
    playerAtWall(player);
    updatePlayerPosition(delta);
    updateBalls(delta);
    requestAnimationFrame(mainLoop);
  };
  function updatePlayerPosition(delta) {
    player.speedY = 0;
    if (inputStates.up) {
      player.speedY = -player.speed;
    }
    if (inputStates.down) {
      player.speedY = player.speed;
    }
    if (inputStates.space) {
      player.speed = 500;
    }
    else {
      player.speed = 100;
    }
    player.y += calcDistanceToMove(delta,player.speedY);
  }
  function updateBalls(delta) {
    for (var i=0; i < ballArray.length; i++) {
      var ball = ballArray[i];
      ball.move();
      ballsAtWalls(ball);
      if (ballsAtPlayer(player.x,player.y,player.width,player.height,ball.x,ball.y,ball.radius)) {
        ballArray.splice(i,1); // remove 1 ball at index location
      }
      ball.draw();
    }
  }
  function ballsAtPlayer(x0,y0,w0,h0,cx,cy,r) {
    var testX = cx;
    var testY = cy;
    if (testX < x0) testX = x0;
    if (testX > (x0+w0)) testX = (x0+w0);
    if (testY < y0) testY = y0;
    if (testY > (y0+h0)) testY = (y0+h0);
    return (((cx-testX)*(cx-testX)+(cy-testY)*(cy-testY)) < r*r);
  }
  function playerAtWall(player) {
    if (player.y < (5) ) {
      player.y = (5);
    }
    if (player.y > h - (player.height + 5)) {
      player.y = h - (player.height + 5);
    }
  }
  function ballsAtWalls(ball) {
    if (ball.x < ball.radius) { // left wall
        ball.x = ball.radius;    // ball at collision point
        ball.angle = -ball.angle + Math.PI;
    }
    if (ball.x > w - (ball.radius)) { // right wall
        ball.x = w - (ball.radius);
        ball.angle = -ball.angle + Math.PI;
    }
    if (ball.y < ball.radius) { // top wall
        ball.y = ball.radius;
        ball.angle = -ball.angle;
    }
    if (ball.y > h - (ball.radius)) { // bottom wall
        ball.y = h - (ball.radius);
        ball.angle = -ball.angle;
    }
  }
  function getMousePos(canvas,event) {
    var rect = canvas.getBoundingClientRect();
    return {
        y: event.clientY - rect.top - 25
    };
  }
  function createBalls(n) {
    for(var i=0; i < n; i++) {
        var ball = new Ball(w*Math.random(),h*Math.random(),(10*Math.random())-5,(10*Math.random())-5,30*Math.random());
        ballArray[i] = ball;
    }
  }
  // Ball Constructor
  function Ball(x,y,angle,v,diameter) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.v = v;
    this.radius = diameter/2;
    this.color = randomColour();
    this.speed = 2000;  // added this , but makes no difference
    // method
    this.draw = function() {
      ctx.beginPath();
      ctx.fillStyle = this.color;  // may need to remove this
      ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
      ctx.fill();
    };
    // method
    this.move = function() {
      var incX = this.v * Math.cos(this.angle);
      var incY = this.v * Math.sin(this.angle);
      this.x += calcDistanceToMove(delta,incX);
      this.y += calcDistanceToMove(delta,incY);
    };
  }
  
  var start = function() {
    // canvas
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext('2d');
    w = canvas.width;
    h = canvas.height;
    // fps indicator
    ctx.font = "20px Arial";
    fpsContainer = document.createElement('div');
    document.body.appendChild(fpsContainer);
    // mouse event listener , but these are not working
    canvas.addEventListener('mousemove',mouseMoved);
    function mouseMoved(event) {
      mousePos = getMousePos(canvas,event);
    }
    function movePlayerWithMouse() {
      if(mousePos !== undefined) {
        player.y = mousePos.y;
      }
    }
    // key input listeners
    window.addEventListener('keydown',function(event) {
      if (event.keyCode === 38) {
        inputStates.up = true;
      }
      else if (event.keyCode === 40) {
        inputStates.down = true;
      }
      else if (event.keyCode === 32) {
        inputStates.space = true;
      }
    }, false);
    window.addEventListener('keyup',function(event) {
      if (event.keyCode === 38) {
        inputStates.up = false;
      }
      else if (event.keyCode === 40) {
        inputStates.down = false;
      }
      else if (event.keyCode === 32) {
        inputStates.space = false;
      }
    }, false);
    createBalls(10);
    requestAnimationFrame(mainLoop);
  };
  return {
    start: start
  };
};

// this is outside but still can be read
function randomColour() {
    var colours = ['orange','green','lightBlue','pink'];
    var colourIndex = Math.round((colours.length-1)*Math.random());
    var c = colours[colourIndex];
    return c; // returns random colour
}
```
Example That Removes balls on collision
```javascript
function updateBalls(delta) {
   // for each ball in the array
   var allBallDead = true;
   for(var i=0; i < ballArray.length; i++) {
     var ball = ballArray[i];
     if(ball.dead) continue; // do nothing if the ball is dead
     // if we are here: the ball is not dead
     allBallDead = false;
     // 1) move the ball
     ball.move();
     // 2) test if the ball collides with a wall
     testCollisionWithWalls(ball);
 
     // Test if the monster collides
     if(circRectsOverlap(monster.x, monster.y,
                         monster.width, monster.height,
                         ball.x, ball.y, ball.radius)) {
        //change the color of the ball
        ball.color = 'red';
        ball.dead = true;
        // Here, a sound effect would greatly improve
        // the experience!
        currentScore+= 1;
     }
     // 3) draw the ball
     ball.draw();
  }
  if(allBallDead) {
     // reset all balls, create more balls each time
     // as a way of increasing the difficulty
     // in a real game: change the level, play nice music!
     nbBalls++;
     createBalls(nbBalls);
   }
}
```

# Collision Detection

**Circle vs Circle**

If the distance between the center points of two circles is less than the sum of their radii, then the circles are considered to collide.
If the distance is greater than the sum of their radii, then they are not touching.

`circle 1 with center at (x1,y1) and radius r1`
`circle 2 with center at (x2,y2) and radius r2`

```javascript
function circleCollision(x1,y1,r1,x2,y2,r2) {
  var dx = x1 - x2; // distance x
  var dy = y1 - y2; // distance y
  return ((dx * dx + dy * dy) < (r1 + r2) * (r1 + r2)); // returns true if collision , false otherwise
}
```

**Rectangle vs Rectangle**

If both x and y projections overlap between two aligned rectangles then they are considered to collide.
If only one axis projection overlaps they are not considered to collide.

`rectangle 1 with (x1,y1,h1,w1)`
`rectangle 2 with (x2,y2,h2,w2)`

```javascript
function rectangleCollision(x1,y1,h1,w1,x2,y2,h2,w2) {
  if ((x1 > (x2 + w2)) || ((x1 + w1) < x2))
    return false;  // rectangles do not touch
  if ((y1 > (y2 + h2)) || ((y1 + h1) < y2))
    return false;  // rectangles do not touch
  return true;     // rectangles touch
}
```
**Circle vs Rectangle**

```javascript
function circleRectangleCollision(cx,cy,r,x0,y0,w0,h0) {
  var testX = cx;
  var testY = cy;
  if (testX < x0) testX = x0;
  if (testX > (x0+w0)) testX = (x0+w0);
  if (testY < y0) testY = y0;
  if (testY > (y0+h0)) testY = (y0+h0);
  return (((cx - testX)*(cx - testX)+(cy - testY)*(cy - testY)) < r*r);
}
```

**Example For Adding Sprite Animation To Game Framework**
```javascript
// Inits
window.onload = function init() {
 var game = new GF();
game.start();
};
 
// GAME FRAMEWORK STARTS HERE
var GF = function(){
   ...
   // Woman object and sprites
   // sprite index corresponding to posture
   var WOMAN_DIR_RIGHT = 6;
   var WOMAN_DIR_LEFT = 2;
   var woman = {
      x:100,
      y:200,
      width:48,
      speed:100, // pixels/s this time!
      direction: WOMAN_DIR_RIGHT
   };
 
   var womanSprites = [];
 
   var mainLoop = function(time){
     ...
     // Draw a woman moving left and right
    womanSprites[woman.direction].draw(ctx, woman.x, woman.y);
    updateWomanPosition(delta);
    ...
  };
  function updateWomanPosition(delta) {
    // check collision on left or right
    if(((woman.x+woman.width) > canvas.width) || (woman.x < 0)) {
      // inverse speed
      woman.speed = -woman.speed;
    }
    // change sprite direction
    if(woman.speed >= 0) {
      woman.direction = WOMAN_DIR_RIGHT;
    } else {
      woman.direction = WOMAN_DIR_LEFT;
    }
    woman.x += calcDistanceToMove(delta, woman.speed);
  }
 
  /*---------------------------------------*/
  /* SPRITE UTILITY FUNCTIONS              */
  /*---------------------------------------*/
  function SpriteImage(img, x, y, width, height) {
    ...
    this.draw = function(ctx, xPos, yPos, scale) {...};
  }
 
  function Sprite() {
    ...
    this.extractSprites = function(...) {...};
    this.drawStopped = function(ctx, x, y) {...};
    this.draw = function(ctx, x, y) {...};
    this.setNbImagesPerSecond = function(nb) {...};
  }
  /*---------------------------------------*/
  /* EN OF SPRITE UTILITY FUNCTIONS        */
  /*---------------------------------------*/
 var loadAssets = function(callback) {
    var SPRITESHEET_URL = "http://i.imgur.com/3VesWqx.png";
    var SPRITE_WIDTH = 48;
    var SPRITE_HEIGHT = 92;
    var NB_POSTURES=8;
    var NB_FRAMES_PER_POSTURE = 13;
    // load the spritesheet
    var spritesheet = new Image();
    spritesheet.src = SPRITESHEET_URL;
    // Called when the spritesheet has been loaded
    spritesheet.onload = function() {
      // Create woman sprites
      for(var i = 0; i < NB_POSTURES; i++) {
        var sprite = new Sprite();
        sprite.extractSprites(spritesheet, NB_POSTURES, (i+1),
                              NB_FRAMES_PER_POSTURE,
                              SPRITE_WIDTH, SPRITE_HEIGHT);
        sprite.setNbImagesPerSecond(20);
        womanSprites[i] = sprite;
      }
      // call the callback function passed as a parameter,
      // we're done with loading assets and building the sprites
      callback();
    };
  };
  var start = function(){
    ...
    // Load sounds and images, then when this is done, start the mainLoop
    loadAssets(function() {
       // We enter here only when all assets have been loaded
       requestAnimationFrame(mainLoop);
    });
  };
  ...
 };
```

**Example With Ball Removal When Collision Detected**

```javascript
function updateBalls(delta) {
   // for each ball in the array
   var allBallDead = true;
   for(var i=0; i < ballArray.length; i++) {
     var ball = ballArray[i];
     if(ball.dead) continue; // do nothing if the ball is dead
     // if we are here: the ball is not dead
     allBallDead = false;
     // 1) move the ball
     ball.move();
     // 2) test if the ball collides with a wall
     testCollisionWithWalls(ball);
 
     // Test if the monster collides
     if(circRectsOverlap(monster.x, monster.y,
                         monster.width, monster.height,
                         ball.x, ball.y, ball.radius)) {
        //change the color of the ball
        ball.color = 'red';
        ball.dead = true;
        // Here, a sound effect would greatly improve
        // the experience!
        currentScore+= 1;
     }
     // 3) draw the ball
     ball.draw();
  }
  if(allBallDead) {
     // reset all balls, create more balls each time
     // as a way of increasing the difficulty
     // in a real game: change the level, play nice music!
     nbBalls++;
     createBalls(nbBalls);
   }
}
```

# Sprite Based Animation

**Sprite Sheets**
One sheet can contain a character animation walking in a specific direction per line. Where different lines represent different walking orientations such as left,right,up,down,diagonals.
One sheet can contain a specific character animation such as walking and another sheet can contain an animation for jumping.


**Moving To Next Image On Hover**
```html
<!--html-->
<div id="image" onmouseover="animateScript()"></div>
```
```css
/*css*/
#image {
  height: 100px;
  width: 250px;
  background: url('lightcycle.png');
}
```
```javascript
// javascript
function animateScript() {
  document.querySelector('#image').style.backgroundPosition = `-250px 0px`;
}
```

**Animating Sprite With Set Interval**

```javascript
var tID;

function animateScript() {
  var position = 250;
  const interval = 100;
  const diff = 250;
  tID = setInterval(()=>{
    document.querySelector('#image').style.backgroundPosition = `-${position}px,0px`;
    if (position < 1250) {
      position = position + diff;
    }
    else {
      position = 250;
    }
  },interval);
}
```

**Light Cycle**

Version 1
```javascript
var SPRITESHEET_URL = "lightcycle.png";
var SPRITE_WIDTH = 250;
var SPRITE_HEIGHT = 100;
var NB_POSTURES = 1;
var NB_FRAMES_PER_POSTURE = 5;

var canvas;
var ctx;
var spritesheet;
var lightcycle = [];
var inputStates = {};
var currentDirection = 0;
var DIR_LEFT = 0;
var DIR_RIGHT = 0;
var speedX = 0;
var posX = 50;
var speed = 1;

window.onload = function() {
  canvas = document.getElementById('myCanvas');
  ctx = canvas.getContext('2d');
  spritesheet = new Image();
  spritesheet.src = SPRITESHEET_URL;
  spritesheet.onload = function() {
    for (var i=0; i < NB_POSTURES; i++) {
      var sprite = new Sprite();
      sprite.extractSprites(spritesheet,NB_POSTURES,(i + 1),NB_FRAMES_PER_POSTURE,SPRITE_WIDTH,SPRITE_HEIGHT);
      sprite.setNbImagesPerSecond(20);
      lightcycle[i] = sprite;
    }
    requestAnimationFrame(mainloop);
    window.addEventListener('keydown',function(event) {
      if (event.keyCode === 37) {
        inputStates.left = true;
      } else if (event.keyCode === 39) {
        inputStates.right = true;
      } else if (event.keyCode === 32) {
        inputStates.space = true;
      }
    },false);
    window.addEventListener('keyup',function(event) {
      if (event.keyCode === 37) {
        inputStates.left = false;
      } else if (event.keyCode === 39) {
        inputStates.right = false;
      } else if (event.keyCode === 32) {
        inputStates.space = false;
      }
    },false);
  };
};

function mainloop() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  speedX = 0;
  if (inputStates.left) {
    speedX = -1;
    currentDirection = DIR_LEFT;
  }
  if (inputStates.right) {
    speedX = 1;
    currentDirection = DIR_RIGHT;
  }
  if (inputStates.space & inputStates.left) {
    speedX = -10;
  }
  if (inputStates.space & inputStates.right) {
    speedX = 10;
  }
  if (speedX === 0)
    lightcycle[currentDirection].drawStopped(ctx,posX,100,1);
  else
    lightcycle[currentDirection].draw(ctx,posX,100,1);
  posX += speedX;
  requestAnimationFrame(mainloop);
}

function SpriteImage(img,x,y,width,height) {
  this.img = img;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.draw = function(ctx,xPos,yPos,scale) {
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height,xPos,yPos,this.width*scale,this.height*scale);
  };
}

function Sprite() {
  this.spriteArray = [];
  this.currentFrame = 0;
  this.delayBetweenFrames = 10;
  this.extractSprites = function(spritesheet,
                                 nbPostures, postureToExtract,
                                 nbFramesPerPosture,
                                 spriteWidth, spriteHeight) {
    // number of sprites per row in the spritesheet
    var nbSpritesPerRow = Math.floor(spritesheet.width / spriteWidth);
    // Extract each sprite
    var startIndex = (postureToExtract -1) * nbFramesPerPosture;
    var endIndex = startIndex + nbFramesPerPosture;
      for(var index = startIndex; index < endIndex; index++) {
    // Computation of the x and y position that corresponds to the sprite
      // index
      // x is the rest of index/nbSpritesPerRow * width of a sprite
        var x = (index % nbSpritesPerRow) * spriteWidth;
      // y is the divisor of index by nbSpritesPerRow * height of a sprite
        var y = Math.floor(index / nbSpritesPerRow) * spriteHeight;
      // build a spriteImage object
        var s = new SpriteImage(spritesheet, x, y, spriteWidth, spriteHeight);
        this.spriteArray.push(s);
    }
  };
  this.then = performance.now();
  this.totalTimeSinceLastRedraw = 0;
  this.drawStopped = function(ctx,x,y) {
    var currentSpriteImage = this.spriteArray[this.currentFrame];
    currentSpriteImage.draw(ctx,x,y,1);
  };
  this.draw = function(ctx, x, y) {
    // Use time based animation to draw only a few images per second
    var now = performance.now();
    var delta = now - this.then;
    // Draw currentSpriteImage
    var currentSpriteImage = this.spriteArray[this.currentFrame];
    // x, y, scale. 1 = size unchanged
    currentSpriteImage.draw(ctx, x, y, 1);
    // if the delay between images is elapsed, go to the next one
    if (this.totalTimeSinceLastRedraw > this.delayBetweenFrames) {
    // Go to the next sprite image
      this.currentFrame++;
      this.currentFrame %= this.spriteArray.length;
    // reset the total time since last image has been drawn
      this.totalTimeSinceLastRedraw = 0;
    } else {
      // sum the total time since last redraw
      this. totalTimeSinceLastRedraw += delta;
    }
    this.then = now;
  };
  this.setNbImagesPerSecond = function(nb) {
    // delay in ms between images
    this.delayBetweenFrames = 1000 / nb;
  };
}
```

# Game States

**Ready Screen** the main menu
**Game Running** the game play
**Game Over** after meeting winning or loosing conditions , can be 2 separate states

Example
```javascript
// game states
 var gameStates = {
   mainMenu: 0,
   gameRunning: 1,
   gameOver: 2
 };
 
 var currentGameState = gameStates.gameRunning;
 var currentLevel = 1;
 var TIME_BETWEEN_LEVELS = 5000; // 5 seconds
 var currentLevelTime = TIME_BETWEEN_LEVELS;
...
 var mainLoop = function (time) {
   ...
   // number of ms since last frame draw
   delta = timer(time);
 
   // Clear the canvas
   clearCanvas();
 
   // monster.dead is set to true in updateBalls when there
   // is a collision
   if (monster.dead) {
      currentGameState = gameStates.gameOver;
   }
 
   switch (currentGameState) {
      case gameStates.gameRunning:
        // draw the monster
        drawMyMonster(monster.x, monster.y);
 
        // Check inputs and move the monster
        updateMonsterPosition(delta);
 
        // update and draw balls
        updateBalls(delta);
 
        // display Score
        displayScore();
 
        // decrease currentLevelTime. Survive 5s per level
        // When < 0 go to next level
       currentLevelTime -= delta;
 
       if (currentLevelTime < 0) {
          goToNextLevel();
       }
       break;
    case gameStates.mainMenu:
       // TO DO! We could have a main menu with high scores etc.
       break;
    case gameStates.gameOver:
       ctx.fillText("GAME OVER", 50, 100);
       ctx.fillText("Press SPACE to start again", 50, 150);
       ctx.fillText("Move with arrow keys", 50, 200);
       ctx.fillText("Survive 5 seconds for next level", 50, 250);
 
       if (inputStates.space) {
          startNewGame();
       }
       break;
    }
     ...
   };
... 
```
Example functions for above
```javascript
function startNewGame() {
    monster.dead = false;
    currentLevelTime = 5000;
    currentLevel = 1;
    nbBalls = 5;
    createBalls(nbBalls);
    currentGameState = gameStates.gameRunning;
 }
 
 function goToNextLevel() {
    // reset time available for next level
    // 5 seconds in this example
   currentLevelTime = 5000;
   currentLevel++;
   // Add two balls per level
   nbBalls += 2;
   createBalls(nbBalls);
 }
 
 function updateBalls(delta) {
    // Move and draw each ball, test collisions,
    for (var i = 0; i < ballArray.length; i++) {
       ...
       // Test if the monster collides
       if (circRectsOverlap(monster.x, monster.y,
                            monster.width, monster.height,
                            ball.x, ball.y, ball.radius)) {
 
           //change the color of the ball
           ball.color = 'red';
           monster.dead = true;
           // Here, a sound effect greatly improves
           // the experience!
           plopSound.play();
       }
 
       // 3) draw the ball
       ball.draw();
    }
 }
```

# Modular Game Structure

Separate code into different files. The goal is to isolate functions and reduce dependencies on the game framework.

**Core**
`game.js`
Contains functions `init` and `mainloop` , game states , score , levels

**Sprites**
`sprites.js`

**Listeners**
`listeners.js`

**Collisions**
`collisions.js`

**Utilities**
`utils.js`

And other files as needed.

**Functions**
The functions will require parameters to pass in the variable dependencies. Since the function no longer has access to that variable because it is in a separate file.

```javascript
function someListener(inputStates,canvas) { // canvas needs to be added since it is in a different file
  // some add event listener code
}
```

