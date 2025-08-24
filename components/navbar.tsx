"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Anchor } from "lucide-react"

export function Navbar({ variant }: { variant?: "landing" }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${
  variant === "landing" 
    ? "bg-accent/10" 
    : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
} border-b border-border`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Anchor className="h-8 w-8 text-accent" />
            <span className="text-xl font-bold text-foreground">hireCrew</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-accent transition-colors">
              Home
            </a>
            <a href="/about2" className="text-foreground hover:text-accent transition-colors">
              About
            </a>
            <a href="#services" className="text-foreground hover:text-accent transition-colors">
              Services
            </a>
            <a href="#contact" className="text-foreground hover:text-accent transition-colors">
              Contact
            </a>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-foreground hover:text-accent">
              Sign In
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Get Started</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-foreground">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              <a
                href="#home"
                className="block px-3 py-2 text-foreground hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
              <a
                href="/about2"
                className="block px-3 py-2 text-foreground hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
              <a
                href="#services"
                className="block px-3 py-2 text-foreground hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Services
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-foreground hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
              <div className="flex flex-col space-y-2 px-3 pt-4">
                <Button variant="ghost" className="justify-start text-foreground hover:text-accent">
                  Sign In
                </Button>
                <Button className="justify-start bg-primary text-primary-foreground hover:bg-primary/90">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
