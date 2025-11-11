'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { motion } from 'framer-motion'
import { ScrollAnimation } from '@/components/scroll-animation'
import { ImageLoader } from '@/components/image-loader'

const contactImages = [
  'https://source.unsplash.com/900x1200/?3d,coffee-lounge',
  'https://source.unsplash.com/900x1200/?3d,coffee-table',
  'https://source.unsplash.com/900x1200/?3d,cafe-interior',
]

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Message sent!',
      description: 'We will get back to you soon.',
    })
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="relative">
      {/* Hero with immersive imagery */}
      <section className="relative h-[55vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="relative h-full w-full">
            <ImageLoader
              src="https://source.unsplash.com/2200x1200/?3d,coffee-resort"
              alt="Luxurious 3D café counter at dusk"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/0 to-white/50" />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container text-center text-white space-y-5"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.35em] backdrop-blur"
          >
            Say Hello
          </motion.span>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-pink-200 to-white bg-clip-text text-transparent">
            Contact Café Luxe
          </h1>
          <p className="mx-auto max-w-xl text-base md:text-lg text-white/80">
            We are here to curate unforgettable moments — let us know how we can elevate your next visit, event, or
            collaboration.
          </p>
        </motion.div>
      </section>

      <div className="container py-16 space-y-16">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 items-start">
          <ScrollAnimation direction="right" amount={0.3}>
            <Card className="xl:col-span-1 border-primary/20 bg-white/80 backdrop-blur">
              <CardHeader className="space-y-3">
                <CardTitle className="text-2xl font-semibold">Visit our Ultra-Realistic Lounge</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Nestled in the heart of the city, Café Luxe captures the glow of golden hour all day long.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Flagship Location</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      123 Aurora Avenue
                      <br />
                      Luxe District, New York
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Concierge</h3>
                    <p className="text-muted-foreground leading-relaxed">+1 (555) 987-0034</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Collaborations</h3>
                    <p className="text-muted-foreground leading-relaxed">hello@cafeluxe.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Golden Hour Hours</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Weekdays: 8:00 AM – 11:00 PM
                      <br />
                      Weekends: 9:00 AM – Midnight
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation direction="up" amount={0.3} className="xl:col-span-2">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3">
                <Card className="border-primary/10 bg-white/80 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold">Send us a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <textarea
                          id="message"
                          required
                          rows={6}
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2 space-y-6">
                {contactImages.map((image, index) => (
                  <motion.div
                    key={image}
                    className="relative h-48 md:h-56 rounded-3xl overflow-hidden shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <ImageLoader src={image} alt={`Café Luxe ambience ${index + 1}`} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/25 via-white/5 to-transparent" />
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  )
}

