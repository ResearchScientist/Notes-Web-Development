# Image As Texture

**Scene**

```js
const scene = new THREE.scene();
```

**Camera**

```js
camera.position.set(2,2,-5);
camera.lookAt(new THREE.vector3());
```

**Lighting**

```js
const light = new THREE.PointLight("white",2);
light.position(2,2,2);
```

**Geometry**

```js
const geometry = new THREE.SphereGeometry(1,30,15);
```

**Texture**

Use images that are equirectangular , hdr , pbr , environment map textures.

```js
const loader = new THREE.TextureLoader();
const textureJup = loader.load('jupiter.jpg');
const textureMoon = loader.load('moon.jpg');
```

**Material**

```js
const materialJup = new THREE.MeshStandardMaterial({
  roughness: 1,
  metalnes: 0,
  map: textureJup
});

const materialMoon = new THREE.MeshStandardMaterial({
  roughness: 1,
  metalnes: 0,
  map: textureMoon
});
```

**Mesh**

```js
const meshJup = new THREE.Mesh(geometry,materialJup);
const meshMoon = new THREE.Mesh(geometry,materialMoon);
```

**Group**

```js
const planetGroup = new THREE.Group();
planetGroup.add(meshMoon);
```

**Position**

```js
meshMoon.position.set(1.5,1,0);
meshMoon.scale.setScalar(0.25);
```

**Add Objects To Scene**

```js
scene.add(meshJup);
scene.add(planetGroup);
scene.add(light);
```

**Helpers**

```js
scene.add(new THREE.PointLightHelper(light,0.5));
scene.add(new THREE.GridHelper(5,20));
scene.add(new THREE.AxesHelper(5));
```

**Render Animation**

```js
 return {
   resize({pixelRatio,viewportWidth,viewportHeight}) {
     renderer.setPixelRation(pixelRatio);
     renderer.setSize(viewportWidth,viewportHeight,false);
     camera.aspect = viewportWidth / viewportHeight;
     camera.updateProjectionMatrix();
   },
   render({time}) {
     meshJup.rotation.y = time;
     meshMoon.rotation.y = time * 0.05;
     planetGroup.rotation.y = time * 0.75;
     controls.update();
     renderer.render(scene,camera);
   },
   unload() {
     controls.dispose();
     renderer.dispose();
   }
 };
```



# Seamless Looped Rotation

```js
mesh.rotation.y = playhead * Math.PI * 2;
```
