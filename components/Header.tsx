
import React from 'react';

const StethoscopeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 14a2 2 0 01-2-2V8a2 2 0 012-2" />
    <path d="M6 6v8a2 2 0 002 2h1" />
    <path d="M15 6v1" />
    <path d="M12 6v1" />
    <path d="M11 14h2" />
    <path d="M10 18h4" />
    <path d="M12 14v4" />
    <path d="M4 8v4" />
    <path d="M18 10h1a2 2 0 012 2v2a2 2 0 01-2 2h-1" />
    <path d="M20 12v0" />
    <circle cx="12" cy="4" r="2" />
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex justify-center items-center gap-4">
        <StethoscopeIcon className="w-10 h-10 text-cyan-500" />
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
          Care Alchemy <span className="text-cyan-500">&#x1F3E5;</span>
        </h1>
      </div>
      <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
        "Your 24/7 Free AI Health Assistant."
      </p>
    </header>
  );
};
