const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor('rgb(50,50,200)',1); // background (colour , transparency)
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

const animate = function () {
	requestAnimationFrame( animate );
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();

const box = new THREE.BoxGeometry(1,1,1);
for (let i = 0; i < 5; i++) {
  const mesh = new THREE.Mesh(box, new THREE.MeshBasicMaterial({
    color: 'rgb(200,50,50)'
  }));
  mesh.scale.multiplyScalar(.5);
  mesh.position.set(Math.random()*(-2),Math.random()*(-2),Math.random()*(-2));
  scene.add(mesh);
}