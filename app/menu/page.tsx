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
      setMenuItems(data)
      
      // Extract unique categories
      const uniqueCategories = Array.from(new Set(data.map((item: MenuItem) => item.category)))
      setCategories(uniqueCategories as string[])
    } catch (error) {
      console.error('Error fetching menu items:', error)
    }
  }

  const filterItems = () => {
    let filtered = menuItems.filter((item) => item.available)

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
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-pink-50 to-accent/20">
        <div className="absolute inset-0 z-0 opacity-50">
          <MenuHero />
        </div>
        <div className="relative z-10 container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="inline-block mb-4"
            >
              <Sparkles className="h-12 w-12 text-primary mx-auto" />
            </motion.div>
            <GlitchEffect>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-pink-600 to-primary bg-clip-text text-transparent animate-gradient">
                Our Menu
              </h1>
            </GlitchEffect>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Discover our delicious selection of food and beverages
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

