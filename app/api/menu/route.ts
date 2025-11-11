import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const defaultMenuItems = [
  {
    name: 'Luxe Espresso Tonic',
    description: 'Single-origin espresso poured over tonic, citrus zest, and chilled botanicals.',
    price: 8.5,
    category: 'Signature Drinks',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=95',
    featured: true,
  },
  {
    name: 'Rose Velvet Latte',
    description: 'Silky micro-foam infused with rose syrup and dusted with edible petals.',
    price: 7.25,
    category: 'Signature Drinks',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1200&q=95',
    featured: true,
  },
  {
    name: 'Almond Praline Croissant',
    description: 'Buttery laminated pastry filled with toasted almond praline cream.',
    price: 5.5,
    category: 'Artisan Pastries',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=95',
  },
  {
    name: 'Brioche French Toast',
    description: 'Caramelized brioche with maple mascarpone, fresh berries, and citrus dust.',
    price: 12,
    category: 'Brunch',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=95',
  },
  {
    name: 'Charred Citrus Salad',
    description: 'Crisp greens with charred orange segments, burrata, and pistachio crumble.',
    price: 13.5,
    category: 'Plates',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=95',
  },
  {
    name: 'Midnight Chocolate Torte',
    description: '72% cacao torte layered with salted caramel and gold-dusted ganache.',
    price: 9.75,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=95',
    featured: true,
  },
]

export async function GET() {
  try {
    let menuItems = await prisma.menuItem.findMany({
      orderBy: { createdAt: 'desc' },
    })

    if (menuItems.length === 0) {
      await prisma.menuItem.createMany({
        data: defaultMenuItems.map((item) => ({
          name: item.name,
          description: item.description,
          price: item.price,
          category: item.category,
          image: item.image,
          featured: item.featured ?? false,
          available: true,
        })),
      })

      menuItems = await prisma.menuItem.findMany({
        orderBy: { createdAt: 'desc' },
      })
    }

    return NextResponse.json(menuItems)
  } catch (error) {
    console.error('Error fetching menu items:', error)
    return NextResponse.json(
      { error: 'Failed to fetch menu items' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, price, category, image, featured, available } = body

    const menuItem = await prisma.menuItem.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        image,
        featured: featured || false,
        available: available !== undefined ? available : true,
      },
    })

    return NextResponse.json(menuItem, { status: 201 })
  } catch (error) {
    console.error('Error creating menu item:', error)
    return NextResponse.json(
      { error: 'Failed to create menu item' },
      { status: 500 }
    )
  }
}

