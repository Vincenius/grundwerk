// main.js
import './style.css'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function createGradientTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Radial gradient from center outward
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = canvas.width / 2;

  const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
  gradient.addColorStop(1, '#ffffff'); // center
  gradient.addColorStop(0, '#dee2e6'); // edges
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add subtle noise
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const noise = Math.random() * 10 - 5; // ±5 brightness
    imageData.data[i] += noise;
    imageData.data[i + 1] += noise;
    imageData.data[i + 2] += noise;
  }
  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping; // optional for spherical backgrounds
  return texture;
}

const debug = true

document.body.style.opacity = 1;
gsap.registerPlugin(ScrollTrigger);

// Scene
const scene = new THREE.Scene();
scene.background = createGradientTexture();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Wrap canvas in sticky container
const wrapper = document.createElement('div');
wrapper.id = 'model-canvas-wrapper';
document.querySelector('#model-section').appendChild(wrapper);
wrapper.appendChild(renderer.domElement);

// Light
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

let model;

// Load model
const loader = new GLTFLoader();
const loadingElement = document.querySelector('.loading')

loader.load(
  '/models/test.glb',
  (gltf) => {
    model = gltf.scene;
    // model.position.y = -model.position.y - 25; // change model center

    scene.add(model);
    camera.position.set(0, 20, 90);

    // Timeline for camera + model animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#model-section",
        start: "top top",
        end: "+=4000", // total scroll distance for all steps
        scrub: true,
        pin: true, // keep section fixed during animation
        markers: debug,
      }
    });

    function animateStepText(selector, startTime) {
      tl.fromTo(selector,
        { opacity: 0, x: -200 }, // start left & hidden
        { opacity: 1, x: 0, duration: 1, ease: "power2.out" }, // slide in
        startTime
      )
        .to(selector,
          { x: 50, duration: 1.5, ease: "linear" }, // drift slowly to right
          startTime + 1
        )
        .to(selector,
          { opacity: 0, x: 300, duration: 1, ease: "power2.in" }, // slide out right
          startTime + 2.5
        );
    }

    // Step 1 — Rotate model & show text
    tl.to(model.rotation, { y: Math.PI * 2, duration: 1 }, 0);
    animateStepText(".step-1", 0);

    // Step 2 — Move camera & show text
    tl.to(camera.position, { x: 60, y: 100, z: 16, duration: 1, onUpdate: () => camera.lookAt(model.position) }, 1);
    animateStepText(".step-2", 1);

    // Step 3 — Hold camera & show text
    tl.to(camera.position, { x: 61, y: 101, z: 16.5, duration: 1, ease: "power1.inOut", onUpdate: () => camera.lookAt(model.position) }, 2);
    animateStepText(".step-3", 2);

    // Step 4 — Move to final point & show text
    tl.to(camera.position, { x: 0, y: 30, z: -85, duration: 1, onUpdate: () => camera.lookAt(model.position) }, 3);
    animateStepText(".step-4", 3);
  },
  (xhr) => {
    if (xhr.lengthComputable) {
      const percentComplete = (xhr.loaded / xhr.total) * 100;
      loadingElement.innerText = `Loading... ${percentComplete.toFixed(0)}%`;
    } else {
      loadingElement.innerText = "Loading...";
    }
  },
  (error) => console.error('Error loading model', error)
);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
