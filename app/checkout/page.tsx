'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cart-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatCurrency } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { ScrollAnimation } from '@/components/scroll-animation'

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore()
  const total = getTotal()
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    deliveryAddress: '',
    deliveryTime: '30',
  })

  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Create Razorpay order
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            menuItemId: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            category: 'Other', // Default category, will be updated if item exists
          })),
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
          customerPhone: formData.customerPhone,
          deliveryAddress: formData.deliveryAddress,
          deliveryTime: parseInt(formData.deliveryTime),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        const errorMsg = data.error || `Failed to create order (${response.status})`
        console.error('Order creation failed:', { status: response.status, data })
        throw new Error(errorMsg)
      }

      // If payments are disabled (no Razorpay order), mark order as placed for manual handling
      if (!data.paymentsEnabled || !data.razorpayOrder) {
        clearCart()
        toast({
          title: 'Order placed!',
          description: `Your order #${data.order.id} has been received. A team member will contact you shortly to confirm payment.`,
        })
        router.push(`/tracking/${data.order.id}`)
        setIsProcessing(false)
        return
      }

      // Initialize Razorpay
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
          amount: data.razorpayOrder.amount,
          currency: data.razorpayOrder.currency,
          name: 'Café Luxe',
          description: `Order #${data.order.id}`,
          order_id: data.razorpayOrder.id,
          handler: async function (response: any) {
            try {
              const verifyResponse = await fetch('/api/orders/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  orderId: data.order.id,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                }),
              })

              const verifyData = await verifyResponse.json()

              if (verifyData.success) {
                clearCart()
                toast({
                  title: 'Order placed successfully!',
                  description: `Your order #${data.order.id} has been confirmed.`,
                })
                router.push(`/tracking/${data.order.id}`)
              } else {
                throw new Error('Payment verification failed')
              }
            } catch (error) {
              console.error('Payment verification error:', error)
              toast({
                title: 'Payment verification failed',
                description: 'Please contact support.',
                variant: 'destructive',
              })
            }
          },
          prefill: {
            name: formData.customerName,
            email: formData.customerEmail,
            contact: formData.customerPhone,
          },
          theme: {
            color: '#3b82f6',
          },
        }

        const razorpay = new (window as any).Razorpay(options)
        razorpay.open()
        setIsProcessing(false)
      }
      document.body.appendChild(script)
    } catch (error: any) {
      console.error('Checkout error:', error)
      toast({
        title: 'Checkout failed',
        description: error.message || 'Please try again.',
        variant: 'destructive',
      })
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Button onClick={() => router.push('/menu')}>Browse Menu</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="customerName">Full Name *</Label>
                  <Input
                    id="customerName"
                    required
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData({ ...formData, customerName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="customerEmail">Email *</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    required
                    value={formData.customerEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, customerEmail: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="customerPhone">Phone *</Label>
                  <Input
                    id="customerPhone"
                    type="tel"
                    required
                    value={formData.customerPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, customerPhone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="deliveryAddress">Delivery Address *</Label>
                  <Input
                    id="deliveryAddress"
                    required
                    value={formData.deliveryAddress}
                    onChange={(e) =>
                      setFormData({ ...formData, deliveryAddress: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="deliveryTime">Estimated Delivery Time (minutes)</Label>
                  <Input
                    id="deliveryTime"
                    type="number"
                    min="15"
                    max="120"
                    value={formData.deliveryTime}
                    onChange={(e) =>
                      setFormData({ ...formData, deliveryTime: e.target.value })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Pay Now'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}

