
import React from 'react';

interface HeroProps {
  t: (key: string) => string;
}

export const Hero: React.FC<HeroProps> = ({ t }) => {
  return (
    <section className="text-center py-12">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 cairo tracking-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
        {t('heroTitle')}
      </h1>
      <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
        {t('heroSubtitle')}
      </p>
    </section>
  );
};
