
import React from 'react';

interface FooterProps {
  t: (key: string) => string;
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="bg-transparent text-center py-6">
      <p className="text-white/80 font-semibold cairo" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
        {t('footerText')}
      </p>
    </footer>
  );
};
