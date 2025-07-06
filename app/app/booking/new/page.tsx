'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Hospital, TimeSlot } from '@/lib/types';
import { mockHospitals, generateTimeSlots } from '@/lib/mockData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import Image from 'next/image';
import { MapPin, Star, Clock, SortAsc, SortDesc, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from "@/lib/language";

export default function NewBookingPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [sortBy, setSortBy] = useState<'distance' | 'rating'>('distance');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState({
    specialty: '',
    emergencyServices: false,
    maxDistance: 10,
  });
  const [isConfirming, setIsConfirming] = useState(false);
  const [progress, setProgress] = useState(0);

  // Initialize hospitals once on mount
  useEffect(() => {
    setHospitals(mockHospitals);
  }, []);

  useEffect(() => {
    if (selectedHospital) {
      setTimeSlots(generateTimeSlots(selectedHospital.id));
    }
  }, [selectedHospital]);

  const handleConfirmBooking = async () => {
    if (!selectedHospital || !selectedTimeSlot) return;

    setIsConfirming(true);
    
    // Simulate a booking process with progress
    for (let i = 0; i <= 100; i += 20) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Redirect to upcoming bookings page
    router.push('/app/booking/upcoming');
  };

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

  const handleFilter = useCallback(() => {
    const filtered = mockHospitals.filter(hospital => {
      if (filters.specialty && !hospital.specialties.includes(filters.specialty)) {
        return false;
      }
      if (filters.maxDistance && hospital.distance > filters.maxDistance) {
        return false;
      }
      if (filters.emergencyServices && !hospital.emergencyServices) {
        return false;
      }
      return true;
    });
    setHospitals(filtered);
  }, [filters]);

  // Apply filters first, then sorting
  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  useEffect(() => {
    handleSort();
  }, [handleSort]);

  const specialties = Array.from(
    new Set(mockHospitals.flatMap(hospital => hospital.specialties))
  ).sort();

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

  if (isConfirming) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
        <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <h2 className="text-lg font-semibold">{t('booking.confirming')}</h2>
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground">
              {t('booking.pleaseWait')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-32">
      <div className="flex items-center gap-4">
        <Link href="/app/booking/upcoming" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('booking.title')}</h1>
          <p className="text-muted-foreground">
            {t('booking.subtitle')}
          </p>
        </div>
      </div>

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

        {/* <Button
          variant="outline"
          onClick={() => {
            const dialog = document.getElementById('filterDialog') as HTMLDialogElement;
            dialog?.showModal();
          }}
        >
          <Filter className="h-4 w-4 mr-2" />
          {t('booking.filters')}
        </Button> */}
      </div>

      <dialog
        id="filterDialog"
        className="rounded-lg p-6 backdrop:bg-black backdrop:bg-opacity-50"
      >
        <div className="w-[300px] space-y-4">
          <h3 className="text-lg font-semibold">{t('booking.filters')}</h3>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('booking.specialty')}</label>
            <select
              className="w-full h-9 rounded-md border border-input bg-background px-3"
              value={filters.specialty}
              onChange={(e) => setFilters(prev => ({ ...prev, specialty: e.target.value }))}
            >
              <option value="">{t('booking.allSpecialties')}</option>
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t('booking.maxDistance')}</label>
            <input
              type="range"
              min="1"
              max="50"
              value={filters.maxDistance}
              onChange={(e) => setFilters(prev => ({ ...prev, maxDistance: parseInt(e.target.value) }))}
              className="w-full"
            />
            <div className="text-sm text-muted-foreground">{filters.maxDistance} {t('booking.kmAway')}</div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="emergencyServices"
              checked={filters.emergencyServices}
              onChange={(e) => setFilters(prev => ({ ...prev, emergencyServices: e.target.checked }))}
            />
            <label htmlFor="emergencyServices" className="text-sm font-medium">
              {t('booking.emergencyServices')}
            </label>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setFilters({ specialty: '', emergencyServices: false, maxDistance: 10 });
                const dialog = document.getElementById('filterDialog') as HTMLDialogElement;
                dialog?.close();
              }}
            >
              {t('booking.reset')}
            </Button>
            <Button
              onClick={() => {
                const dialog = document.getElementById('filterDialog') as HTMLDialogElement;
                dialog?.close();
              }}
            >
              {t('booking.apply')}
            </Button>
          </div>
        </div>
      </dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
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
                        <div className="mt-2 flex flex-wrap gap-1">
                          {hospital.specialties.map((specialty) => (
                            <span
                              key={specialty}
                              className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium"
                            >
                              {specialty}
                            </span>
                          ))}
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

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <div className="container flex justify-between items-center">
          <div>
            {selectedHospital && selectedTimeSlot && (
              <div className="text-sm">
                <p className="font-medium">{selectedHospital.name}</p>
                <p className="text-muted-foreground">
                  {format(new Date(selectedTimeSlot.startTime), 'EEEE, MMMM d, h:mm a')}
                </p>
              </div>
            )}
          </div>
          <Button
            onClick={handleConfirmBooking}
            disabled={!selectedHospital || !selectedTimeSlot}
          >
            {t('booking.confirm')}
          </Button>
        </div>
      </div>
    </div>
  );
} 