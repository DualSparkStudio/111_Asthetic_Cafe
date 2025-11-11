"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Coffee, Clock, MapPin, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { ImageLoader } from '@/components/image-loader'
import { GlitchEffect } from '@/components/glitch-effect'
import { ScrollAnimation, ParallaxScroll } from '@/components/scroll-animation'

const floatingImages = [
  {
    src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=95',
    alt: 'Luxe café barista counter',
    className:
      'absolute top-20 left-10 w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl transform rotate-6',
  },
  {
    src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=95',
    alt: 'Curated pastry selection',
    className:
      'absolute bottom-20 right-10 w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl transform -rotate-6',
  },
  {
    src: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=95',
    alt: 'Ambient lounge lighting',
    className:
      'absolute top-1/2 right-20 w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-2xl transform rotate-12',
  },
];

const signatureScenes = [
  {
    title: 'Golden Hour Atrium',
    description: 'Sun-splashed marble surfaces and cascading greenery crafted for immersive arrival moments.',
    image: 'https://images.unsplash.com/photo-1497644083578-611b798c60f1?auto=format&fit=crop&w=1400&q=95',
  },
  {
    title: 'Barista Stage',
    description: 'Every pour choreographed beneath studio lighting for a hyper-real tasting ritual.',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1400&q=95',
  },
  {
    title: 'Velvet Lounge',
    description: 'Intimate seating vignettes rendered with plush textures and floating ambient light.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=95',
  },
  {
    title: "Chef's Gallery",
    description: 'An open kitchen framed by cinematic glass, showcasing culinary artistry in 3D.',
    image: 'https://images.unsplash.com/photo-1529010392921-13530992e4ab?auto=format&fit=crop&w=1400&q=95',
  },
];

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section with Realistic Images */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Images with Parallax */}
        <div className="absolute inset-0 z-0">
          <ParallaxScroll speed={0.3}>
            <div className="relative w-full h-full">
              <ImageLoader
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2200&q=95"
                alt="Immersive café interior bathed in warm light"
                fill
                className="object-cover opacity-80"
                priority
              />
            </div>
          </ParallaxScroll>
        </div>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-br from-black/70 via-black/50 to-black/30" />
        
        {/* Floating Images with Scroll Animations */}
        <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
          {floatingImages.map((image, index) => (
            <ScrollAnimation key={image.src} direction="scale" delay={0.2 + index * 0.2} amount={0.1}>
              <div className={image.className}>
                <ImageLoader src={image.src} alt={image.alt} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-white/25 via-transparent to-transparent" />
              </div>
            </ScrollAnimation>
          ))}
        </div>
        
        {/* Content */}
        <div className="relative z-10 container text-center px-4">
          <ScrollAnimation direction="fade" delay={0.3} amount={0.2}>
            <GlitchEffect>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-pink-600 to-primary bg-clip-text text-transparent animate-gradient">
                Welcome to Café Luxe
              </h1>
            </GlitchEffect>
          </ScrollAnimation>
          
          <ScrollAnimation direction="up" delay={0.5} amount={0.2}>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the finest café dining with our curated menu and exceptional service
            </p>
          </ScrollAnimation>
          
          <ScrollAnimation direction="up" delay={0.7} amount={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/menu">
                  <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-primary to-pink-600 hover:from-primary/90 hover:to-pink-600/90 text-white shadow-lg hover:shadow-xl transition-all">
                    View Menu
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/booking">
                  <Button size="lg" variant="outline" className="text-lg px-8 border-2 border-primary hover:bg-primary hover:text-white transition-all">
                    Book a Table
                  </Button>
                </Link>
              </motion.div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-pink-50/50 to-accent/10">
        <div className="container">
          <ScrollAnimation direction="fade" amount={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Coffee,
                title: 'Sensory Coffee',
                description: 'Single-origin micro-lots brewed with precision to capture every note.',
                image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=1200&q=95',
              },
              {
                icon: Clock,
                title: 'Seamless Service',
                description: 'Concierge-style experiences timed to the cadence of your day.',
                image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=95',
              },
              {
                icon: MapPin,
                title: 'Iconic Locale',
                description: 'A cinematic refuge in the heart of the city, curated for unforgettable gatherings.',
                image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=95',
              },
            ].map((feature, index) => (
              <ScrollAnimation
                key={feature.title}
                direction="up"
                delay={index * 0.2}
                amount={0.3}
              >
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="relative group"
                >
                <div className="relative h-64 overflow-hidden rounded-2xl mb-4 shadow-lg">
                  <ImageLoader
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                    >
                      <feature.icon className="h-12 w-12 text-white mx-auto" />
                    </motion.div>
                  </div>
                </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">{feature.title}</h3>
                  <p className="text-muted-foreground text-center">
                    {feature.description}
                  </p>
                </motion.div>
              </ScrollAnimation>
            ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-20 bg-gradient-to-br from-accent/20 to-primary/10">
        <div className="container">
          <ScrollAnimation direction="fade" amount={0.2}>
            <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-pink-600 bg-clip-text text-transparent">
              Follow Us on Instagram
            </h2>
            <p className="text-center text-muted-foreground mb-12">@cafeluxe</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'https://images.unsplash.com/photo-1481068164146-e8beb686f4d2?auto=format&fit=crop&w=900&q=95',
                'https://images.unsplash.com/photo-1615880484746-a134be9d01c0?auto=format&fit=crop&w=900&q=95',
                'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=95',
                'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=95',
              ].map((image, index) => (
                <ScrollAnimation
                  key={index}
                  direction="scale"
                  delay={index * 0.1}
                  amount={0.3}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="relative aspect-square overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
                  >
                  <ImageLoader
                    src={image}
                    alt={`Instagram post ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Instagram className="h-10 w-10 text-white" />
                    </div>
                  </motion.div>
                </ScrollAnimation>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Signature Scenes */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container space-y-12">
          <ScrollAnimation direction="fade" amount={0.2}>
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 px-5 py-2 text-xs uppercase tracking-[0.35em] text-primary"
              >
                <Sparkles className="h-4 w-4" />
                Signature Scenes
              </motion.span>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-pink-600 to-primary bg-clip-text text-transparent">
                Moments that Feel Ultra-Real
              </h2>
              <p className="text-muted-foreground">
                Step inside curated worlds where light, texture, and craft align to transform a café visit into a cinematic experience.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-12">
            {signatureScenes.map((scene, index) => (
              <ScrollAnimation key={scene.title} direction="up" delay={index * 0.1} amount={0.25}>
                <motion.div
                  className="group relative h-80 md:h-96 overflow-hidden rounded-3xl shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <ImageLoader src={scene.image} alt={scene.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/25 via-white/5 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 space-y-2 text-white">
                    <h3 className="text-2xl font-semibold">{scene.title}</h3>
                    <p className="text-sm text-white/80">{scene.description}</p>
                  </div>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function Instagram({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

