'use client'

import { motion } from 'framer-motion'
import { ImageLoader } from '@/components/image-loader'
import { ScrollAnimation } from '@/components/scroll-animation'

export default function GalleryPage() {
  const galleryItems = [
    { id: 1, src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=1200&fit=crop&q=90", alt: "Coffee" },
    { id: 2, src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&h=1200&fit=crop&q=90", alt: "Café Interior" },
    { id: 3, src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=1200&fit=crop&q=90", alt: "Food" },
    { id: 4, src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=1200&fit=crop&q=90", alt: "Pastries" },
    { id: 5, src: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200&h=1200&fit=crop&q=90", alt: "Coffee Beans" },
    { id: 6, src: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1200&h=1200&fit=crop&q=90", alt: "Delivery" },
    { id: 7, src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&h=1200&fit=crop&q=90", alt: "Café Ambiance" },
    { id: 8, src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=1200&fit=crop&q=90", alt: "Latte Art" },
    { id: 9, src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&h=1200&fit=crop&q=90", alt: "Coffee Making" },
    { id: 10, src: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1200&h=1200&fit=crop&q=90", alt: "Desserts" },
    { id: 11, src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1200&h=1200&fit=crop&q=90", alt: "Breakfast" },
    { id: 12, src: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1200&h=1200&fit=crop&q=90", alt: "Café View" },
  ]

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-pink-50 to-accent/20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-pink-600 to-primary bg-clip-text text-transparent animate-gradient">
            Gallery
          </h1>
          <p className="text-xl text-muted-foreground">
            A glimpse into our café experience
          </p>
        </motion.div>
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <ScrollAnimation
              key={item.id}
              direction="scale"
              delay={index * 0.1}
              amount={0.2}
            >
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5, z: 50 }}
                className="relative aspect-square overflow-hidden rounded-2xl cursor-pointer group shadow-lg"
              >
              <ImageLoader
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-125"
                priority={index < 4}
              />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-semibold text-lg">{item.alt}</p>
                </div>
              </motion.div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </div>
  )
}

