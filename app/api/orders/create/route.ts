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

    // Validate input
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty. Please add items to your cart.' },
        { status: 400 }
      )
    }

    if (!customerName || !customerEmail || !customerPhone) {
      return NextResponse.json(
        { error: 'Please provide all required customer information.' },
        { status: 400 }
      )
    }

    // Calculate total
    const totalAmount = items.reduce(
      (sum: number, item: any) => sum + (item.price || 0) * (item.quantity || 0),
      0
    )

    if (totalAmount <= 0) {
      return NextResponse.json(
        { error: 'Invalid order total. Please check your cart items.' },
        { status: 400 }
      )
    }

    // Ensure menu items exist in database (create if they don't)
    for (const item of items) {
      try {
        await prisma.menuItem.findUniqueOrThrow({
          where: { id: item.menuItemId },
        })
      } catch {
        // Menu item doesn't exist, create it
        await prisma.menuItem.upsert({
          where: { id: item.menuItemId },
          update: {},
          create: {
            id: item.menuItemId,
            name: item.name || 'Menu Item',
            description: item.description || '',
            price: item.price,
            category: item.category || 'Other',
            available: true,
          },
        })
      }
    }

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
  } catch (error: any) {
    console.error('Error creating order:', error)
    const errorMessage = error?.message || 'Failed to create order'
    return NextResponse.json(
      { error: errorMessage, details: error?.stack },
      { status: 500 }
    )
  }
}

