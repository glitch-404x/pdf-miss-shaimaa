
import React, { useState, useRef, useEffect } from 'react';
import type { Language } from '../types';

interface LanguageSwitcherProps {
  selectedLanguage: Language;
  onChange: (language: Language) => void;
}

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ selectedLanguage, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = languages.find(l => l.code === selectedLanguage) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (langCode: Language) => {
    onChange(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-12 h-10 bg-white rounded-md shadow-sm text-2xl"
      >
        {selected.flag}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-20">
          <ul className="py-1">
            {languages.map(lang => (
              <li
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <span className="mr-3 text-xl">{lang.flag}</span>
                <span>{lang.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
