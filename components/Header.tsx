
import React from 'react';
import type { Language } from '../types';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  setView: (view: 'main' | 'about') => void;
  t: (key: string) => string;
}

export const Header: React.FC<HeaderProps> = ({ language, setLanguage, setView, t }) => {
  return (
    <header className="bg-white/30 backdrop-blur-lg shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800 cairo animate-pulse">
          {t('appName')}
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => setView('main')} className="text-gray-700 hover:text-pink-500 transition-colors duration-300 font-semibold">{t('home')}</button>
          <button onClick={() => setView('about')} className="text-gray-700 hover:text-pink-500 transition-colors duration-300 font-semibold">{t('about')}</button>
          <LanguageSwitcher selectedLanguage={language} onChange={setLanguage} />
        </div>
      </nav>
    </header>
  );
};
