
import { useMemo } from 'react';
import type { Language } from '../types';
import { translations } from '../lib/localization';

export const useLocalization = (language: Language) => {
  const t = useMemo(() => {
    return (key: string): string => {
      return translations[language][key] || translations['en'][key] || key;
    };
  }, [language]);

  const dir = useMemo(() => (language === 'ar' ? 'rtl' : 'ltr'), [language]);

  return { t, dir };
};
