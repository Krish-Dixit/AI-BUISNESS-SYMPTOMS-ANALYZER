
import React, { useState } from 'react';

interface SymptomInputProps {
  onSubmit: (symptoms: string) => void;
  isLoading: boolean;
}

const AnalyzeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
        <path d="M8 12h8" />
        <path d="M12 8v8" />
        <path d="M15 15l-3-3" />
    </svg>
);


export const SymptomInput: React.FC<SymptomInputProps> = ({ onSubmit, isLoading }) => {
  const [symptoms, setSymptoms] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(symptoms);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <label htmlFor="symptoms" className="block text-lg font-medium text-slate-700 dark:text-slate-300">
        Describe your symptoms
      </label>
      <div className="mt-2">
        <textarea
          id="symptoms"
          name="symptoms"
          rows={6}
          className="w-full p-4 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 ease-in-out dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100"
          placeholder="e.g., I have a persistent headache, a slight fever, and a sore throat..."
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          disabled={isLoading || !symptoms.trim()}
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:bg-slate-400 disabled:cursor-not-allowed dark:focus:ring-offset-slate-900 transition-colors"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Symptoms'}
          {!isLoading && <AnalyzeIcon className="ml-2 -mr-1 h-5 w-5" />}
        </button>
      </div>
    </form>
  );
};
