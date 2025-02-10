import React, { useEffect } from 'react';
import './Globe.css';
import * as THREE from "three";

const Globe = () => {
  useEffect(() => {
    // Three.js Globe Implementation
    const container = document.getElementById('globe-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Create Earth
    const earthGeometry = new THREE.SphereGeometry(5, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg'),
      bumpMap: new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg'),
      bumpScale: 0.05,
      specularMap: new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg'),
      specular: new THREE.Color('grey')
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Create Atmosphere
    const atmosphereGeometry = new THREE.SphereGeometry(5.3, 64, 64);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x4ECDC4,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Add Stars
    // const starGeometry = new THREE.BufferGeometry();
    // const starMaterial = new THREE.PointsMaterial({
    //   color: 0xffffff,
    //   size: 0.1
    // });

    // const starVertices = [];
    // for (let i = 0; i < 10000; i++) {
    //   const x = (Math.random() - 0.5) * 2000;
    //   const y = (Math.random() - 0.5) * 2000;
    //   const z = -Math.random() * 2000;
    //   starVertices.push(x, y, z);
    // }

    // starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    // const stars = new THREE.Points(starGeometry, starMaterial);
    // scene.add(stars);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(15, 15, 15);
    scene.add(pointLight);

    // Animation
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const rotationSpeed = 0.002;
    const mouseRotationSpeed = 0.8;
    const smoothingFactor = 0.08;
    const maxRotation = Math.PI / 3;

    document.addEventListener('mousemove', (event) => {
      mouseX = ((event.clientX - window.innerWidth / 2) / window.innerWidth) * 2;
      mouseY = ((event.clientY - window.innerHeight / 2) / window.innerHeight) * 2;
    });

    camera.position.z = 15;

    // Create cloud layer
    const cloudGeometry = new THREE.SphereGeometry(5.2, 64, 64);
    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'),
      transparent: true,
      opacity: 0.4
    });
    const clouds = new THREE.Mesh(cloudGeometry, atmosphereMaterial);
    scene.add(clouds);

    // Add glow effect
    const glowGeometry = new THREE.SphereGeometry(5.5, 64, 64);
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        c: { type: 'f', value: 0.5 },
        p: { type: 'f', value: 4.5 },
        glowColor: { type: 'c', value: new THREE.Color(0x4ECDC4) },
        viewVector: { type: 'v3', value: camera.position }
      },
      vertexShader: `
        uniform vec3 viewVector;
        varying float intensity;
        void main() {
          vec3 vNormal = normalize(normalMatrix * normal);
          vec3 vNormel = normalize(normalMatrix * viewVector);
          intensity = pow(0.6 - dot(vNormal, vNormel), 2.0);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() {
          vec3 glow = glowColor * intensity;
          gl_FragColor = vec4(glow, 1.0);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    function animate() {
      requestAnimationFrame(animate);

      targetRotationX = mouseX * maxRotation;
      targetRotationY = -mouseY * maxRotation;

      earth.rotation.y += rotationSpeed;
      atmosphere.rotation.y += rotationSpeed;
      clouds.rotation.y += rotationSpeed * 1.5;

      camera.position.x += (mouseX * 3 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 3 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      earth.rotation.x += (targetRotationY - earth.rotation.x) * smoothingFactor;
      earth.rotation.z += (targetRotationX - earth.rotation.z) * smoothingFactor;

      atmosphere.rotation.x = earth.rotation.x;
      atmosphere.rotation.z = earth.rotation.z;
      clouds.rotation.x = earth.rotation.x;
      clouds.rotation.z = earth.rotation.z;
      glow.rotation.x = earth.rotation.x;
      glow.rotation.z = earth.rotation.z;

      const time = Date.now() * 0.001;
      const floatY = Math.sin(time) * 0.15;
      const floatX = Math.cos(time * 0.5) * 0.1;

      earth.position.y = floatY;
      earth.position.x = floatX;
      atmosphere.position.y = floatY;
      atmosphere.position.x = floatX;
      clouds.position.y = floatY;
      clouds.position.x = floatX;
      glow.position.y = floatY;
      glow.position.x = floatX;

      glow.material.uniforms.viewVector.value = new THREE.Vector3().subVectors(camera.position, glow.position);

      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }, []);

  return (
    <div className="App">
      <div id="globe-container"></div>
    </div>
  );
};

export default Globe;
