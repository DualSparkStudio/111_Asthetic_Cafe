import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { pusherServer } from '@/lib/pusher'

export async function PATCH(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { status } = body

    const order = await prisma.order.update({
      where: { id: params.orderId },
      data: { status },
    })

    // Send real-time update (if pusher is configured)
    if (pusherServer) {
      await pusherServer.trigger(`order-${params.orderId}`, 'status-update', {
        orderId: order.id,
        status: order.status,
      })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
}

