import Razorpay from 'razorpay'

let razorpayInstance: Razorpay | null = null

const createClient = () => {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    console.warn('Razorpay environment variables not configured. Payment features will be disabled.')
    return null
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  })
}

export const getRazorpayClient = () => {
  if (!razorpayInstance) {
    razorpayInstance = createClient()
  }

  return razorpayInstance
}

export interface RazorpayOrderOptions {
  amount: number // in paise
  currency: string
  receipt: string
  notes?: Record<string, string>
}

export async function createRazorpayOrder(options: RazorpayOrderOptions) {
  try {
    const client = getRazorpayClient()

    if (!client) {
      throw new Error('Razorpay client is not configured')
    }

    const order = await client.orders.create({
      amount: options.amount,
      currency: options.currency || 'INR',
      receipt: options.receipt,
      notes: options.notes || {},
    })
    return order
  } catch (error) {
    console.error('Razorpay order creation error:', error)
    throw error
  }
}

export async function verifyPayment(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
): Promise<boolean> {
  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret) {
    console.warn('Razorpay secret is not configured. Cannot verify payment signature.')
    return false
  }

  const crypto = require('crypto')
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest('hex')

  return expectedSignature === razorpaySignature
}

