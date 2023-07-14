import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';


const TextLoader = ({ text, fontPath }) => {
  const containerRef = useRef()

  useEffect(() => {
    let scene, camera, renderer, textMesh

    const init = () => {
      const container = containerRef.current

      // Create scene
      scene = new THREE.Scene()

      // Create camera
      camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
      camera.position.z = 5

      // Create renderer
      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(container.clientWidth, container.clientHeight)
      container.appendChild(renderer.domElement)

      // Load font
      const fontLoader = new FontLoader()
      fontLoader.load(fontPath, (font) => {
        const textGeometry = new THREE.TextGeometry(text, {
          font: font,
          size: 1,
          height: 0.1,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.02,
          bevelOffset: 0,
          bevelSegments: 5,
        })

        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
        textMesh = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(textMesh)
      })
    }

    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate text
      if (textMesh) {
        textMesh.rotation.y += 0.01
      }

      renderer.render(scene, camera)
    }

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }

    init()
    animate()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      containerRef.current.removeChild(renderer.domElement)
    }
  }, [text, fontPath])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}

export default TextLoader
