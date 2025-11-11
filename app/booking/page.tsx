'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { Calendar, Sparkles } from 'lucide-react'
import { ScrollAnimation } from '@/components/scroll-animation'
import { ImageLoader } from '@/components/image-loader'
import { motion } from 'framer-motion'

const ambienceImages = [
  'https://source.unsplash.com/1200x900/?3d,fine-dining',
  'https://source.unsplash.com/1200x900/?3d,private-dining',
  'https://source.unsplash.com/1200x900/?3d,ambient-lighting',
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
      {/* Hero */}
      <section className="relative h-[55vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="relative h-full w-full">
            <ImageLoader
              src="https://source.unsplash.com/2200x1300/?3d,exclusive-restaurant"
              alt="Elegant 3D dining room prepared for reservations"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/0 to-white/50" />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container text-center text-white space-y-5"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2 text-xs uppercase tracking-[0.35em] backdrop-blur"
          >
            <Sparkles className="h-4 w-4" />
            Reserve Your Night
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-pink-200 to-white bg-clip-text text-transparent">
            Book a Luxe Table
          </h1>
          <p className="mx-auto max-w-2xl text-base md:text-lg text-white/80">
            Secure a front-row seat to our ultra-realistic culinary choreography, curated for intimate evenings or grand
            celebrations.
          </p>
        </motion.div>
      </section>

      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <ScrollAnimation direction="up" amount={0.3} className="lg:col-span-3">
            <Card className="border-primary/20 bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-semibold">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  Reservation Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="customerName">Full Name *</Label>
                      <Input
                        id="customerName"
                        required
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="customerEmail">Email *</Label>
                      <Input
                        id="customerEmail"
                        type="email"
                        required
                        value={formData.customerEmail}
                        onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="customerPhone">Phone *</Label>
                    <Input
                      id="customerPhone"
                      type="tel"
                      required
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        required
                        min={today}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Time *</Label>
                      <Input
                        id="time"
                        type="time"
                        required
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="numberOfGuests">Guests *</Label>
                      <Input
                        id="numberOfGuests"
                        type="number"
                        required
                        min="1"
                        max="20"
                        value={formData.numberOfGuests}
                        onChange={(e) => setFormData({ ...formData, numberOfGuests: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="specialRequests">Special Requests</Label>
                    <Input
                      id="specialRequests"
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      placeholder="Lighting preferences, celebrations, dietary notes..."
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation direction="left" amount={0.3} className="lg:col-span-2">
            <div className="space-y-6">
              {ambienceImages.map((image, index) => (
                <motion.div
                  key={image}
                  className="relative h-56 md:h-64 rounded-3xl overflow-hidden shadow-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <ImageLoader src={image} alt={`Café Luxe private dining ${index + 1}`} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/25 via-white/5 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-primary">
                    <span className="text-sm font-medium tracking-wide">Ultra-realistic ambience</span>
                    <Sparkles className="h-4 w-4" />
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

