'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-destructive/10 via-background to-destructive/5 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full"
          >
            <Card className="border-2 border-destructive">
              <CardHeader className="text-center">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ 
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                  className="mx-auto mb-4"
                >
                  <AlertTriangle className="h-16 w-16 text-destructive" />
                </motion.div>
                <CardTitle className="text-2xl text-destructive">
                  Global Error
                </CardTitle>
                <CardDescription>
                  A critical error occurred. Please refresh the page.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={reset}
                  className="w-full bg-gradient-to-r from-destructive to-red-600 hover:from-destructive/90 hover:to-red-600/90"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset Application
                </Button>
                {error.digest && (
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Error ID: {error.digest}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </body>
    </html>
  )
}

