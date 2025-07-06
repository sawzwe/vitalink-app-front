'use client';

import { useLanguage } from '@/lib/language';
import { Globe } from 'lucide-react';

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'en' | 'th')}
        className="bg-transparent text-sm font-medium hover:text-foreground focus:outline-none focus:ring-0"
      >
        <option value="en">{t('language.english')}</option>
        <option value="th">{t('language.thai')}</option>
      </select>
    </div>
  );
} 