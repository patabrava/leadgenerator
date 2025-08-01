interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function ProgressBar({ currentStep, totalSteps, className = '' }: ProgressBarProps) {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className={`w-full ${className}`}>
      {/* Progress text */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">
          Fortschritt
        </span>
        <span className="text-sm font-medium text-indigo-600">
          {currentStep + 1} von {totalSteps}
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      {/* Step indicators */}
      <div className="flex justify-between mt-4">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                index <= currentStep
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index + 1}
            </div>
            <div
              className={`mt-2 text-xs font-medium transition-colors duration-300 ${
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
