import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Camera and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
//

// Torus Knot
const geometry = new THREE.TorusKnotGeometry(7.5, 2.5, 32, 8);
const material = new THREE.MeshStandardMaterial({ color: 0x808080, wireframe: true });
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);
//

// Icosahedron
const geometry2 = new THREE.IcosahedronGeometry(10);
const icosahedron = new THREE.Mesh(geometry2, material);
scene.add(icosahedron);

icosahedron.position.z = 30;
icosahedron.position.x = -10;
//

// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);
//

// Helpers
// const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);
//

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
//

// Stars
function addStar() {
  
  const geometry = new THREE.TetrahedronGeometry(0.25)
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: true });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);
//

// Move Camera
function moveCamera() {
  
  const t = document.body.getBoundingClientRect().top;
  icosahedron.rotation.x += 0.05;
  icosahedron.rotation.y += 0.05;
  icosahedron.rotation.z += 0.075;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.01;

}

document.body.onscroll = moveCamera;
//

// Animate
function animate() {
  
  requestAnimationFrame(animate);

  torusKnot.rotation.x += 0.005;
  torusKnot.rotation.y += 0.005;
  torusKnot.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();
//
