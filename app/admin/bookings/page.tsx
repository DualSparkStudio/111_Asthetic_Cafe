'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDate, formatTime } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'

interface Booking {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  date: string
  time: string
  numberOfGuests: number
  status: string
  specialRequests?: string
  createdAt: string
}

export default function AdminBookingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    } else if (session?.user?.role !== 'ADMIN') {
      router.push('/')
    }
  }, [session, status, router])

  useEffect(() => {
    if (session?.user?.role === 'ADMIN') {
      fetchBookings()
    }
  }, [session])

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings')
      const data = await response.json()
      setBookings(data)
    } catch (error) {
      console.error('Error fetching bookings:', error)
    }
  }

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error('Failed to update booking status')
      }

      toast({
        title: 'Booking updated',
        description: 'The booking status has been updated successfully.',
      })

      fetchBookings()
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update booking status',
        variant: 'destructive',
      })
    }
  }

  if (status === 'loading' || session?.user?.role !== 'ADMIN') {
    return <div className="container py-12">Loading...</div>
  }

  const statusOptions = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Booking Management</h1>

      <div className="space-y-6">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Booking #{booking.id.slice(0, 8)}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatDate(new Date(booking.createdAt))}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Status: {booking.status}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Customer Information</h3>
                  <p className="text-sm">{booking.customerName}</p>
                  <p className="text-sm text-muted-foreground">{booking.customerEmail}</p>
                  <p className="text-sm text-muted-foreground">{booking.customerPhone}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Booking Details</h3>
                  <p className="text-sm">
                    Date: {formatDate(new Date(booking.date))}
                  </p>
                  <p className="text-sm">Time: {formatTime(booking.time)}</p>
                  <p className="text-sm">Guests: {booking.numberOfGuests}</p>
                  {booking.specialRequests && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Special Requests: {booking.specialRequests}
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Update Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map((status) => (
                      <Button
                        key={status}
                        variant={booking.status === status ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateBookingStatus(booking.id, status)}
                      >
                        {status}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

