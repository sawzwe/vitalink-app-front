import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const doctors = [
  {
    name: "Dr. Jennifer Williams",
    specialty: "Primary Care Physician",
    image: "https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg",
    qualifications: "MD, Board Certified in Internal Medicine",
    experience: "15+ years experience",
    availability: "Available for video consultations",
  },
  {
    name: "Dr. Maria Garcia",
    specialty: "Mental Health Specialist",
    image: "https://img.freepik.com/free-photo/medical-workers-covid-19-vaccination-concept-confident-professional-doctor-male-nurse-blue-scrubs-stethoscope-cross-arms-chest-ready-help-patients-smile-assured_1258-57360.jpg",
    qualifications: "MD, Board Certified in Psychiatry",
    experience: "18+ years experience",
    availability: "Available for video consultations",
  },
];

export function DoctorsSection() {
  return (
    <section id="doctors" className="py-24 px-4 bg-secondary/5">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold mb-4 block">Expert Care</span>
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Meet Our Board-Certified Specialists
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our team of experienced healthcare professionals is here to provide you with the highest quality care
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {doctors.map((doctor, index) => (
            <Card key={index} className="overflow-hidden group hover:border-secondary/50 transition-colors">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-1">{doctor.name}</h3>
                <p className="text-secondary font-medium mb-2">
                  {doctor.specialty}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  {doctor.qualifications}
                </p>
                <div className="space-y-2">
                  <p className="text-sm">{doctor.experience}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {doctor.availability}
                  </p>
                </div>
                <Button className="w-full mt-4 bg-secondary hover:bg-secondary/90">
                  Book Consultation
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 