'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, useGLTF } from '@react-three/drei'
import { Suspense, useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'

// Simple spinning logo component for loading
function SpinningLogo() {
  const groupRef = useRef()
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.05 // Spin on Y axis
      groupRef.current.rotation.x += 0.02 // Slight tilt for 3D effect
    }
  })
  
  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial 
          color="#0891b2"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0.6, 0, 0]}>
        <torusGeometry args={[0.15, 0.05, 16, 32]} />
        <meshStandardMaterial 
          color="#0ea5e9"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  )
}

// Model component using useGLTF hook
function Model({ url, onModelLoaded }) {
  const { scene, error } = useGLTF(url)
  const wrapperRef = useRef()
  
  useEffect(() => {
    if (scene && wrapperRef.current) {
      // Calculate model's bounding box for scaling
      const box = new THREE.Box3().setFromObject(scene)
      const size = box.getSize(new THREE.Vector3())
      
      // Calculate size for scaling - adjusted for better fit
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = maxDim > 0 ? 3 / maxDim : 1
      
      // Apply the scale to the wrapper group
      wrapperRef.current.scale.setScalar(scale)
      
      // Calculate center position
      const center = box.getCenter(new THREE.Vector3())
      
      // Offset the wrapper to center the model
      wrapperRef.current.position.sub(center.multiplyScalar(scale))
      
      // Notify parent that model is loaded and scaled
      if (onModelLoaded) {
        onModelLoaded()
      }
    }
  }, [scene, onModelLoaded])
  
  if (error) {
    console.error('Failed to load 3D model:', error)
    return null
  }
  
  return (
    <group ref={wrapperRef} rotation={[1.35, 0, 0]}>
      <primitive object={scene} key={url} />
    </group>
  )
}

// Placeholder 3D Component (Green PCB)
function PlaceholderPCB() {
  return (
    <group rotation={[0.4, 0, 0]}>
      {/* Main PCB body */}
      <mesh>
        <boxGeometry args={[2, 2, 0.2]} />
        <meshStandardMaterial 
          color="#2d5e38" 
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      {/* Add some visual detail to make it look like a PCB */}
      <mesh position={[0, 0, 0.11]}>
        <planeGeometry args={[1.8, 1.8]} />
        <meshStandardMaterial 
          color="#1a3d2e"
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>
      {/* Add some components */}
      <mesh position={[-0.6, -0.6, 0.12]}>
        <boxGeometry args={[0.3, 0.3, 0.15]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.6, 0.6, 0.12]}>
        <boxGeometry args={[0.3, 0.3, 0.15]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.8, 0.12]}>
        <cylinderGeometry args={[0.1, 0.1, 0.15, 32]} />
        <meshStandardMaterial color="#c9a227" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, -0.8, 0.12]}>
        <cylinderGeometry args={[0.1, 0.1, 0.15, 32]} />
        <meshStandardMaterial color="#c9a227" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}

export default function PCBViewer({ stepFile, className = "" }) {
  const [loadError, setLoadError] = useState(false)
  const controlsRef = useRef()
  const [canvasKey, setCanvasKey] = useState(0)
  const [modelLoaded, setModelLoaded] = useState(false)

  const handleModelLoaded = useCallback(() => {
    setModelLoaded(true)
  }, [])

  useEffect(() => {
    if (!stepFile) {
      setLoadError(true)
      return
    }

    console.log('PCBViewer loading:', stepFile)
    setLoadError(false)
    setModelLoaded(false)
    // Clear ALL GLTF cache to ensure fresh load
    useGLTF.clear()
    // Force Canvas to remount when stepFile changes
    setCanvasKey(prev => prev + 1)
  }, [stepFile])

  const handleContextLost = (event) => {
    event.preventDefault()
    console.warn('WebGL context lost')
  }

  const handleContextRestored = () => {
    console.log('WebGL context restored')
    setCanvasKey(prev => prev + 1)
  }

  return (
    <div className={`relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 ${className}`}>
      <Canvas 
        key={canvasKey}
        dpr={[0, 1.5]} 
        performance={{ min: 0.5 }}
        onCreated={({ gl }) => {
          const canvas = gl.domElement
          canvas.addEventListener('webglcontextlost', handleContextLost, false)
          canvas.addEventListener('webglcontextrestored', handleContextRestored, false)
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls 
          ref={controlsRef}
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={5}
          autoRotate={true}
          autoRotateSpeed={5}
          key={canvasKey}
        />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        <Environment preset="studio" />
        
        {stepFile && !loadError ? (
          <Suspense fallback={<SpinningLogo />}>
            <Model key={`${canvasKey}-${stepFile}`} url={stepFile} onModelLoaded={handleModelLoaded} />
          </Suspense>
        ) : (
          <PlaceholderPCB />
        )}
      </Canvas>
      
      {/* Error indicator */}
      {loadError && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-500/10 text-red-900 dark:text-red-100 pointer-events-none">
          <p className="text-sm font-medium">Failed to load 3D model</p>
        </div>
      )}
    </div>
  )
}
