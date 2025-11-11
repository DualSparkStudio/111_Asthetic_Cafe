'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Sparkles } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart-store'
import { motion } from 'framer-motion'
import { MenuCard } from '@/components/menu-card'
import MenuHero from '@/components/menu-hero'
import { useToast } from '@/components/ui/use-toast'
import { GlitchEffect } from '@/components/glitch-effect'
import { ScrollAnimation } from '@/components/scroll-animation'
import { ImageLoader } from '@/components/image-loader'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
  featured: boolean
  available: boolean
}

const fallbackMenuItems: MenuItem[] = [
  {
    id: 'fallback-espresso-tonic',
    name: 'Luxe Espresso Tonic',
    description: 'Single-origin espresso poured over tonic, citrus zest, and chilled botanicals.',
    price: 8.5,
    category: 'Signature Drinks',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=95',
    featured: true,
    available: true,
  },
  {
    id: 'fallback-rose-latte',
    name: 'Rose Velvet Latte',
    description: 'Silky micro-foam infused with rose syrup and dusted with edible petals.',
    price: 7.25,
    category: 'Signature Drinks',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1200&q=95',
    featured: true,
    available: true,
  },
  {
    id: 'fallback-croissant',
    name: 'Almond Praline Croissant',
    description: 'Buttery laminated pastry filled with toasted almond praline cream.',
    price: 5.5,
    category: 'Artisan Pastries',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=95',
    featured: false,
    available: true,
  },
  {
    id: 'fallback-brioche',
    name: 'Brioche French Toast',
    description: 'Caramelized brioche with maple mascarpone, fresh berries, and citrus dust.',
    price: 12,
    category: 'Brunch',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=95',
    featured: false,
    available: true,
  },
  {
    id: 'fallback-salad',
    name: 'Charred Citrus Salad',
    description: 'Crisp greens with charred orange segments, burrata, and pistachio crumble.',
    price: 13.5,
    category: 'Plates',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=95',
    featured: false,
    available: true,
  },
  {
    id: 'fallback-dessert',
    name: 'Midnight Chocolate Torte',
    description: '72% cacao torte layered with salted caramel and gold-dusted ganache.',
    price: 9.75,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=95',
    featured: true,
    available: true,
  },
]

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [categories, setCategories] = useState<string[]>([])
  const addItem = useCartStore((state) => state.addItem)
  const { toast } = useToast()

  useEffect(() => {
    fetchMenuItems()
  }, [])

  useEffect(() => {
    filterItems()
  }, [searchQuery, selectedCategory, menuItems])

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('/api/menu')
      const data = await response.json()
      if (!response.ok || !Array.isArray(data) || data.length === 0) {
        throw new Error('Invalid menu data received')
      }

      setMenuItems(data)
      setFilteredItems(data)

      // Extract unique categories
      const uniqueCategories = Array.from(new Set(data.map((item: MenuItem) => item.category)))
      setCategories(uniqueCategories as string[])
    } catch (error) {
      console.error('Error fetching menu items:', error)
      setMenuItems(fallbackMenuItems)
      setFilteredItems(fallbackMenuItems)
      setCategories(Array.from(new Set(fallbackMenuItems.map((item) => item.category))))
    }
  }

  const filterItems = () => {
    let filtered = Array.isArray(menuItems) ? menuItems.filter((item) => item.available) : []

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    setFilteredItems(filtered)
  }

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    })
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
    })
  }

  return (
    <div className="relative">
      {/* 3D Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="relative h-full w-full">
            <ImageLoader
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2200&q=95"
              alt="Curated café menu spread"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/20" />
          </div>
        </div>
        <div className="relative z-10 container text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="space-y-5"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-2 text-xs uppercase tracking-[0.35em] text-white backdrop-blur"
            >
              <Sparkles className="h-4 w-4" />
              Chef’s Curation
            </motion.span>
            <GlitchEffect>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-pink-200 to-white bg-clip-text text-transparent">
                Our Menu
              </h1>
            </GlitchEffect>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
              Discover an ultra-realistic celebration of artisanal flavors, crafted for every palette.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container py-12">

      {/* Search and Filter */}
      <ScrollAnimation direction="up" delay={0.2} amount={0.2}>
        <div className="mb-12 space-y-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
          <Input
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 text-lg border-2 border-primary/20 focus:border-primary shadow-lg"
          />
        </div>

          <ScrollAnimation direction="fade" delay={0.3} amount={0.2}>
            <div className="flex flex-wrap gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className={selectedCategory === 'all' ? 'bg-gradient-to-r from-primary to-pink-600' : ''}
            >
              All
            </Button>
          </motion.div>
          {categories.map((category, idx) => (
            <motion.div
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
            >
              <Button
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-gradient-to-r from-primary to-pink-600' : ''}
              >
                {category}
              </Button>
            </motion.div>
          ))}
            </div>
          </ScrollAnimation>
        </div>
      </ScrollAnimation>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item, index) => (
          <MenuCard
            key={item.id}
            item={item}
            index={index}
            onAddToCart={() => handleAddToCart(item)}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-muted-foreground text-lg">No items found matching your criteria.</p>
        </motion.div>
      )}
      </div>
    </div>
  )
}

