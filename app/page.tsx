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
      {/* Hero Section - Pink & White Theme */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-pink-50/30 to-pink-100/40">
        {/* Animated Pink Background Blobs */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-10 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, -60, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-pink-300/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, 60, 0],
              y: [0, -40, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"
          />
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100 }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                y: [0, -30, 0],
                x: [0, Math.sin(i) * 20, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
              className="absolute"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 30}%`,
              }}
            >
              <div className="w-2 h-2 bg-pink-400/40 rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* Floating Images with Enhanced Animations */}
        <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none hidden lg:block">
          {/* Left Image - Café Interior */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotate: -15 }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              rotate: -6,
              y: [0, -20, 0],
            }}
            transition={{ 
              duration: 1.2, 
              delay: 0.4,
              y: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }
            }}
            className="absolute top-24 left-8 xl:left-16 w-64 h-80 xl:w-80 xl:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 backdrop-blur-sm"
          >
            <ImageLoader 
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=95" 
              alt="Luxe café barista counter" 
              fill 
              className="object-cover" 
              priority 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 via-transparent to-transparent" />
          </motion.div>

          {/* Right Image - Food Bowl */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotate: 15 }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              rotate: 6,
              y: [0, 20, 0],
            }}
            transition={{ 
              duration: 1.2, 
              delay: 0.6,
              y: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }
            }}
            className="absolute bottom-24 right-8 xl:right-16 w-64 h-80 xl:w-80 xl:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 backdrop-blur-sm"
          >
            <ImageLoader 
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=95" 
              alt="Curated food selection" 
              fill 
              className="object-cover" 
              priority 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 via-transparent to-transparent" />
          </motion.div>
        </div>
        
        {/* Main Content */}
        <div className="relative z-10 container text-center px-4 py-20">
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 rounded-full border-2 border-pink-300 bg-white/80 backdrop-blur-md px-6 py-2.5 mb-8 shadow-lg"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-4 w-4 text-pink-500" />
            </motion.div>
            <span className="text-sm font-semibold text-pink-600 uppercase tracking-wider">Premium Experience</span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <GlitchEffect>
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 leading-tight"
              >
                <motion.span
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="block bg-gradient-to-r from-pink-500 via-pink-600 to-primary bg-clip-text text-transparent"
                >
                  Welcome to
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="block bg-gradient-to-r from-primary via-pink-500 to-pink-400 bg-clip-text text-transparent mt-2"
                >
                  Café Luxe
                </motion.span>
              </motion.h1>
            </GlitchEffect>
          </motion.div>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Experience the finest café dining with our curated menu and exceptional service
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Link href="/menu">
                <Button 
                  size="lg" 
                  className="text-lg px-8 md:px-10 py-6 bg-gradient-to-r from-pink-500 via-pink-600 to-primary hover:from-pink-600 hover:via-pink-700 hover:to-primary/90 text-white shadow-xl hover:shadow-2xl hover:shadow-pink-500/50 transition-all rounded-full border-2 border-pink-400/30 group"
                >
                  <span className="flex items-center">
                    View Menu
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </motion.span>
                  </span>
                </Button>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <Link href="/booking">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 md:px-10 py-6 border-2 border-pink-400 hover:bg-pink-50 hover:border-pink-500 text-pink-600 backdrop-blur-sm transition-all rounded-full bg-white/80 shadow-lg hover:shadow-xl"
                >
                  Book a Table
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-pink-400/50 rounded-full flex justify-center p-2 bg-white/50 backdrop-blur-sm"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-pink-500 rounded-full"
            />
          </motion.div>
        </motion.div>
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

