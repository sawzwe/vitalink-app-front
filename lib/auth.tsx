'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from './types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const handleSignIn = async (email: string) => {
    try {
      // In a real app, this would make an API call
      setUser({
        id: '1',
        name: 'John Doe',
        email: email,
        age: 35,
        gender: 'male',
        bloodType: 'A+',
        medicalCondition: 'None',
        dateOfBirth: '1989-01-01',
        phoneNumber: '+1234567890',
        address: '123 Main St, Anytown, CA, 12345',
        emergencyContact: {
          name: 'Jane Doe',
          relationship: 'Spouse',
          phoneNumber: '+0987654321'
        },
        allergies: ['Penicillin'],
        medications: ['None'],
        insuranceProvider: 'Health Insurance Co',
        insuranceNumber: 'INS123456789'
      });
    } catch (err) {
      console.error('Error signing in:', err);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login: handleSignIn, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 