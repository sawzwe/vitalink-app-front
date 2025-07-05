import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do video consultations work?",
    answer:
      "Video consultations are conducted through our secure platform. Once you schedule an appointment, you'll receive a link to join the video call. Simply click the link at your appointment time to connect with your healthcare provider. Our platform works on any modern device with a camera and internet connection.",
  },
  {
    question: "What's the difference between Limited and Premium plans?",
    answer:
      "The Limited plan offers essential telehealth services with 2 video consultations per month, while the Premium plan provides unlimited consultations, family coverage, and additional services like mental health support and specialist referrals. Premium members also get priority 24/7 support and advanced health analytics.",
  },
  {
    question: "Is my medical information secure?",
    answer:
      "Yes, we take your privacy seriously. Our platform is HIPAA-compliant and uses enterprise-grade encryption to protect your medical data. We regularly undergo security audits and maintain strict access controls to ensure your information stays confidential.",
  },
  {
    question: "Can I switch between plans?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle. When upgrading to Premium, you'll get immediate access to additional features.",
  },
  {
    question: "What types of healthcare providers are available?",
    answer:
      "Our network includes licensed primary care physicians, specialists, mental health professionals, and more. All providers are thoroughly vetted and must meet our strict qualification requirements. You can view provider profiles and specialties before booking.",
  },
  {
    question: "How quickly can I get an appointment?",
    answer:
      "Most routine appointments can be scheduled within 24-48 hours. For urgent care needs, Premium members have access to 24/7 on-demand consultations. You can also schedule appointments in advance at your convenience.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Find answers to common questions about our telehealth services
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
} 