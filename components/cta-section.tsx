import { Button } from "@/components/ui/button"
import { ArrowRight, Mail } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Ready to Set Sail with the Perfect Crew?</h2>

          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            Join thousands of Ship owners and maritime professionals who trust hireCrew for their staffing needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-4"
            >
              Start Hiring Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-4 bg-transparent"
            >
              <Mail className="mr-2 h-5 w-5" />
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
