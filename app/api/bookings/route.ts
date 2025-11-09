import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendWhatsAppMessage, generateWhatsAppBookingMessage } from '@/lib/whatsapp'
import { pusherServer } from '@/lib/pusher'

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      customerName,
      customerEmail,
      customerPhone,
      date,
      time,
      numberOfGuests,
      specialRequests,
    } = body

    // Validate required fields
    if (!customerName || !customerEmail || !customerPhone || !date || !time || !numberOfGuests) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      )
    }

    // Validate date format
    const bookingDate = new Date(date)
    if (isNaN(bookingDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      )
    }

    // Validate number of guests
    const guests = parseInt(numberOfGuests)
    if (isNaN(guests) || guests < 1 || guests > 20) {
      return NextResponse.json(
        { error: 'Number of guests must be between 1 and 20' },
        { status: 400 }
      )
    }

    const booking = await prisma.booking.create({
      data: {
        customerName,
        customerEmail,
        customerPhone,
        date: bookingDate,
        time,
        numberOfGuests: guests,
        specialRequests: specialRequests || null,
        status: 'PENDING',
      },
    })

    // Send real-time notification to admin (don't fail if Pusher is not configured)
    try {
      if (pusherServer) {
        await pusherServer.trigger('admin-bookings', 'new-booking', {
          bookingId: booking.id,
          customerName: booking.customerName,
          date: booking.date,
          time: booking.time,
        })
      }
    } catch (error: any) {
      console.error('Pusher notification error:', error?.message || error)
      // Don't fail the request if Pusher fails
    }

    // Send WhatsApp confirmation (don't fail if WhatsApp is not configured)
    try {
      if (sendWhatsAppMessage && generateWhatsAppBookingMessage) {
        const message = generateWhatsAppBookingMessage({
          id: booking.id,
          customerName: booking.customerName,
          date: booking.date,
          time: booking.time,
          numberOfGuests: booking.numberOfGuests,
        })
        await sendWhatsAppMessage(customerPhone, message)
      }
    } catch (error: any) {
      console.error('WhatsApp notification error:', error?.message || error)
      // Don't fail the request if WhatsApp fails
    }

    return NextResponse.json(
      {
        success: true,
        booking: {
          id: booking.id,
          customerName: booking.customerName,
          date: booking.date,
          time: booking.time,
          numberOfGuests: booking.numberOfGuests,
        },
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating booking:', error)
    
    // Handle Prisma errors
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A booking with this information already exists' },
        { status: 409 }
      )
    }

    // Return proper JSON error response
    return NextResponse.json(
      { 
        error: error.message || 'Failed to create booking. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}

