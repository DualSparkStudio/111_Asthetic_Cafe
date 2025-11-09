'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Clock, Package, Truck, Circle } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'
import { getPusherClient } from '@/lib/pusher'
import { motion } from 'framer-motion'
import { ScrollAnimation } from '@/components/scroll-animation'

interface Order {
  id: string
  customerName: string
  status: string
  totalAmount: number
  createdAt: string
  deliveryTime?: number
  items: Array<{
    menuItem: {
      name: string
    }
    quantity: number
    price: number
  }>
}

const statusSteps = [
  { key: 'PENDING', label: 'Order Placed', icon: Circle },
  { key: 'CONFIRMED', label: 'Confirmed', icon: CheckCircle2 },
  { key: 'PREPARING', label: 'Preparing', icon: Package },
  { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', icon: Truck },
  { key: 'DELIVERED', label: 'Delivered', icon: CheckCircle2 },
]

export default function TrackingPage() {
  const params = useParams()
  const orderId = params.orderId as string
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrder()

    // Subscribe to real-time updates
    const pusherClient = getPusherClient()
    if (pusherClient) {
      const channel = pusherClient.subscribe(`order-${orderId}`)
      
      channel.bind('status-update', (data: any) => {
        setOrder((prev) => prev ? { ...prev, status: data.status } : null)
      })

      return () => {
        pusherClient.unsubscribe(`order-${orderId}`)
      }
    }
  }, [orderId])

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`)
      const data = await response.json()
      setOrder(data)
    } catch (error) {
      console.error('Error fetching order:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container py-12">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Order not found</h2>
        </div>
      </div>
    )
  }

  const currentStatusIndex = statusSteps.findIndex(
    (step) => step.key === order.status
  )

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Order Tracking</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statusSteps.map((step, index) => {
                  const Icon = step.icon
                  const isCompleted = index <= currentStatusIndex
                  const isCurrent = index === currentStatusIndex

                  return (
                    <motion.div
                      key={step.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4"
                    >
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full ${
                          isCompleted
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p
                          className={`font-semibold ${
                            isCurrent ? 'text-primary' : ''
                          }`}
                        >
                          {step.label}
                        </p>
                        {isCurrent && order.status === 'PREPARING' && (
                          <p className="text-sm text-muted-foreground">
                            Estimated delivery in {order.deliveryTime} minutes
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID:</span>
                  <span className="font-semibold">#{order.id.slice(0, 8)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Placed on:</span>
                  <span>{formatDate(new Date(order.createdAt))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-semibold">{order.status}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((item) => (
                <div key={item.menuItem.name} className="flex justify-between">
                  <div>
                    <p className="font-semibold">{item.menuItem.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p>{formatCurrency(item.price * item.quantity)}</p>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(order.totalAmount)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

