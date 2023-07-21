import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const App = () => {
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const textMeshRef = useRef(null);
  const [isDayMode, setIsDayMode] = useState(false);

  useEffect(() => {
    init();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (textMeshRef.current) {
      const textMaterial = new THREE.MeshBasicMaterial({ color: isDayMode ? 0x00000 : 0x80D4FF });
      textMeshRef.current.material = textMaterial;
    }
    updateRendererBackgroundColor();
  }, [isDayMode]);

  const handleModeToggle = () => {
    setIsDayMode(!isDayMode);
  };

  const init = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;
    document.body.appendChild(renderer.domElement);

    // Load the font
    const fontLoader = new FontLoader();
    fontLoader.load(
      'node_modules/three/examples/fonts/droid/droid_sans_mono_regular.typeface.json',
      (droidFont) => {
        const textGeometry = new TextGeometry('Coming Soon', {
          size: 2,
          height: 1,
          font: droidFont,
        });

        const textMaterial = new THREE.MeshBasicMaterial({ color: isDayMode ? 0xffffff : 0x80D4FF });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);

        // Center the text on the screen
        textGeometry.computeBoundingBox();
        const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
        textMesh.position.x = -textWidth / 2;
        textMesh.position.y = 0;

        scene.add(textMesh);
        textMeshRef.current = textMesh;
      }
    );

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    cameraRef.current = camera;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      controls.update();
      renderer.render(scene, camera);
    };

    animate();
    updateRendererBackgroundColor();
  };

  const handleResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspectRatio = width / height;

    if (rendererRef.current && cameraRef.current) {
      const renderer = rendererRef.current;
      const camera = cameraRef.current;

      camera.aspect = aspectRatio;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
  };
  const updateRendererBackgroundColor = () => {
    if (rendererRef.current) {
      const renderer = rendererRef.current;
      renderer.setClearColor(isDayMode ? 0xffffff : 0x000000, 1);
    }
  };
  return (
    <>
       <button
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: '1', // Ensures the button is above the 3D scene
        }}
        onClick={handleModeToggle}
      >
        Toggle Day/Night
      </button>
    </>
  );
};

export default App;
