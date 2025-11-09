# Terminal Commands to Run the Website

## Complete Setup and Run Commands

### Step 1: Navigate to Project Directory
```powershell
cd "D:\Jayy\PROJECTS\9. Pet Store Website"
```

### Step 2: Install Dependencies (if not already installed)
```powershell
npm install
```

### Step 3: Generate Prisma Client
```powershell
npx prisma generate
```

### Step 4: Create Database and Run Migrations
```powershell
npx prisma migrate dev --name init
```

### Step 5: Seed Database with Sample Data
```powershell
npm run seed
```

### Step 6: Start Development Server
```powershell
npm run dev
```

---

## Quick Start (All in One)

If you've already installed dependencies, you can run everything in sequence:

```powershell
cd "D:\Jayy\PROJECTS\9. Pet Store Website"
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

---

## Alternative: One-Line Setup (PowerShell)

```powershell
cd "D:\Jayy\PROJECTS\9. Pet Store Website"; npx prisma generate; npx prisma migrate dev --name init; npm run seed; npm run dev
```

---

## Windows Command Prompt (CMD) Alternative

If using CMD instead of PowerShell:

```cmd
cd "D:\Jayy\PROJECTS\9. Pet Store Website"
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

---

## After Server Starts

Once the server is running, you'll see:
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000
```

Open your browser and visit:
- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login

**Admin Credentials:**
- Email: `admin@cafeluxe.com`
- Password: `admin123`

---

## Stop the Server

Press `Ctrl + C` in the terminal to stop the development server.

---

## Troubleshooting

### If you get "Database already exists" error:
```powershell
npx prisma migrate reset
npm run seed
```

### If you need to regenerate Prisma Client:
```powershell
npx prisma generate
```

### If you need to recreate the database:
```powershell
npx prisma migrate reset
npx prisma migrate dev --name init
npm run seed
```

