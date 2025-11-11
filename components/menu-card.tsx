'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import { Plus, Sparkles } from 'lucide-react'
import { ImageLoader } from '@/components/image-loader'

interface MenuCardProps {
  item: {
    id: string
    name: string
    description: string
    price: number
    category: string
    image?: string
    featured: boolean
    available: boolean
  }
  index: number
  onAddToCart: () => void
}

// Menu item images mapping - High quality realistic images
const menuItemImages: Record<string, string> = {
  Coffee: 'https://source.unsplash.com/1200x800/?3d,coffee',
  Pastries: 'https://source.unsplash.com/1200x800/?3d,pastry',
  Salads: 'https://source.unsplash.com/1200x800/?3d,salad',
  Sandwiches: 'https://source.unsplash.com/1200x800/?3d,sandwich',
  Desserts: 'https://source.unsplash.com/1200x800/?3d,dessert',
  Cappuccino: 'https://source.unsplash.com/1200x800/?3d,cappuccino',
  Latte: 'https://source.unsplash.com/1200x800/?3d,latte',
  Americano: 'https://source.unsplash.com/1200x800/?3d,americano',
  Croissant: 'https://source.unsplash.com/1200x800/?3d,croissant',
  'Blueberry Muffin': 'https://source.unsplash.com/1200x800/?3d,muffin',
  'Caesar Salad': 'https://source.unsplash.com/1200x800/?3d,caesar-salad',
  'Club Sandwich': 'https://source.unsplash.com/1200x800/?3d,club-sandwich',
  'Chocolate Cake': 'https://source.unsplash.com/1200x800/?3d,chocolate-cake',
}

export function MenuCard({ item, index, onAddToCart }: MenuCardProps) {
  const imageUrl = item.image || menuItemImages[item.name] || menuItemImages[item.category] || `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=800&fit=crop&q=90`

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -10,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      className="perspective-1000"
    >
      <Card className="h-full flex flex-col group relative overflow-hidden border-2 border-transparent hover:border-primary/20 bg-gradient-to-br from-white to-accent/30 shadow-lg hover:shadow-2xl transition-all duration-300">
        {/* 3D Image Container */}
        <div className="relative h-64 w-full overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 2 }}
            transition={{ duration: 0.4 }}
            className="relative w-full h-full"
          >
            <ImageLoader
              src={imageUrl}
              alt={item.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 3}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
            
            {/* Featured Badge */}
            {item.featured && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                className="absolute top-3 right-3 bg-gradient-to-r from-primary to-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1"
              >
                <Sparkles className="h-3 w-3" />
                Featured
              </motion.div>
            )}

            {/* Category Badge */}
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-primary font-semibold text-xs px-3 py-1 rounded-full">
              {item.category}
            </div>
          </motion.div>
        </div>

        <CardHeader className="pb-3">
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-pink-600 bg-clip-text text-transparent">
              {item.name}
            </CardTitle>
          </motion.div>
          <CardDescription className="text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </CardDescription>
        </CardHeader>

        <CardFooter className="mt-auto flex justify-between items-center pt-4 border-t">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
          >
            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-pink-600 bg-clip-text text-transparent">
              {formatCurrency(item.price)}
            </span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={onAddToCart}
              className="bg-gradient-to-r from-primary to-pink-600 hover:from-primary/90 hover:to-pink-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </motion.div>
        </CardFooter>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-pink-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </Card>
    </motion.div>
  )
}

