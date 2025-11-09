'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Coffee, Heart, Award, Users } from 'lucide-react'
import { ScrollAnimation } from '@/components/scroll-animation'

export default function AboutPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-pink-50 to-accent/20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-pink-600 to-primary bg-clip-text text-transparent animate-gradient">
            About Café Luxe
          </h1>
        </motion.div>
      </section>

      <div className="container py-12">
        <ScrollAnimation direction="fade" amount={0.2}>
          <div className="max-w-4xl mx-auto">

        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-lg text-muted-foreground mb-6">
            Welcome to Café Luxe, where passion meets perfection. We are dedicated to
            providing you with an exceptional café experience that combines the finest
            ingredients, expert craftsmanship, and warm hospitality.
          </p>

          <p className="text-lg text-muted-foreground mb-6">
            Our journey began with a simple vision: to create a space where people can
            come together, enjoy delicious food and beverages, and create lasting memories.
            Every cup of coffee, every dish, and every interaction is crafted with care
            and attention to detail.
          </p>
        </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { icon: Coffee, title: "Premium Coffee", description: "Sourced from the world's finest coffee regions" },
                { icon: Heart, title: "Made with Love", description: "Every dish prepared with passion and care" },
                { icon: Award, title: "Award Winning", description: "Recognized for excellence in hospitality" },
                { icon: Users, title: "Community", description: "A place where friends and families gather" },
              ].map((feature, index) => (
                <ScrollAnimation
                  key={feature.title}
                  direction="scale"
                  delay={index * 0.1}
                  amount={0.3}
                >
                  <Card>
                    <CardContent className="p-6 text-center">
                      <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  )
}

