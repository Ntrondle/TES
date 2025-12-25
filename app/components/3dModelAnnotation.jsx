'use client'

import React, { useRef, useEffect, useState, memo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'

const Model = memo(function Model({ url, annotations, cameraPosition, position = 'flat', onObjectClick, setModelGroup, setModelReady }) {
  const group = useRef()
  const { scene, error } = useGLTF(url)
  const hasLoaded = useRef(false)
  
  useEffect(() => {
    if (group.current && scene && !hasLoaded.current) {
      console.log('Loading model:', url)
      
      // Clear previous content
      while(group.current.children.length > 0){ 
        group.current.remove(group.current.children[0]) 
      }
      
      // Clone and add scene
      const clonedScene = scene.clone()
      
      // Auto-center and scale model
      const box = new THREE.Box3().setFromObject(clonedScene)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      
      // Center model
      clonedScene.position.x += (clonedScene.position.x - center.x)
      clonedScene.position.y += (clonedScene.position.y - center.y)
      clonedScene.position.z += (clonedScene.position.z - center.z)
      
      // Apply rotation based on position preset
      switch (position) {
        case 'up':
          // Model facing upward (no rotation on x-axis)
          clonedScene.rotation.x = 0
          clonedScene.rotation.y = 0
          clonedScene.rotation.z = 0
          break
        case 'down':
          // Model facing downward
          clonedScene.rotation.x = Math.PI
          clonedScene.rotation.y = 0
          clonedScene.rotation.z = 0
          break
        case 'left':
          // Model rotated 90 degrees to the left
          clonedScene.rotation.x = Math.PI / 2
          clonedScene.rotation.y = 0
          clonedScene.rotation.z = Math.PI / 2
          break
        case 'right':
          // Model rotated 90 degrees to the right
          clonedScene.rotation.x = Math.PI / 2
          clonedScene.rotation.y = 0
          clonedScene.rotation.z = -Math.PI / 2
          break
        case 'flat':
        default:
          // Default: lay flat facing camera
          clonedScene.rotation.x = Math.PI / 2
          clonedScene.rotation.y = 0
          clonedScene.rotation.z = 0
          break
      }
      
      // Scale to fit in view (max dimension = 20 units)
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = maxDim > 0 ? 20 / maxDim : 1
      clonedScene.scale.setScalar(scale)
      
      group.current.add(clonedScene)
      
      // Store reference in ref
      if (setModelGroup) {
        setModelGroup.current = group
        
        // List all objects with names
        const namedObjects = []
        group.current.traverse((obj) => {
          if (obj.name && obj.name !== '') {
            namedObjects.push(obj.name)
          }
        })
        console.log('Named objects in model:', namedObjects)
      }
      
      // Mark as loaded and ready
      hasLoaded.current = true
      if (setModelReady) {
        setModelReady(true)
      }
    }
  }, [scene, setModelGroup, setModelReady, url, position])

  // Handle click to get object info
  const handlePointerDown = (event) => {
    event.stopPropagation()
    const point = event.point
    const objectName = event.object.name || 'unnamed'
    const faceNormal = event.face ? {
      x: event.face.normal.x.toFixed(3),
      y: event.face.normal.y.toFixed(3),
      z: event.face.normal.z.toFixed(3)
    } : null
    
    console.log('='.repeat(60))
    console.log('Clicked on model:')
    console.log('Object Name:', objectName)
    if (faceNormal) {
      console.log('Face Normal:', faceNormal)
    }
    console.log('Click Position:', {
      x: point.x.toFixed(3),
      y: point.y.toFixed(3),
      z: point.z.toFixed(3)
    })
    console.log('='.repeat(60))
    console.log('\nOPTION 1: Use direct position (recommended for precise placement)')
    console.log(`{"position": ${JSON.stringify({
      x: parseFloat(point.x.toFixed(3)),
      y: parseFloat(point.y.toFixed(3)),
      z: parseFloat(point.z.toFixed(3))
    })}, "offset": 2.0, "direction": "up", "label": "YOUR_LABEL", "color": "#FF5733", "labelSize": 1.0}`)
    console.log('\nOPTION 2: Use object name (may not be accurate for complex objects)')
    console.log(`{"targetObject": "${objectName}", "offset": 2.0, "direction": "up", "label": "YOUR_LABEL", "color": "#FF5733", "arrowOffset": {"x": 0, "y": 0, "z": 0}, "labelSize": 1.0}`)
    console.log()
    
    if (onObjectClick) {
      onObjectClick({ name: objectName, point, normal: faceNormal })
    }
  }

  // Show error message if model fails to load
  if (error) {
    console.error('Failed to load 3D model:', error)
    return (
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[10, 10, 1]} />
        <meshStandardMaterial color="#FF0000" wireframe />
      </mesh>
    )
  }

  return <group ref={group} onPointerDown={handlePointerDown} />
})

function getDirectionVector(direction) {
  const vectors = {
    'up': new THREE.Vector3(0, 1, 0),
    'down': new THREE.Vector3(0, -1, 0),
    'north': new THREE.Vector3(0, 0, -1),
    'south': new THREE.Vector3(0, 0, 1),
    'east': new THREE.Vector3(1, 0, 0),
    'west': new THREE.Vector3(-1, 0, 0)
  }
  
  if (vectors[direction]) {
    return vectors[direction]
  }
  
  // If direction is a custom vector {x, y, z}
  if (typeof direction === 'object' && direction.x !== undefined) {
    return new THREE.Vector3(direction.x || 0, direction.y || 0, direction.z || 0)
  }
  
  // Default to up
  return new THREE.Vector3(0, 1, 0)
}

function findObjectByName(scene, name) {
  if (!scene || typeof scene.traverse !== 'function') {
    return null
  }
  
  let foundObject = null
  
  scene.traverse((object) => {
    if (object.name === name && !foundObject) {
      foundObject = object
    }
  })
  
  return foundObject
}

const AnnotationMarker = memo(function AnnotationMarker({ modelGroup, annotation }) {
  const meshRef = useRef()
  const labelRef = useRef()
  const [labelTexture, setLabelTexture] = React.useState(null)
  const arrowPositionRef = useRef(null)
  
  // Create texture once when component mounts
  useEffect(() => {
    const texture = createLabelTexture(annotation.label, annotation.color)
    setLabelTexture(texture)
  }, [annotation.label, annotation.color])

  // Get arrow position based on object - calculate whenever dependencies change
  useEffect(() => {
    const actualGroup = modelGroup.current?.current
    
    // Check if direct position is provided (preferred over targetObject)
    if (annotation.position && typeof annotation.position === 'object') {
      const pos = annotation.position
      const direction = getDirectionVector(annotation.direction || 'up')
      const offset = annotation.offset || 2.0
      const directionVector = direction.clone().normalize()
      
      const arrowPosition = new THREE.Vector3(pos.x || 0, pos.y || 0, pos.z || 0)
        .add(directionVector.multiplyScalar(offset))
      
      const arrowOffset = annotation.arrowOffset || { x: 0, y: 0, z: 0 }
      arrowPosition.x += arrowOffset.x || 0
      arrowPosition.y += arrowOffset.y || 0
      arrowPosition.z += arrowOffset.z || 0
      
      console.log('[AnnotationMarker] Using direct position:', pos)
      console.log('[AnnotationMarker] Final arrow position:', {
        x: arrowPosition.x.toFixed(2),
        y: arrowPosition.y.toFixed(2),
        z: arrowPosition.z.toFixed(2)
      })
      
      arrowPositionRef.current = arrowPosition
      return
    }
    
    // Fall back to targetObject lookup
    if (annotation.targetObject && actualGroup) {
      const targetObject = findObjectByName(actualGroup, annotation.targetObject)
      
      if (targetObject) {
        // Force update world matrix hierarchy
        targetObject.updateMatrixWorld(true)
        
        const objectPosition = new THREE.Vector3()
        targetObject.getWorldPosition(objectPosition)
        
        console.log('[AnnotationMarker] Using targetObject lookup:', annotation.targetObject)
        console.log('[AnnotationMarker] Object center position:', {
          x: objectPosition.x.toFixed(2),
          y: objectPosition.y.toFixed(2),
          z: objectPosition.z.toFixed(2)
        })
        
        const direction = getDirectionVector(annotation.direction || 'up')
        const offset = annotation.offset || 2.0
        const directionVector = direction.clone().normalize()
        
        const arrowPosition = objectPosition.clone().add(directionVector.multiplyScalar(offset))
        
        const arrowOffset = annotation.arrowOffset || { x: 0, y: 0, z: 0 }
        arrowPosition.x += arrowOffset.x || 0
        arrowPosition.y += arrowOffset.y || 0
        arrowPosition.z += arrowOffset.z || 0
        
        console.log('[AnnotationMarker] Final arrow position:', {
          x: arrowPosition.x.toFixed(2),
          y: arrowPosition.y.toFixed(2),
          z: arrowPosition.z.toFixed(2)
        })
        
        arrowPositionRef.current = arrowPosition
      }
    }
  }, [annotation.targetObject, annotation.offset, annotation.direction, annotation.arrowOffset, annotation.position, modelGroup])

  useFrame(({ camera }) => {
    if (labelRef.current && meshRef.current) {
      // Make text always face camera
      labelRef.current.quaternion.copy(camera.quaternion)
      
      // Scale text based on distance from camera - with custom label size multiplier
      const distance = camera.position.distanceTo(meshRef.current.position)
      const labelSize = annotation.labelSize || 1.0
      const scale = Math.max(0.15, distance * 0.008) * labelSize
      labelRef.current.scale.setScalar(scale)
    }
  })

  const arrowPosition = arrowPositionRef.current
  
  if (!arrowPosition) return null

  // Calculate label position with custom offset
  const labelOffset = annotation.labelOffset || { x: 0, y: 0, z: 0 }
  const labelY = annotation.labelPosition === 'below' ? -0.5 : 1
  const labelPosition = [
    labelOffset.x || 0,
    labelY + (labelOffset.y || 0),
    labelOffset.z || 0
  ]

  return (
    <group position={[arrowPosition.x, arrowPosition.y, arrowPosition.z]}>
      {/* Arrow pointing down toward to button */}
      <group rotation={[0, 0, Math.PI]}>
        {/* Arrow shaft */}
        <mesh ref={meshRef}>
          <cylinderGeometry args={[0.1, 0.1, 2]} />
          <meshStandardMaterial color={annotation.color} />
        </mesh>
        
        {/* Arrow head */}
        <mesh position={[0, 1.2, 0]}>
          <coneGeometry args={[0.3, 0.6, 8]} />
          <meshStandardMaterial color={annotation.color} />
        </mesh>
      </group>
      
      {/* Label - positioned with custom offset option */}
      {labelTexture && (
        <mesh 
          position={labelPosition}
          ref={labelRef}
        >
          <planeGeometry args={[20, 5]} />
          <meshBasicMaterial 
            map={labelTexture} 
            transparent={true} 
            side={THREE.DoubleSide}
            depthTest={false}
          />
        </mesh>
      )}
    </group>
  )
})

function createLabelTexture(text, color) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 128
  const ctx = canvas.getContext('2d')
  
  // Background
  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  // Border
  ctx.strokeStyle = color
  ctx.lineWidth = 4
  ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4)
  
  // Text
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 36px Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, canvas.width / 2, canvas.height / 2)
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function CameraCapture({ cameraRef, controlsRef }) {
  useFrame(({ camera, controls }) => {
    if (camera && !cameraRef.current) {
      cameraRef.current = camera
    }
    if (controls && !controlsRef.current) {
      controlsRef.current = controls
    }
  })
  return null
}

export default function Model3DAnnotation({ model, annotations, cameraPosition, position = 'flat' }) {
  const [parsedAnnotations, setParsedAnnotations] = React.useState([])
  const [parsedCamera, setParsedCamera] = React.useState({ x: 0, y: 0, z: 50 })
  const [modelReady, setModelReady] = React.useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const cameraRef = useRef()
  const controlsRef = useRef()
  const modelGroupRef = useRef()

  // Detect theme changes
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark') || 
                       window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDarkMode(isDark)
    }

    // Initial check
    checkTheme()

    // Listen for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', checkTheme)

    return () => {
      observer.disconnect()
      mediaQuery.removeEventListener('change', checkTheme)
    }
  }, [])

  useEffect(() => {
    try {
      if (annotations) {
        const parsed = JSON.parse(annotations)
        setParsedAnnotations(parsed)
      } else {
        setParsedAnnotations([])
      }
      
      if (cameraPosition) {
        const parsed = JSON.parse(cameraPosition)
        setParsedCamera(parsed)
      } else {
        setParsedCamera({ x: 0, y: 0, z: 50 })
      }
    } catch (error) {
      console.error('Error parsing annotations/camera:', error)
      setParsedAnnotations([])
      setParsedCamera({ x: 0, y: 0, z: 50 })
    }
  }, [annotations, cameraPosition])

  // Handle keyboard events for camera capture
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'c' || event.key === 'C') {
        if (cameraRef.current) {
          const pos = cameraRef.current.position
          const cameraPos = {
            x: parseFloat(pos.x.toFixed(2)),
            y: parseFloat(pos.y.toFixed(2)),
            z: parseFloat(pos.z.toFixed(2))
          }
          
          console.log('='.repeat(60))
          console.log('Current Camera Position captured!')
          console.log('Camera Position:', cameraPos)
          console.log('='.repeat(60))
          console.log('\nCopy this for your data-camera attribute:')
          console.log(`{"x": ${cameraPos.x}, "y": ${cameraPos.y}, "z": ${cameraPos.z}}`)
          console.log()
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  const handleReset = () => {
    if (!cameraRef.current) return
    
    const targetPosition = new THREE.Vector3(parsedCamera.x, parsedCamera.y, parsedCamera.z)
    const startPosition = cameraRef.current.position.clone()
    const duration = 500
    const startTime = Date.now()
    
    function animate() {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      const ease = 1 - Math.pow(1 - progress, 3)
      
      cameraRef.current.position.lerpVectors(startPosition, targetPosition, ease)
      cameraRef.current.lookAt(0, 0, 0)
      
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0, 0)
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    animate()
  }

  return (
    <div className="relative w-full h-96 my-6 rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-700">
      {/* Reset Camera Button */}
      <button
        onClick={handleReset}
        className="absolute top-4 left-4 z-10 p-2 rounded-lg bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        title="Reset camera to initial position"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-neutral-700 dark:text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </button>
      
      {/* Click hint */}
      <div className="absolute bottom-4 left-4 z-10 px-3 py-2 rounded-lg bg-black/80 dark:bg-white/80 backdrop-blur-sm border border-neutral-600 dark:border-neutral-400">
        <p className="text-xs text-white dark:text-black font-medium">
          Click on model to identify object (F12 console)<br/>
          Press 'C' to capture camera position (F12 console)
        </p>
      </div>
      
      <Canvas
        camera={{ position: [parsedCamera.x, parsedCamera.y, parsedCamera.z], fov: 50 }}
        gl={{ antialias: true }}
        style={{ background: isDarkMode ? '#1a1a1a' : '#f5f5f5' }}
      >
        {/* Lighting setup matching PCBViewer */}
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        <Environment preset="city" backgroundIntensity={0.2} />
        
        <CameraCapture cameraRef={cameraRef} controlsRef={controlsRef} />
        
        <Model 
          url={model} 
          annotations={parsedAnnotations} 
          cameraPosition={parsedCamera}
          position={position}
          setModelGroup={modelGroupRef}
          setModelReady={setModelReady}
        />
        
        {modelReady && parsedAnnotations.map((annotation, index) => (
          <AnnotationMarker
            key={`${annotation.targetObject}-${index}`}
            modelGroup={modelGroupRef}
            annotation={annotation}
          />
        ))}
        
        <OrbitControls enableDamping dampingFactor={0.05} />
      </Canvas>
    </div>
  )
}