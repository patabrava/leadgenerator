'use client';

import ProgressBar from './ProgressBar';
import { useMultiStepForm } from '@/hooks/useMultiStepForm';

interface MultiStepFormProps {
  children: React.ReactNode;
}

export function MultiStepForm({ children }: MultiStepFormProps) {
  const { state, canProceed, nextStep, prevStep, submitForm } = useMultiStepForm();

  const handleNext = async () => {
    if (state.currentStep === 3) {
      // Last step - submit form
      await submitForm();
    } else {
      await nextStep();
    }
  };

  const handlePrev = () => {
    prevStep();
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-4xl mx-auto">
        {/* Main form container - Enhanced responsive design */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl overflow-hidden border border-gray-200">
          {/* Progress bar - Mobile-optimized */}
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-gray-50 border-b border-gray-200">
            <ProgressBar 
              currentStep={state.currentStep} 
              totalSteps={4}
            />
          </div>

          {/* Form content - Responsive padding */}
          <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
            <div className="slide-in">
              {children}
            </div>
          </div>

          {/* Navigation buttons - Mobile-optimized */}
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-gray-50 border-t border-gray-200">
            <NavigationButtons
              currentStep={state.currentStep}
              canProceed={canProceed()}
              isSubmitting={state.isSubmitting}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          </div>
        </div>

        {/* Success message - Enhanced responsive design */}
        {state.isCompleted && (
          <div className="mt-6 sm:mt-8 bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6 mx-4 sm:mx-0">
            <div className="flex items-start sm:items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400 mt-0.5 sm:mt-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm sm:text-base font-medium text-green-800 leading-relaxed">
                  Vielen Dank für Ihre Anfrage! Wir melden uns in Kürze bei Ihnen.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface NavigationButtonsProps {
  currentStep: number;
  canProceed: boolean;
  isSubmitting: boolean;
  onNext: () => void;
  onPrev: () => void;
}

function NavigationButtons({
  currentStep,
  canProceed,
  isSubmitting,
  onNext,
  onPrev,
}: NavigationButtonsProps) {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === 3;

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
      {/* Previous button - Full width on mobile */}
      <button
        type="button"
        onClick={onPrev}
        disabled={isFirstStep || isSubmitting}
        className={`w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-2 border border-gray-300 text-sm font-medium rounded-md transition-colors duration-200 ${
          isFirstStep || isSubmitting
            ? 'text-gray-400 cursor-not-allowed bg-gray-50'
            : 'text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        }`}
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="hidden sm:inline">Zurück</span>
        <span className="sm:hidden">Vorheriger Schritt</span>
      </button>

      {/* Next/Submit button - Full width on mobile */}
      <button
        type="button"
        onClick={onNext}
        disabled={!canProceed || isSubmitting}
        className={`w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-2 border border-transparent text-sm font-medium rounded-md text-white transition-all duration-200 min-w-0 sm:min-w-[120px] ${
          !canProceed || isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md hover:shadow-lg'
        }`}
      >
        {isSubmitting && (
          <div className="mr-2 flex space-x-1">
            <div className="w-2 h-2 bg-white rounded-full loading-dots"></div>
            <div className="w-2 h-2 bg-white rounded-full loading-dots"></div>
            <div className="w-2 h-2 bg-white rounded-full loading-dots"></div>
          </div>
        )}
        
        <span className="truncate">
          {isSubmitting
            ? 'Wird gesendet...'
            : isLastStep
            ? 'Jetzt Angebote erhalten'
            : 'Weiter'
          }
        </span>
        
        {!isSubmitting && !isLastStep && (
          <svg
            className="w-4 h-4 ml-2 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
