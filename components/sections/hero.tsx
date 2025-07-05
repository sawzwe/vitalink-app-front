import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Shield, Clock } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-40 pb-32 px-4 overflow-hidden bg-gradient-to-b from-secondary/5 via-background to-background">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center gap-8">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-secondary" />
            <span className="text-xl font-semibold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              VitaLink
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground max-w-3xl">
            Your Health, Connected{" "}
            <span className="text-secondary">Anytime, Anywhere</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Experience the future of healthcare with VitaLink. Connect with board-certified doctors, manage your health records, and receive personalized care from the comfort of your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button size="lg" className="text-lg px-8 bg-secondary hover:bg-secondary/90">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-secondary text-secondary hover:bg-secondary/10">
              Explore Plans
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-muted-foreground border-t border-border pt-12">
            <div className="flex flex-col items-center gap-2">
              <Shield className="h-8 w-8 text-secondary mb-2" />
              <span className="text-2xl font-bold text-foreground">100%</span>
              <span className="text-sm">HIPAA Compliant</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Clock className="h-8 w-8 text-secondary mb-2" />
              <span className="text-2xl font-bold text-foreground">24/7</span>
              <span className="text-sm">Care Access</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Heart className="h-8 w-8 text-secondary mb-2" />
              <span className="text-2xl font-bold text-foreground">98%</span>
              <span className="text-sm">Patient Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 