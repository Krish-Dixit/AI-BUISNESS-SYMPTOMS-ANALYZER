
import React, { useState, useCallback } from 'react';
import { getDiagnosis } from './services/geminiService';
import type { DiagnosisResult } from './types';

import { SymptomInput } from './components/SymptomInput';
import { DiagnosisCard } from './components/DiagnosisCard';
import { Loader } from './components/Loader';
import { Header } from './components/Header';
import { ErrorDisplay } from './components/ErrorDisplay';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);

  const handleSymptomSubmit = useCallback(async (symptoms: string) => {
    if (!symptoms.trim()) {
      setError('Please enter your symptoms.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setDiagnosisResult(null);

    try {
      const result = await getDiagnosis(symptoms);
      setDiagnosisResult(result);
    } catch (err) {
      console.error(err);
      setError('An error occurred while analyzing your symptoms. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200 antialiased">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />
        <main className="mt-8">
          
          <SymptomInput onSubmit={handleSymptomSubmit} isLoading={isLoading} />

          {isLoading && <Loader />}
          {error && <ErrorDisplay message={error} />}
          
          {diagnosisResult && (
            <div className="mt-8 animate-fade-in">
              <DiagnosisCard result={diagnosisResult} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};


export default App;