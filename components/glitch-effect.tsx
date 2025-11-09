'use client'

import { motion } from 'framer-motion'

interface GlitchEffectProps {
  children: React.ReactNode
  className?: string
}

export function GlitchEffect({ children, className = '' }: GlitchEffectProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      <motion.div
        className="relative"
        animate={{
          x: [0, -2, 2, 0],
          textShadow: [
            '0 0 0 rgba(0,0,0,0)',
            '2px 0 0 rgba(236, 72, 153, 0.8), -2px 0 0 rgba(255, 107, 157, 0.8)',
            '0 0 0 rgba(0,0,0,0)',
          ],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 3,
          repeatType: 'reverse',
        }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute inset-0 opacity-0"
        animate={{
          opacity: [0, 0.3, 0],
          clipPath: [
            'inset(0 0 0 0)',
            'inset(20% 0 60% 0)',
            'inset(0 0 0 0)',
          ],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 3,
        }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.5), transparent)',
        }}
      />
    </div>
  )
}

