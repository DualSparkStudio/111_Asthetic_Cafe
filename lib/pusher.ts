import Pusher from 'pusher'

// Initialize Pusher only if all required env vars are present
let pusherServer: Pusher | null = null

try {
  if (
    process.env.PUSHER_APP_ID &&
    process.env.PUSHER_KEY &&
    process.env.PUSHER_SECRET &&
    process.env.PUSHER_CLUSTER
  ) {
    pusherServer = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.PUSHER_KEY,
      secret: process.env.PUSHER_SECRET,
      cluster: process.env.PUSHER_CLUSTER,
      useTLS: true,
    })
  } else {
    console.warn('Pusher environment variables not configured. Real-time features will be disabled.')
  }
} catch (error) {
  console.error('Failed to initialize Pusher:', error)
  pusherServer = null
}

export { pusherServer }

export const getPusherClient = () => {
  if (typeof window === 'undefined') return null
  const Pusher = require('pusher-js')
  return new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  })
}

