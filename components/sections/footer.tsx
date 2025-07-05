import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="bg-muted py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-secondary" />
              <span className="text-lg font-semibold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                VitaLink
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting you to better health through innovative telehealth solutions.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:text-secondary">
                <Mail className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-secondary">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-secondary">
                <MapPin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-secondary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-secondary transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-secondary transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-secondary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-secondary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-secondary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-secondary transition-colors">
                  HIPAA Compliance
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-secondary transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-secondary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-secondary transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-secondary transition-colors">
                  Provider Portal
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-secondary transition-colors">
                  Patient Resources
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 VitaLink. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
} 