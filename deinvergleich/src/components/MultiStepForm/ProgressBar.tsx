import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
  onStepClick?: (step: number) => void;
}

export default function ProgressBar({ currentStep, totalSteps, className = '', onStepClick }: ProgressBarProps) {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className={`w-full ${className}`} role="progressbar" aria-valuenow={currentStep + 1} aria-valuemin={1} aria-valuemax={totalSteps} aria-label={`Schritt ${currentStep + 1} von ${totalSteps}`}>
      {/* Progress text */}
      <div className="flex items-center justify-between mb-3 sm:mb-2">
        <span className="text-xs sm:text-sm font-medium text-muted-foreground font-body">
          Fortschritt
        </span>
        <span className="text-xs sm:text-sm font-medium text-primary font-body">
          {currentStep + 1} von {totalSteps}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-border rounded-full h-2 sm:h-2.5 overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between mt-4 sm:mt-5">
        {Array.from({ length: totalSteps }, (_, index) => (
          <button
            key={index}
            type="button"
            className="flex flex-col items-center max-w-[60px] sm:max-w-none group"
            onClick={() => {
              if (index <= currentStep && onStepClick) {
                onStepClick(index);
              }
            }}
            disabled={index > currentStep}
            aria-label={`${getStepLabel(index)}, Schritt ${index + 1}`}
            aria-current={index === currentStep ? 'step' : undefined}
          >
            <div
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium font-body transition-colors duration-200 ${
                index <= currentStep
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-border text-muted-foreground'
              } ${index < currentStep ? 'group-hover:bg-primary/80 cursor-pointer' : ''}`}
            >
              {index + 1}
            </div>
            <div
              className={`mt-1.5 sm:mt-2 text-xs font-medium font-body transition-colors duration-200 text-center leading-tight ${
                index <= currentStep ? 'text-primary' : 'text-muted-foreground/60'
              }`}
            >
              {getStepLabel(index)}
            </div>
          </button>
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
