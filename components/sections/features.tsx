import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Calendar, FileText, MessageSquare, Shield, Clock } from "lucide-react";

const features = [
  {
    title: "Video Consultations",
    description: "Face-to-face virtual appointments with healthcare professionals in HD quality.",
    icon: Video,
  },
  {
    title: "Easy Scheduling",
    description: "Book appointments 24/7 with our intuitive scheduling system.",
    icon: Calendar,
  },
  {
    title: "Digital Health Records",
    description: "Secure access to your complete medical history and test results.",
    icon: FileText,
  },
  {
    title: "Instant Messaging",
    description: "Direct communication with your healthcare providers through secure messaging.",
    icon: MessageSquare,
  },
  {
    title: "Data Security",
    description: "HIPAA-compliant platform ensuring your medical data stays private.",
    icon: Shield,
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock access to medical professionals for urgent care needs.",
    icon: Clock,
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Comprehensive Telehealth Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need for managing your health, all in one secure platform
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 