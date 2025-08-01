import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export default function ProgressBar({ currentStep, totalSteps, className = '' }: ProgressBarProps) {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className={`w-full ${className}`}>
      {/* Progress text - Mobile optimized */}
      <div className="flex items-center justify-between mb-3 sm:mb-2">
        <span className="text-xs sm:text-sm font-medium text-gray-600">
          Fortschritt
        </span>
        <span className="text-xs sm:text-sm font-medium text-indigo-600">
          {currentStep + 1} von {totalSteps}
        </span>
      </div>
      
      {/* Progress bar - Enhanced visual design */}
      <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5 overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      {/* Step indicators - Responsive design */}
      <div className="flex justify-between mt-4 sm:mt-5">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className="flex flex-col items-center max-w-[60px] sm:max-w-none"
          >
            <div
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-all duration-300 ${
                index <= currentStep
                  ? 'bg-indigo-600 text-white shadow-md scale-105 sm:scale-100'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index + 1}
            </div>
            <div
              className={`mt-1.5 sm:mt-2 text-xs font-medium transition-colors duration-300 text-center leading-tight ${
                index <= currentStep ? 'text-indigo-600' : 'text-gray-400'
              }`}
            >
              {getStepLabel(index)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getStepLabel(stepIndex: number): string {
  const labels = [
    'Unternehmen',
    'Kontakt',
    'Projekt',
    'Übersicht',
  ];
  
  return labels[stepIndex] || `Schritt ${stepIndex + 1}`;
}
