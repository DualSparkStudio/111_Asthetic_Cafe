'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Create coffee cup geometry
    const cupGeometry = new THREE.CylinderGeometry(1, 0.8, 1.5, 32)
    const cupMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b4513,
      metalness: 0.3,
      roughness: 0.7,
    })
    const cup = new THREE.Mesh(cupGeometry, cupMaterial)
    cup.position.set(-2, 0, 0)
    scene.add(cup)

    // Create steam particles
    const steamGeometry = new THREE.BufferGeometry()
    const steamCount = 50
    const positions = new Float32Array(steamCount * 3)

    for (let i = 0; i < steamCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 0.5
    }

    steamGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const steamMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    })
    const steam = new THREE.Points(steamGeometry, steamMaterial)
    steam.position.set(-2, 1, 0)
    scene.add(steam)

    // Create coffee bean
    const beanGeometry = new THREE.SphereGeometry(0.3, 16, 16)
    const beanMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a2c2a,
      roughness: 0.8,
    })
    const bean = new THREE.Mesh(beanGeometry, beanMaterial)
    bean.position.set(2, 0, 0)
    scene.add(bean)

    camera.position.z = 5
    camera.position.y = 1

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)

      cup.rotation.y += 0.01
      bean.rotation.x += 0.02
      bean.rotation.y += 0.01

      // Animate steam
      const positions = steam.geometry.attributes.position.array as Float32Array
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += 0.01
        if (positions[i] > 2) {
          positions[i] = 0
        }
      }
      steam.geometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0" />
}

