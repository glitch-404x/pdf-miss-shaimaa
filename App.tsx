
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ImageProcessor } from './components/ImageProcessor';
import { AboutUs } from './components/AboutUs';
import { Footer } from './components/Footer';
import { FloatingIcons } from './components/FloatingIcons';
import { ProcessingModal } from './components/ProcessingModal';
import { extractTextFromImages } from './services/geminiService';
import { generatePdf } from './services/pdfService';
import type { Language } from './types';
import { useLocalization } from './hooks/useLocalization';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('ar');
  const [view, setView] = useState<'main' | 'about'>('main');
  const [processingState, setProcessingState] = useState<{ status: 'idle' | 'processing' | 'error', message: string }>({ status: 'idle', message: '' });
  const { t, dir } = useLocalization(language);

  const handleGeneratePdf = useCallback(async (images: File[], coverImage: File | null) => {
    if (images.length === 0) {
      setProcessingState({ status: 'error', message: t('errorNoImages') });
      return;
    }

    setProcessingState({ status: 'processing', message: t('processingStart') });

    try {
      setProcessingState({ status: 'processing', message: t('processingExtracting') });
      const text = await extractTextFromImages(images, t);
      if (!text || text.trim() === '') {
          throw new Error(t('errorNoText'));
      }

      setProcessingState({ status: 'processing', message: t('processingGenerating') });
      await generatePdf(text, coverImage, t);
      
      setProcessingState({ status: 'idle', message: '' });

    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : t('errorUnexpected');
      setProcessingState({ status: 'error', message: `${t('errorTitle')}: ${errorMessage}` });
    }
  }, [t]);

  return (
    <div dir={dir} className="relative min-h-screen w-full overflow-hidden animated-gradient text-gray-800">
      <FloatingIcons />
      <div className="relative z-10">
        <Header language={language} setLanguage={setLanguage} setView={setView} t={t} />
        <main className="container mx-auto px-4 py-8 md:py-16">
          {view === 'main' && (
            <>
              <Hero t={t} />
              <ImageProcessor onGenerate={handleGeneratePdf} t={t} />
            </>
          )}
          {view === 'about' && <AboutUs t={t} />}
        </main>
        <Footer t={t} />
      </div>

      {processingState.status !== 'idle' && (
        <ProcessingModal
          status={processingState.status}
          message={processingState.message}
          onClose={() => setProcessingState({ status: 'idle', message: '' })}
          t={t}
        />
      )}
    </div>
  );
};

export default App;
