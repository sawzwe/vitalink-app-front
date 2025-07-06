'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User as UserIcon, Heart, AlertCircle, Shield } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    email: '',
    age: undefined,
    gender: undefined,
    medicalCondition: '',
    dateOfBirth: '',
    phoneNumber: '',
    address: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phoneNumber: '',
    },
    bloodType: undefined,
    allergies: [],
    medications: [],
    insuranceProvider: '',
    insuranceNumber: '',
  });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({ ...prev, ...user }));
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof User] as Record<string, string> || {}),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'age' ? (value ? parseInt(value) : undefined) : value,
      }));
    }
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'allergies' | 'medications') => {
    const values = e.target.value.split(',').map(item => item.trim());
    setFormData((prev) => ({
      ...prev,
      [field]: values,
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your personal information and medical details
        </p>
      </div>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="medical">Medical Information</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5" />
                  Personal Details
                </CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="dateOfBirth" className="text-sm font-medium">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="gender" className="text-sm font-medium">
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phoneNumber" className="text-sm font-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="address" className="text-sm font-medium">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medical">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Medical Information
                </CardTitle>
                <CardDescription>
                  Your medical history and conditions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="bloodType" className="text-sm font-medium">
                      Blood Type
                    </label>
                    <select
                      id="bloodType"
                      name="bloodType"
                      value={formData.bloodType}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Select blood type</option>
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="medicalCondition" className="text-sm font-medium">
                      Medical Conditions
                    </label>
                    <input
                      type="text"
                      id="medicalCondition"
                      name="medicalCondition"
                      value={formData.medicalCondition}
                      onChange={handleChange}
                      placeholder="e.g., Diabetes, Hypertension"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="allergies" className="text-sm font-medium">
                      Allergies
                    </label>
                    <input
                      type="text"
                      id="allergies"
                      name="allergies"
                      value={formData.allergies?.join(', ')}
                      onChange={(e) => handleArrayChange(e, 'allergies')}
                      placeholder="e.g., Penicillin, Peanuts (comma-separated)"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="medications" className="text-sm font-medium">
                      Current Medications
                    </label>
                    <input
                      type="text"
                      id="medications"
                      name="medications"
                      value={formData.medications?.join(', ')}
                      onChange={(e) => handleArrayChange(e, 'medications')}
                      placeholder="e.g., Aspirin, Insulin (comma-separated)"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emergency">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Emergency Contact
                </CardTitle>
                <CardDescription>
                  Who should we contact in case of emergency
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="emergencyContact.name" className="text-sm font-medium">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      id="emergencyContact.name"
                      name="emergencyContact.name"
                      value={formData.emergencyContact?.name}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="emergencyContact.relationship" className="text-sm font-medium">
                      Relationship
                    </label>
                    <input
                      type="text"
                      id="emergencyContact.relationship"
                      name="emergencyContact.relationship"
                      value={formData.emergencyContact?.relationship}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="emergencyContact.phoneNumber" className="text-sm font-medium">
                      Contact Phone Number
                    </label>
                    <input
                      type="tel"
                      id="emergencyContact.phoneNumber"
                      name="emergencyContact.phoneNumber"
                      value={formData.emergencyContact?.phoneNumber}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insurance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Insurance Information
                </CardTitle>
                <CardDescription>
                  Your insurance details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="insuranceProvider" className="text-sm font-medium">
                      Insurance Provider
                    </label>
                    <input
                      type="text"
                      id="insuranceProvider"
                      name="insuranceProvider"
                      value={formData.insuranceProvider}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="insuranceNumber" className="text-sm font-medium">
                      Insurance Number
                    </label>
                    <input
                      type="text"
                      id="insuranceNumber"
                      name="insuranceNumber"
                      value={formData.insuranceNumber}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <div className="mt-6">
            <Button type="submit" className="w-full md:w-auto">
              Save Changes
            </Button>

            {isSaved && (
              <p className="mt-2 text-sm text-green-600">
                Profile updated successfully!
              </p>
            )}
          </div>
        </form>
      </Tabs>
    </div>
  );
} 