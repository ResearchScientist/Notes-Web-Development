const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor('rgb(50,50,200)',1); // background (colour , transparency)
document.body.appendChild( renderer.domElement );

const frag = `
  precision highp float;
  uniform float time;
  varying vec2 vUv;
  void main () {
    vec3 color = 0.5 + 0.5 * cos(time + vUv.xyz + vec3(0.0,2.0,4.0));
    gl_FragColor = vec4(color,1.0);
};
`
scene.add(frag);