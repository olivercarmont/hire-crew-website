import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Shield, Clock } from "lucide-react"

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/placeholder-ewajq.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Hire the Best <span className="text-accent">Crew</span> for Your Vessel
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">
            Connect with experienced maritime professionals worldwide. Our platform ensures you find qualified, vetted
            crew members for any vessel type.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-4">
              Find a crew member now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-4 bg-transparent"
            >
              Join as a Crew Member
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-accent mb-2" />
              <div className="text-3xl font-bold text-white">10,000+</div>
              <div className="text-gray-300">Verified Crew</div>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="h-12 w-12 text-accent mb-2" />
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-gray-300">Background Checked</div>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-12 w-12 text-accent mb-2" />
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-gray-300">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
