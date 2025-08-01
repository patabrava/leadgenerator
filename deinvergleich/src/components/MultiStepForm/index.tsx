'use client';

import { ProgressBar } from './ProgressBar';
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Kostenlose DSGVO-Beratung
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Erhalten Sie eine unverbindliche Erstberatung für Ihr Unternehmen. 
            Unsere Experten helfen Ihnen bei der DSGVO-Compliance.
          </p>
        </div>

        {/* Main form container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Progress bar */}
          <div className="px-6 py-6 bg-gray-50 border-b border-gray-200">
            <ProgressBar 
              currentStep={state.currentStep} 
              totalSteps={4}
            />
          </div>

          {/* Form content */}
          <div className="px-6 py-8">
            <div className="slide-in">
              {children}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="px-6 py-6 bg-gray-50 border-t border-gray-200">
            <NavigationButtons
              currentStep={state.currentStep}
              canProceed={canProceed()}
              isSubmitting={state.isSubmitting}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          </div>
        </div>

        {/* Success message */}
        {state.isCompleted && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
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
                <p className="text-sm font-medium text-green-800">
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
    <div className="flex justify-between">
      {/* Previous button */}
      <button
        type="button"
        onClick={onPrev}
        disabled={isFirstStep || isSubmitting}
        className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md transition-colors duration-200 ${
          isFirstStep || isSubmitting
            ? 'text-gray-400 cursor-not-allowed'
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
        Zurück
      </button>

      {/* Next/Submit button */}
      <button
        type="button"
        onClick={onNext}
        disabled={!canProceed || isSubmitting}
        className={`inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white transition-all duration-200 ${
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
        
        {isSubmitting
          ? 'Wird gesendet...'
          : isLastStep
          ? 'Anfrage senden'
          : 'Weiter'
        }
        
        {!isSubmitting && !isLastStep && (
          <svg
            className="w-4 h-4 ml-2"
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
