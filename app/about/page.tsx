'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Coffee, Heart, Award, Users } from 'lucide-react'
import { ScrollAnimation } from '@/components/scroll-animation'
import { ImageLoader } from '@/components/image-loader'

const storySections = [
  {
    title: 'Crafting Immersive Moments',
    description:
      'Every corner of Café Luxe is curated to feel cinematic yet comforting. From the glow of filament lights to the aroma of freshly ground beans, our space is designed as a sensory escape from the ordinary.',
    highlight:
      'Our baristas capture the soul of third-wave coffee culture with precision pours and slow-roasted single-origin beans.',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1600&q=95',
  },
  {
    title: 'From Farm to Cup',
    description:
      'We partner with small-batch growers who champion sustainable agriculture. Their dedication allows us to serve cups that are vibrant, ethical, and unmistakably luxurious.',
    highlight:
      'Each harvest is cupped multiple times before it reaches our menu, ensuring flawless flavor profiles that stay authentic to their origin.',
    image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=1600&q=95',
  },
  {
    title: 'Designing for Connection',
    description:
      'Café Luxe was imagined as an intimate stage for conversations, celebrations, and quiet reflection. The ambience blends warm textures, tactile surfaces, and dramatic lighting to make every visit feel like a private premiere.',
    highlight:
      'Our tables are handcrafted by local artisans, and each seating vignette is styled to create depth, warmth, and a sense of calm indulgence.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=95',
  },
]

const featureHighlights = [
  {
    icon: Coffee,
    title: 'Premium Coffee',
    description: "Sourced from the world's most celebrated micro-lots and roasted to reveal layered complexity.",
    image: 'https://images.unsplash.com/photo-1488036106564-87cfe0f7c46f?auto=format&fit=crop&w=1200&q=95',
  },
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Our culinary team approaches every plate as a work of art, balancing comfort with couture presentation.',
    image: 'https://images.unsplash.com/photo-1488747279002-c8523379faaa?auto=format&fit=crop&w=1200&q=95',
  },
  {
    icon: Award,
    title: 'Award Winning',
    description: 'Recognized for elevating café culture with immersive design, avant-garde menus, and standout service.',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=95',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'A gathering place where creators, innovators, and dreamers feel seen, celebrated, and inspired.',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=95',
  },
]

export default function AboutPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="relative h-full w-full">
            <ImageLoader
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2200&q=95"
              alt="Barista preparing an artisanal coffee"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/0 to-white/50" />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container text-center text-white space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-2 backdrop-blur-sm text-sm uppercase tracking-[0.3em]"
          >
            Crafted for the Senses
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-pink-200 to-white bg-clip-text text-transparent">
            About Café Luxe
          </h1>
          <p className="mx-auto max-w-2xl text-lg md:text-xl text-white/80">
            An ultra-realistic sanctuary where design, flavor, and atmosphere converge to orchestrate unforgettable
            café moments.
          </p>
        </motion.div>
      </section>

      {/* Story Sections */}
      <div className="container py-16 md:py-24 space-y-20">
        {storySections.map((section, index) => {
          const isEven = index % 2 === 0

          return (
            <ScrollAnimation key={section.title} direction={isEven ? 'left' : 'right'} amount={0.3}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                <div className={isEven ? 'order-2 md:order-1' : ''}>
                  <motion.span
                    initial={{ width: 0 }}
                    whileInView={{ width: '4rem' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="block h-1 rounded-full bg-gradient-to-r from-primary to-pink-500 mb-6"
                  />
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-pink-600 to-primary bg-clip-text text-transparent">
                    {section.title}
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                    {section.description}
                  </p>
                  <div className="rounded-2xl border border-primary/10 bg-primary/5 p-6 backdrop-blur">
                    <p className="text-sm md:text-base text-primary font-medium leading-relaxed">
                      {section.highlight}
                    </p>
                  </div>
                </div>

                <motion.div
                  className={`relative h-80 md:h-[26rem] rounded-3xl overflow-hidden shadow-2xl ${
                    isEven ? 'order-1 md:order-2' : ''
                  }`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <ImageLoader src={section.image} alt={section.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-white/5 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="rounded-full bg-white/80 px-6 py-2 text-sm font-semibold text-primary backdrop-blur"
                    >
                      Ultra-realistic ambience
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </ScrollAnimation>
          )
        })}
      </div>

      {/* Feature Highlights */}
      <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-pink-50/40 py-16 md:py-24">
        <div className="container space-y-12">
          <ScrollAnimation direction="fade" amount={0.2}>
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xs uppercase tracking-[0.4em] text-primary"
              >
                Immersion First
              </motion.span>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-pink-600 to-primary bg-clip-text text-transparent">
                The Luxe Experience
              </h2>
              <p className="text-muted-foreground">
                Ultra-realistic visuals and tactile details invite every guest to slow down, breathe deeply, and savor
                the art of café culture.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {featureHighlights.map((feature, index) => (
              <ScrollAnimation key={feature.title} direction="up" delay={index * 0.15} amount={0.3}>
                <Card className="overflow-hidden border-primary/10 bg-white/80 backdrop-blur transition-all duration-300 hover:border-primary/30 hover:shadow-2xl">
                  <div className="relative h-40">
                    <ImageLoader src={feature.image} alt={feature.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-white/5 to-transparent" />
                    <feature.icon className="absolute bottom-4 left-4 h-10 w-10 text-primary drop-shadow-lg" />
                  </div>
                  <CardContent className="p-6 text-center space-y-3">
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

