import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Scene from './Scene';
const App = () => {
  // const rendererRef = useRef(null);
  // const cameraRef = useRef(null);
  // const textMeshRef = useRef(null);
  // const sunRef = useRef(null);
  // const moonRef = useRef(null);
  // const [isDayMode, setIsDayMode] = useState(true);
  // const animationRef = useRef(null);

  // useEffect(() => {
  //   init();
  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (textMeshRef.current) {
  //     const textMaterial = new THREE.MeshNormalMaterial();
  //     textMeshRef.current.material = textMaterial;
  //   }
  //   updateRendererBackgroundColor();
  // }, [isDayMode]);


  // const handleModeToggle = () => {
  //   setIsDayMode(!isDayMode);
  //   animateSunAndMoon();
  //   updateRendererBackgroundColor();
  // };


  // const init = () => {
  //   const scene = new THREE.Scene();
  //   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  //   camera.position.z = 20;

  //   const renderer = new THREE.WebGLRenderer();
  //   renderer.setSize(window.innerWidth, window.innerHeight);
  //   rendererRef.current = renderer;
  //   document.body.appendChild(renderer.domElement);

  //   // Sun
  //   const sunGeometry = new THREE.SphereGeometry(3, 32, 16);
  //   const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  //   const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  //   sun.position.set(10, 10, 8);
  //   scene.add(sun);
  //   sunRef.current = sun;

  //   // Moon
  //   const moonGeometry = new THREE.SphereGeometry(2, 32, 16);
  //   const moonMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
  //   const moon = new THREE.Mesh(moonGeometry, moonMaterial);
  //   moon.position.set(10, 8, -10);
  //   scene.add(moon);
  //   moonRef.current = moon;
  //   moon.visible = !isDayMode; // Hide moon in day mode, show in night mode

  //   // Directional Light
  //   const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  //   directionalLight.position.set(1, 1, 1);
  //   scene.add(directionalLight);

  //   // Load the font
  //   const fontLoader = new FontLoader();
  //   fontLoader.load(
  //     'node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json',
  //     (droidFont) => {
  //       const textGeometry = new TextGeometry('Coming Soon', {
  //         size: 3,
  //         height: 1,
  //         font: droidFont,
  //       });

  //       const textMaterial = new THREE.MeshNormalMaterial();
  //       const textMesh = new THREE.Mesh(textGeometry, textMaterial);

  //       // Center the text on the screen
  //       textGeometry.computeBoundingBox();
  //       const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
  //       textMesh.position.x = -textWidth / 2;
  //       textMesh.position.y = 0;

  //       scene.add(textMesh);
  //       textMeshRef.current = textMesh;
  //     }
  //   );

  //   // Add OrbitControls
  //   const controls = new OrbitControls(camera, renderer.domElement);
  //   controls.update();

  //   cameraRef.current = camera;

  //   // Animation loop
  //   const animate = () => {
  //     requestAnimationFrame(animate);

  //     controls.update();
  //     renderer.render(scene, camera);
  //   };

  //   animate();
  //   updateRendererBackgroundColor();
  // };

  // const handleResize = () => {
  //   const width = window.innerWidth;
  //   const height = window.innerHeight;
  //   const aspectRatio = width / height;

  //   if (rendererRef.current && cameraRef.current) {
  //     const renderer = rendererRef.current;
  //     const camera = cameraRef.current;

  //     camera.aspect = aspectRatio;
  //     camera.updateProjectionMatrix();
  //     renderer.setSize(width, height);
  //   }
  // };
  // const animateSunAndMoon = () => {
  //   if (sunRef.current && moonRef.current) {
  //     const targetY = isDayMode ? 10 : 20; // Adjust the target height for sun and moon

  //     const sunAnimation = new THREE.AnimationMixer(sunRef.current);
  //     const moonAnimation = new THREE.AnimationMixer(moonRef.current);

  //     const sunPositionAction = sunAnimation.clipAction(
  //       new THREE.VectorKeyframeTrack('.position.y', [0, 1], [sunRef.current.position.y, targetY])
  //     );

  //     const moonPositionAction = moonAnimation.clipAction(
  //       new THREE.VectorKeyframeTrack('.position.y', [0, 1], [moonRef.current.position.y, targetY])
  //     );

  //     sunPositionAction.timeScale = 2; // Adjust the speed of the animation
  //     moonPositionAction.timeScale = 2; // Adjust the speed of the animation

  //     sunPositionAction.loop = THREE.LoopOnce;
  //     moonPositionAction.loop = THREE.LoopOnce;

  //     sunAnimation.addEventListener('finished', () => {
  //       sunPositionAction.reset();
  //       sunPositionAction.stop();
  //     });

  //     moonAnimation.addEventListener('finished', () => {
  //       moonPositionAction.reset();
  //       moonPositionAction.stop();
  //     });

  //     sunPositionAction.play();
  //     moonPositionAction.play();

  //     animationRef.current = [sunAnimation, moonAnimation];
  //   }
  // };
  // const updateRendererBackgroundColor = () => {
  //   if (rendererRef.current) {
  //     const renderer = rendererRef.current;
  //     renderer.setClearColor(isDayMode ? 0xffffff : 0x000000, 1);

  //     // Show/hide the sun and moon based on day/night mode
  //     if (sunRef.current && moonRef.current) {
  //       sunRef.current.visible = isDayMode;
  //       moonRef.current.visible = !isDayMode;
  //     }
  //   }
  // };

  // return (
  //   <>

  //      <button
  //       style={{
  //         position: 'absolute',
  //         top: '20px',
  //         left: '20px',
  //         zIndex: '1', // Ensures the button is above the 3D scene
  //       }}
  //       onClick={handleModeToggle}
  //     >
  //       Toggle Day/Night
  //     </button>
  //   </>
  // );

  <Scene />
};

export default App;
