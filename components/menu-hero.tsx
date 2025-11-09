'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'

export default function MenuHero() {
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
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)

    // Add ambient and directional lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight1.position.set(5, 5, 5)
    scene.add(directionalLight1)

    const directionalLight2 = new THREE.DirectionalLight(0xff6b9d, 0.4)
    directionalLight2.position.set(-5, 3, -5)
    scene.add(directionalLight2)

    // Create floating food items
    const foods: THREE.Mesh[] = []

    // Coffee Cup
    const cupGeometry = new THREE.CylinderGeometry(0.8, 0.7, 1.2, 32)
    const cupMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b4513,
      metalness: 0.3,
      roughness: 0.7,
    })
    const cup = new THREE.Mesh(cupGeometry, cupMaterial)
    cup.position.set(-2, 0, 0)
    scene.add(cup)
    foods.push(cup)

    // Croissant
    const croissantGeometry = new THREE.TorusGeometry(0.6, 0.2, 16, 100, Math.PI * 2)
    const croissantMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      roughness: 0.8,
    })
    const croissant = new THREE.Mesh(croissantGeometry, croissantMaterial)
    croissant.position.set(2, 0, 0)
    croissant.rotation.x = Math.PI / 4
    scene.add(croissant)
    foods.push(croissant)

    // Coffee Bean
    const beanGeometry = new THREE.SphereGeometry(0.4, 16, 16)
    beanGeometry.scale(1.5, 1, 1)
    const beanMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a2c2a,
      roughness: 0.9,
    })
    const bean = new THREE.Mesh(beanGeometry, beanMaterial)
    bean.position.set(0, 0, -1)
    scene.add(bean)
    foods.push(bean)

    // Plate
    const plateGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.1, 32)
    const plateMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.3,
    })
    const plate = new THREE.Mesh(plateGeometry, plateMaterial)
    plate.position.set(0, -1.5, 0)
    scene.add(plate)

    // Add particles for ambiance
    const particleGeometry = new THREE.BufferGeometry()
    const particleCount = 100
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xff6b9d,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
    })
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    camera.position.z = 5
    camera.position.y = 1

    let time = 0
    const animate = () => {
      time += 0.01
      animationRef.current = requestAnimationFrame(animate)

      // Animate food items
      foods.forEach((food, index) => {
        food.rotation.y += 0.01
        food.position.y += Math.sin(time + index) * 0.005
        food.rotation.x += 0.005
      })

      // Rotate particles
      particles.rotation.y += 0.001

      // Animate camera
      camera.position.x = Math.sin(time * 0.5) * 0.5
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0" />
}

