import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserCheck, Search, Headphones, Award, Globe, Clock } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      icon: Search,
      title: "Smart Crew Matching",
      description:
        "Our AI-powered system matches you with the perfect crew based on Ship type, route, and specific requirements.",
    },
    {
      icon: UserCheck,
      title: "Comprehensive Vetting",
      description:
        "Every crew member undergoes thorough background checks, certification verification, and skill assessments.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description:
        "Round-the-clock assistance for both vessel owners and crew members throughout the entire hiring process.",
    },
    {
      icon: Award,
      title: "Certification Management",
      description:
        "Track and manage all crew certifications, licenses, and training records in one centralized platform.",
    },
    {
      icon: Globe,
      title: "Global Network",
      description:
        "Access to maritime professionals worldwide, ensuring you find crew regardless of your location or destination.",
    },
    {
      icon: Clock,
      title: "Rapid Deployment",
      description: "Quick turnaround times to get your vessel staffed and ready to sail without unnecessary delays.",
    },
  ]

  return (
    <section id="services" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive crew management solutions designed to meet the unique needs of maritime operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-card hover:shadow-lg transition-shadow duration-300 border-border">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <service.icon className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-xl text-card-foreground">{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
