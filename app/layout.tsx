import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FloatingSocial } from '@/components/floating-social'
import { VoiceAssistant } from '@/components/voice-assistant'
import { ScrollProgressWrapper } from '@/components/scroll-progress-wrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Premium Café - Delicious Food & Great Coffee',
  description: 'Experience the finest café dining with our curated menu and exceptional service',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ScrollProgressWrapper />
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <FloatingSocial />
          <VoiceAssistant />
        </Providers>
      </body>
    </html>
  )
}

