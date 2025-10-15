
import React from 'react';

interface ProcessingModalProps {
  status: 'processing' | 'error';
  message: string;
  onClose: () => void;
  t: (key: string) => string;
}

export const ProcessingModal: React.FC<ProcessingModalProps> = ({ status, message, onClose, t }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white rounded-2xl shadow-2xl p-8 m-4 max-w-sm w-full text-center transform transition-all duration-300 scale-95 hover:scale-100">
        {status === 'processing' ? (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500 mx-auto mb-4"></div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2 cairo">{t('processing')}</h3>
            <p className="text-gray-600">{message}</p>
          </>
        ) : (
          <>
            <div className="mx-auto mb-4 h-16 w-16 flex items-center justify-center rounded-full bg-red-100">
                 <svg className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h3 className="text-2xl font-bold text-red-600 mb-2 cairo">{t('errorTitle')}</h3>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-colors"
            >
              {t('close')}
            </button>
          </>
        )}
      </div>
    </div>
  );
};
