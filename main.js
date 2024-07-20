import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 0, 5)

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(1, 1, 1).normalize();
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040, 1); // soft white light
scene.add(ambientLight);

let object;
function animate() {
    if(object) {
        object.rotation.x += 0.01;
        object.rotation.y += 0.01;
        renderer.render( scene, camera );
    }
}

renderer.setAnimationLoop( animate );

const loader = new GLTFLoader();
loader.load( 'octopus.glb', function ( gltf ) {
	scene.add( gltf.scene );
    object = gltf.scene
}, undefined, function ( error ) {    
    console.error( error );
} );
