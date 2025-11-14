'use client'

import { motion } from 'framer-motion'
import { ImageLoader } from '@/components/image-loader'
import { ScrollAnimation } from '@/components/scroll-animation'

export default function GalleryPage() {
  const galleryItems = [
    { id: 1, src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=95', alt: 'Signature Coffee' },
    { id: 2, src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=95', alt: 'Café Interior' },
    { id: 3, src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=95', alt: 'Gourmet Plating' },
    { id: 4, src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=95', alt: 'Artisan Pastries' },
    { id: 5, src: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=95', alt: 'Coffee Beans' },
    { id: 6, src: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=1200&q=95', alt: 'Delivery Experience' },
    { id: 7, src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=95', alt: 'Café Ambience' },
    { id: 8, src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=95', alt: 'Latte Art' },
    { id: 9, src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=95', alt: 'Coffee Craft' },
    { id: 10, src: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1200&q=95', alt: 'Dessert Detail' },
    { id: 11, src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=95', alt: 'Breakfast Spread' },
    { id: 12, src: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1200&q=95', alt: 'Café View' },
  ]

  return (
    <div className="relative">
      {/* Hero Section - Pink & White Theme */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-pink-50/30 to-pink-100/40">
        {/* Animated Pink Background Blobs */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 70, 0],
              y: [0, 35, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-10 w-80 h-80 bg-pink-200/40 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -50, 0],
              y: [0, -40, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 container text-center"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-pink-600 to-primary bg-clip-text text-transparent"
          >
            Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-gray-700"
          >
            A glimpse into our café experience
          </motion.p>
        </motion.div>
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {galleryItems.map((item, index) => (
            <ScrollAnimation
              key={item.id}
              direction="scale"
              delay={index * 0.05}
              amount={0.2}
            >
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group shadow-md border-2 border-pink-100 hover:border-pink-300 transition-all duration-300"
              >
              <ImageLoader
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority={index < 4}
              />
                {/* Pink Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-pink-600/60 via-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 flex items-end justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm md:text-base drop-shadow-lg">{item.alt}</p>
                  </div>
                </div>
                
                {/* Pink Accent on Hover */}
                <div className="absolute inset-0 ring-2 ring-pink-400/0 group-hover:ring-pink-400/50 rounded-xl transition-all duration-300 pointer-events-none" />
              </motion.div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </div>
  )
}

