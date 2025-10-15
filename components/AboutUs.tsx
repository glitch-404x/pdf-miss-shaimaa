
import React from 'react';

interface AboutUsProps {
  t: (key: string) => string;
}

export const AboutUs: React.FC<AboutUsProps> = ({ t }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-lg p-8 rounded-2xl shadow-xl text-center text-gray-800">
      <h2 className="text-3xl font-bold mb-6 cairo text-pink-600">{t('aboutTitle')}</h2>
      <p className="text-lg mb-4">
        {t('aboutP1')}
      </p>
      <p className="text-lg mb-8">
        {t('aboutP2')}
      </p>
      <div className="border-t-2 border-pink-200 pt-6">
        <h3 className="text-2xl font-semibold mb-4 cairo">{t('contactInfo')}</h3>
        <p className="text-md">{t('phone')}</p>
        <p className="text-xl font-bold text-purple-700 tracking-widest mt-1">
          {t('phoneNumber')}
        </p>
      </div>
    </div>
  );
};
