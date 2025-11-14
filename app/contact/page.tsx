'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Sparkles } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { motion } from 'framer-motion'
import { ScrollAnimation } from '@/components/scroll-animation'
import { ImageLoader } from '@/components/image-loader'

const contactImages = [
  'https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=1000&q=95',
  'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=1000&q=95',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=95',
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
      {/* Hero Section - Pink & White Theme */}
      <section className="relative h-[55vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-pink-50/30 to-pink-100/40">
        {/* Animated Pink Background Blobs */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 75, 0],
              y: [0, 38, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 17,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-10 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -58, 0],
              y: [0, -48, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 21,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-pink-300/30 rounded-full blur-3xl"
          />
        </div>

        {/* Background Image with Light Overlay */}
        <div className="absolute inset-0 z-[1]">
          <div className="relative h-full w-full">
            <ImageLoader
              src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=2200&q=95"
              alt="Luxurious café counter at dusk"
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-pink-50/40 to-white/60" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 container text-center space-y-5"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border-2 border-pink-300 bg-white/80 backdrop-blur-md px-5 py-2.5 text-xs uppercase tracking-[0.35em] text-pink-600 shadow-lg"
          >
            Say Hello
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-pink-600 to-primary bg-clip-text text-transparent"
          >
            Contact Café Luxe
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto max-w-xl text-base md:text-lg text-gray-700"
          >
            We are here to curate unforgettable moments — let us know how we can elevate your next visit, event, or
            collaboration.
          </motion.p>
        </motion.div>
      </section>

      <div className="container py-16 space-y-12">
        {/* Contact Information Cards */}
        <ScrollAnimation direction="fade" amount={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/90 backdrop-blur rounded-2xl p-6 border-2 border-pink-100 hover:border-pink-300 transition-all shadow-lg hover:shadow-xl group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 border-2 border-pink-300 group-hover:bg-pink-200 transition-colors">
                  <MapPin className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900">Location</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                123 Aurora Avenue<br />
                Luxe District, New York
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/90 backdrop-blur rounded-2xl p-6 border-2 border-pink-100 hover:border-pink-300 transition-all shadow-lg hover:shadow-xl group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 border-2 border-pink-300 group-hover:bg-pink-200 transition-colors">
                  <Phone className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900">Phone</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">+1 (555) 987-0034</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/90 backdrop-blur rounded-2xl p-6 border-2 border-pink-100 hover:border-pink-300 transition-all shadow-lg hover:shadow-xl group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 border-2 border-pink-300 group-hover:bg-pink-200 transition-colors">
                  <Mail className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900">Email</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">hello@cafeluxe.com</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/90 backdrop-blur rounded-2xl p-6 border-2 border-pink-100 hover:border-pink-300 transition-all shadow-lg hover:shadow-xl group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 border-2 border-pink-300 group-hover:bg-pink-200 transition-colors">
                  <Clock className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900">Hours</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">
                Mon-Fri: 8AM-11PM<br />
                Sat-Sun: 9AM-Midnight
              </p>
            </motion.div>
          </div>
        </ScrollAnimation>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Form */}
          <ScrollAnimation direction="up" amount={0.3} className="lg:col-span-2">
            <Card className="border-2 border-pink-200 bg-white/90 backdrop-blur shadow-xl">
              <CardHeader className="bg-gradient-to-r from-pink-50 to-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-2xl font-semibold text-pink-600">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 border-2 border-pink-300">
                    <MessageCircle className="h-6 w-6 text-pink-600" />
                  </div>
                  Send us a Message
                </CardTitle>
                <p className="text-sm text-gray-600 mt-2">
                  We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-700 font-medium">Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-700 font-medium">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-gray-700 font-medium">Message *</Label>
                    <textarea
                      id="message"
                      required
                      rows={8}
                      className="flex min-h-[150px] w-full rounded-md border border-pink-200 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:border-pink-400 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-pink-500 via-pink-600 to-primary hover:from-pink-600 hover:via-pink-700 hover:to-primary/90 text-white shadow-lg hover:shadow-xl transition-all group"
                    size="lg"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Send Message
                      <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Additional Content Below Form */}
            <ScrollAnimation direction="up" amount={0.3} delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {/* FAQ Section */}
                <Card className="border-2 border-pink-200 bg-white/90 backdrop-blur shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-pink-600">Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">How quickly will I receive a response?</h4>
                        <p className="text-sm text-gray-600">We typically respond within 24 hours during business days.</p>
                      </div>
                      <div className="h-px bg-pink-100" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Can I visit without a reservation?</h4>
                        <p className="text-sm text-gray-600">Walk-ins are welcome, but reservations are recommended for peak hours.</p>
                      </div>
                      <div className="h-px bg-pink-100" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Do you host private events?</h4>
                        <p className="text-sm text-gray-600">Yes! Contact us for information about private dining and event bookings.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media & Quick Links */}
                <Card className="border-2 border-pink-200 bg-gradient-to-br from-pink-50/50 to-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-pink-600">Connect With Us</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-700 mb-4">Follow us on social media for the latest updates, special offers, and behind-the-scenes content.</p>
                      <div className="flex gap-3">
                        <motion.a
                          href="https://instagram.com/cafeluxe"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white shadow-lg hover:shadow-xl transition-all"
                        >
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        </motion.a>
                        <motion.a
                          href="https://facebook.com/cafeluxe"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all"
                        >
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        </motion.a>
                        <motion.a
                          href="https://twitter.com/cafeluxe"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500 text-white shadow-lg hover:shadow-xl transition-all"
                        >
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        </motion.a>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-pink-200">
                      <p className="text-xs text-gray-600">
                        <strong>Quick Links:</strong> <a href="/menu" className="text-pink-600 hover:underline">Menu</a> • <a href="/booking" className="text-pink-600 hover:underline">Reservations</a> • <a href="/gallery" className="text-pink-600 hover:underline">Gallery</a>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollAnimation>
          </ScrollAnimation>

          {/* Right Column - Images & Additional Info */}
          <div className="space-y-6">
            <ScrollAnimation direction="left" amount={0.3}>
              <div className="space-y-6">
                {contactImages.map((image, index) => (
                  <motion.div
                    key={image}
                    className="relative h-48 md:h-56 rounded-3xl overflow-hidden shadow-2xl border-2 border-pink-100 hover:border-pink-300 transition-all group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <ImageLoader src={image} alt={`Café Luxe ambience ${index + 1}`} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-600/50 via-pink-500/30 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-30 transition-opacity" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="text-sm font-medium tracking-wide text-white drop-shadow-lg">Ultra-realistic ambience</span>
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollAnimation>

            {/* Additional Info Card */}
            <ScrollAnimation direction="left" amount={0.3} delay={0.2}>
              <Card className="border-2 border-pink-200 bg-gradient-to-br from-pink-50/50 to-white shadow-lg">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 border-2 border-pink-300">
                        <Sparkles className="h-5 w-5 text-pink-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-pink-600">Visit Our Lounge</h3>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Nestled in the heart of the city, Café Luxe captures the glow of golden hour all day long. 
                      Experience our ultra-realistic ambiance and exceptional service.
                    </p>
                    <div className="pt-4 border-t border-pink-200">
                      <p className="text-xs text-gray-600">
                        <strong>Response Time:</strong> We typically respond within 24 hours during business days.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </div>
  )
}

