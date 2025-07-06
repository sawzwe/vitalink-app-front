export interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  medicalCondition?: string;
  // Additional profile fields
  dateOfBirth?: string;
  phoneNumber?: string;
  address?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phoneNumber: string;
  };
  bloodType?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  allergies?: string[];
  medications?: string[];
  insuranceProvider?: string;
  insuranceNumber?: string;
}

export type Hospital = {
  id: string;
  name: string;
  imageUrl: string;
  distance: number;
  rating: number;
  specialties: string[];
  emergencyServices: boolean;
  facilities: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
};

export interface TimeSlot {
  id: string;
  hospitalId: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  doctorName?: string;
  specialtyType?: string;
}

export interface Booking {
  id: string;
  userId: string;
  hospitalId: string;
  hospitalName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'upcoming' | 'completed' | 'cancelled' | 'confirmed';
  doctorName?: string;
  specialtyType?: string;
  bookingReference?: string;
  confirmationDetails?: {
    confirmationTime: string;
    instructions?: string;
    requiredDocuments?: string[];
  };
} 