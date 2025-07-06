'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Booking } from '@/lib/types';
import { mockUpcomingBookings } from '@/lib/mockData';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, FileText, AlertCircle, Plus } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language';

export default function UpcomingBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    setBookings(mockUpcomingBookings);
  }, []);

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('nav.bookings')}</h1>
          <p className="text-muted-foreground">
            {t('booking.subtitle')}
          </p>
        </div>
        <Link href="/app/booking/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            {t('booking.title')}
          </Button>
        </Link>
      </div>

      {bookings.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <div className="flex flex-col items-center space-y-3">
              <Calendar className="h-12 w-12 text-muted-foreground/50" />
              <p className="text-lg font-medium">{t('booking.noUpcoming')}</p>
              <p className="text-sm text-muted-foreground mb-6">
                {t('booking.bookFirst')}
              </p>
              <Link href="/app/booking/new">
                <Button size="lg" className="gap-2">
                  <Plus className="h-4 w-4" />
                  {t('booking.title')}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="font-semibold text-xl">{booking.hospitalName}</h2>
                        <div className="flex items-center gap-2 text-muted-foreground mt-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {format(new Date(booking.date), 'EEEE, MMMM d, yyyy')}
                          </span>
                          <span className="mx-1">•</span>
                          <Clock className="h-4 w-4" />
                          <span>
                            {booking.startTime} - {booking.endTime}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {t(`booking.status.${booking.status}`)}
                      </span>
                    </div>

                    {booking.doctorName && (
                      <div className="space-y-1">
                        <p className="font-medium">{t('booking.doctor')}</p>
                        <p className="text-muted-foreground">
                          {booking.doctorName}
                          {booking.specialtyType && (
                            <span className="ml-1 text-sm">
                              ({booking.specialtyType})
                            </span>
                          )}
                        </p>
                      </div>
                    )}

                    {booking.status === 'confirmed' && booking.confirmationDetails && (
                      <div className="space-y-4 mt-6 p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <AlertCircle className="h-4 w-4 text-primary" />
                          {t('booking.importantInfo')}
                        </div>
                        
                        <div className="space-y-3 text-sm">
                          <p>{booking.confirmationDetails.instructions}</p>
                          
                          {booking.confirmationDetails.requiredDocuments && (
                            <div className="space-y-2">
                              <p className="font-medium">{t('booking.requiredDocs')}:</p>
                              <ul className="list-disc list-inside space-y-1">
                                {booking.confirmationDetails.requiredDocuments.map((doc, index) => (
                                  <li key={index}>{doc}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="pt-2">
                            <p className="font-medium">{t('booking.reference')}:</p>
                            <p className="font-mono">{booking.bookingReference}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-row md:flex-col gap-2 md:w-32">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        window.open(`https://maps.google.com/?q=CGH+Phaholyothin+Hospital`, '_blank');
                      }}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      {t('booking.directions')}
                    </Button>
                    {booking.status === 'confirmed' && (
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          console.log('Download booking details');
                        }}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        {t('booking.details')}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 