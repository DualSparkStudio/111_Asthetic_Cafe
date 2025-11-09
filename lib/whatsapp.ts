export async function sendWhatsAppMessage(
  to: string,
  message: string
): Promise<boolean> {
  try {
    // Using Twilio WhatsApp API or similar service
    // This is a placeholder - you'll need to integrate with your WhatsApp provider
    const response = await fetch('https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${process.env.WHATSAPP_API_KEY}:${process.env.WHATSAPP_API_SECRET}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        From: `whatsapp:${process.env.WHATSAPP_PHONE_NUMBER}`,
        To: `whatsapp:${to}`,
        Body: message,
      }),
    })

    return response.ok
  } catch (error) {
    console.error('WhatsApp message error:', error)
    return false
  }
}

export function generateWhatsAppOrderMessage(order: {
  id: string
  customerName: string
  items: Array<{ name: string; quantity: number; price: number }>
  totalAmount: number
  status: string
}): string {
  const itemsText = order.items
    .map((item) => `• ${item.name} x${item.quantity} - ₹${item.price * item.quantity}`)
    .join('\n')

  return `🍽️ *Order Confirmation*\n\n` +
    `Order ID: #${order.id}\n` +
    `Customer: ${order.customerName}\n\n` +
    `*Items:*\n${itemsText}\n\n` +
    `*Total: ₹${order.totalAmount}*\n` +
    `Status: ${order.status}\n\n` +
    `Thank you for your order! 🙏`
}

export function generateWhatsAppBookingMessage(booking: {
  id: string
  customerName: string
  date: Date
  time: string
  numberOfGuests: number
}): string {
  return `🍽️ *Table Booking Confirmation*\n\n` +
    `Booking ID: #${booking.id}\n` +
    `Customer: ${booking.customerName}\n` +
    `Date: ${booking.date.toLocaleDateString()}\n` +
    `Time: ${booking.time}\n` +
    `Guests: ${booking.numberOfGuests}\n\n` +
    `We're excited to have you! 🙏`
}

