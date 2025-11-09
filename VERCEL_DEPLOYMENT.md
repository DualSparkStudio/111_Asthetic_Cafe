# Vercel Deployment Guide

This guide will help you deploy the Café Luxe website to Vercel.

## Prerequisites

- A GitHub account
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Database credentials (Vercel Postgres, Neon, or PlanetScale)

## Step-by-Step Deployment

### 1. Push Code to GitHub

1. Initialize a git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a new repository on GitHub and push your code:
   ```bash
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```

### 2. Create Vercel Project

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings

### 3. Set Up Database

#### Option A: Vercel Postgres (Recommended)

1. In your Vercel project, go to "Storage" tab
2. Click "Create Database" → "Postgres"
3. Create a new database
4. Copy the `POSTGRES_PRISMA_URL` from the connection string
5. Add it to your environment variables as `DATABASE_URL`

#### Option B: Neon

1. Go to [neon.tech](https://neon.tech) and create an account
2. Create a new project
3. Copy the connection string
4. Add it to Vercel environment variables as `DATABASE_URL`

#### Option C: PlanetScale

1. Go to [planetscale.com](https://planetscale.com) and create an account
2. Create a new database
3. Update `prisma/schema.prisma` to use `mysql` instead of `postgresql`
4. Copy the connection string
5. Add it to Vercel environment variables as `DATABASE_URL`

### 4. Configure Environment Variables

In your Vercel project settings, go to "Environment Variables" and add:

```
# Database
DATABASE_URL=your-database-connection-string

# NextAuth
NEXTAUTH_URL=https://your-project.vercel.app
NEXTAUTH_SECRET=generate-a-random-secret-key

# Razorpay
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key-id

# UploadThing
UPLOADTHING_SECRET=your-uploadthing-secret
UPLOADTHING_APP_ID=your-uploadthing-app-id

# Pusher
PUSHER_APP_ID=your-pusher-app-id
PUSHER_KEY=your-pusher-key
PUSHER_SECRET=your-pusher-secret
PUSHER_CLUSTER=your-pusher-cluster
NEXT_PUBLIC_PUSHER_CLUSTER=your-pusher-cluster
NEXT_PUBLIC_PUSHER_KEY=your-pusher-key

# WhatsApp
WHATSAPP_API_KEY=your-whatsapp-api-key
WHATSAPP_API_SECRET=your-whatsapp-api-secret
WHATSAPP_PHONE_NUMBER=your-whatsapp-phone-number
NEXT_PUBLIC_WHATSAPP_NUMBER=your-whatsapp-phone-number

# Instagram
INSTAGRAM_ACCESS_TOKEN=your-instagram-access-token
```

**Important:** Generate a secure `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

### 5. Run Database Migrations

After the first deployment, you need to run migrations:

1. In Vercel project settings, go to "Settings" → "Build & Development Settings"
2. Add a build command override:
   ```
   npx prisma generate && npx prisma migrate deploy && next build
   ```

Or run migrations manually via Vercel CLI:
```bash
npm i -g vercel
vercel env pull .env.local
npx prisma migrate deploy
```

### 6. Create Admin User

After deployment, create an admin user:

1. Use Vercel's database tools or connect via Prisma Studio:
   ```bash
   npx prisma studio
   ```
2. Create a user with:
   - `email`: your admin email
   - `role`: `ADMIN`
   - `password`: (implement proper hashing in production)

### 7. Configure Custom Domain (Optional)

1. Go to "Settings" → "Domains"
2. Add your custom domain
3. Follow DNS configuration instructions

## Post-Deployment Checklist

- [ ] Database migrations completed
- [ ] Admin user created
- [ ] Environment variables configured
- [ ] Test payment flow (Razorpay)
- [ ] Test order tracking (Pusher)
- [ ] Test WhatsApp integration
- [ ] Test admin panel login
- [ ] Add menu items via admin panel
- [ ] Test complete order flow

## Troubleshooting

### Build Errors

- Check that all environment variables are set
- Verify database connection string is correct
- Ensure `NEXTAUTH_SECRET` is set

### Database Connection Issues

- Verify `DATABASE_URL` is correct
- Check database firewall settings
- Ensure SSL is enabled for production databases

### Payment Issues

- Verify Razorpay credentials
- Check Razorpay webhook configuration
- Ensure `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set

### Real-time Updates Not Working

- Verify Pusher credentials
- Check Pusher cluster configuration
- Ensure all Pusher environment variables are set

## Support

For deployment issues, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)

