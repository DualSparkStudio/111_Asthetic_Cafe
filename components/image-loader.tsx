'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface ImageLoaderProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
}

export function ImageLoader({
  src,
  alt,
  fill,
  width,
  height,
  className = '',
  priority = false,
  sizes,
}: ImageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)

  useEffect(() => {
    setIsLoading(true)
    setHasError(false)
    setImageSrc(src)

    // Preload image
    const img = new window.Image()
    img.src = src
    img.onload = () => setIsLoading(false)
    img.onerror = () => {
      setHasError(true)
      setIsLoading(false)
      // Fallback to placeholder
      setImageSrc('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=90')
    }
  }, [src])

  if (fill) {
    return (
      <div className={`relative ${className}`}>
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-pink-50"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="h-8 w-8 text-primary" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 1.1 : 1 }}
          transition={{ duration: 0.5 }}
          className={isLoading ? 'opacity-0' : ''}
        >
          <Image
            src={imageSrc}
            alt={alt}
            fill
            className={className}
            priority={priority}
            sizes={sizes}
            quality={85}
            loading={priority ? undefined : 'lazy'}
          />
        </motion.div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-pink-50"
            style={{ width, height }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="h-8 w-8 text-primary" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 1.1 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          className={className}
          priority={priority}
          quality={85}
          loading={priority ? undefined : 'lazy'}
        />
      </motion.div>
    </div>
  )
}

