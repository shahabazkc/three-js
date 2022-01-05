import './style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// 3 basic steps foe adding elements
// 1.geometry--the {x,y,z} points that makeup a shape
const geometry=new THREE.TorusBufferGeometry(10, 3, 16, 100)
// 2.material(the wrapping paper for an object) its for give a colour
const material = new THREE.MeshStandardMaterial( {color: 0x87ceeb});
// 3.Mesh-CREATE A MESH FOR ADD GEOMETRY AND MATERIAL 
const torus = new THREE.Mesh(geometry,material);

scene.add(torus)

const pointLignt= new THREE.PointLight(0xffffff)
pointLignt.position.set(5,5,5)

const ambientLight=new THREE.AmbientLight(0xffffff)
scene.add(pointLignt,ambientLight)

// const lightHelper=new THREE.PointLightHelper(pointLignt)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper,gridHelper)




const controls = new OrbitControls(camera,renderer. domElement);


function addStar(){
  const geometry =new THREE.SphereGeometry(0.25,24,24);
  const material =new THREE.MeshStandardMaterial({color: 0xffffff})
  const star=new THREE.Mesh( geometry, material);

  // mapping this to the backgrounfd with circle
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}


Array(200).fill().forEach(addStar)


// adding imag to the background
const spaceTexture =new THREE.TextureLoader().load('/assets/images/pexels-johannes-plenio-1103970.jpg')
scene.background=spaceTexture;



const jeffTexture = new THREE.TextureLoader().load('/assets/images/fk.png');

const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));

scene.add(jeff);

// picture ai
const moonTexture = new THREE.TextureLoader().load('/assets/images/ai.jpg');
const normalTexture = new THREE.TextureLoader().load('/assets/images/fk.png');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

jeff.position.z = -5;
jeff.position.x = 2;


// scroll animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();




// renderer.render(scene, camera);
// in order t0 call the above render  again again.so we create a function

function animate() {
  requestAnimationFrame(animate);

// for moving the torus
torus.rotation.x += 0.01;
torus.rotation.y += 0.005;
torus.rotation.z += 0.001;
moon.rotation.x += 0.005;

// controls.update(0);


  renderer.render(scene, camera);
}

animate();

// the above function  is using for the game development