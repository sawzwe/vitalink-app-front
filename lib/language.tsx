'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'th';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations = {
  en: {
    // Common
    'language.english': 'English',
    'language.thai': 'Thai',
    
    // Navigation
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.doctors': 'Doctors',
    'nav.pricing': 'Pricing',
    'nav.faq': 'FAQ',
    'nav.signin': 'Sign In',
    'nav.signup': 'Sign Up',
    'nav.profile': 'Profile',
    'nav.bookings': 'Bookings',
    'nav.logout': 'Logout',

    // Hero Section
    'hero.title': 'Your Health, Our Priority',
    'hero.subtitle': 'Book appointments with top healthcare providers in Thailand',
    'hero.cta': 'Book Now',
    'hero.learnMore': 'Learn More',

    // Features Section
    'features.title': 'Comprehensive Telehealth Features',
    'features.subtitle': 'Everything you need for managing your health, all in one secure platform',
    'features.videoConsultations': 'Video Consultations',
    'features.videoDesc': 'Face-to-face virtual appointments with healthcare professionals in HD quality.',
    'features.scheduling': 'Easy Scheduling',
    'features.schedulingDesc': 'Book appointments 24/7 with our intuitive scheduling system.',
    'features.records': 'Digital Health Records',
    'features.recordsDesc': 'Secure access to your complete medical history and test results.',
    'features.messaging': 'Instant Messaging',
    'features.messagingDesc': 'Direct communication with your healthcare providers through secure messaging.',
    'features.security': 'Data Security',
    'features.securityDesc': 'HIPAA-compliant platform ensuring your medical data stays private.',
    'features.support': '24/7 Support',
    'features.supportDesc': 'Round-the-clock access to medical professionals for urgent care needs.',

    // Booking
    'booking.title': 'Book New Appointment',
    'booking.subtitle': 'Select a hospital and time slot for your appointment',
    'booking.selectHospital': 'Select Hospital',
    'booking.selectTime': 'Select Time Slot',
    'booking.filters': 'Filters',
    'booking.specialty': 'Specialty',
    'booking.allSpecialties': 'All Specialties',
    'booking.distance': 'Distance',
    'booking.rating': 'Rating',
    'booking.emergencyServices': 'Emergency Services Available',
    'booking.maxDistance': 'Maximum Distance (km)',
    'booking.reset': 'Reset',
    'booking.apply': 'Apply',
    'booking.confirm': 'Confirm Booking',
    'booking.confirming': 'Confirming your booking',
    'booking.pleaseWait': 'Please wait while we confirm your appointment...',
    'booking.kmAway': 'km away',

    // Booking Status
    'booking.status.confirmed': 'Confirmed',
    'booking.status.upcoming': 'Upcoming',
    'booking.status.cancelled': 'Cancelled',
    'booking.status.completed': 'Completed',

    // Booking Details
    'booking.noUpcoming': 'No upcoming appointments',
    'booking.bookFirst': 'Book your first appointment to get started',
    'booking.doctor': 'Doctor',
    'booking.importantInfo': 'Important Information',
    'booking.requiredDocs': 'Required Documents',
    'booking.reference': 'Booking Reference',
    'booking.directions': 'Directions',
    'booking.details': 'Details',

    // Profile
    'profile.title': 'Profile Settings',
    'profile.subtitle': 'Manage your personal information and medical details',
    'profile.personal': 'Personal Information',
    'profile.medical': 'Medical Information',
    'profile.emergency': 'Emergency Contact',
    'profile.insurance': 'Insurance',
    'profile.save': 'Save Changes',
    'profile.saved': 'Profile updated successfully!',

    // Form Fields
    'form.name': 'Full Name',
    'form.email': 'Email',
    'form.phone': 'Phone Number',
    'form.address': 'Address',
    'form.dob': 'Date of Birth',
    'form.gender': 'Gender',
    'form.selectGender': 'Select gender',
    'form.male': 'Male',
    'form.female': 'Female',
    'form.other': 'Other',
    'form.bloodType': 'Blood Type',
    'form.selectBloodType': 'Select blood type',
    'form.conditions': 'Medical Conditions',
    'form.allergies': 'Allergies',
    'form.medications': 'Current Medications',
    'form.emergencyName': 'Contact Name',
    'form.relationship': 'Relationship',
    'form.emergencyPhone': 'Contact Phone Number',
    'form.provider': 'Insurance Provider',
    'form.insuranceNumber': 'Insurance Number',
  },
  th: {
    // Common
    'language.english': 'ภาษาอังกฤษ',
    'language.thai': 'ภาษาไทย',
    
    // Navigation
    'nav.home': 'หน้าแรก',
    'nav.features': 'คุณสมบัติ',
    'nav.doctors': 'แพทย์',
    'nav.pricing': 'ราคา',
    'nav.faq': 'คำถามที่พบบ่อย',
    'nav.signin': 'เข้าสู่ระบบ',
    'nav.signup': 'สมัครสมาชิก',
    'nav.profile': 'โปรไฟล์',
    'nav.bookings': 'การนัดหมาย',
    'nav.logout': 'ออกจากระบบ',

    // Hero Section
    'hero.title': 'สุขภาพของคุณ คือ ความสำคัญของเรา',
    'hero.subtitle': 'จองนัดหมายกับผู้ให้บริการด้านสุขภาพชั้นนำในประเทศไทย',
    'hero.cta': 'จองเลย',
    'hero.learnMore': 'เรียนรู้เพิ่มเติม',

    // Features Section
    'features.title': 'คุณสมบัติการแพทย์ทางไกลที่ครอบคลุม',
    'features.subtitle': 'ทุกสิ่งที่คุณต้องการสำหรับการจัดการสุขภาพ ในแพลตฟอร์มที่ปลอดภัย',
    'features.videoConsultations': 'การปรึกษาทางวิดีโอ',
    'features.videoDesc': 'นัดหมายเสมือนจริงแบบตัวต่อตัวกับผู้เชี่ยวชาญด้านสุขภาพในคุณภาพ HD',
    'features.scheduling': 'การจองที่ง่ายดาย',
    'features.schedulingDesc': 'จองนัดหมายได้ตลอด 24/7 ด้วยระบบการจองที่ใช้งานง่าย',
    'features.records': 'บันทึกสุขภาพดิจิทัล',
    'features.recordsDesc': 'เข้าถึงประวัติทางการแพทย์และผลการตรวจของคุณอย่างปลอดภัย',
    'features.messaging': 'ข้อความโต้ตอบทันที',
    'features.messagingDesc': 'สื่อสารโดยตรงกับผู้ให้บริการด้านสุขภาพผ่านการส่งข้อความที่ปลอดภัย',
    'features.security': 'ความปลอดภัยของข้อมูล',
    'features.securityDesc': 'แพลตฟอร์มที่ได้มาตรฐาน HIPAA รับรองความเป็นส่วนตัวของข้อมูลทางการแพทย์ของคุณ',
    'features.support': 'สนับสนุน 24/7',
    'features.supportDesc': 'เข้าถึงผู้เชี่ยวชาญทางการแพทย์ตลอด 24 ชั่วโมงสำหรับความต้องการด้านการดูแลเร่งด่วน',

    // Booking
    'booking.title': 'จองนัดหมายใหม่',
    'booking.subtitle': 'เลือกโรงพยาบาลและเวลาที่ต้องการนัดหมาย',
    'booking.selectHospital': 'เลือกโรงพยาบาล',
    'booking.selectTime': 'เลือกเวลา',
    'booking.filters': 'ตัวกรอง',
    'booking.specialty': 'ความเชี่ยวชาญ',
    'booking.allSpecialties': 'ทุกความเชี่ยวชาญ',
    'booking.distance': 'ระยะทาง',
    'booking.rating': 'คะแนน',
    'booking.emergencyServices': 'มีบริการฉุกเฉิน',
    'booking.maxDistance': 'ระยะทางสูงสุด (กม.)',
    'booking.reset': 'รีเซ็ต',
    'booking.apply': 'นำไปใช้',
    'booking.confirm': 'ยืนยันการจอง',
    'booking.confirming': 'กำลังยืนยันการจองของคุณ',
    'booking.pleaseWait': 'กรุณารอสักครู่ในขณะที่เรายืนยันการนัดหมายของคุณ...',
    'booking.kmAway': 'กม. ห่างออกไป',

    // Booking Status
    'booking.status.confirmed': 'ยืนยันแล้ว',
    'booking.status.upcoming': 'กำลังจะมาถึง',
    'booking.status.cancelled': 'ยกเลิกแล้ว',
    'booking.status.completed': 'เสร็จสิ้น',

    // Booking Details
    'booking.noUpcoming': 'ไม่มีการนัดหมายที่กำลังจะมาถึง',
    'booking.bookFirst': 'จองนัดหมายแรกของคุณเพื่อเริ่มต้น',
    'booking.doctor': 'แพทย์',
    'booking.importantInfo': 'ข้อมูลสำคัญ',
    'booking.requiredDocs': 'เอกสารที่จำเป็น',
    'booking.reference': 'หมายเลขอ้างอิงการจอง',
    'booking.directions': 'เส้นทาง',
    'booking.details': 'รายละเอียด',

    // Profile
    'profile.title': 'ตั้งค่าโปรไฟล์',
    'profile.subtitle': 'จัดการข้อมูลส่วนตัวและข้อมูลทางการแพทย์ของคุณ',
    'profile.personal': 'ข้อมูลส่วนตัว',
    'profile.medical': 'ข้อมูลทางการแพทย์',
    'profile.emergency': 'ผู้ติดต่อฉุกเฉิน',
    'profile.insurance': 'ประกัน',
    'profile.save': 'บันทึกการเปลี่ยนแปลง',
    'profile.saved': 'อัปเดตโปรไฟล์สำเร็จ!',

    // Form Fields
    'form.name': 'ชื่อ-นามสกุล',
    'form.email': 'อีเมล',
    'form.phone': 'เบอร์โทรศัพท์',
    'form.address': 'ที่อยู่',
    'form.dob': 'วันเกิด',
    'form.gender': 'เพศ',
    'form.selectGender': 'เลือกเพศ',
    'form.male': 'ชาย',
    'form.female': 'หญิง',
    'form.other': 'อื่นๆ',
    'form.bloodType': 'หมู่เลือด',
    'form.selectBloodType': 'เลือกหมู่เลือด',
    'form.conditions': 'โรคประจำตัว',
    'form.allergies': 'การแพ้',
    'form.medications': 'ยาที่ใช้ในปัจจุบัน',
    'form.emergencyName': 'ชื่อผู้ติดต่อ',
    'form.relationship': 'ความสัมพันธ์',
    'form.emergencyPhone': 'เบอร์โทรศัพท์ผู้ติดต่อ',
    'form.provider': 'บริษัทประกัน',
    'form.insuranceNumber': 'หมายเลขประกัน',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 