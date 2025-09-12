
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10" aria-label="Loading">
        <div className="w-12 h-12 border-4 border-t-4 border-slate-200 border-t-cyan-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
            AI is analyzing your symptoms...
        </p>
    </div>
  );
};
