"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.svg"
            alt="hireCrew Logo"
            width={32}
            height={32}
            className="h-8 w-auto"
          />
          <span className="text-xl font-bold">hireCrew</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/services/crew-search"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Crew Search
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Find the perfect maritime professionals for your vessel
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/services/crew-management" title="Crew Management">
                      Streamline your maritime workforce operations
                    </ListItem>
                    <ListItem href="/services/compliance" title="Compliance">
                      Stay compliant with maritime regulations
                    </ListItem>
                    <ListItem href="/services/training" title="Training">
                      Professional development for maritime crews
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" className="text-foreground hover:text-accent">
            Sign In
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Sign up now</Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b shadow-lg md:hidden">
            <div className="flex flex-col space-y-4 p-4">
              <Link
                href="/services"
                className="px-3 py-2 text-lg hover:bg-muted rounded-md"
                onClick={toggleMenu}
              >
                Services
              </Link>
              <Link
                href="/about"
                className="px-3 py-2 text-lg hover:bg-muted rounded-md"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="px-3 py-2 text-lg hover:bg-muted rounded-md"
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </div>
            <div className="flex flex-col space-y-2 px-3 pt-4">
              <Button variant="ghost" className="justify-start text-foreground hover:text-accent">
                Sign In
              </Button>
              <Button className="justify-start bg-primary text-primary-foreground hover:bg-primary/90">
                Sign up now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

function navigationMenuTriggerStyle() {
  return cn(
    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
  )
}