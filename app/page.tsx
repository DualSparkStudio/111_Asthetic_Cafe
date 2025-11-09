'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Coffee, Clock, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { ImageLoader } from '@/components/image-loader'
import { GlitchEffect } from '@/components/glitch-effect'
import { ScrollAnimation, ParallaxScroll } from '@/components/scroll-animation'

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
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&h=1080&fit=crop&q=90"
                alt="Café Interior"
                fill
                className="object-cover opacity-40"
                priority
              />
            </div>
          </ParallaxScroll>
        </div>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-br from-primary/20 via-background/80 to-pink-50/90" />
        
        {/* Floating Images with Scroll Animations */}
        <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
          <ScrollAnimation direction="scale" delay={0.2} amount={0.1}>
            <div className="absolute top-20 left-10 w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl transform rotate-6">
              <ImageLoader
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=800&fit=crop&q=90"
                alt="Coffee"
                fill
                className="object-cover"
                priority
              />
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation direction="scale" delay={0.4} amount={0.1}>
            <div className="absolute bottom-20 right-10 w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl transform -rotate-6">
              <ImageLoader
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&h=800&fit=crop&q=90"
                alt="Pastries"
                fill
                className="object-cover"
                priority
              />
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation direction="scale" delay={0.6} amount={0.1}>
            <div className="absolute top-1/2 right-20 w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-2xl transform rotate-12">
              <ImageLoader
                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=800&fit=crop&q=90"
                alt="Coffee Beans"
                fill
                className="object-cover"
                priority
              />
            </div>
          </ScrollAnimation>
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
                title: "Premium Coffee",
                description: "Sourced from the finest coffee beans around the world",
                image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200&h=800&fit=crop&q=90",
              },
              {
                icon: Clock,
                title: "Fast Delivery",
                description: "Get your favorite dishes delivered in no time",
                image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1200&h=800&fit=crop&q=90",
              },
              {
                icon: MapPin,
                title: "Prime Location",
                description: "Visit us at our beautiful location in the heart of the city",
                image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&h=800&fit=crop&q=90",
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
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
                "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=1200&fit=crop&q=90",
                "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&h=1200&fit=crop&q=90",
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=1200&fit=crop&q=90",
                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=1200&fit=crop&q=90",
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Instagram className="h-10 w-10 text-white" />
                    </div>
                  </motion.div>
                </ScrollAnimation>
              ))}
            </div>
          </ScrollAnimation>
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

