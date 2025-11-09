# Café Luxe - Premium Café Website

A full-stack, production-ready café website built with Next.js 14, TypeScript, and modern web technologies.

## 🚀 Features

### Customer Features
- **Dynamic Menu System** - Browse, search, and filter menu items
- **Shopping Cart** - Add items to cart with persistent storage
- **Online Ordering** - Complete order flow with Razorpay payment integration
- **Real-time Order Tracking** - Track your order status with live updates
- **Table Booking** - Reserve tables with date and time selection
- **Voice Assistant** - Voice-based navigation and menu search
- **WhatsApp Integration** - Quick contact and order confirmations
- **Instagram Feed** - Embedded social media posts
- **3D Hero Section** - Interactive Three.js animations
- **Smooth Scrolling** - Buttery smooth scrolling with Lenis

### Admin Features
- **Admin Dashboard** - View statistics and manage operations
- **Menu Management** - Add, edit, and delete menu items
- **Order Management** - View and update order statuses
- **Booking Management** - Manage table reservations
- **Real-time Notifications** - Get instant updates on new orders and bookings

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** ShadCN UI
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js
- **Payment:** Razorpay
- **Real-time:** Pusher
- **Animations:** Framer Motion, GSAP, Three.js
- **Smooth Scrolling:** Lenis
- **Image Upload:** UploadThing (configured)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cafe-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/cafe_db?schema=public"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"

   # Razorpay
   RAZORPAY_KEY_ID="your-razorpay-key-id"
   RAZORPAY_KEY_SECRET="your-razorpay-key-secret"
   NEXT_PUBLIC_RAZORPAY_KEY_ID="your-razorpay-key-id"

   # UploadThing
   UPLOADTHING_SECRET="your-uploadthing-secret"
   UPLOADTHING_APP_ID="your-uploadthing-app-id"

   # Pusher
   PUSHER_APP_ID="your-pusher-app-id"
   PUSHER_KEY="your-pusher-key"
   PUSHER_SECRET="your-pusher-secret"
   PUSHER_CLUSTER="your-pusher-cluster"
   NEXT_PUBLIC_PUSHER_CLUSTER="your-pusher-cluster"
   NEXT_PUBLIC_PUSHER_KEY="your-pusher-key"

   # WhatsApp
   WHATSAPP_API_KEY="your-whatsapp-api-key"
   WHATSAPP_API_SECRET="your-whatsapp-api-secret"
   WHATSAPP_PHONE_NUMBER="your-whatsapp-phone-number"
   NEXT_PUBLIC_WHATSAPP_NUMBER="your-whatsapp-phone-number"

   # Instagram
   INSTAGRAM_ACCESS_TOKEN="your-instagram-access-token"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Create an admin user**
   You'll need to create an admin user in the database. You can do this through Prisma Studio:
   ```bash
   npx prisma studio
   ```
   Or create a seed script to add an admin user.

6. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment to Vercel

1. **Push your code to GitHub**

2. **Import your project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure environment variables**
   - Add all environment variables from your `.env` file in Vercel's project settings

4. **Set up the database**
   - Use Vercel Postgres, Neon, or PlanetScale
   - Update the `DATABASE_URL` in Vercel environment variables
   - Run migrations: `npx prisma migrate deploy`

5. **Deploy**
   - Vercel will automatically deploy your application
   - Your site will be live at `your-project.vercel.app`

## 📝 Database Setup

### Using Vercel Postgres
1. Create a Postgres database in your Vercel project
2. Copy the `POSTGRES_PRISMA_URL` to your `DATABASE_URL` environment variable
3. Run `npx prisma migrate deploy`

### Using Neon
1. Create a Neon account and project
2. Copy the connection string to `DATABASE_URL`
3. Run `npx prisma migrate deploy`

### Using PlanetScale
1. Update `prisma/schema.prisma` to use `mysql` instead of `postgresql`
2. Create a PlanetScale account and database
3. Copy the connection string to `DATABASE_URL`
4. Run `npx prisma migrate deploy`

## 🔐 Admin Access

1. Create an admin user in the database with `role: "ADMIN"`
2. Navigate to `/admin/login`
3. Log in with your admin credentials

## 📱 Features Overview

### Home Page
- Interactive 3D hero section
- Feature highlights
- Instagram feed integration

### Menu Page
- Dynamic menu items from database
- Search and filter functionality
- Category-based filtering
- Add to cart functionality

### Cart & Checkout
- Persistent cart storage
- Order summary
- Customer information form
- Razorpay payment integration

### Order Tracking
- Real-time order status updates
- Visual progress indicator
- Order details and items

### Table Booking
- Date and time selection
- Guest count selection
- Special requests
- WhatsApp confirmation

### Admin Panel
- Dashboard with statistics
- Menu item management
- Order management
- Booking management

## 🎨 Customization

- Update colors in `tailwind.config.ts`
- Modify components in `components/` directory
- Add new pages in `app/` directory
- Update API routes in `app/api/` directory

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, email info@cafeluxe.com or create an issue in the repository.

