// track performance , this is a snippet from mr dobbs github page called stats
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()

// set up scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);

// render canvas
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMap.enabled = true; // enable shadows
renderer.shadowMap.type = THREE.BasicShadowmap; // specify type of shadows
document.body.appendChild(renderer.domElement);

// update canvas size on window resize
window.addEventListener('resize',function() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width,height);
  camera.aspect = width/height;
  camera.updateProjectionMatrix();
});

// scene movement controls
controls = new THREE.OrbitControls(camera,renderer.domElement);

// camera
camera.position.set(0,0,3);

// lights
var ambientLight = new THREE.AmbientLight(0xFFFFFF,0.25); // colour,intensity
var pointLight = new THREE.PointLight(0x00FF00,1,25); // colour,intensity,drop off
var directionalLight = new THREE.DirectionalLight(0x00FF00,0.8); // colour,intensity
directionalLight.position.set(0,1,0);
var spotLight = new THREE.SpotLight(0xFFFFFF,0.9); // colour,intensity
spotLight.position.set(0,4,0);
spotLight.angle = Math.PI/4;
spotLight.castShadow = true;
spotLight.shadow.camera.near = 0.1;
spotLight.shadow.camera.far = 10;


var spotLightHelper = new THREE.SpotLightHelper(spotLight);

// cube
var cubeGeometry = new THREE.BoxGeometry(1,1,1);
//var material = new THREE.MeshBasicMaterial({color:0xEEEEEE,wireframe:true});  // same colour to whole cube

// object textures , this array contains images
var cubeMaterials = [
  new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load('image/img1.png'),side:THREE.DoubleSide}), // right
  new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load('image/img2.png'),side:THREE.DoubleSide}), // left
  new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load('image/img3.png'),side:THREE.DoubleSide}), // top
  new THREE.MeshLambertMaterial({color:0xEEEEEE,side:THREE.DoubleSide}), // bottom
  new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load('image/img5.png'),side:THREE.DoubleSide}), // front
  new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load('image/img6.png'),side:THREE.DoubleSide})  // back
];
//var material = new THREE.MeshFaceMaterial(cubeMaterials); // adds the png array to the material
var cube = new THREE.Mesh(cubeGeometry,cubeMaterials);
//cube.receiveShadow = true;
cube.castShadow = true;

// floor
var floorGeometry = new THREE.CubeGeometry(5,0.25,5); // length,height,width
var floorMaterial = new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load('image/img3.png'),side:THREE.DoubleSide});
var floorCube = new THREE.Mesh(floorGeometry,floorMaterial);
floorCube.position.set(0,-1.5,0);
floorCube.receiveShadow = true;

// add objects to scene
scene.add(cube);
scene.add(floorCube);
scene.add(ambientLight);
//scene.add(pointLight);
//scene.add(directionalLight);
scene.add(spotLight);
scene.add(spotLightHelper);

// game logic and animation
var update = function() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.005;
};

// draw scene
var render = function() {
  renderer.render(scene,camera);
};

// run game loop
var GameLoop = function() {
  requestAnimationFrame(GameLoop);
  update();
  render();
};

GameLoop();