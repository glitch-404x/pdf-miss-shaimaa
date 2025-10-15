
import React from 'react';

const Icon: React.FC<{ children: React.ReactNode; className: string; delay?: string }> = ({ children, className, delay = '0s' }) => {
  return (
    <div
      className={`absolute text-white/20 text-5xl md:text-7xl floating-icon ${className}`}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
};

const BookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const PenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>;
const PdfIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" /></svg>;


export const FloatingIcons: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-50">
      <Icon className="top-[10%] left-[5%]" delay="0s"><BookIcon /></Icon>
      <Icon className="top-[20%] right-[10%]" delay="1s"><PenIcon /></Icon>
      <Icon className="bottom-[15%] left-[15%]" delay="2s"><PdfIcon /></Icon>
      <Icon className="bottom-[40%] right-[20%]" delay="3s"><BookIcon /></Icon>
      <Icon className="top-[50%] left-[25%]" delay="4s"><PenIcon /></Icon>
      <Icon className="top-[70%] right-[5%]" delay="5s"><PdfIcon /></Icon>
      <Icon className="top-[85%] left-[50%]" delay="0.5s"><BookIcon /></Icon>
    </div>
  );
};
