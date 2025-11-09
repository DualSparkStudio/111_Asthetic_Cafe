import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@cafeluxe.com' },
    update: {},
    create: {
      email: 'admin@cafeluxe.com',
      name: 'Admin User',
      role: 'ADMIN',
    },
  })

  console.log('Admin user created:', adminUser)

  // Create sample menu items
  const menuItems = [
    {
      name: 'Cappuccino',
      description: 'Rich espresso with steamed milk and foam',
      price: 4.99,
      category: 'Coffee',
      featured: true,
      available: true,
    },
    {
      name: 'Latte',
      description: 'Smooth espresso with steamed milk',
      price: 5.49,
      category: 'Coffee',
      featured: true,
      available: true,
    },
    {
      name: 'Americano',
      description: 'Espresso with hot water',
      price: 3.99,
      category: 'Coffee',
      featured: false,
      available: true,
    },
    {
      name: 'Croissant',
      description: 'Buttery, flaky French pastry',
      price: 3.49,
      category: 'Pastries',
      featured: true,
      available: true,
    },
    {
      name: 'Blueberry Muffin',
      description: 'Fresh baked muffin with blueberries',
      price: 3.99,
      category: 'Pastries',
      featured: false,
      available: true,
    },
    {
      name: 'Caesar Salad',
      description: 'Crisp romaine with Caesar dressing',
      price: 8.99,
      category: 'Salads',
      featured: false,
      available: true,
    },
    {
      name: 'Club Sandwich',
      description: 'Triple-decker sandwich with turkey, bacon, and veggies',
      price: 12.99,
      category: 'Sandwiches',
      featured: true,
      available: true,
    },
    {
      name: 'Chocolate Cake',
      description: 'Rich chocolate layer cake',
      price: 6.99,
      category: 'Desserts',
      featured: true,
      available: true,
    },
  ]

  for (const item of menuItems) {
    const existing = await prisma.menuItem.findFirst({
      where: { name: item.name },
    })
    
    if (!existing) {
      await prisma.menuItem.create({
        data: item,
      })
    }
  }

  console.log('Sample menu items created')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

