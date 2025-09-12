
import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
);


export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative shadow-md" role="alert">
        <div className="flex items-center">
            <ErrorIcon className="w-6 h-6 mr-3"/>
            <div>
                <strong className="font-bold">An error occurred.</strong>
                <span className="block sm:inline ml-1">{message}</span>
            </div>
        </div>
    </div>
  );
};
