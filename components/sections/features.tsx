'use client';

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Calendar, FileText, MessageSquare, Shield, Clock } from "lucide-react";
import { useLanguage } from "@/lib/language";

const features = [
  {
    titleKey: 'features.videoConsultations',
    descriptionKey: 'features.videoDesc',
    icon: Video,
  },
  {
    titleKey: 'features.scheduling',
    descriptionKey: 'features.schedulingDesc',
    icon: Calendar,
  },
  {
    titleKey: 'features.records',
    descriptionKey: 'features.recordsDesc',
    icon: FileText,
  },
  {
    titleKey: 'features.messaging',
    descriptionKey: 'features.messagingDesc',
    icon: MessageSquare,
  },
  {
    titleKey: 'features.security',
    descriptionKey: 'features.securityDesc',
    icon: Shield,
  },
  {
    titleKey: 'features.support',
    descriptionKey: 'features.supportDesc',
    icon: Clock,
  },
];

export function FeaturesSection() {
  const { t } = useLanguage();

  return (
    <section id="features" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            {t('features.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <CardTitle>{t(feature.titleKey)}</CardTitle>
                <CardDescription>{t(feature.descriptionKey)}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 