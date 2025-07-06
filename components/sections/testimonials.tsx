import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from 'next/image';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Patient",
    image: "https://i.pravatar.cc/150?img=1",
    content:
      "TeleciDiMed has transformed how I manage my chronic condition. The ability to consult with my doctor from home has saved me countless hours and made healthcare so much more accessible.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Healthcare Professional",
    image: "https://i.pravatar.cc/150?img=3",
    content:
      "As a healthcare provider, I've seen firsthand how TeleciDiMed improves patient outcomes. The platform is intuitive and makes it easy to provide quality care remotely.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Patient",
    image: "https://i.pravatar.cc/150?img=5",
    content:
      "The Premium plan has been a game-changer for my family. With five members covered, we always have access to healthcare when we need it. The mental health services are particularly valuable.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 px-4 bg-accent">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real experiences from patients and healthcare professionals using our platform
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 