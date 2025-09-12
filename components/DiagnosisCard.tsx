
import React from 'react';
import type { DiagnosisResult, PossibleDiagnosis } from '../types';

interface DiagnosisCardProps {
  result: DiagnosisResult | null;
}

const getLikelihoodClass = (likelihood: string): string => {
    switch (likelihood.toLowerCase()) {
        case 'high':
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
        case 'medium':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
        case 'low':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        default:
            return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200';
    }
};

const DiagnosisItem: React.FC<{ item: PossibleDiagnosis }> = ({ item }) => (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-start">
            <h4 className="text-lg font-semibold text-cyan-700 dark:text-cyan-400">{item.condition}</h4>
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getLikelihoodClass(item.likelihood)}`}>
                {item.likelihood} Likelihood
            </span>
        </div>
        <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">{item.description}</p>
    </div>
);


const RecommendationItem: React.FC<{ item: string }> = ({ item }) => {
    const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    );

    return (
        <li className="flex items-start">
            <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 mr-3 mt-1">
                <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-300" />
            </span>
            <span className="text-slate-700 dark:text-slate-300">{item}</span>
        </li>
    );
};


export const DiagnosisCard: React.FC<DiagnosisCardProps> = ({ result }) => {
  if (!result) return null;

  return (
    <div className="bg-slate-100 dark:bg-slate-800/50 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
        <section>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Possible Conditions</h3>
            <div className="space-y-4">
                {result.possibleDiagnoses.map((item) => (
                    <DiagnosisItem key={item.condition} item={item} />
                ))}
            </div>
        </section>

        <hr className="my-6 border-slate-200 dark:border-slate-700" />

        <section>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Recommended Next Steps</h3>
            <ul className="space-y-3">
                {result.recommendations.map((item, index) => (
                    <RecommendationItem key={index} item={item} />
                ))}
            </ul>
        </section>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-l-4 border-blue-500 rounded-md text-sm">
            <p className="font-semibold">AI Generated Disclaimer:</p>
            <p>{result.disclaimer}</p>
        </div>
    </div>
  );
};
