import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 0, 5)

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(1, 1, 1).normalize();
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040, 1); // soft white light
scene.add(ambientLight);

let object;
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

function animate() {
    if(object) {
        object.rotation.x = -1.2 + mouseX + 2.5 / window.innerHeight;
        object.rotation.y = -3 + mouseY / window.innerWidth * 3;
    }
    renderer.render( scene, camera );
}


const loader = new GLTFLoader();
loader.load( 'octopus.glb', function ( gltf ) {
    scene.add( gltf.scene );
    object = gltf.scene
}, undefined, function ( error ) {    
    console.error( error );
} );

// resize
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})

document.onmousemove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
}

renderer.setAnimationLoop( animate );