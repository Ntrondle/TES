'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'

function Model({ url, annotations, cameraPosition, onObjectClick, setModelGroup, setModelReady }) {
  const group = useRef()
  const { scene, error } = useGLTF(url)
  
  useEffect(() => {
    if (group.current && scene) {
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
      
      console.log('Model size:', size)
      console.log('Model center:', center)
      
      // Center model
      clonedScene.position.x += (clonedScene.position.x - center.x)
      clonedScene.position.y += (clonedScene.position.y - center.y)
      clonedScene.position.z += (clonedScene.position.z - center.z)
      
      // Rotate model to lay flat facing camera
      clonedScene.rotation.x = Math.PI / 2 // Rotate 90 degrees on X-axis
      
      // Scale to fit in view (max dimension = 20 units)
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = maxDim > 0 ? 20 / maxDim : 1
      clonedScene.scale.setScalar(scale)
      
      console.log('Model scale:', scale)
      
      group.current.add(clonedScene)
      
      // Store reference in ref
      if (setModelGroup) {
        setModelGroup.current = group
        console.log('Model group stored in ref')
        
        // List all objects with names
        const namedObjects = []
        group.current.traverse((obj) => {
          if (obj.name && obj.name !== '') {
            namedObjects.push(obj.name)
          }
        })
        console.log('Named objects in model:', namedObjects)
      }
      
      // Mark model as ready
      if (setModelReady) {
        setModelReady(true)
        console.log('Model ready, can now render annotations')
      }
    }
  }, [scene, setModelGroup])

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
    console.log('\nCopy this for your annotation:')
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
}

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
  console.log(`Looking for object: "${name}"`)
  
  if (!scene || typeof scene.traverse !== 'function') {
    console.log('Invalid scene object')
    return null
  }
  
  let foundObject = null
  
  scene.traverse((object) => {
    if (object.name === name) {
      foundObject = object
      console.log(`Found object: "${name}"`, object)
    }
  })
  
  if (!foundObject) {
    console.log(`Object not found: "${name}"`)
  }
  
  return foundObject
}

function AnnotationMarker({ modelGroup, annotation }) {
  const meshRef = useRef()
  const labelRef = useRef()
  const [labelTexture, setLabelTexture] = React.useState(null)
  
  // Create texture once when component mounts
  useEffect(() => {
    console.log('Creating label texture for:', annotation.label)
    const texture = createLabelTexture(annotation.label, annotation.color)
    setLabelTexture(texture)
  }, [annotation.label, annotation.color])

  // Get arrow position based on object
  const getArrowPosition = () => {
    console.log(`Processing annotation: ${annotation.label}`)
    console.log('Annotation data:', annotation)
    
    // Get the actual group from the ref
    const actualGroup = modelGroup.current?.current
    console.log('modelGroup.current:', modelGroup.current)
    console.log('actualGroup:', actualGroup)
    
    // Check if using object-based or coordinate-based annotation
    if (annotation.targetObject && actualGroup) {
      const targetObject = findObjectByName(actualGroup, annotation.targetObject)
      
      if (targetObject) {
        // Get world position of object
        const objectPosition = new THREE.Vector3()
        targetObject.getWorldPosition(objectPosition)
        
        console.log('Object world position:', objectPosition)
        
        // Calculate arrow position
        const direction = getDirectionVector(annotation.direction || 'up')
        const offset = annotation.offset || 2.0
        const directionVector = direction.clone().normalize()
        
        const arrowPosition = objectPosition.clone().add(directionVector.multiplyScalar(offset))
        console.log('Calculated arrow position:', arrowPosition)
        
        // Apply custom arrow offset (allows offsetting arrow relative to object)
        const arrowOffset = annotation.arrowOffset || { x: 0, y: 0, z: 0 }
        arrowPosition.x += arrowOffset.x || 0
        arrowPosition.y += arrowOffset.y || 0
        arrowPosition.z += arrowOffset.z || 0
        
        console.log('Applied arrow offset:', arrowOffset)
        console.log('Final arrow position:', arrowPosition)
        
        return arrowPosition
      }
      
      // Object not found, don't render
      console.log('Object not found, skipping arrow')
      return null
    }
    
    if (!actualGroup) {
      console.log('modelGroup not available yet')
    }
    
    // Coordinate-based annotation (fallback)
    if (annotation.position) {
      console.log('Using coordinate-based annotation')
      const coordPosition = new THREE.Vector3(annotation.position.x, annotation.position.y, annotation.position.z)
      
      // Apply custom arrow offset to coordinate-based annotations too
      const arrowOffset = annotation.arrowOffset || { x: 0, y: 0, z: 0 }
      coordPosition.x += arrowOffset.x || 0
      coordPosition.y += arrowOffset.y || 0
      coordPosition.z += arrowOffset.z || 0
      
      console.log('Applied arrow offset to coordinates:', arrowOffset)
      
      return coordPosition
    }
    
    console.log('No valid annotation data, skipping')
    return null
  }

  useFrame(({ camera }) => {
    if (labelRef.current && meshRef.current) {
      // Make text always face camera
      labelRef.current.quaternion.copy(camera.quaternion)
      
      // Scale text based on distance from camera - with custom label size multiplier
      const distance = camera.position.distanceTo(meshRef.current.position)
      const labelSize = annotation.labelSize || 1.0  // Default to 1.0 (100% size)
      const scale = Math.max(0.15, distance * 0.008) * labelSize
      labelRef.current.scale.setScalar(scale)
    }
  })

  const arrowPosition = getArrowPosition()
  
  if (!arrowPosition) return null

  console.log(`Rendering arrow for: ${annotation.label} at`, arrowPosition)

  // Calculate label position with custom offset - further from arrow tip
  const labelOffset = annotation.labelOffset || { x: 0, y: 0, z: 0 }
  // Arrow points down (rotated 180deg), tip is at y=-1.8
  // Label sits further away from the tip for better spacing
  const labelY = annotation.labelPosition === 'below' ? -0.5 : 1
  const labelPosition = [
    labelOffset.x || 0,
    labelY + (labelOffset.y || 0),
    labelOffset.z || 0
  ]

  return (
    <group position={[arrowPosition.x, arrowPosition.y, arrowPosition.z]}>
      {/* Arrow pointing down toward the button */}
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
}

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

export default function Model3DAnnotation({ model, annotations, cameraPosition }) {
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

  React.useEffect(() => {
    try {
      if (annotations) {
        const parsed = JSON.parse(annotations)
        console.log('Parsed annotations:', parsed)
        setParsedAnnotations(parsed)
      } else {
        console.log('No annotations provided')
        setParsedAnnotations([])
      }
      
      if (cameraPosition) {
        const parsed = JSON.parse(cameraPosition)
        console.log('Parsed camera:', parsed)
        setParsedCamera(parsed)
      } else {
        console.log('No camera position provided, using default')
        setParsedCamera({ x: 0, y: 0, z: 50 })
      }
    } catch (error) {
      console.error('Error parsing annotations/camera:', error)
      setParsedAnnotations([])
      setParsedCamera({ x: 0, y: 0, z: 50 })
    }
  }, [annotations, cameraPosition])

  // Handle keyboard events for camera capture
  React.useEffect(() => {
    const handleKeyPress = (event) => {
      // Press 'c' or 'C' to capture camera position
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

  console.log('='.repeat(60))
  console.log('Model3DAnnotation component initialized')
  console.log('Model URL:', model)
  console.log('Annotations:', parsedAnnotations)
  console.log('Camera position:', parsedCamera)
  console.log('='.repeat(60))

  const handleReset = () => {
    if (!cameraRef.current) return
    
    const targetPosition = new THREE.Vector3(parsedCamera.x, parsedCamera.y, parsedCamera.z)
    const startPosition = cameraRef.current.position.clone()
    const duration = 500 // 500ms animation
    const startTime = Date.now()
    
    function animate() {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Ease out cubic
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
          setModelGroup={modelGroupRef}
          setModelReady={setModelReady}
        />
        
        {modelReady && parsedAnnotations.map((annotation, index) => (
          <AnnotationMarker
            key={index}
            modelGroup={modelGroupRef}
            annotation={annotation}
          />
        ))}
        
        <OrbitControls enableDamping dampingFactor={0.05} />
      </Canvas>
    </div>
  )
}
