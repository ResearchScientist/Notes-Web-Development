# Core Concepts

interactive editor at mrdoob github threejs editor

**Animation**
Appears smooth at at least 60 FPS
Film requires only 24 FPS

**Z Depth**
0 close to camera 1 far from camera

**Triangulation**
All objects are drawn with triangles

**Baking**
Stores information such as colour on the object in order to avoid calculations

# Cartesian Coordinate System

**point**
(x,y,z) gives position
**vector**
(x,y,z) gives direction
**x** parallel to bottom of screen
**y** parallel to side of screen
**z** into and out of screen

# Vectors

**Normalize A Vector**

length = sqrt(x^2 + y^2 + z^2)
(x/length,y/length,z/length)

```
length = sqrt(3^2 + -4^2 + 0^2)
length = sqrt(25)
length = 5

normalized = (3/5,-4/5,0/5)
normalized = (0.6,-0.8,0)
```
**Angle Between Vectors**

Use Dot Product between them to obtain the cos
vector A * vector B = AxBx + AyBy + AzBz

Use acos to obtain the angle in degrees
acos(cos)

```
A = (0.0,-0.60,0.80)
B = (0.80,-0.36,0.48)

A*B = (0.0*0.80) + (-0.60*-0.36) + (0.80*0.48)
A*B = (0.0) + (0.216) + (0.384)
A*B = 0.6

cos theta = 0.6

acos(0.6) = 53.13 deg
```

**Axis of Rotation**

Use Cross Product of two vectors.

length(A x B) = sin θ * length(A) * length(B)

A x B = (AyBz-AzBy,AzBx-AxBz,AxBy-AyBx)

```javascript
var axisOfRotation = new THREE.Vector3();
axisOfRotation.crossVectors(someObjectAxis,new THREE.Vector(0,1,0));
if (axisOfRotation.length() == 0) {
  axisOfRotation.set(1,0,0); // choose based on direction of rotation
}
axisOfRotation.normalize();
```

# Matrices

Transformations are carried out via a `[4x4]` Transform Matrix.
new coordinate = matrix * coordinate
D = N * C
Dot Product of vector C with matrix N give new vector D.

In this case points and vectors have a fourth parameter to distinguish them.
1 represents a point , 0 represents a vector
- point (x,y,z,1)
- vector (x,y,z,0) 

When transforming points and vectors the fourth parameter should result in 0 or 1.
If not 0 or 1 then calculation was done incorrectly.

**Identity Matrix**
|||||
|--|--|--|--|
|1|0|0|0|
|0|1|0|0|
|0|0|1|0|
|0|0|0|1|

Multiplying any vector by the identity matrix results in the same vector.

`var mtx = new THREE.Matrix4();` makes an identity matrix
`mtx.identity();` resets matrix to the identity matrix , useful after transforms have been applied

**Translation Matrix**
|||||
|--|--|--|--|
|1|0|0|Tx|
|0|1|0|Ty|
|0|0|1|Tz|
|0|0|0|1|

Place x,y,z coordinates from a vector into Tx,Ty,Tz.
For multiple vectors add their respective x,y,z coordinates and place them into the corresponding Tx,Ty,Tz.
```javascript
var mtx = new THREE.Matrix4 (
  1,0,0,10, // Tx
  0,1,0,15, // Ty
  0,0,1,-5, // Tz
  0,0,0,1);
```

Matrix translation using built in operation.
```javascript
mtx.makeTranslation(x,y,z);
someObject.matrix = mtx; 
someObject.matrixAutoUpdate = false; // overrides default order of Pos,Rot,Sca and uses this matrix instead
```

**Rotation Matrix**
|||||
|--|--|--|--|
|cos θ|-sin θ|0|0|
|sin θ|cos θ|0|0|
|0|0|1|0|
|0|0|0|1|

**Scale Matrix**
|||||
|--|--|--|--|
|Sx|0|0|0|
|0|Sy|0|0|
|0|0|Sz|0|
|0|0|0|1|

Uniformly scaling a matrix maintains the normal direction but the normal needs to be renormalized.
Non uniformly scaling a matrix changes the direction of the normal. To realign the normal use transpose and inverse.

**Transpose Matrix**

Returns a reoriented matrix with the main diagonal unchanged.

Matrix M
|||||
|--|--|--|--|
|A|E|I|M|
|B|F|J|N|
|C|G|K|O|
|D|H|L|1|

Becomes M^T

|||||
|--|--|--|--|
|A|B|C|D|
|E|F|G|H|
|I|J|K|L|
|M|N|O|1|

**Inverse Matrix**

Undoes a matrix operation.

M * M^-1 = I

Translation Matrix M
|||||
|--|--|--|--|
|1|0|0|Tx|
|0|1|0|Ty|
|0|0|1|Tz|
|0|0|0|1|

Becomes

I
|||||
|--|--|--|--|
|1|0|0|-Tx|
|0|1|0|-Ty|
|0|0|1|-Tz|
|0|0|0|1|

Rotation Matrix M
|||||
|--|--|--|--|
|cos θ|-sin θ|0|0|
|sin θ|cos θ|0|0|
|0|0|1|0|
|0|0|0|1|

Becomes

I
|||||
|--|--|--|--|
|cos θ|sin θ|0|0|
|-sin θ|cos θ|0|0|
|0|0|1|0|
|0|0|0|1|

Scale Matrix M
|||||
|--|--|--|--|
|Sx|0|0|0|
|0|Sy|0|0|
|0|0|Sz|0|
|0|0|0|1|

Becomes

I
|||||
|--|--|--|--|
|1/Sx|0|0|0|
|0|1/Sy|0|0|
|0|0|1/Sz|0|
|0|0|0|1|

`matrix4.getInverse();`

**Mirror Matrix**
|||||
|--|--|--|--|
|Mx|0|0|0|
|0|My|0|0|
|0|0|Mz|0|
|0|0|0|1|

Where one of Mx,My,Mz is -1 and the others are 1.

`.scale.z = -1` constructs a mirror matrix , choose any axis

These are difficult to use since they alter directions and normals.

Searches for any mirror matrices in the code.
```javascript
if (mtx.determinant()<0) {
  console.log("mirror found");
}
```

**Matrix Zones**
|||||
|--|--|--|--|
|N11|N21|N31|N41|
|N12|N22|N32|N42|
|N13|N23|N33|N43|
|0|0|0|1|

Linear Transforms occur in N11:N33
Translations occur in N41,N42,N43
Projective transforms occur in 0,0,0,1

**Matrix Decomposition**

`mtx.decompose(T,R,S)`
Returns T and S as vectors
Returns R as a quaternion

# Shaders

**Vertex Shader** 

**Fragment Shader** 

# Colours

`THREE.MeshLamberMaterial()` declares the material
`.color.setRGB()` sets the colour , values are between 0 and 1

```javascript
var someMaterial = new THREE.MeshLambertMaterial();
someMaterial.color.setRGB(0.5,0.5,0.5);
```

# Lighting

**Emissive** Emits colour , so not affected by other colours
**Ambient** Used to light areas not receiving light directly as they should
**Diffuse** Flat mat finish 
**Specular** Shininess

**Object Surface Colour**
emissive + ambient + (diffuse + specular)

Shading - calculated from surface normals , lighting , eye position
Interpolation - calculated from two normals and filling in smaller normals in between them

Look into tile based transparency for when you need to render transparent objects inside other transparent objects.

**Directional Light**
Light source is infinitely far away but traces a line through position given towards the origin.
`THREE.DirectionalLight();` colour,intensity
`.position.set();` x,y,z (this is the position that the light ray will pass through)

**Point Light**
Emits light in all directions. Max distance is the distance at which the light intensity is zero.
colour,intesity,max distance

**Ambient Lighting**
Since light in the model does not bounce similar to real light, ambient light is added to mimic the result of bouncing light.

`THREE.AmbientLight()` colour,intensity

**Spot Light**
Focused light that displays a cone and casts shadows.

**Hemisphere Light**
Light coming from all directions.
Normals facing upwards receive one colour.
Normals facing downwards receive a different colour.
Any normals in between these angles receive a blend of the two colours.

**Fog**
Not really a light but works nicely with lights.

Uses such as fog of war , making ray light shadows as in through clouds , or simply obfuscating the limits of the scene.

`fog` linear fall off
`FoxExp2` exponential fall off , more realistic

**Lighting Materials**
`.MeshBasicMaterial` does not require a light source to be seen , all other materials do
`.MeshLambertMaterial` gives a matte finish
`.MeshPhongMaterial` gives shiny finish
`.MeshBlinnMaterial` gives very shiny finish


# Textures

Materials applied to an object that affect its lighting such as reflection and absorption.
2D images are applied to an objects surface as a material.

`var someTexture = new THREE.ImageUtils.loadTexture();` png gif image
`var someMaterial = new THREE.MeshBasicMaterial({map: someTexture});`applies image to object surface

**Texels**
Positions on a surface are texels instead of pixels.
For a square the corners are 0,0 (bottom,left) 0,1 (top,left) 1,1 (top,right) 1,0 (bottom,right)
Any position within the square has a value between 0 and 1 for x and y.

**Wrapping**
`RepeatWrapping` , `MirroredRepeatWrapping` , `ClampToEdgeWrapping`
`someTexture.wrapS = someTexture.wrapT = THREE.ClampToEdgeWrapping;`

**Transform**

*Repeat*
Repeating a texture pattern.
```javascript
var someTexture = new THREE.Texture();
someTexture.repeat.set();
someTexture.offset.set();
```
*Scale*
Scaling a texture pattern can lead to pixelation artifacts.
MipMap is a method for scaling such that texels and pixels have a near 1:1 ratio.
To make use of mipmapping make sure the texture has dimensions divisible by 2. Such as 64x64.
```javascript
someTexture.minFilter = THREE.NearestFilter;
someTexture.minFilter = THREE.LinearFilter;
someTexture.minFilter = THREE.LinearMipMapLinearFilter;
```

**Transparency**

`.transparent = true` true , false
`.opacity = 0.5` 0 to 1

```javascript
var geometry = new THREE.SphereGeometry(2,12,10); // radius,verteces
var material1 = new THREE.MeshLambertMaterial({color:0xBB0000});
material1.transparent = true;
material1.opacity = 0.6;
```

**Particles**

For making clouds , lens flares.
Particles can render whole scenes without triangulation.

To help illusion of 3d space make the same side always face the viewer.

```javascript
var someTexture = THREE.ImageUtils.loadTexture("some.png");
var someMaterial = new THREE.ParticleBasicMaterial ({
  size:35, // pixels
  sizeAttenuation:false,
  map:disk,
  transparent,true
});
someMaterial.color.setHSL(0.9,0.2,0.5);

var particles = new THREE.ParticleSystem(geometry,material);
particles.sortParticles = true;
scene.add(particles);

var someGeometry = new THREE.Geometry();
for (var i=0;i<8000;i++) {
  var vertex = new THREE.Vector3();
  do {
    vertex.x = 2000 * Math.random() - 1000;
    vertex.y = 2000 * Math.random() - 1000;
    vertex.z = 2000 * Math.random() - 1000;
  } while (vertex.length() > 1000);
}
```

**Displacement Mapping**
Adds height value to each vertex in order to add bumps to object surface.

**Normal Mapping**
Allows for light to interact with the displacement mapping.

**Light Mapping**
Allows for shadows from other objects to be displayed on themselves.
Best for static objects.

**SkyBox Mapping**

The viewer is placed in the middle of a cube. Each wall of the cube has a scene attached such that when all are viewed there are no seams visible between them and the illusion is that of a continuous panorama.
Cube map where
- +y front
- -y back
- +x right
- +z top
- -x left
- -z bottom

**Reflection Mapping**
Material applied to objects so that it reflects the environment map on the material's surface.
Material map is similar to the skybox but it is used for the reflections only.

**Refraction Mapping**
Light passing through an object changes direction.
If index of refraction of 2nd material is greater than 1st material the angle get smaller.
If index of refraction of 2nd material is smaller than 1st material the angle get larger.

**Glossy Reflection Mapping**
Gives a matted semi reflective surface such as a metal object.
Achieved by blurring the environmental map.

**Diffuse Reflection Mapping**
Gives a further matted reflection for farther objects and makes brighter points such as a sun more realistically prominent.

**Anisotropic Material**
Light reflects in different ways depending on the orientation of the object.
Such as velvet and brushed aluminum.

**Isotropic Material**
Light reflects uniformly regardless of the orientation of the object.
Such as gold and glass.



# Shaders



# Cameras

Camera looks towards - z axis.

`THREE.OrbitControls(someCamera);`

**Projections**

- Orthographic (2d) , lines maintain shape
- Perspective (3d) , lines diverge from an origin point

**Camera Objects**
`THREE.OrthographicCamera();` left , right , top , bottom , near , far
`THREE.PerspectiveCamera();` field of view (deg) , aspect ratio , near , far
try to set near as far away from the camera eye as possible to avoid z fighting
decreasing FOV makes object larger
decreasing FOV and zooming in or increasing FOV and zooming out creates a surreal cinematic effect

Making changes to these parameters after they have been constructed requires an update call
`camera.updateProjectionMatrix()` this is rarely needed since the cameras parameters are usually set and unchanged

**Target**
Point camera view is set to as the camera moves and rotates around world.
`cameraControls.target.set();` x,y,z

**Movements**
- Dolly - towards to or away from object
- Pan - left or right while camera looks forward
- Orbit - circle strafing around an object while looking at the object

**Effects**
Depth of Field - gives a blur effect to distant objects and sharp focus to near objects

# Geometries

`.BoxGeometry()`
`.SphereGeometry()` radius , triangle width , triangle height

# Transforms

Rendered in the order scale,rotation,position

`.scale.z` scales object along given axis (x,y,z) , passed numbers less than 1 shrink object
`.rotation.z` rotates object around given axis (x,y,z) in radians
`.position.z` changes position (x,y,z) of object as determined by its center

Use Object3D to change the order of applied transformations.
```javascript
// make an object (someName) and apply the transform you want to happen first
var someName = new THREE.Mesh ( new THREE.CubeGeometry(100,5,5),someMaterial);
block.position.x = 40;
// make new object with Object3D
var otherName = new THREE.Object3D();
otherName.add(someName);
// apply second transform to second object
otherName.rotation.y = -50 * Math.PI/180;
// finish scene
scene.add(otherName);
```

# Animation

**User Interaction**
Add an event listener for mouse,keyboard,touchscreen and set a function based on the event.
```javascript
document.addEventListener('mousedown',onDocumentMouseDown,false);
function onDocumentMouseDown(event) {
  event.preventDefault();
  // code block
};
```

Pick An Object
```javascript
document.addEventListener('mousedown',onDocumentMouseDown,false);
function onDocumentMouseDown(event) {
  event.preventDefault();
  var mouseVector = new THREE.Vector3(
    2*(event.clientX/canvasWidth) - 1,
    1-2*(event.clientY/canvasHeight)
  );
  var projector = new THREE.Projector();
  var raycaster = projector.pickingRay(mouseVector.clone(),camera);
};
var intersects = raycaster.intersectObjects(objects);
if(intersects.length > 0) {
  intersects[0].object.material.color.setRGB(
  Math.random(), Math.random(), Math.random()
  );
  var sphere = new THREE.Mesh(sphereGeom,sphereMaterial);
  sphere.position = intersects[0].point;
  scene.add(sphere);
}
```

**Rendering**
```javascript
renderer.render(scene,camera);
function animate() {
  window.requestAnimationFrame(animate);
  render();
}
function render() {
  var delta = clock.getDelta(); // returns ms since getDelta was called
  cameraControls.update(delta);
  renderer.render(scene,camera)
}
```

**Keyframe**
Tween between one frame and the next.
To avoid abrupt changes between positions use a spline curve or an ease.

**Skinning**
Giving weights to a joint in a bone skeleton model to add realism to its movement.

**Skeletal Animation**

**Morph Targets**

**Motion Capture**

**Simulation**


# Set Up A Scene


# Loading In A Model

look at tutorial 7 from three js sonar systems

# Examples

**Basic Set Up**

```javascript
// set up scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000); // field of view degrees,aspect ratio,near,far
var light = new THREE.PointLight(0xFFFFFF,1,500); // colour,intensity,distance
var renderer = new THREE.WebGLRenderer({antialias:true});

// set up camera
camera.position.z = 5;

// set up light
light.position.set(10,0,25); // x,y,z

// set up canvas parameters
renderer.setClearColor("#502020"); // canvas background colour
renderer.setSize(window.innerWidth/1.2,window.innerHeight/1.2);
var canvasContainer = document.querySelector('#canvasContainer');
canvasContainer.appendChild(renderer.domElement); // attaches canvas to passed location

// set up canvas to respond to resizing of window
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth/1.2,window.innerHeight/1.2); // sets canvas size on window resize /2
  camera.aspect = window.innerWidth/window.innerHeight; // sets camera aspect on window resize
  camera.updateProjectionMatrix();
})

// rendering of scene and objects
var render = function() {
  requestAnimationFrame(render);  // avoids distortion of objects during resizing of canvas
  //animation(); // calls animations
  renderer.render(scene,camera);
}

// 1st object sphere
var geometry = new THREE.SphereGeometry(1,8,8); // radius,verteces
var material = new THREE.MeshLambertMaterial({color:0xBB0000});
var mesh1 = new THREE.Mesh(geometry,material);

// 2nd object cube
var geometry = new THREE.BoxGeometry(1,1,1);
var material = new THREE.MeshLambertMaterial({color:0xFFCC00});
var mesh = new THREE.Mesh(geometry,material);

// 1st object transformations 
//mesh.rotation.set(45,0,0); // x,y,z in degrees
mesh1.position.set(-2,0,0); // x,y,z moves along axis

// animation sequence to occur upon load if called
var animation = function() {
  mesh.rotation.x += 0.02;
  mesh.rotation.y += 0.01;
}

// add objects to scene
scene.add(light);
scene.add(mesh);
scene.add(mesh1);

// last step
render();

// gs animation
//this.tl = new TimelineMax().delay(.3); // delays start of animation by 3ms after page load
this.tl = new TimelineMax({paused:true}); // pauses animation so it does not begin at load
this.tl.to(this.mesh.scale,1,{x:2,ease:Expo.easeOut});
this.tl.to(this.mesh.scale,.5,{x:.5,ease:Expo.easeOut});
this.tl.to(this.mesh.position,.5,{x:2,ease:Expo.easeOut});
this.tl.to(this.mesh.rotation,.5,{y:Math.PI*.5,ease:Expo.easeOut},"=-1.5");

document.body.addEventListener('click',() => {
  this.tl.play(); // plays animation when anywhere on page is clicked
})
```

**Click On Object To Animate It**
```javascript
// set up scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000); // field of view degrees,aspect ratio,near,far
var light = new THREE.PointLight(0xFFFFFF,1,500); // colour,intensity,distance
var renderer = new THREE.WebGLRenderer({antialias:true});

// set up camera
camera.position.z = 5;

// set up light
light.position.set(10,0,25); // x,y,z

// set up canvas parameters
renderer.setClearColor("#502020"); // canvas background colour
renderer.setSize(window.innerWidth/1.2,window.innerHeight/1.2);
var canvasContainer = document.querySelector('#canvasContainer');
canvasContainer.appendChild(renderer.domElement); // attaches canvas to passed location

// set up canvas to respond to resizing of window
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth/1.2,window.innerHeight/1.2); // sets canvas size on window resize /2
  camera.aspect = window.innerWidth/window.innerHeight; // sets camera aspect on window resize
  camera.updateProjectionMatrix();
})

// rendering of scene and objects
var render = function() {
  requestAnimationFrame(render);  // avoids distortion of objects during resizing of canvas
  renderer.render(scene,camera);
}

// raycaster to interact with canvas objects , needed for mouse events
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

// object cube
var geometry = new THREE.BoxGeometry(1,1,1);
var material = new THREE.MeshLambertMaterial({color:0xFFCC00});
var mesh = new THREE.Mesh(geometry,material);

// object cube 2
var geometry = new THREE.BoxGeometry(1,1,1);
var material = new THREE.MeshLambertMaterial({color:0xFFCC00});
var mesh2 = new THREE.Mesh(geometry,material);
mesh2.position.y = 2;

// add objects to scene
scene.add(light);
scene.add(mesh);
scene.add(mesh2);

// mouse event function
function onMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX/window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY/window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse,camera);
  var intersects = raycaster.intersectObjects(scene.children,true);
  for (var i=0; i<intersects.length; i++) {
    // gs animation
    this.tl = new TimelineMax();
    this.tl.to(intersects[i].object.scale,1,{x:2,ease:Expo.easeOut});
    this.tl.to(intersects[i].object.scale,.5,{x:.5,ease:Expo.easeOut});
    this.tl.to(intersects[i].object.position,.5,{x:2,ease:Expo.easeOut});
    this.tl.to(intersects[i].object.rotation,.5,{y:Math.PI*.5,ease:Expo.easeOut},"=-1.5");
  }
}

// last step
render();

// detects click event
window.addEventListener('click',onMouseMove); // mousemove detects mouse hover , click detects mouse click
```

**Array Of Objects That Animate On Click**
```javascript
// set up scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000); // field of view degrees,aspect ratio,near,far
var light = new THREE.PointLight(0xFFFFFF,1,1000); // colour,intensity,distance
var light2 = new THREE.PointLight(0xFFFFFF,1.5,1000); // colour,intensity,distance
var renderer = new THREE.WebGLRenderer({antialias:true});

// set up camera
camera.position.z = 5;

// set up light
light.position.set(0,0,0); // x,y,z
light2.position.set(0,0,25);

// set up canvas parameters
renderer.setClearColor("#502020"); // canvas background colour
renderer.setSize(window.innerWidth/1.2,window.innerHeight/1.2);
var canvasContainer = document.querySelector('#canvasContainer');
canvasContainer.appendChild(renderer.domElement); // attaches canvas to passed location

// set up canvas to respond to resizing of window
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth/1.2,window.innerHeight/1.2); // sets canvas size on window resize /2
  camera.aspect = window.innerWidth/window.innerHeight; // sets camera aspect on window resize
  camera.updateProjectionMatrix();
})

// rendering of scene and objects
var render = function() {
  requestAnimationFrame(render);  // avoids distortion of objects during resizing of canvas
  renderer.render(scene,camera);
}

// raycaster to interact with canvas objects , needed for mouse events
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

// object cube
var geometry = new THREE.BoxGeometry(1,1,1);
var material = new THREE.MeshLambertMaterial({color:0xFFCC00});

meshX = -10;
for(var i=0; i<15; i++) {
  var mesh = new THREE.Mesh(geometry,material);
  mesh.position.x = (Math.random() - 0.5) * 10;
  mesh.position.y = (Math.random() - 0.5) * 10;
  mesh.position.z = (Math.random() - 0.5) * 10;
  scene.add(mesh);
  meshX += 1;
}
// add objects to scene
scene.add(light);
scene.add(light2);

// mouse event function
function onMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX/window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY/window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse,camera);
  var intersects = raycaster.intersectObjects(scene.children,true);
  for (var i=0; i<intersects.length; i++) {
    // gs animation
    this.tl = new TimelineMax();
    this.tl.to(intersects[i].object.scale,1,{x:2,ease:Expo.easeOut});
    this.tl.to(intersects[i].object.scale,.5,{x:.5,ease:Expo.easeOut});
    this.tl.to(intersects[i].object.position,.5,{x:2,ease:Expo.easeOut});
    this.tl.to(intersects[i].object.rotation,.5,{y:Math.PI*.5,ease:Expo.easeOut},"=-1.5");
  }
}

// last step
render();

// detects click event
window.addEventListener('click',onMouseMove); // mousemove detects mouse hover , click detects mouse click
```

**Rotating Sphere With Lines**
```javascript
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(25,window.innerWidth/window.innerHeight,0.1,1000);
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.SphereGeometry(1);
var edges = new THREE.EdgesGeometry(geometry);
var line = new THREE.LineSegments(edges,new THREE.LineBasicMaterial({color:0xffffff}));
var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
var sphere = new THREE.Mesh(geometry,material);
scene.add(sphere);
scene.add(line);


material.color.setRGB(.95,.5,.5); // overides color set above

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
  line.rotation.x += 0.01;
  line.rotation.y += 0.01;
  renderer.render(scene,camera);
}

animate();
```

