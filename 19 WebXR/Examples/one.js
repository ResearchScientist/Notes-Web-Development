const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();

function init() {
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
  
  document.body.appendChild(ARButton.createButton(renderer,{requiredFeatures: ["hit-test"]})); // this may be typescript
  
  const controller = renderer.xr.getController(0);
  controller.addEventListener("select",onSelect);
  scene.add(controller);
  
  const light = new THREE.HemisphereLight(0xffffff,0xbbbbff,1);
  light.position.set(0.5,1,0.25);
  scene.add(light);
  
  window.addEventListener("resize",onWindowResize,false);
  someMesh.position.z = -2; // user is at position 0,0,0
  
  // for visualizing the hit area
  reticle = new Mesh(new RingBufferGeometry(0.15,0.2,32).rotateX(-Math.PI / 2), new MeshBasicMaterial)
  reticle.matrixAutoUpdate = false;
  reticle.visible = false;
  scene.add(reticle);
}

function onSelect() {
  if (reticle.visible) {
    const mesh = new Mesh(geometry,phongMaterial);
    someMesh.position.setFromMatrixPosition(reticle.matrix);
    mesh.positon.setFromMatrixPosition(reticle.matrix);
    mesh.scale.y = Math.random() * 2 + 1;
    scene.add(someMesh);
    scene.add(mesh);
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight); // full screen
  renderer();
}

function animate() {
  // requestAnimationFrame(animate);  // for non vr , uses 60fps
  renderer.setAnimationLoop(animate); // for vr , uses over 90fps
  someMesh.rotation.y += 0.1;
  renderer();
}

function renderer() {
  renderer.render(scene,camera);
}

