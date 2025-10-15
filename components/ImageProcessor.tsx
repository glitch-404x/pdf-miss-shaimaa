import React, { useState, useCallback, useRef } from 'react';

interface ImageProcessorProps {
  onGenerate: (images: File[], coverImage: File | null) => void;
  t: (key: string) => string;
}

const FileInput: React.FC<{
  id: string;
  label: string;
  subtext: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  t: (key: string) => string;
  multiple?: boolean;
  accept?: string;
}> = ({ id, label, subtext, onChange, inputRef, t, multiple = false, accept = 'image/*' }) => {

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;
    if (files && files.length > 0 && inputRef.current) {
      inputRef.current.files = files;
      // Dispatch a 'change' event to trigger the onChange handler
      const event = new Event('change', { bubbles: true });
      inputRef.current.dispatchEvent(event);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-lg font-semibold text-gray-700 mb-2">{label}</label>
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-pink-400 transition-colors"
      >
        <div className="space-y-1 text-center pointer-events-none">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="flex text-sm text-gray-600 justify-center">
            <p className="font-medium text-pink-600">
              {t('uploadFile')}
            </p>
            <p className="pl-1">{t('dragAndDrop')}</p>
          </div>
          <p className="text-xs text-gray-500">{subtext}</p>
        </div>
      </div>
      <input id={id} name={id} type="file" ref={inputRef} className="hidden" onChange={onChange} multiple={multiple} accept={accept} />
    </div>
  );
};

const ImagePreview: React.FC<{title: string, files: File[], onRemove?: (index: number) => void}> = ({ title, files, onRemove }) => (
  <div className="w-full mt-6">
    <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 bg-gray-50 rounded-lg border">
      {files.map((file, index) => (
        <div key={index} className="relative group">
          <img src={URL.createObjectURL(file)} alt={`preview ${index}`} className="h-28 w-full object-cover rounded-md shadow-md" />
          {onRemove && (
            <button onClick={() => onRemove(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                X
            </button>
          )}
        </div>
      ))}
    </div>
  </div>
);


export const ImageProcessor: React.FC<ImageProcessorProps> = ({ onGenerate, t }) => {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [noteImages, setNoteImages] = useState<File[]>([]);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const notesInputRef = useRef<HTMLInputElement>(null);


  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNoteImages(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeNoteImage = (index: number) => {
    setNoteImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleClear = useCallback(() => {
    setCoverImage(null);
    setNoteImages([]);
    if (coverInputRef.current) coverInputRef.current.value = '';
    if (notesInputRef.current) notesInputRef.current.value = '';
  }, []);

  const handleSubmit = useCallback(() => {
    onGenerate(noteImages, coverImage);
  }, [noteImages, coverImage, onGenerate]);

  return (
    <div className="max-w-4xl mx-auto bg-white/50 backdrop-blur-md p-8 rounded-2xl shadow-2xl space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        <FileInput id="cover-upload" label={t('uploadCover')} subtext={t('uploadCoverSubtext')} onChange={handleCoverChange} inputRef={coverInputRef} t={t} />
        <FileInput id="notes-upload" label={t('uploadNotes')} subtext={t('uploadNotesSubtext')} onChange={handleNotesChange} multiple inputRef={notesInputRef} t={t} />
      </div>
      
      {coverImage && <ImagePreview title={t('coverPreview')} files={[coverImage]} />}
      {noteImages.length > 0 && <ImagePreview title={t('notesPreview')} files={noteImages} onRemove={removeNoteImage} />}

      <div className="flex items-center justify-center space-x-4 pt-4">
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out"
        >
          {t('generatePdf')}
        </button>
        <button
          onClick={handleClear}
          className="px-8 py-3 bg-gray-300 text-gray-700 font-bold rounded-full shadow-lg hover:bg-gray-400 transition-colors duration-300"
        >
          {t('clear')}
        </button>
      </div>
    </div>
  );
};