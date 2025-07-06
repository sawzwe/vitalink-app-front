'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Hospital, TimeSlot, Booking } from '@/lib/types';
import { mockHospitals, mockUpcomingBookings, generateTimeSlots } from '@/lib/mockData';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import { MapPin, Star, Clock, SortAsc, SortDesc } from 'lucide-react';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/lib/language';

export default function BookingPage() {
  const { t } = useLanguage();
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [sortBy, setSortBy] = useState<'distance' | 'rating'>('distance');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [upcomingBookings] = useState<Booking[]>(mockUpcomingBookings);

  // Initialize hospitals once on mount
  useEffect(() => {
    setHospitals(mockHospitals);
  }, []);

  useEffect(() => {
    if (selectedHospital) {
      setTimeSlots(generateTimeSlots(selectedHospital.id));
    }
  }, [selectedHospital]);

  const handleSort = useCallback(() => {
    setHospitals(prevHospitals => {
      return [...prevHospitals].sort((a, b) => {
        if (sortBy === 'distance') {
          return sortOrder === 'asc' ? a.distance - b.distance : b.distance - a.distance;
        } else {
          return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
        }
      });
    });
  }, [sortBy, sortOrder]);

  // Apply sorting
  useEffect(() => {
    handleSort();
  }, [handleSort]);

  const groupTimeSlotsByDate = (slots: TimeSlot[]) => {
    const groups: { [key: string]: TimeSlot[] } = {};
    slots.forEach(slot => {
      const date = slot.startTime.split('T')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(slot);
    });
    return groups;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t('booking.manageBookings')}</h1>
        <p className="text-muted-foreground">{t('booking.manageBookingsDesc')}</p>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">{t('booking.upcomingBookings')}</TabsTrigger>
          <TabsTrigger value="new">{t('booking.newBooking')}</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingBookings.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">{t('booking.noUpcomingBookings')}</p>
                <Button 
                  className="mt-4" 
                  onClick={() => {
                    const newTabTrigger = document.querySelector('[value="new"]') as HTMLButtonElement;
                    newTabTrigger?.click();
                  }}
                >
                  {t('booking.makeNewBooking')}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {upcomingBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{booking.hospitalName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(booking.date), 'EEEE, MMMM d')} at {booking.startTime}
                        </p>
                        <p className="text-sm mt-2">
                          {t('booking.with')} {booking.doctorName} • {booking.specialtyType}
                        </p>
                      </div>
                      {booking.status === 'confirmed' && (
                        <div className="text-right">
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium">
                            {t('booking.confirmed')}
                          </span>
                          <p className="text-sm text-muted-foreground mt-1">
                            {t('booking.ref')}: {booking.bookingReference}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="new" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-end gap-4">
                <div className="flex items-center gap-2">
                  <select
                    className="h-9 rounded-md border border-input bg-background px-3"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'distance' | 'rating')}
                  >
                    <option value="distance">{t('booking.distance')}</option>
                    <option value="rating">{t('booking.rating')}</option>
                  </select>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  >
                    {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <ScrollArea className="h-[600px] rounded-md border p-4">
                <div className="space-y-4">
                  {hospitals.map((hospital) => (
                    <Card
                      key={hospital.id}
                      className={`cursor-pointer transition-colors hover:border-primary/50 ${
                        selectedHospital?.id === hospital.id ? 'border-primary' : ''
                      }`}
                      onClick={() => setSelectedHospital(hospital)}
                    >
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="relative h-24 w-32 rounded-md overflow-hidden">
                            <Image
                              src={hospital.imageUrl}
                              alt={hospital.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{hospital.name}</h3>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{hospital.distance} {t('booking.kmAway')}</span>
                              <span className="mx-1">•</span>
                              <Star className="h-4 w-4 text-yellow-400" />
                              <span>{hospital.rating}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="space-y-4">
              <ScrollArea className="h-[600px] rounded-md border p-4">
                {selectedHospital ? (
                  <div className="space-y-6">
                    {Object.entries(groupTimeSlotsByDate(timeSlots)).map(([date, slots]) => (
                      <div key={date} className="space-y-2">
                        <h3 className="font-medium">
                          {format(new Date(date), 'EEEE, MMMM d')}
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {slots.map((slot) => (
                            <Button
                              key={slot.id}
                              variant={selectedTimeSlot?.id === slot.id ? 'default' : 'outline'}
                              className={`w-full justify-start ${!slot.isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                              onClick={() => slot.isAvailable && setSelectedTimeSlot(slot)}
                              disabled={!slot.isAvailable}
                            >
                              <Clock className="mr-2 h-4 w-4" />
                              {format(new Date(slot.startTime), 'h:mm a')}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    {t('booking.selectHospital')}
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 