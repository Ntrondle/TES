'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, useGLTF } from '@react-three/drei'
import { Suspense, useState, useEffect, useRef } from 'react'
import * as THREE from 'three'

// Model component using useGLTF hook with animation
function Model({ url }) {
  const { scene } = useGLTF(url)
  const groupRef = useRef()
  const [loaded, setLoaded] = useState(false)
  const animationProgress = useRef(0)
  const scaled = useRef(false)
  
  useEffect(() => {
    if (scene && !scaled.current) {
      // Calculate model's bounding box for scaling
      const box = new THREE.Box3().setFromObject(scene)
      const size = box.getSize(new THREE.Vector3())
      
      // Calculate size for scaling
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = maxDim > 0 ? 4 / maxDim : 1
      scene.scale.setScalar(scale)
      
      scaled.current = true
      setLoaded(true)
    }
  }, [scene])
  
  useFrame(() => {
    if (loaded && animationProgress.current < 1) {
      // Animate from scale 0 to 1 with 360-degree rotation
      animationProgress.current += 0.03
      if (animationProgress.current > 1) {
        animationProgress.current = 1
      }
      
      // Smooth ease-out animation
      const easeOut = 1 - Math.pow(1 - animationProgress.current, 3)
      
      if (groupRef.current) {
        groupRef.current.scale.setScalar(easeOut)
        groupRef.current.rotation.y = easeOut * Math.PI * 2 // 360 degrees rotation
      }
    }
  })
  
  return (
    <group ref={groupRef} rotation={[1.35, 0, 0]}>
      <primitive object={scene} />
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
  const [loading, setLoading] = useState(true)
  const controlsRef = useRef()

  useEffect(() => {
    if (!stepFile) {
      setLoadError(true)
      setLoading(false)
      return
    }

    console.log('PCBViewer loading:', stepFile)
    setLoading(true)
    setLoadError(false)

    // Set a timeout to catch loading issues
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [stepFile])

  return (
    <div className={`relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 ${className}`}>
      <Canvas dpr={[0, 1.5]} performance={{ min: 0.5 }}>
        <PerspectiveCamera makeDefault position={[1, 3, 3]} />
        <OrbitControls 
          ref={controlsRef}
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={7}
          autoRotate={true}
          autoRotateSpeed={5}
        />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        <Environment preset="studio" />
        
        <Suspense fallback={<PlaceholderPCB />}>
          {stepFile && !loadError ? (
            <Model url={stepFile} />
          ) : (
            <PlaceholderPCB />
          )}
        </Suspense>
      </Canvas>
      
      {/* Loading indicator */}
      {loading && !loadError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white pointer-events-none">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
            <p className="text-sm">Loading 3D model...</p>
          </div>
        </div>
      )}
      
      {/* Error indicator */}
      {loadError && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-500/10 text-red-900 dark:text-red-100 pointer-events-none">
          <p className="text-sm font-medium">Failed to load 3D model</p>
        </div>
      )}
    </div>
  )
}
