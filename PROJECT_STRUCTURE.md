# Project Structure

```
cafe-website/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # NextAuth routes
│   │   ├── admin/                # Admin API routes
│   │   ├── bookings/             # Booking API routes
│   │   ├── menu/                 # Menu API routes
│   │   └── orders/               # Order API routes
│   ├── admin/                    # Admin pages
│   │   ├── dashboard/            # Admin dashboard
│   │   ├── menu/                 # Menu management
│   │   ├── orders/               # Order management
│   │   ├── bookings/             # Booking management
│   │   └── login/                # Admin login
│   ├── about/                    # About page
│   ├── booking/                  # Table booking page
│   ├── cart/                     # Shopping cart page
│   ├── checkout/                 # Checkout page
│   ├── contact/                  # Contact page
│   ├── gallery/                  # Gallery page
│   ├── menu/                     # Menu page
│   ├── tracking/                 # Order tracking
│   │   └── [orderId]/            # Specific order tracking
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ui/                       # ShadCN UI components
│   ├── header.tsx                # Header component
│   ├── footer.tsx                # Footer component
│   ├── providers.tsx             # Context providers
│   ├── three-scene.tsx           # Three.js scene
│   ├── voice-assistant.tsx       # Voice assistant
│   └── whatsapp-button.tsx       # WhatsApp button
├── lib/                          # Utility libraries
│   ├── auth.ts                   # NextAuth configuration
│   ├── prisma.ts                 # Prisma client
│   ├── pusher.ts                 # Pusher configuration
│   ├── razorpay.ts               # Razorpay integration
│   ├── utils.ts                  # Utility functions
│   └── whatsapp.ts               # WhatsApp integration
├── prisma/                       # Prisma configuration
│   └── schema.prisma             # Database schema
├── store/                        # State management
│   └── cart-store.ts             # Cart state (Zustand)
├── public/                       # Static assets
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore file
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies
├── postcss.config.js             # PostCSS configuration
├── README.md                     # Project documentation
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── VERCEL_DEPLOYMENT.md          # Deployment guide
```

## Key Features by Directory

### `/app` - Pages and Routes
- All pages use Next.js 14 App Router
- API routes handle server-side logic
- Client components marked with `'use client'`

### `/components` - Reusable Components
- UI components from ShadCN
- Layout components (Header, Footer)
- Feature components (Voice Assistant, WhatsApp Button)
- 3D components (Three.js Scene)

### `/lib` - Utility Libraries
- Database access (Prisma)
- Authentication (NextAuth)
- Payment processing (Razorpay)
- Real-time updates (Pusher)
- External integrations (WhatsApp)

### `/prisma` - Database
- Schema definition
- Migrations
- Type generation

### `/store` - State Management
- Cart state with Zustand
- Persistent storage with localStorage

## File Naming Conventions

- **Components**: PascalCase (e.g., `Header.tsx`)
- **Pages**: lowercase (e.g., `page.tsx`)
- **API Routes**: lowercase (e.g., `route.ts`)
- **Utilities**: camelCase (e.g., `utils.ts`)
- **Types**: PascalCase interfaces/types

## Important Files

1. **`prisma/schema.prisma`** - Database schema with all models
2. **`lib/auth.ts`** - NextAuth configuration for admin authentication
3. **`lib/razorpay.ts`** - Payment gateway integration
4. **`store/cart-store.ts`** - Shopping cart state management
5. **`components/providers.tsx`** - App-wide providers (Session, Lenis)
6. **`app/layout.tsx`** - Root layout with global providers

