'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function VFXBackground() {
  const mountRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    // Advanced lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight1 = new THREE.DirectionalLight(0xff6b9d, 0.8)
    directionalLight1.position.set(5, 5, 5)
    scene.add(directionalLight1)

    const directionalLight2 = new THREE.DirectionalLight(0xec4899, 0.6)
    directionalLight2.position.set(-5, 3, -5)
    scene.add(directionalLight2)

    const pointLight = new THREE.PointLight(0xffffff, 1, 100)
    pointLight.position.set(0, 0, 5)
    scene.add(pointLight)

    // Advanced particle system
    const particleCount = 500
    const particles = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    const color1 = new THREE.Color(0xff6b9d)
    const color2 = new THREE.Color(0xec4899)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Position
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 20

      // Color mix
      const mixedColor = color1.clone().lerp(color2, Math.random())
      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b

      // Size
      sizes[i] = Math.random() * 3 + 1
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        uniform float pixelRatio;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * pixelRatio * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
      transparent: true,
      vertexColors: true,
    })

    const particleSystem = new THREE.Points(particles, particleMaterial)
    scene.add(particleSystem)

    // Floating geometric shapes
    const shapes: THREE.Mesh[] = []
    const shapeGeometry = new THREE.IcosahedronGeometry(0.5, 0)
    
    for (let i = 0; i < 10; i++) {
      const material = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0xff6b9d : 0xec4899,
        metalness: 0.7,
        roughness: 0.3,
        transparent: true,
        opacity: 0.3,
      })
      
      const shape = new THREE.Mesh(shapeGeometry, material)
      shape.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      )
      shape.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )
      scene.add(shape)
      shapes.push(shape)
    }

    camera.position.z = 5
    camera.position.y = 1

    let time = 0
    const animate = () => {
      time += 0.01
      animationRef.current = requestAnimationFrame(animate)

      // Animate particles
      particleMaterial.uniforms.time.value = time
      particleSystem.rotation.y += 0.001
      
      const positions = particles.attributes.position.array as Float32Array
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(time + i) * 0.005
      }
      particles.attributes.position.needsUpdate = true

      // Animate shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.005 + index * 0.001
        shape.rotation.y += 0.01 + index * 0.001
        shape.position.y += Math.sin(time + index) * 0.01
        shape.position.x += Math.cos(time + index * 0.5) * 0.01
      })

      // Animate camera
      camera.position.x = Math.sin(time * 0.3) * 0.5
      camera.position.y = 1 + Math.cos(time * 0.2) * 0.3
      camera.lookAt(0, 0, 0)

      // Animate lights
      pointLight.position.x = Math.sin(time) * 3
      pointLight.position.y = Math.cos(time) * 3

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      particleMaterial.uniforms.pixelRatio.value = Math.min(window.devicePixelRatio, 2)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (mountRef.current && renderer.domElement.parentNode) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      particleMaterial.dispose()
      particles.dispose()
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" />
}

