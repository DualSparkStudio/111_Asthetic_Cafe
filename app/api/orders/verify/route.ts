import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyPayment } from '@/lib/razorpay'
import { pusherServer } from '@/lib/pusher'
import { sendWhatsAppMessage, generateWhatsAppOrderMessage } from '@/lib/whatsapp'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      orderId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = body

    // Verify payment
    const isValid = await verifyPayment(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    )

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment signature' },
        { status: 400 }
      )
    }

    // Update order status
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'PAID',
        paymentId: razorpayPaymentId,
        status: 'CONFIRMED',
      },
      include: {
        items: {
          include: {
            menuItem: true,
          },
        },
      },
    })

    // Send real-time update
    if (pusherServer) {
      await pusherServer.trigger(`order-${orderId}`, 'status-update', {
        orderId: order.id,
        status: order.status,
      })
    }

    // Send WhatsApp notification
    try {
      await sendWhatsAppMessage(
        order.customerPhone,
        generateWhatsAppOrderMessage({
          id: order.id,
          customerName: order.customerName,
          items: order.items.map((item: (typeof order.items)[number]) => ({
            name: item.menuItem.name,
            quantity: item.quantity,
            price: item.price,
          })),
          totalAmount: order.totalAmount,
          status: order.status,
        })
      )
    } catch (error) {
      console.error('WhatsApp notification error:', error)
      // Don't fail the request if WhatsApp fails
    }

    return NextResponse.json({ success: true, order })
  } catch (error) {
    console.error('Error verifying payment:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}

