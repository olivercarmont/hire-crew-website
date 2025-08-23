import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import Logo from './logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Logo />
          <a href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block">
              hireCrew
            </span>
          </a>
          <div className="hidden md:flex">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a href="#home" className="text-foreground hover:text-accent transition-colors">
                Home
              </a>
              <a
                href="#services"
                className="text-foreground/60 hover:text-accent transition-colors"
              >
                Services
              </a>
              <a
                href="#testimonials"
                className="text-foreground/60 hover:text-accent transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="text-foreground/60 hover:text-accent transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="hidden md:flex">
            <Button>Get Started</Button>
          </div>
          <button
            className="inline-flex items-center justify-center md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="container pb-4 pt-2 md:hidden">
          <nav className="flex flex-col space-y-3">
            <a
              href="#home"
              className="block px-3 py-2 text-foreground hover:text-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
            <a
              href="#services"
              className="block px-3 py-2 text-foreground/60 hover:text-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Services
            </a>
            <a
              href="#testimonials"
              className="block px-3 py-2 text-foreground/60 hover:text-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 text-foreground/60 hover:text-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
            <div className="pt-2">
              <Button className="w-full">Get Started</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
