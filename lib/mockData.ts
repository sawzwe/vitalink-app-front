import { Hospital, TimeSlot, Booking } from './types';

export const mockHospitals: Hospital[] = [
  {
    id: 'h1',
    name: 'CGH Phaholyothin Hospital',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop',
    distance: 0.5,
    rating: 4.8,
    specialties: ['General Medicine', 'Cardiology', 'Orthopedics', 'Pediatrics', 'Emergency Care'],
    emergencyServices: true,
    facilities: ['Parking', 'Pharmacy', 'Laboratory', 'Radiology', 'Cafeteria'],
    address: {
      street: '168/26 Phahonyothin Rd',
      city: 'Bangkok',
      state: 'Sai Mai',
      zipCode: '10220'
    },
    coordinates: {
      lat: 13.8969,
      lng: 100.6197
    }
  },
  {
    id: '1',
    name: 'City General Hospital',
    specialties: ['General Medicine', 'Cardiology', 'Pediatrics'],
    distance: 2.5,
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=500&auto=format&fit=crop',
    address: {
      street: '123 Medical Center Blvd',
      city: 'Downtown',
      state: 'CA',
      zipCode: '90001',
    },
    facilities: ['Emergency Room', 'ICU', 'Surgery Center', 'Imaging Center'],
    emergencyServices: true,
    coordinates: {
      lat: 34.0522,
      lng: -118.2437
    }
  },
  {
    id: '2',
    name: 'Central Medical Center',
    specialties: ['Orthopedics', 'Neurology', 'Oncology'],
    distance: 4.8,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=500&auto=format&fit=crop',
    address: {
      street: '456 Health Park Ave',
      city: 'Midtown',
      state: 'CA',
      zipCode: '90002',
    },
    facilities: ['Cancer Center', 'Rehabilitation', 'Research Center'],
    emergencyServices: true,
    coordinates: {
      lat: 34.0624,
      lng: -118.2987
    }
  },
  {
    id: '3',
    name: 'Riverside Health Institute', 
    specialties: ['Dermatology', 'ENT', 'Psychiatry'],
    distance: 6.2,
    rating: 4.3,
    imageUrl: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=500&auto=format&fit=crop',
    address: {
      street: '789 Riverside Drive',
      city: 'Riverside',
      state: 'CA',
      zipCode: '90003',
    },
    facilities: ['Mental Health Center', 'Outpatient Surgery', 'Diagnostic Center'],
    emergencyServices: false,
    coordinates: {
      lat: 34.0901,
      lng: -118.3135
    }
  },
];

const doctors = [
  'Dr. Sarah Johnson',
  'Dr. Michael Chen',
  'Dr. Emily Rodriguez',
  'Dr. James Wilson',
  'Dr. Lisa Thompson',
];

const specialties = [
  'General Medicine',
  'Cardiology',
  'Pediatrics',
  'Orthopedics',
  'Neurology',
];

// Generate time slots for the next 7 days
export const generateTimeSlots = (hospitalId: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const today = new Date();
  
  for (let day = 0; day < 7; day++) {
    const date = new Date(today);
    date.setDate(today.getDate() + day);
    
    // Generate slots from 9 AM to 5 PM
    for (let hour = 9; hour < 17; hour++) {
      slots.push({
        id: `${hospitalId}-${date.toISOString()}-${hour}`,
        hospitalId,
        startTime: `${date.toISOString().split('T')[0]}T${hour.toString().padStart(2, '0')}:00:00`,
        endTime: `${date.toISOString().split('T')[0]}T${(hour + 1).toString().padStart(2, '0')}:00:00`,
        isAvailable: Math.random() > 0.3, // 70% chance of being available
        doctorName: doctors[Math.floor(Math.random() * doctors.length)],
        specialtyType: specialties[Math.floor(Math.random() * specialties.length)],
      });
    }
  }
  
  return slots;
};

export const mockUpcomingBookings: Booking[] = [
  {
    id: '1',
    userId: '1',
    hospitalId: '1',
    hospitalName: 'City General Hospital',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    startTime: '10:00',
    endTime: '11:00',
    status: 'confirmed',
    doctorName: 'Dr. Sarah Johnson',
    specialtyType: 'Cardiology',
    bookingReference: 'BK-2024-001',
    confirmationDetails: {
      confirmationTime: new Date().toISOString(),
      instructions: 'Please arrive 15 minutes before your appointment. Bring your insurance card and ID.',
      requiredDocuments: ['Insurance Card', 'Government ID', 'Medical History'],
    },
  },
  {
    id: '2',
    userId: '1',
    hospitalId: '2',
    hospitalName: 'Central Medical Center',
    date: new Date(Date.now() + 172800000).toISOString().split('T')[0], // Day after tomorrow
    startTime: '14:00',
    endTime: '15:00',
    status: 'upcoming',
    doctorName: 'Dr. Michael Chen',
    specialtyType: 'Neurology',
  },
]; 