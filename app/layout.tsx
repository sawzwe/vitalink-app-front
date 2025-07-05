import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VitaLink - Your Health, Connected",
  description: "Experience the future of healthcare with VitaLink. Connect with board-certified doctors and receive personalized care from anywhere.",
};

function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-secondary" />
          <span className="font-semibold text-lg bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            VitaLink
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-secondary transition-colors">
            Features
          </a>
          <a href="#doctors" className="text-sm text-muted-foreground hover:text-secondary transition-colors">
            Our Doctors
          </a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-secondary transition-colors">
            Pricing
          </a>
          <a href="#faq" className="text-sm text-muted-foreground hover:text-secondary transition-colors">
            FAQ
          </a>
          <a href="#contact" className="text-sm text-muted-foreground hover:text-secondary transition-colors">
            Contact
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-secondary hover:text-secondary/90">
            Sign In
          </Button>
          <Button size="sm" className="bg-secondary hover:bg-secondary/90">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
