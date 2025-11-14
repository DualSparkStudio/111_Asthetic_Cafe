'use client'

import { useState, useEffect, useRef } from 'react'
import { Mic, MicOff, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'

type SpeechRecognitionInstance = {
  start: () => void
  stop: () => void
  abort: () => void
  onresult: ((event: any) => void) | null
  onerror: ((event: any) => void) | null
  onend?: (() => void) | null
  continuous: boolean
  lang: string
  interimResults: boolean
}

export function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const toggleListeningRef = useRef<(() => void) | null>(null)

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase()
    
    if (lowerCommand.includes('menu')) {
      window.location.href = '/menu'
    } else if (lowerCommand.includes('cart')) {
      window.location.href = '/cart'
    } else if (lowerCommand.includes('booking') || lowerCommand.includes('reservation')) {
      window.location.href = '/booking'
    } else if (lowerCommand.includes('home')) {
      window.location.href = '/'
    } else if (lowerCommand.includes('contact')) {
      window.location.href = '/contact'
    }
  }

  const toggleListening = () => {
    if (!recognitionRef.current) return

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      setIsOpen(true)
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  useEffect(() => {
    toggleListeningRef.current = toggleListening
  })

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'en-US'

      recognition.onresult = (event: any) => {
        let interimTranscript = ''
        let finalTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' '
          } else {
            interimTranscript += transcript
          }
        }

        setTranscript(finalTranscript + interimTranscript)
        handleVoiceCommand(finalTranscript + interimTranscript)
      }

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    }

    // Listen for custom event from FloatingSocial microphone button
    const handleToggleVoiceAssistant = () => {
      if (toggleListeningRef.current) {
        toggleListeningRef.current()
      }
    }

    window.addEventListener('toggleVoiceAssistant', handleToggleVoiceAssistant)

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      window.removeEventListener('toggleVoiceAssistant', handleToggleVoiceAssistant)
    }
  }, [])

  return (
    <>
      {/* Button is now in FloatingSocial component, so we hide this one */}
      <div className="hidden">
        <Button
          onClick={toggleListening}
          size="lg"
          className={`rounded-full h-14 w-14 ${
            isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'
          } shadow-lg border-2 border-white`}
          aria-label={isListening ? 'Stop voice assistant' : 'Start voice assistant'}
        >
          {isListening ? (
            <MicOff className="h-7 w-7 text-white" strokeWidth={2.5} />
          ) : (
            <Mic className="h-7 w-7 text-white" strokeWidth={2.5} />
          )}
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-80"
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Voice Assistant</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setIsOpen(false)
                      if (isListening && recognitionRef.current) {
                        recognitionRef.current.stop()
                        setIsListening(false)
                      }
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {isListening ? 'Listening...' : 'Click mic to start'}
                  </p>
                  {transcript && (
                    <p className="text-sm bg-muted p-2 rounded">{transcript}</p>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Try saying: &quot;Show me the menu&quot; or &quot;Go to cart&quot;
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

