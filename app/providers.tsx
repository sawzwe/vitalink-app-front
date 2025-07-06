'use client';

import { AuthProvider } from '@/lib/auth';
import { LanguageProvider } from '@/lib/language';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <LanguageProvider>
        {/* <div className="fixed top-4 right-4 z-50">
          <LanguageSelector />
        </div> */}
        {children}
      </LanguageProvider>
    </AuthProvider>
  );
} 