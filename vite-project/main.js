import './style.css'

import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const geometry = new THREE.TorusKnotGeometry( 7.5, 2.5, 100, 16 );
const material = new THREE.MeshBasicMaterial( { color: 0x24ff99, wireframe: true } );
const torusKnot = new THREE.Mesh( geometry, material );
scene.add( torusKnot );

function animate(){
  requestAnimationFrame( animate );

  torusKnot.rotation.x += 0.005;
  torusKnot.rotation.y += 0.005;
  torusKnot.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate()
