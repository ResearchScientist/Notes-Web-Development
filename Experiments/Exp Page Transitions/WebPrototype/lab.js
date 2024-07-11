// set up scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000); // field of view degrees,aspect ratio,near,far
var light = new THREE.PointLight(0xFFFFFF,1,1000); // colour,intensity,distance
var light2 = new THREE.PointLight(0xFFFFFF,1.5,1000); // colour,intensity,distance
var renderer = new THREE.WebGLRenderer({antialias:true});

// set up camera
camera.position.z = 10;

// set up light
light.position.set(0,0,0); // x,y,z
light2.position.set(0,0,25);

// set up canvas parameters
renderer.setClearColor("#502020"); // canvas background colour
renderer.setSize(window.innerWidth/1.05,window.innerHeight /1.2);
var canvasContainer = document.querySelector('#canvasContainer');
canvasContainer.appendChild(renderer.domElement); // attaches canvas to passed location

// set up canvas to respond to resizing of window
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth/1.05,window.innerHeight / 1.2); // sets canvas size on window resize /2
  camera.aspect = window.innerWidth/window.innerHeight; // sets camera aspect on window resize
  camera.updateProjectionMatrix();
})

// rendering of scene
var render = function() {
  requestAnimationFrame(render);  // avoids distortion of objects during resizing of canvas
  renderer.render(scene,camera);
}

// raycaster to interact with canvas objects , needed for mouse events
//var raycaster = new THREE.Raycaster();
//var mouse = new THREE.Vector2();

// object cube
var geometry = new THREE.BoxGeometry(4,4,1);
var material = new THREE.MeshLambertMaterial({color:0x101010});
var mesh1 = new THREE.Mesh(geometry,material);
var mesh2 = new THREE.Mesh(geometry,material);
var mesh3 = new THREE.Mesh(geometry,material);
var mesh4 = new THREE.Mesh(geometry,material);
var mesh5 = new THREE.Mesh(geometry,material);
var mesh6 = new THREE.Mesh(geometry,material);

// object transform
mesh1.position.set(-2.5,5,0);
mesh2.position.set(2.5,5,0);
mesh3.position.set(-2.5,0,0);
mesh4.position.set(2.5,0,0);
mesh5.position.set(-2.5,-5,0);
mesh6.position.set(2.5,-5,0);

/*meshX = -10;
for(var i=0; i<15; i++) {
  var mesh = new THREE.Mesh(geometry,material);
  mesh.position.x = (Math.random() - 0.5) * 10;
  mesh.position.y = (Math.random() - 0.5) * 10;
  mesh.position.z = (Math.random() - 0.5) * 10;
  scene.add(mesh);
  meshX += 1;
}*/

// add objects to scene
scene.add(light);
scene.add(light2);
scene.add(mesh1);
scene.add(mesh2);
scene.add(mesh3);
scene.add(mesh4);
scene.add(mesh5);
scene.add(mesh6);

// mouse event function
/*function onMouseMove(event) {
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
}*/

// last step
render();

// detects click event
//window.addEventListener('click',onMouseMove); // mousemove detects mouse hover , click detects mouse click