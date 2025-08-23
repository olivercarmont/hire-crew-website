"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, MessageCircle, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"

export default function FeedbackToast() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const { error } = await supabase.from("feature_requests").insert([
        {
          name: name.trim(),
          email: email.trim() || null,
          message: message.trim(),
        },
      ])

      if (error) throw error

      setIsSubmitted(true)
      // Reset form
      setName("")
      setEmail("")
      setMessage("")

      setTimeout(() => {
        setIsOpen(false)
        setIsSubmitted(false)
      }, 2000)
    } catch (error) {
      console.error("Error submitting feedback:", error)
      setError("Failed to submit feedback. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg bg-orange-600 hover:bg-orange-700"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Open feedback form</span>
        </Button>
      )}

      {isOpen && (
        <Card
          className={cn(
            "fixed bottom-6 right-6 z-50 w-80 shadow-xl border-2 transition-all duration-300",
            isSubmitted ? "border-green-500" : "border-border",
          )}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-orange-600" />
                <CardTitle className="text-lg">Feedback</CardTitle>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-6 w-6">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription>
              {isSubmitted ? "Thank you for your feedback!" : "Help us improve hireCrew"}
            </CardDescription>
          </CardHeader>

          {!isSubmitted ? (
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className="h-9"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="h-9"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback">Your feedback</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Tell us what you think..."
                    className="min-h-[80px] resize-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
                  <Send className="h-4 w-4 mr-2" />
                  {isLoading ? "Sending..." : "Send Feedback"}
                </Button>
              </form>
            </CardContent>
          ) : (
            <CardContent className="text-center py-8">
              <div className="text-green-600 text-2xl mb-2">✓</div>
              <p className="text-sm text-muted-foreground">We'll review your feedback and get back to you soon.</p>
            </CardContent>
          )}
        </Card>
      )}
    </>
  )
}
