import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import galaxyTexture from './assets/galaxy.png';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

import cloudTexture from './assets/pngegg.png';

const Scene = () => {
 
  const canvasRef = useRef(null);
  const [isDay, setIsDay] = useState(true);

  const handleDayNight = () => {
    setIsDay((isDay) => !isDay);
  };

  useEffect(() => {
    let scene, camera, renderer, bloomComposer, starMesh, cloudMesh;

    // Scene setup
    scene = new THREE.Scene();
    const fov = 61;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;

    // Camera setup
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 20;
    camera.position.x = 0;
    scene.add(camera);

    // Default renderer setup
    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.autoClear = false;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
    // renderer.setClearColor(isDay ? 0xffffff : 0x000000, 0);

    const controls = new OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true;
    controls.dampingFactor = 1;
    controls.enableZoom = true;
    controls.minDistance = 10;
    controls.maxDistance = 28;
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 1;
    controls.minAzimuthAngle = -Math.PI / 6;
    controls.maxAzimuthAngle = Math.PI / 6;
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 1.5;

    controls.update();

    // Bloom renderer setup
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = 0;
    bloomPass.strength = isDay ? 0.3 : 0.1;
    bloomPass.radius = 0;
    bloomComposer = new EffectComposer(renderer);
    bloomComposer.setSize(window.innerWidth, window.innerHeight);
    bloomComposer.renderToScreen = true;
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);

    // Sun object
    const color = new THREE.Color('#FDB813');
    const geometry = new THREE.IcosahedronGeometry(1, 15);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0, 0, 0);
    sphere.layers.set(1);

    isDay ? scene.add(sphere) : null;

    // Galaxy geometry
    const starGeometry = new THREE.SphereGeometry(80, 64, 64);

    // Galaxy material
    const starMaterial = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(galaxyTexture),
      side: THREE.BackSide,
      transparent: true,
    });
    starMaterial.map.needsUpdate = true;

    // Cloud geometry
    const cloudGeometry = new THREE.SphereGeometry(80, 64, 64);

    // Cloud material
    const cloudMaterial = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(cloudTexture),
      side: THREE.BackSide,
      transparent: true,
    });
    cloudMaterial.map.needsUpdate = true;

    // Load the font
    const fontLoader = new FontLoader();
    fontLoader.load('/droid_serif_regular.typeface.json', (droidFont) => {
      const textGeometry = new TextGeometry('Coming Soon', {
        size: 2,
        height: 1,
        font: droidFont,
      });
      const textcolor = new THREE.Color('#cfd2c9');
      const textMaterial = new THREE.MeshBasicMaterial({ color: textcolor });
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);

      // Center the text on the screen
      textGeometry.computeBoundingBox();
      const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
      textMesh.position.x = -textWidth / 2;
      textMesh.position.y = 0;
      textMesh.position.set(-8, -5, -2);
      textMesh.layers.set(1);
      scene.add(textMesh);
    });

    // Galaxy mesh
    starMesh = new THREE.Mesh(starGeometry, starMaterial);
    starMesh.layers.set(1);

    // Cloud mesh
    cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloudMesh.layers.set(1);
    isDay ? scene.add(cloudMesh) : scene.add(starMesh);

    // Ambient light
    // ...

    // Resize listener
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      bloomComposer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize, false);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      starMesh.rotation.y += 0.001;
      cloudMesh.rotation.y += 0.001;
      camera ? camera.layers?.set(1) : null;
      bloomComposer.render();
    };

    animate();

    // Clean up on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      // Clean up Three.js objects and renderer
      renderer.dispose();
      bloomComposer.dispose();
      scene = null;
      camera = null;
      renderer = null;
    };
  }, [isDay]);

  return (
    <div style={{ position: 'relative' }}>
      <canvas className="webgl" ref={canvasRef} />
      <button
        style={{ zIndex: '999', position: 'absolute', top: '20px', left: '20px' }}
        onClick={() => handleDayNight()}
      >
        Toggle Day/Night
      </button>
    </div>
  );
};

export default Scene;
