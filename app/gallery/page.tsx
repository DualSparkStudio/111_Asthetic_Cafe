'use client'

import { motion } from 'framer-motion'
import { ImageLoader } from '@/components/image-loader'
import { ScrollAnimation } from '@/components/scroll-animation'

export default function GalleryPage() {
  const galleryItems = [
    { id: 1, src: 'https://source.unsplash.com/1200x1200/?3d,coffee', alt: '3D Coffee' },
    { id: 2, src: 'https://source.unsplash.com/1200x1200/?3d,cafe-design', alt: '3D Café Interior' },
    { id: 3, src: 'https://source.unsplash.com/1200x1200/?3d,gourmet', alt: '3D Gourmet Spread' },
    { id: 4, src: 'https://source.unsplash.com/1200x1200/?3d,patisserie', alt: '3D Pastries' },
    { id: 5, src: 'https://source.unsplash.com/1200x1200/?3d,coffee-beans', alt: '3D Coffee Beans' },
    { id: 6, src: 'https://source.unsplash.com/1200x1200/?3d,delivery', alt: '3D Delivery Experience' },
    { id: 7, src: 'https://source.unsplash.com/1200x1200/?3d,ambience', alt: '3D Café Ambience' },
    { id: 8, src: 'https://source.unsplash.com/1200x1200/?3d,latte-art', alt: '3D Latte Art' },
    { id: 9, src: 'https://source.unsplash.com/1200x1200/?3d,barista', alt: '3D Coffee Craft' },
    { id: 10, src: 'https://source.unsplash.com/1200x1200/?3d,dessert', alt: '3D Desserts' },
    { id: 11, src: 'https://source.unsplash.com/1200x1200/?3d,breakfast', alt: '3D Breakfast' },
    { id: 12, src: 'https://source.unsplash.com/1200x1200/?3d,city-cafe', alt: '3D Café View' },
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
                <div className="absolute inset-0 bg-gradient-to-t from-white/25 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
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

