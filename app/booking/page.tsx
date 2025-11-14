'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { Calendar, Sparkles, Clock, Users, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react'
import { ScrollAnimation } from '@/components/scroll-animation'
import { ImageLoader } from '@/components/image-loader'
import { motion } from 'framer-motion'

const ambienceImages = [
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1400&q=95',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=95',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=95',
]

export default function BookingPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    date: '',
    time: '',
    numberOfGuests: '2',
    specialRequests: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        console.error('Non-JSON response:', text)
        throw new Error('Server returned an invalid response. Please try again.')
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create booking')
      }

      toast({
        title: 'Booking confirmed!',
        description: `Your reservation for ${new Date(formData.date).toLocaleDateString()} at ${formData.time} has been confirmed. Booking ID: #${data.booking?.id || 'N/A'}`,
      })

      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        date: '',
        time: '',
        numberOfGuests: '2',
        specialRequests: '',
      })
    } catch (error: any) {
      toast({
        title: 'Booking failed',
        description: error.message || 'Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="relative">
      {/* Hero Section - Pink & White Theme */}
      <section className="relative h-[55vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-pink-50/30 to-pink-100/40">
        {/* Animated Pink Background Blobs */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 85, 0],
              y: [0, 42, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 19,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-10 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -65, 0],
              y: [0, -52, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 23,
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
              src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=2200&q=95"
              alt="Elegant dining room prepared for reservations"
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-pink-50/40 to-white/60" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 container text-center space-y-5"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border-2 border-pink-300 bg-white/80 backdrop-blur-md px-6 py-2.5 text-xs uppercase tracking-[0.35em] text-pink-600 shadow-lg"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-4 w-4" />
            </motion.div>
            Reserve Your Night
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-pink-600 to-primary bg-clip-text text-transparent"
          >
            Book a Luxe Table
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto max-w-2xl text-base md:text-lg text-gray-700"
          >
            Secure a front-row seat to our ultra-realistic culinary choreography, curated for intimate evenings or grand
            celebrations.
          </motion.p>
        </motion.div>
      </section>

      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Column - Form */}
          <div className="lg:col-span-3 space-y-8">
            <ScrollAnimation direction="up" amount={0.3}>
              <Card className="border-2 border-pink-200 bg-white/90 backdrop-blur shadow-xl">
                <CardHeader className="bg-gradient-to-r from-pink-50 to-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-2xl font-semibold text-pink-600">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 border-2 border-pink-300">
                      <Calendar className="h-6 w-6 text-pink-600" />
                    </div>
                    Reservation Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="customerName" className="text-gray-700 font-medium">Full Name *</Label>
                        <Input
                          id="customerName"
                          required
                          value={formData.customerName}
                          onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                          className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="customerEmail" className="text-gray-700 font-medium">Email *</Label>
                        <Input
                          id="customerEmail"
                          type="email"
                          required
                          value={formData.customerEmail}
                          onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                          className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="customerPhone" className="text-gray-700 font-medium">Phone *</Label>
                      <Input
                        id="customerPhone"
                        type="tel"
                        required
                        value={formData.customerPhone}
                        onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                        className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="date" className="text-gray-700 font-medium">Date *</Label>
                        <Input
                          id="date"
                          type="date"
                          required
                          min={today}
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="time" className="text-gray-700 font-medium">Time *</Label>
                        <Input
                          id="time"
                          type="time"
                          required
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="numberOfGuests" className="text-gray-700 font-medium">Guests *</Label>
                        <Input
                          id="numberOfGuests"
                          type="number"
                          required
                          min="1"
                          max="20"
                          value={formData.numberOfGuests}
                          onChange={(e) => setFormData({ ...formData, numberOfGuests: e.target.value })}
                          className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="specialRequests" className="text-gray-700 font-medium">Special Requests</Label>
                      <textarea
                        id="specialRequests"
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                        placeholder="Lighting preferences, celebrations, dietary notes..."
                        rows={4}
                        className="flex min-h-[100px] w-full rounded-md border border-pink-200 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:border-pink-400 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-pink-500 via-pink-600 to-primary hover:from-pink-600 hover:via-pink-700 hover:to-primary/90 text-white shadow-lg hover:shadow-xl transition-all" 
                      size="lg" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </ScrollAnimation>

            {/* Additional Information Section */}
            <ScrollAnimation direction="up" amount={0.3} delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/80 backdrop-blur rounded-2xl p-6 border-2 border-pink-100 hover:border-pink-300 transition-all shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100">
                      <Clock className="h-5 w-5 text-pink-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Operating Hours</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Mon - Fri: 8:00 AM - 11:00 PM<br />
                    Sat - Sun: 9:00 AM - Midnight
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white/80 backdrop-blur rounded-2xl p-6 border-2 border-pink-100 hover:border-pink-300 transition-all shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100">
                      <Users className="h-5 w-5 text-pink-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Group Bookings</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Perfect for parties up to 20 guests. Contact us for larger events.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white/80 backdrop-blur rounded-2xl p-6 border-2 border-pink-100 hover:border-pink-300 transition-all shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100">
                      <CheckCircle2 className="h-5 w-5 text-pink-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Confirmation</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    You'll receive a confirmation email within 24 hours of booking.
                  </p>
                </motion.div>
              </div>
            </ScrollAnimation>

            {/* Contact Information */}
            <ScrollAnimation direction="up" amount={0.3} delay={0.3}>
              <Card className="border-2 border-pink-200 bg-gradient-to-br from-pink-50/50 to-white shadow-lg">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold text-pink-600 mb-4">Need Help? Contact Us</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100">
                        <Phone className="h-5 w-5 text-pink-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium text-gray-900">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100">
                        <Mail className="h-5 w-5 text-pink-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium text-gray-900">reservations@cafeluxe.com</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>

          {/* Right Column - Images */}
          <ScrollAnimation direction="left" amount={0.3} className="lg:col-span-2">
            <div className="space-y-6">
              {ambienceImages.map((image, index) => (
                <motion.div
                  key={image}
                  className="relative h-56 md:h-64 rounded-3xl overflow-hidden shadow-2xl border-2 border-pink-100 hover:border-pink-300 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <ImageLoader src={image} alt={`Café Luxe private dining ${index + 1}`} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-600/40 via-pink-500/20 to-transparent opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40" />
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
        </div>
      </div>
    </div>
  )
}

