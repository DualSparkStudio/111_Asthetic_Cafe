'use client'

import { MessageCircle, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export function FloatingSocial() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1234567890'
  const message = encodeURIComponent('Hello! I would like to know more about your café.')
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/cafeluxe'

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Instagram Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
      >
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow us on Instagram"
        >
          <Button
            size="lg"
            className="rounded-full h-14 w-14 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 shadow-lg border-2 border-white/20 backdrop-blur-sm"
          >
            <Instagram className="h-7 w-7 text-white" strokeWidth={2.5} />
          </Button>
        </a>
      </motion.div>

      {/* WhatsApp Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
      >
        <a
          href={`https://wa.me/${whatsappNumber}?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <Button
            size="lg"
            className="rounded-full h-14 w-14 bg-[#25D366] hover:bg-[#20BA5A] shadow-lg border-2 border-white/20 backdrop-blur-sm"
          >
            <MessageCircle className="h-7 w-7 text-white" strokeWidth={2.5} />
          </Button>
        </a>
      </motion.div>
    </div>
  )
}

