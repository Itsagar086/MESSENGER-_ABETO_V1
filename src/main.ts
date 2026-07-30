import * as THREE from 'three';

// Create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Black background

// Camera configuration constants
const FOV = 75; // Field of view in degrees (vertical)
const NEAR = 0.1; // Near clipping plane (objects closer than this are not rendered)
const FAR = 1000; // Far clipping plane (objects farther than this are not rendered)
const INITIAL_POSITION = new THREE.Vector3(0, 0, 5); // Starting camera position (looking at origin)

// Create camera
const camera = new THREE.PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, NEAR, FAR);
camera.position.copy(INITIAL_POSITION);

// Create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NoToneMapping; // Default tone mapping
renderer.shadowMap.enabled = true;

// Append renderer canvas to the DOM
const container = document.getElementById('app');
if (container) {
    container.appendChild(renderer.domElement);
} else {
    document.body.appendChild(renderer.domElement);
}

// Render the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});