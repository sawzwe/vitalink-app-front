'use client';

import { useAuth } from '@/lib/auth';
import { mockUpcomingBookings } from '@/lib/mockData';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, User, Clock } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
        <p className="text-muted-foreground">Here&apos;s an overview of your health management</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUpcomingBookings.length}</div>
            <p className="text-xs text-muted-foreground">
              Next appointment: {mockUpcomingBookings[0]?.date}
            </p>
            <Button asChild className="mt-4 w-full">
              <Link href="/app/booking">View All</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {user?.medicalCondition ? '100%' : '50%'}
            </div>
            <p className="text-xs text-muted-foreground">
              {user?.medicalCondition
                ? 'Profile is complete'
                : 'Complete your medical profile'}
            </p>
            <Button asChild className="mt-4 w-full">
              <Link href="/app/profile">Update Profile</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quick Book</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-4">
              Book your next appointment quickly
            </p>
            <Button asChild className="w-full">
              <Link href="/app/booking/new">Book Now</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Recent Appointments</h2>
        <div className="space-y-4">
          {mockUpcomingBookings.map((booking) => (
            <Card key={booking.id}>
              <CardHeader>
                <CardTitle className="text-lg">
                  {booking.hospitalName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Date: {booking.date}
                </p>
                <p className="text-sm text-muted-foreground">
                  Time: {booking.startTime} - {booking.endTime}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 