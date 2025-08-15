// main.js
import './style.css'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

document.body.style.opacity = 1;

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Wrap canvas in sticky container
const wrapper = document.createElement('div');
wrapper.id = 'model-canvas-wrapper';
document.querySelector('#model-section').appendChild(wrapper);
wrapper.appendChild(renderer.domElement);

let controls
controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // smooth movement
controls.enablePan = true;
controls.enableZoom = true;
// Optional: restrict vertical rotation
controls.maxPolarAngle = Math.PI / 2;

// Light
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

let model;
let coordsDiv = document.getElementById('coords');

// Load model
const loader = new GLTFLoader();
loader.load(
  '/models/test.glb',
  (gltf) => {
    model = gltf.scene;
    scene.add(model);
    camera.position.set(0, 1, 5);
  },
  undefined,
  (error) => console.error('Error loading model', error)
);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  controls.update();
  coordsDiv.textContent =
    `Camera: x=${camera.position.x.toFixed(2)}, y=${camera.position.y.toFixed(2)}, z=${camera.position.z.toFixed(2)}`;

  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
