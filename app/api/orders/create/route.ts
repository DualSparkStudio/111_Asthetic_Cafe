import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createRazorpayOrder } from '@/lib/razorpay'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      items,
      customerName,
      customerEmail,
      customerPhone,
      deliveryAddress,
      deliveryTime,
    } = body

    // Calculate total
    const totalAmount = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    )

    // Create order in database
    const order = await prisma.order.create({
      data: {
        customerName,
        customerEmail,
        customerPhone,
        deliveryAddress,
        deliveryTime: deliveryTime || 30,
        totalAmount,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        items: {
          create: items.map((item: any) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            menuItem: true,
          },
        },
      },
    })

    // Create Razorpay order
    let razorpayOrder: any = null

    try {
      razorpayOrder = await createRazorpayOrder({
        amount: totalAmount * 100, // Convert to paise
        currency: 'INR',
        receipt: order.id,
        notes: {
          orderId: order.id,
          customerName,
          customerEmail,
        },
      })

      await prisma.order.update({
        where: { id: order.id },
        data: { razorpayOrderId: razorpayOrder.id },
      })
    } catch (paymentError) {
      console.warn('Razorpay not configured or order creation failed. Continuing without payment gateway.', paymentError)
    }

    return NextResponse.json({
      order,
      razorpayOrder,
      paymentsEnabled: !!razorpayOrder,
    })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

