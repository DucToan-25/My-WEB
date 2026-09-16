import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ========================================================
// 2. PHẦN ĐỒ HỌA 3D TRÁI TIM
// ========================================================

/* BACKGROUND */
document.body.style.background = 'radial-gradient(circle at center,#fff5fa 0%,#ffd1e6 35%,#ff69b4 100%)';

/* SCENE */
const scene = new THREE.Scene();

/* CAMERA (Đã tinh chỉnh cho điện thoại) */
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const isMobileInitial = window.innerWidth < 768;
camera.position.set(0, 0, isMobileInitial ? 85 : 45);

/* RENDERER */
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

/* CONTROLS */
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 1.2;

/* LIGHTS */
scene.add(new THREE.AmbientLight(0xffffff, 1.6));

const mainLight = new THREE.DirectionalLight(0xffffff, 4);
mainLight.position.set(10, 10, 20);
scene.add(mainLight);

const pinkLight = new THREE.PointLight(0xff66cc, 50, 120);
pinkLight.position.set(0, 0, 15);
scene.add(pinkLight);

const sideLight = new THREE.PointLight(0xffffff, 15, 100);
sideLight.position.set(-15, 10, 20);
scene.add(sideLight);

/* HEART SHAPE */
const heartShape = new THREE.Shape();
heartShape.moveTo(5,5);
heartShape.bezierCurveTo(5,5, 4,0, 0,0);
heartShape.bezierCurveTo(-6,0, -6,7, -6,7);
heartShape.bezierCurveTo(-6,11, -3,15.4, 5,19);
heartShape.bezierCurveTo(12,15.4, 16,11, 16,7);
heartShape.bezierCurveTo(16,7, 16,0, 10,0);
heartShape.bezierCurveTo(7,0, 5,5, 5,5);

/* GEOMETRY */
const geometry = new THREE.ExtrudeGeometry(heartShape, {
    depth: 3,
    bevelEnabled: true,
    bevelSegments: 20,
    steps: 2,
    bevelSize: 2.5,
    bevelThickness: 2.5
});
geometry.center();

/* MATERIAL */
const material = new THREE.MeshPhysicalMaterial({
    color: 0xff2d95,
    emissive: 0xff66cc,
    emissiveIntensity: 0.45,
    roughness: 0.01,
    metalness: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 0.02
});

const mainHeart = new THREE.Mesh(geometry, material);
mainHeart.rotation.z = Math.PI;
scene.add(mainHeart);

/* FLOATING HEARTS */
const bgGroup = new THREE.Group();

for(let i = 0; i < 30; i++){
    const heart = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
        color: 0xff99cc,
        transparent: true,
        opacity: 0.45
    }));
    heart.position.set((Math.random()-0.5)*120, (Math.random()-0.5)*80, -10 - Math.random()*50);
    heart.scale.setScalar(0.08 + Math.random()*0.18);
    heart.rotation.z = Math.PI;
    heart.rotation.x = Math.random()*0.5;
    heart.rotation.y = Math.random()*0.5;
    bgGroup.add(heart);
}

for(let i = 0; i < 30; i++){
    const heart = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
        color: 0xff99cc,
        transparent: true,
        opacity: 0.45
    }));
    heart.position.set((Math.random()-0.5)*120, (Math.random()-0.5)*80, 10 + Math.random()*30);
    heart.scale.setScalar(0.08 + Math.random()*0.18);
    heart.rotation.z = Math.PI;
    heart.rotation.x = Math.random()*0.5;
    heart.rotation.y = Math.random()*0.5;
    bgGroup.add(heart);
}
scene.add(bgGroup);

/* STARS */
const particleCount = 5000;
const particleGeo = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);

for(let i=0;i<particleCount;i++){
    positions[i*3] = (Math.random()-0.5)*200;
    positions[i*3+1] = (Math.random()-0.5)*200;
    positions[i*3+2] = (Math.random()-0.5)*200;
}

particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particleMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.25,
    transparent: true,
    opacity: 0.9
});

const particles = new THREE.Points(particleGeo, particleMat);
scene.add(particles);

/* TEXT */
window.addEventListener('load',()=>{
    const text = document.getElementById('text-container');
    if(text){
        text.classList.add('show-text');
    }
});

/* ANIMATION */
const clock = new THREE.Clock();

function animate(){
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    /* HEART BEAT */
    const beat = 1 + Math.sin(t*4)*0.06 + Math.sin(t*8)*0.025;
    mainHeart.scale.set(beat, beat, beat);
    mainHeart.rotation.y = Math.sin(t*0.7)*0.25;
    mainHeart.rotation.x = Math.sin(t*0.4)*0.05;

    /* FLOATING HEARTS */
    bgGroup.children.forEach((heart,index)=>{
        heart.position.y += Math.sin(t*1.5 + index)*0.015;
        heart.rotation.y += 0.002;
        heart.rotation.x += 0.001;
    });

    /* STARS */
    particles.rotation.y += 0.0006;
    particles.rotation.x += 0.0002;

    controls.update();
    renderer.render(scene, camera);
}
animate();

/* RESIZE (Đã cập nhật tỷ lệ camera cho xoay ngang dọc) */
window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    const isMobileResize = window.innerWidth < 768;
    camera.position.z = isMobileResize ? 85 : 45;
});